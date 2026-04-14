"use client";
import Script from "next/script";
import { Calendar, Clock, MapPin, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function BookingClient() {
  return (
    <div className="pt-[var(--nav-height)] min-h-screen bg-white">
      <Script 
        src="https://assets.calendly.com/assets/external/widget.js" 
        strategy="lazyOnload"
      />

      {/* ── Hero Section ────────────────────────────────────────── */}
      <section className="bg-black text-white pt-20 pb-24 px-6 relative overflow-hidden">
        <div className="container-site max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block border border-white/20 bg-white/5 rounded-full px-4 py-1.5 mb-8">
            <span className="font-body text-[13px] tracking-wide text-white/80">Consultation</span>
          </div>
          <h1 className="font-display text-4xl md:text-[56px] font-medium leading-[1.1] mb-6 tracking-tight">
            Book a 10-Minute Talk
          </h1>
          <p className="font-body text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
            In 10 minutes, you will have a direct answer on whatever property decision you are facing. Whether you are looking to buy, sell, or simply need an honest second opinion on a project or price, I will provide the clarity you need.
          </p>
        </div>
        
        {/* Subtle background element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.03] rounded-full blur-[120px] pointer-events-none" />
      </section>

      {/* ── Benefits Section ────────────────────────────────────── */}
      <section className="-mt-12 relative z-20 px-6 mb-20">
        <div className="container-site max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <Clock size={24} className="text-black mb-4" strokeWidth={1.5} />,
              title: "10-Minute Talk",
              desc: "A focused, direct answer to your current property question or dilemma."
            },
            {
              icon: <Users size={24} className="text-black mb-4" strokeWidth={1.5} />,
              title: "Expert Guidance",
              desc: "Direct access to honest advice from a local market expert."
            },
            {
              icon: <Calendar size={24} className="text-black mb-4" strokeWidth={1.5} />,
              title: "Flexible Sync",
              desc: "Easily reschedule or cancel if your plans change."
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-white border border-black/[0.08] rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
              {item.icon}
              <h3 className="font-body font-semibold text-lg text-black mb-2">{item.title}</h3>
              <p className="font-body text-sm text-black/50 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Calendly Widget Section ────────────────────────────── */}
      <section className="pb-24 px-6">
        <div className="container-site max-w-[1000px] mx-auto">
          <div className="bg-[#FBFBFB] border border-black/[0.05] rounded-[32px] overflow-hidden shadow-2xl">
            <div className="p-1 min-h-[700px]">
              <div 
                className="calendly-inline-widget" 
                data-url="https://calendly.com/amritrealtyholding/10min?hide_landing_page_details=1&hide_gdpr_banner=1" 
                style={{ minWidth: '320px', height: '700px' }} 
              />
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="font-body text-black/40 text-sm mb-6">
              Prefer to call us directly? Reach out at <a href="tel:+917814613916" className="text-black font-medium underline underline-offset-4">+91 7814613916</a>
            </p>
            <Link 
              href="/contact" 
              className="inline-flex items-center gap-2 text-black font-body font-medium text-[15px] hover:gap-3 transition-all"
            >
              Go to Contact Page <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
