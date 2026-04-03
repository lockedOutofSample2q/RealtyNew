"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { Info, ChevronDown } from "lucide-react";

type Residency = "Resident" | "National" | "Non-resident";

export default function MortgageCalculatorPage() {
  const [currency, setCurrency] = useState("AED");
  const [residency, setResidency] = useState<Residency>("Resident");
  const [price, setPrice] = useState(2000000);
  const [downPct, setDownPct] = useState(20);
  const [rate, setRate] = useState(4.5);
  const [years, setYears] = useState(25);

  const FX: Record<string, number> = { AED: 1, USD: 0.272, EUR: 0.252 };
  const fx = FX[currency] ?? 1;

  // Enforce Max LTV based on Residency
  const maxLtv = residency === "National" ? 85 : residency === "Resident" ? 80 : 75;
  const minDownPct = 100 - maxLtv;

  // Ensure downpayment meets minimum
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
    return { downPayment, loan, monthly, totalPaid, totalInterest };
  }, [price, downPct, rate, years]);

  const principalPct = results.totalPaid > 0 ? (price / results.totalPaid) * 100 : 100;
  
  function fmt(val: number) {
    return `${currency} ${Math.round(val * fx).toLocaleString()}`;
  }

  const sliderClass = "w-full h-1 bg-black/10 rounded-full appearance-none outline-none slider-thumb";
  
  return (
    <div className="pt-[var(--nav-height)] min-h-screen bg-[#F9F9F9] text-black">
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
        <div className="container-site max-w-[1200px] mx-auto pt-20 pb-16 px-6 text-center">
          <span className="font-body text-[11px] font-bold tracking-widest uppercase text-black/40 mb-4 block">
            Tools & Calculators
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-semibold mb-4 tracking-tight">
            MORTGAGE CALCULATOR
          </h1>
          <p className="font-body text-black/60 text-lg max-w-xl mx-auto">
            Plan Your Dream Property
          </p>
          <p className="font-body text-black/50 text-sm max-w-2xl mx-auto mt-4 leading-relaxed">
            Estimate your monthly mortgage payments with our calculator. Adjust the property price, down payment, interest rate, and term to see how they impact your cost.
          </p>
        </div>
      </div>

      <div className="container-site max-w-[1200px] mx-auto py-16 px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Controls Panel */}
        <div className="lg:col-span-7 space-y-10">
          
          {/* Currency Header Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-6 rounded-[24px] shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-black/5">
            <span className="font-body text-[13px] font-bold uppercase tracking-wide text-black/60">Currency</span>
            <div className="flex bg-black/5 p-1 rounded-lg">
              {["AED", "USD", "EUR"].map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`px-6 py-2 rounded-md font-body text-sm font-medium transition-all ${currency === c ? "bg-white text-black shadow-sm" : "text-black/50 hover:text-black"}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 rounded-[32px] shadow-[0_4px_32px_rgba(0,0,0,0.03)] border border-black/5 space-y-10">
            {/* Residency Status */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <label className="font-body text-[13px] font-bold text-black uppercase tracking-wide">UAE Residency Status</label>
                <Info size={14} className="text-black/30 cursor-pointer" />
              </div>
              <div className="flex flex-wrap gap-2">
                {(["Resident", "National", "Non-resident"] as Residency[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => setResidency(r)}
                    className={`px-5 py-2.5 rounded-full font-body text-sm font-medium transition-all border ${
                      residency === r ? "bg-black text-white border-black" : "bg-transparent text-black/60 border-black/10 hover:border-black/30"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Property price */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <label className="font-body text-[13px] font-bold text-black uppercase tracking-wide">Property Price</label>
                  <Info size={14} className="text-black/30 cursor-pointer" />
                </div>
                <div className="bg-[#F3F4F6] px-4 py-2 rounded-lg font-display font-medium text-lg text-black">
                  {fmt(price)}
                </div>
              </div>
              <input type="range" min={500000} max={20000000} step={100000} value={price} onChange={(e) => setPrice(+e.target.value)} className={sliderClass} />
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
                  <label className="font-body text-[13px] font-bold text-black uppercase tracking-wide">Down Payment</label>
                  <Info size={14} className="text-black/30 cursor-pointer" />
                </div>
                <div className="bg-[#F3F4F6] px-4 py-2 rounded-lg font-display font-medium text-lg text-black flex gap-2">
                  <span>{downPct}%</span>
                  <span className="text-black/20">|</span>
                  <span>{fmt(results.downPayment)}</span>
                </div>
              </div>
              <input type="range" min={minDownPct} max={90} step={5} value={downPct} onChange={(e) => setDownPct(+e.target.value)} className={sliderClass} />
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
                  <label className="font-body text-[13px] font-bold text-black uppercase tracking-wide">Interest Rate</label>
                  <Info size={14} className="text-black/30 cursor-pointer" />
                </div>
                <div className="bg-[#F3F4F6] px-4 py-2 rounded-lg font-display font-medium text-lg text-black">
                  {rate.toFixed(2)}%
                </div>
              </div>
              <input type="range" min={2} max={9} step={0.1} value={rate} onChange={(e) => setRate(+e.target.value)} className={sliderClass} />
              <div className="flex flex-wrap gap-2 mt-4">
                {[3.5, 4, 4.5, 5, 5.5, 6].map(v => (
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
                  <label className="font-body text-[13px] font-bold text-black uppercase tracking-wide">Loan Term</label>
                  <Info size={14} className="text-black/30 cursor-pointer" />
                </div>
                <div className="bg-[#F3F4F6] px-4 py-2 rounded-lg font-display font-medium text-lg text-black">
                  {years} Years
                </div>
              </div>
              <input type="range" min={5} max={30} step={1} value={years} onChange={(e) => setYears(+e.target.value)} className={sliderClass} />
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
          <div className="sticky top-28 bg-white rounded-[32px] shadow-[0_8px_40px_rgba(0,0,0,0.06)] border border-black/5 overflow-hidden">
            
            {/* Chart Area */}
            <div className="p-10 flex flex-col items-center border-b border-black/5">
              <div className="font-body text-[13px] font-bold uppercase tracking-widest text-black/40 mb-8">Payment Breakdown</div>
              
              {/* CSS Doughnut Chart */}
              <div className="relative w-48 h-48 rounded-full flex items-center justify-center shadow-inner" style={{
                background: `conic-gradient(#000000 0% ${principalPct}%, #E5E7EB ${principalPct}% 100%)`
              }}>
                <div className="absolute inset-2 bg-white rounded-full flex flex-col items-center justify-center">
                  <span className="font-body text-xs text-black/40 uppercase tracking-widest mb-1">Monthly</span>
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
                 <div className="font-body text-[11px] text-black/40 uppercase tracking-wider font-bold mb-2">Loan Amount</div>
                 <div className="font-display text-xl font-medium text-black">{fmt(results.loan)}</div>
              </div>
              <div className="bg-[#F8F9FA] rounded-2xl p-5 border border-black/5">
                 <div className="font-body text-[11px] text-black/40 uppercase tracking-wider font-bold mb-2">Total Interest</div>
                 <div className="font-display text-xl font-medium text-black">{fmt(results.totalInterest)}</div>
              </div>
            </div>

            <div className="bg-black text-white p-8 m-6 rounded-2xl flex items-center justify-between mt-2">
               <div>
                  <div className="font-body text-xs text-white/60 uppercase tracking-widest mb-1 font-semibold">Total Amount Paid</div>
                  <div className="font-display text-3xl font-medium">{fmt(results.totalPaid)}</div>
               </div>
            </div>

            <button className="w-full py-5 flex items-center justify-center gap-2 font-body font-semibold text-sm text-black border-t border-black/5 hover:bg-[#F9F9F9] transition-colors">
               View Full Schedule <ChevronDown size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Footer Banner */}
      <div className="bg-[#F3F4F6] border-t border-black/5 py-10 mt-10">
        <div className="container-site max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-center justify-center text-center gap-4">
           <Info size={20} className="text-black/40" />
           <p className="font-body text-sm text-black/60 font-medium">UAE mortgage regulations: Max LTV for Residents is 80%, Nationals 85%, and Non-residents 75%.</p>
        </div>
      </div>
    </div>
  );
}
