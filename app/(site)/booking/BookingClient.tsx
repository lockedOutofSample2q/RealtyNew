"use client";
import { useEffect } from "react";
import { CheckCircle2, Clock, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function BookingClient() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="pt-[var(--nav-height)] min-h-screen bg-[#FDFDFD]">
      <div className="container-site max-w-7xl mx-auto px-6 py-12 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Left Column: Context & Copy */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="inline-block border border-gold/20 bg-gold/5 rounded-full px-4 py-1.5 mb-6 w-fit">
              <span className="font-body text-[11px] font-bold uppercase tracking-[0.2em] text-gold">
                Direct Advisory
              </span>
            </div>
            
            <h1 className="font-serif text-4xl md:text-6xl text-charcoal mb-6 leading-[1.1] tracking-tight">
              Book a 15-Minute Call
            </h1>
            
            <p className="font-body text-charcoal/70 text-lg mb-10 leading-relaxed">
              In 15 minutes, I will tell you exactly what I would do in your position. Whether you are evaluating an investment, checking a price, or selling land. No sales pitch. No pressure. Just the answer.
            </p>

            <div className="space-y-6 mb-12">
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-gold/10 p-2 rounded-full text-gold">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-charcoal">Fiduciary Mindset</h3>
                  <p className="text-sm text-charcoal/60 mt-1">We tell you when the right answer is not to buy.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1 bg-gold/10 p-2 rounded-full text-gold">
                  <Clock size={20} />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-charcoal">Hard Facts, Fast</h3>
                  <p className="text-sm text-charcoal/60 mt-1">We skip the pleasantries and dig into the numbers and legal realities.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1 bg-gold/10 p-2 rounded-full text-gold">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-charcoal">Zero Commitment</h3>
                  <p className="text-sm text-charcoal/60 mt-1">The consultation is completely free with no obligation to proceed.</p>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-black/5">
              <div className="flex items-center gap-4">
                <Image 
                  src="/icon.png" 
                  alt="Realty Holding & Management Consultants" 
                  width={48} 
                  height={48}
                  className="rounded-full shadow-sm border border-black/5 object-contain"
                />
                <div>
                  <p className="font-display font-semibold text-charcoal">Amritpal Singh</p>
                  <p className="text-[10px] text-charcoal/50 uppercase tracking-widest font-bold mt-1">Principal Advisor</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Widget */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-black/5 rounded-[2rem] shadow-[0_8px_40px_rgba(0,0,0,0.04)] p-2 md:p-4 h-full min-h-[750px]">
              {/* Calendly inline widget begin */}
              <div 
                className="calendly-inline-widget w-full h-full rounded-3xl overflow-hidden" 
                data-url="https://calendly.com/amritrealtyholding/10min?hide_gdpr_banner=1" 
                style={{ minWidth: '320px', height: '100%', minHeight: '750px' }} 
              />
              {/* Calendly inline widget end */}
            </div>
          </div>

        </div>

        {/* Footer Link */}
        <div className="mt-24 text-center pb-12 border-t border-black/5 pt-12">
          <p className="font-body text-charcoal/40 text-sm mb-4">
            Need urgent assistance? Call directly at <a href="tel:+917814613916" className="text-charcoal font-semibold hover:text-gold transition-colors">+91 7814613916</a>
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center gap-2 text-gold font-body font-semibold text-sm hover:gap-3 transition-all"
          >
            Visit Contact Page <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
