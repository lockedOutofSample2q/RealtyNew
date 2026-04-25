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
      {/* Hero Section */}
      <div className="bg-white border-b border-black/5">
        <div className="container-site max-w-3xl mx-auto pt-20 pb-16 px-6 text-center">
          <span className="font-body text-[11px] font-bold tracking-widest uppercase text-black/40 mb-4 block">
            List Your Property
          </span>
          <h1 className="font-display text-5xl font-semibold mb-4 tracking-tight">
            Your Property, Marketed to Pre-Qualified Buyers
          </h1>
          <p className="font-body text-black/60 text-lg max-w-xl mx-auto">
            List your Mohali property with an advisor who brings pre-qualified HNI, CXO, and NRI buyers, not portal browsers. Professional valuation and honest marketing.
          </p>
        </div>
      </div>

      {/* Features Section */}
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
          <div className="mt-16 flex justify-center">
            <Link
              href="/contact"
              className="bg-charcoal text-white px-8 py-4 rounded-full font-body font-medium text-[15px] inline-flex items-center gap-3 hover:scale-[1.02] transition-transform shadow-xl"
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