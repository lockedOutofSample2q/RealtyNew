"use client";
import { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Info, ChevronDown } from "lucide-react";

export type LoanType = "Home Loan" | "Plot / Land Loan" | "Kothi / Construction" | "NRI Mortgage";

export interface CalculatorProps {
  title?: string;
  introContent?: React.ReactNode;
  defaultCity?: string;
  defaultBank?: string;
  defaultLoanType?: LoanType;
  defaultRate?: number;
  defaultPrice?: number;
  stampDutyMale?: number;
  stampDutyFemale?: number;
  registrationCap?: number;
  processingFeePct?: number;
  processingFeeCap?: number;
  faqs?: Array<{ question: string; answer: string }>;
}

function CalculatorInner({ props }: { props: CalculatorProps }) {
  const searchParams = useSearchParams();
  const initialPriceParam = searchParams.get("price");
  const initialPrice = initialPriceParam ? parseInt(initialPriceParam, 10) : (props.defaultPrice || 5000000);

  const [currency, setCurrency] = useState("INR");
  const [loanType, setLoanType] = useState<LoanType>(props.defaultLoanType || "Home Loan");
  const [price, setPrice] = useState(initialPrice && !isNaN(initialPrice) ? initialPrice : 5000000);
  const [downPct, setDownPct] = useState(20);
  const [rate, setRate] = useState(props.defaultRate || 8.5);
  const [years, setYears] = useState(20);

  const FX: Record<string, number> = { INR: 1, USD: 0.012, CAD: 0.016 };
  const fx = FX[currency] ?? 1;

  const handleLoanTypeChange = (type: LoanType) => {
    setLoanType(type);
    if (type === "Home Loan") setRate(8.5);
    if (type === "Plot / Land Loan") setRate(9.5);
    if (type === "Kothi / Construction") setRate(9.0);
    if (type === "NRI Mortgage") setRate(9.0);
  };

  const getLoanTypeNote = () => {
    switch (loanType) {
      case "Home Loan":
        return "Standard home loans for built properties. Max tenure: 30 yrs.";
      case "Plot / Land Loan":
        return "Plot loans are typically 0.5–1% higher than home loans. Max tenure: 15 yrs.";
      case "Kothi / Construction":
        return "Composite loan for land + construction. Disbursements are stage-linked.";
      case "NRI Mortgage":
        return "NRI home loans available up to 80% LTV via NRE/NRO accounts.";
      default:
        return "";
    }
  };

  const maxLtv = loanType === "Plot / Land Loan" ? 75 : 80;
  const minDownPct = 100 - maxLtv;

  if (downPct < minDownPct) {
    setDownPct(minDownPct);
  }

  const results = useMemo(() => {
    const downPayment = (price * downPct) / 100;
    const loan = price - downPayment;
    const monthlyRate = rate / 100 / 12;
    const n = years * 12;
    const monthly =
      monthlyRate === 0
        ? loan / n
        : (loan * monthlyRate * Math.pow(1 + monthlyRate, n)) /
          (Math.pow(1 + monthlyRate, n) - 1);
    const totalPaid = monthly * n + downPayment;
    const totalInterest = totalPaid - price;
    
    // Hidden costs estimation using props or defaults
    const sdMale = props.stampDutyMale ?? 0.06;
    const regCap = props.registrationCap ?? 50000;
    const procFeePct = props.processingFeePct ?? 0.01;
    const procFeeCap = props.processingFeeCap ?? Infinity;

    const stampDuty = price * sdMale; 
    const registration = Math.min(price * 0.01, regCap); 
    const gst = price * 0.05; // 5% GST assuming under-construction for example
    const processingFee = Math.min(loan * procFeePct, procFeeCap); 
    const sanctionValuation = 15000;
    const tco = totalPaid + stampDuty + registration + gst + processingFee + sanctionValuation;

    return { downPayment, loan, monthly, totalPaid, totalInterest, stampDuty, registration, gst, processingFee, sanctionValuation, tco };
  }, [price, downPct, rate, years, props]);

  const principalPct = results.totalPaid > 0 ? (price / results.totalPaid) * 100 : 100;
  
  function fmt(val: number) {
    return `${currency} ${Math.round(val * fx).toLocaleString()}`;
  }

  const sliderClass = "w-full h-1 bg-black/10 rounded-full appearance-none outline-none slider-thumb";
  const city = props.defaultCity || "Mohali";
  
  return (
    <main className="pt-[var(--nav-height)] min-h-screen bg-white text-black">
      <style dangerouslySetInnerHTML={{__html: `
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: black;
          cursor: pointer;
        }
      `}} />

      {/* Hero Section */}
      <div className="bg-white border-b border-black/5">
        <div className="container-site max-w-4xl mx-auto pt-20 pb-16 px-6 text-center">
          <span className="font-body text-[11px] font-bold tracking-widest uppercase text-black/40 mb-4 block">
            EMI / Home Loan Calculator
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-semibold mb-6 tracking-tight">
            {props.title || `Home Loan & Plot EMI Calculator for ${city} (2026 Rates)`}
          </h1>
          
          {props.introContent ? (
            <div className="font-body text-black/80 text-lg max-w-3xl mx-auto mt-6 text-left space-y-4">
              {props.introContent}
            </div>
          ) : (
            <div className="font-body text-black/80 text-lg max-w-3xl mx-auto mt-6 text-left space-y-4">
              <p>
                Planning to buy a flat or plot in {city} or the Tricity area? Use our free
                Home Loan EMI Calculator to estimate your monthly payments in seconds — no
                sign-up required.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>See hidden costs:</strong> Includes Punjab stamp duty, registration, and GST.</li>
                <li><strong>Compare loan types:</strong> Switch between Home Loans, Plot Loans, and Construction options.</li>
                <li><strong>NRI Mortgage support:</strong> Estimate EMIs in INR, USD, or CAD based on current rates.</li>
              </ul>
              <p>
                Most buyers in this region borrow between ₹40L and ₹1.5 cr. At the current
                base rate of 8.5%, a ₹75L loan over 20 years costs ₹65,081/month. Use the
                sliders below to find your number — then scroll down to see what that budget
                unlocks in today's market.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="container-site max-w-[1200px] mx-auto py-16 px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Controls Panel */}
        <div className="lg:col-span-7 space-y-10">
          
          {/* Currency Header Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-6 rounded-[24px] shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-black/5" role="radiogroup" aria-label="Currency Selector">
            <span className="font-body text-[13px] font-bold uppercase tracking-wide text-black/60" id="currency-label">Currency</span>
            <div className="flex bg-black/5 p-1 rounded-lg" aria-labelledby="currency-label">
              {["INR", "USD", "CAD"].map((c) => (
                <button
                  key={c}
                  role="radio"
                  aria-checked={currency === c}
                  onClick={() => setCurrency(c)}
                  className={`px-6 py-2 rounded-md font-body text-sm font-medium transition-all ${currency === c ? "bg-white text-black shadow-sm" : "text-black/50 hover:text-black"}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 rounded-[32px] shadow-[0_4px_32px_rgba(0,0,0,0.03)] border border-black/5 space-y-10">
            {/* Loan Type Selector */}
            <div role="radiogroup" aria-label="Loan Type Selector">
              <div className="flex items-center gap-2 mb-4">
                <label className="font-body text-[13px] font-bold text-black uppercase tracking-wide" id="loantype-label">Loan Type</label>
              </div>
              <div className="flex flex-wrap gap-2" aria-labelledby="loantype-label">
                {(["Home Loan", "Plot / Land Loan", "Kothi / Construction", "NRI Mortgage"] as const).map((r) => (
                  <button
                    key={r}
                    role="radio"
                    aria-checked={loanType === r}
                    onClick={() => handleLoanTypeChange(r)}
                    className={`px-5 py-2.5 rounded-full font-body text-sm font-medium transition-all border ${
                      loanType === r ? "bg-black text-white border-black" : "bg-transparent text-black/60 border-black/10 hover:border-black/30"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-sm text-black/60 font-body">{getLoanTypeNote()}</p>
            </div>

            {/* Property price */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <label htmlFor="price-slider" className="font-body text-[13px] font-bold text-black uppercase tracking-wide">Property Price</label>
                </div>
                <div className="bg-[#F3F4F6] px-4 py-2 rounded-lg font-display font-medium text-lg text-black">
                  {fmt(price)}
                </div>
              </div>
              <input id="price-slider" type="range" min={500000} max={20000000} step={100000} value={price} onChange={(e) => setPrice(+e.target.value)} className={sliderClass} aria-label="Property Price" />
              <div className="flex flex-wrap gap-2 mt-4">
                {[500000, 1000000, 2000000, 5000000, 10000000].map(v => (
                   <button key={v} onClick={() => setPrice(v)} className="px-3 py-1 bg-[#F3F4F6] hover:bg-black/10 text-black/60 text-xs font-semibold rounded-md transition-colors">
                     {v >= 1000000 ? `${v/1000000}M` : `${v/1000}K`}
                   </button>
                ))}
              </div>
            </div>

            {/* Down payment */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <label htmlFor="down-slider" className="font-body text-[13px] font-bold text-black uppercase tracking-wide">Down Payment</label>
                </div>
                <div className="bg-[#F3F4F6] px-4 py-2 rounded-lg font-display font-medium text-lg text-black flex gap-2">
                  <span>{downPct}%</span>
                  <span className="text-black/40">|</span>
                  <span>{fmt(results.downPayment)}</span>
                </div>
              </div>
              <input id="down-slider" type="range" min={minDownPct} max={90} step={5} value={downPct} onChange={(e) => setDownPct(+e.target.value)} className={sliderClass} aria-label="Down Payment Percentage" />
              <div className="flex flex-wrap gap-2 mt-4">
                {[20, 25, 30, 40, 50, 60].map(v => (
                   <button key={v} onClick={() => setDownPct(Math.max(v, minDownPct))} className={`px-3 py-1 ${v < minDownPct ? 'opacity-30 cursor-not-allowed bg-black/5' : 'bg-[#F3F4F6] hover:bg-black/10' } text-black/60 text-xs font-semibold rounded-md transition-colors`}>
                     {v}%
                   </button>
                ))}
              </div>
            </div>

            {/* Interest Rate */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <label htmlFor="rate-slider" className="font-body text-[13px] font-bold text-black uppercase tracking-wide">Interest Rate</label>
                </div>
                <div className="bg-[#F3F4F6] px-4 py-2 rounded-lg font-display font-medium text-lg text-black">
                  {rate.toFixed(2)}%
                </div>
              </div>
              <input id="rate-slider" type="range" min={7.0} max={13.0} step={0.25} value={rate} onChange={(e) => setRate(+e.target.value)} className={sliderClass} aria-label="Interest Rate" />
              <div className="flex flex-wrap gap-2 mt-4">
                {[7.5, 8.0, 8.5, 9.0, 9.5, 10.0].map(v => (
                   <button key={v} onClick={() => setRate(v)} className="px-3 py-1 bg-[#F3F4F6] hover:bg-black/10 text-black/60 text-xs font-semibold rounded-md transition-colors">
                     {v}%
                   </button>
                ))}
              </div>
            </div>

            {/* Loan Term */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <label htmlFor="term-slider" className="font-body text-[13px] font-bold text-black uppercase tracking-wide">Loan Term</label>
                </div>
                <div className="bg-[#F3F4F6] px-4 py-2 rounded-lg font-display font-medium text-lg text-black">
                  {years} Years
                </div>
              </div>
              <input id="term-slider" type="range" min={5} max={30} step={1} value={years} onChange={(e) => setYears(+e.target.value)} className={sliderClass} aria-label="Loan Term in Years" />
              <div className="flex flex-wrap gap-2 mt-4">
                {[5, 10, 15, 20, 25, 30].map(v => (
                   <button key={v} onClick={() => setYears(v)} className="px-3 py-1 bg-[#F3F4F6] hover:bg-black/10 text-black/60 text-xs font-semibold rounded-md transition-colors">
                     {v}y
                   </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-5 relative">
          <div className="sticky top-28 space-y-8">
            <div className="bg-white rounded-[32px] shadow-[0_8px_40px_rgba(0,0,0,0.06)] border border-black/5 overflow-hidden">
              
              {/* Chart Area */}
              <div className="p-10 flex flex-col items-center border-b border-black/5">
                <div className="font-body text-[13px] font-bold uppercase tracking-widest text-black/40 mb-8">Payment Breakdown</div>
                
                {/* CSS Doughnut Chart */}
                <div className="relative w-48 h-48 rounded-full flex items-center justify-center shadow-inner" style={{
                  background: `conic-gradient(#000000 0% ${principalPct}%, #E5E7EB ${principalPct}% 100%)`
                }}>
                  <div className="absolute inset-2 bg-white rounded-full flex flex-col items-center justify-center">
                    <span className="font-body text-xs text-black/60 uppercase tracking-widest mb-1">Monthly</span>
                    <span className="font-display font-medium text-3xl text-black">{fmt(results.monthly)}</span>
                  </div>
                </div>

                <div className="flex w-full justify-between mt-10 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm bg-black" />
                    <span className="font-body text-xs text-black/60 font-semibold">Principal ({principalPct.toFixed(1)}%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm bg-[#E5E7EB]" />
                    <span className="font-body text-xs text-black/60 font-semibold">Interest ({(100-principalPct).toFixed(1)}%)</span>
                  </div>
                </div>
              </div>

              {/* Boxes */}
              <div className="grid grid-cols-2 p-6 gap-4">
                <div className="bg-[#F8F9FA] rounded-2xl p-5 border border-black/5">
                   <div className="font-body text-[11px] text-black/60 uppercase tracking-wider font-bold mb-2">Loan Amount</div>
                   <div className="font-display text-xl font-medium text-black">{fmt(results.loan)}</div>
                </div>
                <div className="bg-[#F8F9FA] rounded-2xl p-5 border border-black/5">
                   <div className="font-body text-[11px] text-black/60 uppercase tracking-wider font-bold mb-2">Total Interest</div>
                   <div className="font-display text-xl font-medium text-black">{fmt(results.totalInterest)}</div>
                </div>
              </div>

              <div className="bg-black text-white p-8 m-6 rounded-2xl flex items-center justify-between mt-2">
                 <div>
                    <div className="font-body text-xs text-white/60 uppercase tracking-widest mb-1 font-semibold">Total Amount Paid</div>
                    <div className="font-display text-3xl font-medium">{fmt(results.totalPaid)}</div>
                 </div>
              </div>
            </div>

            {/* Retention Hook */}
            <div className="bg-[#F9FAFB] p-8 rounded-3xl border border-black/5">
               <h2 className="font-display text-2xl font-semibold mb-4">
                 What {fmt(results.monthly)}/month gets you in {city} right now &rarr;
               </h2>
               <div className="space-y-4 mb-6">
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-black/5">
                     <div className="font-body font-semibold text-lg">Browse Affordable Options</div>
                     <div className="text-sm text-black/60">Properties that match your EMI budget</div>
                     <div className="mt-2 text-black font-medium">Budget: ~{fmt(price)}</div>
                     <Link href={`/properties?maxPrice=${price}`} className="text-blue-600 text-sm font-semibold mt-2 inline-block">View matching properties &rarr;</Link>
                  </div>
               </div>
               <Link href="/tools/loan-eligibility" className="w-full inline-block text-center py-3 bg-black text-white rounded-lg font-semibold text-sm hover:bg-black/80 transition">
                  Check how much loan you qualify for &rarr;
               </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden Costs Section */}
      <div className="bg-[#F8F9FA] border-y border-black/5 py-16">
        <div className="container-site max-w-[800px] mx-auto px-6">
          <h2 className="font-display text-3xl font-semibold mb-8 text-center">What's the true cost of buying in {city}?</h2>
          <div className="bg-white rounded-2xl overflow-hidden border border-black/5 shadow-sm">
             <table className="w-full text-left border-collapse">
               <thead>
                 <tr className="bg-[#F3F4F6] border-b border-black/5">
                   <th className="p-4 font-semibold text-sm">Cost item</th>
                   <th className="p-4 font-semibold text-sm">Amount</th>
                   <th className="p-4 font-semibold text-sm">Notes</th>
                 </tr>
               </thead>
               <tbody className="text-sm">
                 <tr className="border-b border-black/5">
                   <td className="p-4">EMI total over loan tenure</td>
                   <td className="p-4 font-medium">{fmt(results.totalPaid)}</td>
                   <td className="p-4 text-black/60">Auto-computed</td>
                 </tr>
                 <tr className="border-b border-black/5">
                   <td className="p-4">Stamp duty</td>
                   <td className="p-4 font-medium">{fmt(results.stampDuty)}</td>
                   <td className="p-4 text-black/60">{props.stampDutyFemale ? `${props.stampDutyFemale * 100}% for women buyers` : "Varies by state"}</td>
                 </tr>
                 <tr className="border-b border-black/5">
                   <td className="p-4">Registration charges</td>
                   <td className="p-4 font-medium">{fmt(results.registration)}</td>
                   <td className="p-4 text-black/60">Paid at sub-registrar office</td>
                 </tr>
                 <tr className="border-b border-black/5">
                   <td className="p-4">GST (under-construction only)</td>
                   <td className="p-4 font-medium">{fmt(results.gst)}</td>
                   <td className="p-4 text-black/60">0% for ready-to-move</td>
                 </tr>
                 <tr className="border-b border-black/5">
                   <td className="p-4">Society maintenance (est. 5 yrs)</td>
                   <td className="p-4 font-medium">{fmt(2500 * 60)}</td>
                   <td className="p-4 text-black/60">Varies by project</td>
                 </tr>
                 <tr className="border-b border-black/5">
                   <td className="p-4">Home loan processing fee</td>
                   <td className="p-4 font-medium">{fmt(results.processingFee)}</td>
                   <td className="p-4 text-black/60">One-time, paid to bank</td>
                 </tr>
                 <tr className="border-b border-black/5">
                   <td className="p-4">Sanction letter / valuation</td>
                   <td className="p-4 font-medium">{fmt(results.sanctionValuation)}</td>
                   <td className="p-4 text-black/60">Charged by bank</td>
                 </tr>
                 <tr className="bg-[#F8F9FA]">
                   <td className="p-4 font-bold">Total cost of ownership</td>
                   <td className="p-4 font-bold text-lg">{fmt(results.tco)}</td>
                   <td className="p-4 text-black/60">Includes all upfront & hidden costs</td>
                 </tr>
               </tbody>
             </table>
          </div>
          <p className="mt-6 text-sm text-black/70 font-bold">
            Stamp duty varies depending on the primary applicant. Always budget for the total cost of ownership including registration and upfront bank fees.
          </p>
        </div>
      </div>

      <div className="container-site max-w-[800px] mx-auto py-16 px-6 space-y-12">
        {props.faqs ? (
          <div>
            <h2 className="font-display text-3xl font-semibold mb-8">Frequently asked questions</h2>
            <div className="space-y-6">
              {props.faqs.map((faq, idx) => (
                <div key={idx}>
                  <h3 className="font-bold text-lg mb-2">{faq.question}</h3>
                  <p className="text-black/70 text-sm">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            <div>
              <h2 className="font-display text-2xl font-semibold mb-4">Punjab stamp duty & registration — what you actually pay</h2>
              <p className="text-black/70 leading-relaxed text-sm">
                 When you calculate your EMI, you are only factoring in the loan amount. However, the bank appraisal and sanction letter do not cover registry fees. You will need to pay stamp duty and registration out of pocket. Circle rates determine the minimum value for this calculation.
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold mb-4">NRI home loan rules for Tricity property</h2>
              <p className="text-black/70 leading-relaxed text-sm">
                 Under FEMA guidelines, NRIs can easily purchase residential property. Your co-applicant can be a resident Indian. Disbursements happen typically from an NRE or NRO account directly to the developer or seller. Note that you may be required to pay pre-EMI interest during the construction period before full EMI starts.
              </p>
            </div>
            
            <div>
              <h2 className="font-display text-3xl font-semibold mb-8">Frequently asked questions</h2>
              <div className="space-y-6">
                <div>
                   <h3 className="font-bold text-lg mb-2">What is the current home loan interest rate in {city}?</h3>
                   <p className="text-black/70 text-sm">As of 2026, home loan interest rates in {city} range from 8.5% to 9.5% depending on your lender and CIBIL score. SBI currently offers 8.5% for salaried borrowers with a score above 750. HDFC starts at 8.75%, PNB at 8.6%, and ICICI at 8.9%. Plot loans carry a premium of 0.5%–1% above home loan rates and have a maximum tenure of 15 years.</p>
                </div>
                <div>
                   <h3 className="font-bold text-lg mb-2">What is the EMI for a 50 lakh home loan?</h3>
                   <p className="text-black/70 text-sm">At 8.5% interest over 20 years, the EMI for a ₹50 lakh home loan is approximately ₹43,391 per month. Over 15 years at the same rate, the EMI rises to ₹49,238/month but you save ₹14.3 lakh in total interest. Use the calculator above to adjust the tenure and see which option fits your budget.</p>
                </div>
                <div>
                   <h3 className="font-bold text-lg mb-2">How much down payment do I need for a flat in {city}?</h3>
                   <p className="text-black/70 text-sm">RBI norms mandate a minimum down payment of 10%–25% depending on loan size. For loans above ₹75 lakh, banks require at least 25% down. So for a ₹1 crore flat in {city}, you need a minimum of ₹25 lakh as down payment — plus stamp duty, registration, and any GST applicable. Most buyers budget ₹30–35 lakh total upfront on a ₹1 crore property.</p>
                </div>
                <div>
                   <h3 className="font-bold text-lg mb-2">Can NRIs get home loans for property in {city}?</h3>
                   <p className="text-black/70 text-sm">Yes. NRIs and PIOs can obtain home loans from Indian banks for property in {city}. HDFC, SBI NRI, and ICICI all offer NRI home loan products with LTV ratios up to 80%. Repayment must be made through NRE or NRO accounts. Our calculator includes an NRI mode that lets you input your foreign salary in USD or CAD and view the EMI in both currencies.</p>
                </div>
                <div>
                   <h3 className="font-bold text-lg mb-2">What is the difference between a home loan and a plot loan in India?</h3>
                   <p className="text-black/70 text-sm">A home loan is for purchasing a built property (flat, villa, builder floor). A plot loan — also called a land loan — is for purchasing a residential plot or agricultural land. Plot loans typically carry interest rates 0.5%–1% higher than home loans and have a shorter maximum tenure of 15 years (vs 30 years for home loans). LTV on plot loans is also lower — typically 70%–75% vs 80%–90% for home loans.</p>
                </div>
                <div>
                   <h3 className="font-bold text-lg mb-2">What are the property registration charges in {city}?</h3>
                   <p className="text-black/70 text-sm">In Punjab, stamp duty is 6% of the property value for male buyers and 5% for female buyers or joint registrations with a woman as co-owner. Registration charges are 1% of the property value, capped at ₹50,000. For a ₹1 crore flat, this means ₹6 lakh stamp duty + ₹50,000 registration = ₹6.5 lakh paid at the time of registry — on top of your down payment.</p>
                </div>
              </div>
            </div>
          </>
        )}

        <div className="pt-8 text-center">
            <Link href="/tools/loan-eligibility" className="text-blue-600 font-semibold hover:underline">
               Next step: Check your loan eligibility &rarr;
            </Link>
        </div>
      </div>
    </main>
  );
}

export default function CalculatorClient(props: CalculatorProps) {
  return (
    <Suspense fallback={<div>Loading calculator...</div>}>
      <CalculatorInner props={props} />
    </Suspense>
  );
}