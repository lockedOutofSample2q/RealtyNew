"use client";
// app/site/mortgage-calculator/page.tsx  →  /mortgage-calculator

import { useState, useMemo } from "react";
import Link from "next/link";

export default function MortgageCalculatorPage() {
  const [price, setPrice] = useState(2000000);
  const [downPct, setDownPct] = useState(20);
  const [rate, setRate] = useState(4.5);
  const [years, setYears] = useState(25);
  const [currency, setCurrency] = useState("AED");

  const FX: Record<string, number> = { AED: 1, USD: 0.272, EUR: 0.252 };
  const fx = FX[currency] ?? 1;

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

  function fmt(val: number) {
    return `${currency} ${Math.round(val * fx).toLocaleString()}`;
  }

  const sliderClass = "w-full h-1 accent-[#C9A84C] cursor-pointer";
  const inputClass = "bg-[#141414] border border-white/10 text-white font-body text-sm px-3 py-2.5 outline-none focus:border-[var(--gold)] transition-colors w-24 text-right";

  return (
    <div className="pt-[var(--nav-height)] min-h-screen bg-[#0D0D0D]">
      <div className="border-b border-[rgba(201,168,76,0.08)]">
        <div className="container-site pt-16 pb-10">
          <span className="font-body text-xs tracking-widest uppercase text-[var(--gold)] mb-3 block">
            Tools
          </span>
          <h1 className="font-display font-light text-white mb-3">Mortgage Calculator</h1>
          <p className="font-body text-white/50 max-w-lg">
            Estimate your monthly payments and total cost. UAE banks typically lend up to 80% LTV for residents, 75% for non-residents.
          </p>
        </div>
      </div>

      <div className="container-site py-14 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Controls */}
        <div className="space-y-8">
          {/* Currency */}
          <div>
            <label className="block font-body text-xs text-white/40 uppercase tracking-wide mb-3">Display Currency</label>
            <div className="flex gap-2">
              {["AED", "USD", "EUR"].map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`px-4 py-2 font-body text-sm transition-colors ${currency === c ? "bg-[var(--gold)] text-black" : "bg-[#141414] text-white/60 border border-white/10 hover:text-white"}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Property price */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="font-body text-xs text-white/40 uppercase tracking-wide">Property Price</label>
              <span className="font-display text-xl text-white font-light">{fmt(price)}</span>
            </div>
            <input type="range" min={500000} max={20000000} step={100000} value={price}
              onChange={(e) => setPrice(+e.target.value)} className={sliderClass} />
            <div className="flex justify-between font-body text-xs text-white/25 mt-1">
              <span>{fmt(500000)}</span><span>{fmt(20000000)}</span>
            </div>
          </div>

          {/* Down payment */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="font-body text-xs text-white/40 uppercase tracking-wide">Down Payment</label>
              <span className="font-display text-xl text-white font-light">{downPct}% · {fmt(results.downPayment)}</span>
            </div>
            <input type="range" min={15} max={50} step={5} value={downPct}
              onChange={(e) => setDownPct(+e.target.value)} className={sliderClass} />
            <div className="flex justify-between font-body text-xs text-white/25 mt-1">
              <span>15%</span><span>50%</span>
            </div>
          </div>

          {/* Rate */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="font-body text-xs text-white/40 uppercase tracking-wide">Interest Rate (p.a.)</label>
              <span className="font-display text-xl text-white font-light">{rate}%</span>
            </div>
            <input type="range" min={2} max={9} step={0.1} value={rate}
              onChange={(e) => setRate(+e.target.value)} className={sliderClass} />
            <div className="flex justify-between font-body text-xs text-white/25 mt-1">
              <span>2%</span><span>9%</span>
            </div>
          </div>

          {/* Loan term */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="font-body text-xs text-white/40 uppercase tracking-wide">Loan Term</label>
              <span className="font-display text-xl text-white font-light">{years} years</span>
            </div>
            <input type="range" min={5} max={25} step={5} value={years}
              onChange={(e) => setYears(+e.target.value)} className={sliderClass} />
            <div className="flex justify-between font-body text-xs text-white/25 mt-1">
              <span>5 yrs</span><span>25 yrs</span>
            </div>
          </div>
        </div>

        {/* Results */}
        <div>
          {/* Monthly payment hero */}
          <div className="bg-[var(--gold)] p-8 mb-4 text-center">
            <div className="font-body text-sm text-black/60 uppercase tracking-wide mb-2">Monthly Payment</div>
            <div className="font-display text-5xl text-black font-light">
              {fmt(results.monthly)}
            </div>
            <div className="font-body text-sm text-black/60 mt-1">per month</div>
          </div>

          {/* Breakdown */}
          <div className="bg-[#141414] border border-white/5 divide-y divide-white/5">
            {[
              { label: "Property Price", value: fmt(price) },
              { label: "Down Payment", value: fmt(results.downPayment) },
              { label: "Loan Amount", value: fmt(results.loan) },
              { label: "Monthly Payment", value: fmt(results.monthly) },
              { label: "Total Interest", value: fmt(results.totalInterest) },
              { label: "Total Amount Paid", value: fmt(results.totalPaid) },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between px-5 py-3.5">
                <span className="font-body text-sm text-white/50">{row.label}</span>
                <span className="font-body text-sm font-medium text-white">{row.value}</span>
              </div>
            ))}
          </div>

          <p className="font-body text-xs text-white/30 mt-4 leading-relaxed">
            This is an estimate only. Actual mortgage terms depend on your credit profile, income, and lender. Speak to a mortgage advisor for a precise figure.
          </p>

          <div className="mt-6">
            <Link href="/contact" className="flex items-center justify-center gap-2 py-3.5 bg-[var(--gold)] text-black font-body font-medium text-sm hover:bg-[var(--gold-light)] transition-colors">
              Talk to a Mortgage Advisor
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
