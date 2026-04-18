import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Search, FileText, Map } from 'lucide-react';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: `Relocation Services | ${siteConfig.name}`,
  description: "Relocating to Mohali or Tricity? Property selection, documentation guidance, and community orientation from an advisor with 10+ years on the ground.",
};

export default function RelocationPage() {
  return (
    <div className="pt-[var(--nav-height)] min-h-screen bg-white">
      <section className="bg-black text-white pt-20 pb-32 px-6 relative overflow-hidden">
        <div className="container-site max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block border border-white/20 bg-white/5 rounded-full px-4 py-1.5 mb-8">
            <span className="font-body text-[13px] tracking-wide text-white/80">Relocation Services</span>
          </div>
          <h1 className="font-display text-4xl md:text-[56px] font-medium leading-[1.1] mb-6">
            Relocating to Mohali and Tricity: Start With the Right Advice
          </h1>
          <p className="font-body text-white/60 text-lg max-w-3xl mx-auto leading-relaxed">
            Whether you are moving from another Indian city or returning from abroad, settling in Tricity is one of the most considered decisions a family makes. Getting the property decision right at the start sets the tone for everything that follows. This advisory provides end-to-end guidance across property selection, legal documentation, and community orientation, so the first decision you make here is the right one.
          </p>
          <div className="mt-10 mb-[-120px]">
            <Link
              href="/booking"
              className="bg-white text-black px-8 py-4 rounded-full font-body font-medium text-[15px] inline-flex items-center gap-3 hover:scale-[1.02] transition-transform shadow-xl mb-32"
            >
              Book a Relocation Consultation <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="container-site max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-[#F8F8F8] p-10 rounded-[32px] hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center mb-8">
                <Search size={24} className="text-white" strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-2xl mb-4">Property Selection & Due Diligence</h3>
              <p className="font-body text-black/60 leading-relaxed text-[15px]">
                Honest shortlisting of properties matched to your budget, timeline, and end-use, whether renting to start or buying immediately. Every recommendation is verified for RERA compliance, developer track record, and title clarity before it reaches you.
              </p>
            </div>
            
            <div className="bg-[#F8F8F8] p-10 rounded-[32px] hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center mb-8">
                <FileText size={24} className="text-white" strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-2xl mb-4">Documentation & Legal Coordination</h3>
              <p className="font-body text-black/60 leading-relaxed text-[15px]">
                Guidance through every step of the property transaction, from agreement to sale through stamp duty, registration, mutation, and possession. If complications arise after the transaction, the support continues.
              </p>
            </div>

            <div className="bg-[#F8F8F8] p-10 rounded-[32px] hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center mb-8">
                <Map size={24} className="text-white" strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-2xl mb-4">Community & Sector Orientation</h3>
              <p className="font-body text-black/60 leading-relaxed text-[15px]">
                School catchment areas, healthcare access, commute reality, neighbourhood character by sector: the ground-level information that property listings never include but new residents always wish they had known before choosing where to live.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}