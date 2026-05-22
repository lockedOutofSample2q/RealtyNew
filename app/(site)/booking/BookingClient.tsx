"use client";
import { useEffect } from "react";
import { CheckCircle2, Clock, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";

declare global {
  interface Window {
    Calendly: any;
  }
}

export default function BookingClient() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    
    // Once the script loads, we need to manually initialize the widget
    // because React renders the div dynamically and Calendly's auto-init might miss it
    script.onload = () => {
      if (window.Calendly) {
        window.Calendly.initBadges();
      }
    };
    
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* ── Hero Section ────────────────────────────────────────── */}
      <section className="bg-white text-black pt-[calc(var(--nav-height)+4rem)] pb-24 px-6 border-b border-black/5 relative overflow-hidden">
        <div className="container-site max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block border border-black/10 bg-black/5 rounded-full px-4 py-1.5 mb-8">
            <span className="font-body text-[13px] tracking-wide text-black/50 uppercase font-bold">Consultation</span>
          </div>
          <h1 className="font-display text-4xl md:text-[56px] font-medium leading-[1.1] mb-6 tracking-tight">
            Book a 15-Minute Call.
          </h1>
          <p className="font-body text-black/60 text-lg max-w-2xl mx-auto leading-relaxed">
            In 15 minutes, you will have a direct answer on whatever property decision you are facing. Whether you are looking to buy, sell, or simply need an honest second opinion on a project or price, I will provide the clarity you need.
          </p>
        </div>
      </section>

      {/* ── Benefits Section ────────────────────────────────────── */}
      <section className="-mt-12 relative z-20 px-6 mb-20">
        <div className="container-site max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <ShieldCheck size={24} className="text-black mb-4" strokeWidth={1.5} />,
              title: "Fiduciary Mindset",
              desc: "We tell you when the right answer is not to buy. No sales pitch. No pressure."
            },
            {
              icon: <Clock size={24} className="text-black mb-4" strokeWidth={1.5} />,
              title: "Hard Facts, Fast",
              desc: "We skip the pleasantries and dig straight into the numbers and legal realities."
            },
            {
              icon: <CheckCircle2 size={24} className="text-black mb-4" strokeWidth={1.5} />,
              title: "Zero Commitment",
              desc: "The consultation is completely free with no obligation to proceed whatsoever."
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-white border border-black/10 rounded-2xl p-8 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300">
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
          <div className="bg-white border border-black/10 rounded-3xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.04)]">
            <div className="p-1 min-h-[700px]">
              {/* Calendly inline widget begin */}
              <div 
                className="calendly-inline-widget w-full h-full" 
                data-url="https://calendly.com/realtyholdingandmanagementconsultants/10min?hide_gdpr_banner=1" 
                style={{ minWidth: '320px', height: '100%', minHeight: '700px' }} 
              />
              {/* Calendly inline widget end */}
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <div className="flex items-center justify-center gap-4 mb-8">
              <Image 
                src="/assets/images/leadership/amritpal.jpg" 
                alt="Realty Holding & Management Consultants" 
                width={48} 
                height={48}
                className="rounded-full shadow-sm border border-black/5 object-cover"
              />
              <div className="text-left">
                <p className="font-display font-semibold text-black">Amritpal Singh</p>
                <p className="text-[10px] text-black/50 uppercase tracking-widest font-bold mt-1">Principal Advisor</p>
              </div>
            </div>

            <p className="font-body text-black/40 text-sm mb-6">
              Need urgent assistance? Call directly at <a href={`tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`} className="text-black font-semibold hover:underline transition-all">{siteConfig.contact.phone}</a>
            </p>
            <Link 
              href="/contact" 
              className="inline-flex items-center gap-2 text-black font-body font-semibold text-[15px] hover:gap-3 transition-all"
            >
              Visit Contact Page <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
