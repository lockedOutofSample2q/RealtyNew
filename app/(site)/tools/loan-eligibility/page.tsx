"use client";
import { useState } from "react";
import { UserCheck, Info, CheckCircle2 } from "lucide-react";

export default function LoanEligibilityPage() {
  const [income, setIncome] = useState(100000);
  const [emis, setEmis] = useState(0);
  const [tenure, setTenure] = useState(20);
  const [rate, setRate] = useState(8.5);

  const foi = 0.5; // Fixed Obligation to Income Ratio (standard 50%)
  const availableEmi = (income * foi) - emis;
  
  // Back-calculate loan amount from EMI
  // EMI = [P * r * (1 + r)^n] / [((1 + r)^n) - 1]
  // P = EMI * [((1 + r)^n) - 1] / [r * (1 + r)^n]
  const r = rate / 100 / 12;
  const n = tenure * 12;
  const eligibleLoan = availableEmi > 0 
    ? (availableEmi * (Math.pow(1 + r, n) - 1)) / (r * Math.pow(1 + r, n))
    : 0;

  function fmt(val: number) {
    return `₹${Math.round(val).toLocaleString()}`;
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
        <div className="container-site max-w-3xl mx-auto pt-20 pb-16 px-6 text-center">
          <span className="font-body text-[11px] font-bold tracking-widest uppercase text-black/40 mb-4 block">
            Housing Loan Eligibility
          </span>
          <h1 className="font-display text-5xl font-semibold mb-4 tracking-tight">
            Loan Eligibility Checker
          </h1>
          <p className="font-body text-black/60 text-lg max-w-xl mx-auto">
            Check your home loan eligibility instantly based on your monthly income and existing commitments.
          </p>
        </div>
      </div>

      <div className="container-site py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Controls */}
        <div className="lg:col-span-7 space-y-10">
          <div className="bg-white p-10 rounded-[40px] shadow-[0_4px_32px_rgba(0,0,0,0.02)] border border-black/5 space-y-12">
            {/* Monthly Income */}
            <div>
              <div className="flex justify-between mb-6">
                <label className="font-body text-xs font-bold uppercase tracking-widest text-black/40">Gross Monthly Income</label>
                <span className="text-xl font-display font-medium">{fmt(income)}</span>
              </div>
              <input type="range" min={20000} max={1000000} step={5000} value={income} onChange={(e) => setIncome(+e.target.value)} className={sliderClass} />
            </div>
            {/* Existing EMIs */}
            <div>
              <div className="flex justify-between mb-6">
                <label className="font-body text-xs font-bold uppercase tracking-widest text-black/40">Existing Monthly EMIs</label>
                <span className="text-xl font-display font-medium">{fmt(emis)}</span>
              </div>
              <input type="range" min={0} max={500000} step={1000} value={emis} onChange={(e) => setEmis(+e.target.value)} className={sliderClass} />
            </div>
            {/* Tenure */}
            <div>
              <div className="flex justify-between mb-6">
                <label className="font-body text-xs font-bold uppercase tracking-widest text-black/40">Loan Tenure (Years)</label>
                <span className="text-xl font-display font-medium">{tenure} Years</span>
              </div>
              <input type="range" min={5} max={30} step={1} value={tenure} onChange={(e) => setTenure(+e.target.value)} className={sliderClass} />
            </div>
            {/* Interest Rate */}
            <div>
              <div className="flex justify-between mb-6">
                <label className="font-body text-xs font-bold uppercase tracking-widest text-black/40">Expected Interest Rate</label>
                <span className="text-xl font-display font-medium">{rate}%</span>
              </div>
              <input type="range" min={7} max={12} step={0.1} value={rate} onChange={(e) => setRate(+e.target.value)} className={sliderClass} />
            </div>
          </div>
        </div>
        {/* Results */}
        <div className="lg:col-span-5">
          <div className="sticky top-28 bg-charcoal text-white rounded-[40px] p-10 shadow-[0_24px_48px_rgba(0,0,0,0.15)]">
            <h2 className="text-xl font-display font-medium mb-10 text-white/70 uppercase tracking-widest">Eligibility Result</h2>
            <div className="mb-12">
              <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-4">Estimated Eligible Loan Amount</p>
              <p className="text-5xl md:text-6xl font-display font-medium text-white">{fmt(eligibleLoan)}</p>
            </div>
            <div className="space-y-6 mb-12">
              <div className="flex items-center gap-3 text-white/90">
                <CheckCircle2 size={18} className="text-white" />
                <span className="text-sm">Max Monthly EMI: {fmt(availableEmi)}</span>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <CheckCircle2 size={18} className="text-white" />
                <span className="text-sm">FOIR Applied: 50%</span>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <CheckCircle2 size={18} className="text-white" />
                <span className="text-sm">Assumed Interest: {rate}% p.a.</span>
              </div>
            </div>
            <a
              href="/contact"
              className="block w-full bg-white text-charcoal text-center py-5 rounded-2xl font-body font-bold uppercase tracking-widest text-xs hover:bg-white/90 transition-all font-bold"
            >
              Consult with Advisor
            </a>
            <div className="mt-8 flex items-start gap-3 text-white/60">
              <Info size={14} className="shrink-0 mt-0.5" />
              <p className="text-[10px] leading-relaxed">
                Eligibility is subject to bank guidelines, credit score (CIBIL), and property valuation. This is an estimate based on standard banking ratios.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
