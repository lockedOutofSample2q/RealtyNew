import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Globe, TrendingUp, Camera } from 'lucide-react';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: `List Your Property | ${siteConfig.name}`,
  description: "List your Mohali property with an advisor who brings pre-qualified HNI, CXO, and NRI buyers, not portal browsers. Professional valuation and honest marketing.",
};

export default function ListYourPropertyPage() {
  return (
    <div className="pt-[var(--nav-height)] min-h-screen bg-white">
      <section className="bg-black text-white pt-20 pb-24 px-6 relative overflow-hidden">
        <div className="container-site max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block border border-white/20 bg-white/5 rounded-full px-4 py-1.5 mb-8">
            <span className="font-body text-[13px] tracking-wide text-white/80">List Your Property</span>
          </div>
          <h1 className="font-display text-4xl md:text-[56px] font-medium leading-[1.1] mb-6">
            Your Property, Marketed to Buyers Who Are Already Pre-Qualified
          </h1>
          <div className="font-body text-white/60 text-lg max-w-3xl mx-auto leading-relaxed space-y-6">
            <p>
              Most properties listed with brokers spend months on portals waiting for enquiries that go nowhere. The buyers this advisory works with are pre-qualified. They are HNI business owners, senior corporate executives, land sellers reinvesting an acquisition payout, and NRI investors with a genuine brief and a real budget. When your property is presented to this network, it is not competing against 200 other listings for the attention of a casual browser. It is being shown to someone actively looking for what you have.
            </p>
            <p>
              Every property listed through this advisory is evaluated honestly before it is presented to buyers. If there is a pricing issue, a documentation gap, or a title complication that needs to be resolved before sale, you will be told. Not because it benefits the advisory, but because a clean transaction is the only kind worth completing. The support continues through registration, mutation, and handover.
            </p>
          </div>
          <div className="mt-10">
             <Link
                href="/contact"
                className="bg-white text-black px-8 py-4 rounded-full font-body font-medium text-[15px] inline-flex items-center gap-3 hover:scale-[1.02] transition-transform shadow-xl"
              >
                Request a Property Brief <ArrowRight size={18} />
             </Link>
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="container-site max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <div className="w-12 h-12 bg-black/5 rounded-2xl flex items-center justify-center mb-6">
                <Globe size={24} className="text-black" strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-xl mb-4">Global Reach</h3>
              <p className="font-body text-black/60 leading-relaxed">
                Your listing reaches HNI buyers in Tricity, corporate executives relocating from major Indian metros, and NRI investors in the UK, Canada, Gulf, and Australia, through direct advisory relationships, not paid portal placement.
              </p>
            </div>
            
            <div>
              <div className="w-12 h-12 bg-black/5 rounded-2xl flex items-center justify-center mb-6">
                <TrendingUp size={24} className="text-black" strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-xl mb-4">Professional Valuation</h3>
              <p className="font-body text-black/60 leading-relaxed">
                A pricing recommendation grounded in actual registered sale deeds, comparable transactions in your sector, and current market absorption data. Not an inflated figure designed to win the listing.
              </p>
            </div>

            <div>
              <div className="w-12 h-12 bg-black/5 rounded-2xl flex items-center justify-center mb-6">
                <Camera size={24} className="text-black" strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-xl mb-4">Premium Marketing</h3>
              <p className="font-body text-black/60 leading-relaxed">
                Professional photography, video walkthrough, and a written property brief that presents your asset the way a serious buyer expects to receive it, with RERA details, specifications, and honest positioning.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}