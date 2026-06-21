// app/not-found.tsx
import Link from "next/link";
import { Phone, ArrowRight, Home, MapPin } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] relative overflow-hidden flex flex-col items-center justify-center px-4 py-20">
      {/* Background accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--gold)]/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-2xl mx-auto text-center">
        {/* 404 Header */}
        <div className="relative inline-block mb-6">
          <h1 className="font-display text-[12rem] md:text-[16rem] text-white/5 font-light leading-none select-none tracking-tighter">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-3xl md:text-5xl text-white font-light tracking-wide bg-[#0A0A0A]/60 px-6 py-2 backdrop-blur-sm border border-white/10 rounded-full">
              Page Not Found
            </span>
          </div>
        </div>

        <p className="font-body text-white/60 text-lg mb-12 max-w-md mx-auto leading-relaxed">
          The page you're looking for doesn't exist, has been moved, or is temporarily unavailable.
        </p>

        {/* Action Cards */}
        <div className="grid sm:grid-cols-2 gap-4 max-w-lg mx-auto mb-12 text-left">
          {/* Call to Action */}
          <a 
            href="tel:+917814613916"
            className="group flex flex-col gap-2 p-6 bg-white/5 border border-white/10 hover:border-[var(--gold)]/50 rounded-xl transition-all duration-300 hover:bg-white/[0.07]"
          >
            <div className="w-10 h-10 rounded-full bg-[var(--gold)]/10 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
              <Phone size={18} className="text-[var(--gold)]" />
            </div>
            <h3 className="font-display text-xl text-white">Call Us Directly</h3>
            <p className="font-body text-sm text-white/50 leading-relaxed mb-2">
              Looking for a specific property in Mohali? Give us a call and we'll help you find it.
            </p>
            <span className="font-mono text-[var(--gold)] text-sm font-medium mt-auto flex items-center gap-2">
              +91 78146 13916 <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </a>

          {/* Return Home */}
          <Link 
            href="/"
            className="group flex flex-col gap-2 p-6 bg-white/5 border border-white/10 hover:border-white/30 rounded-xl transition-all duration-300 hover:bg-white/[0.07]"
          >
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
              <Home size={18} className="text-white" />
            </div>
            <h3 className="font-display text-xl text-white">Return Home</h3>
            <p className="font-body text-sm text-white/50 leading-relaxed mb-2">
              Head back to our homepage to explore our curated selection of luxury real estate.
            </p>
            <span className="font-body text-white/80 text-sm font-medium mt-auto flex items-center gap-2">
              Go to Homepage <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 font-body text-sm text-white/40">
          <Link href="/properties/flats" className="hover:text-[var(--gold)] transition-colors flex items-center gap-1.5">
            <MapPin size={14} /> Luxury Flats
          </Link>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <Link href="/properties/houses" className="hover:text-[var(--gold)] transition-colors flex items-center gap-1.5">
            <MapPin size={14} /> Premium Villas
          </Link>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <Link href="/properties/lands" className="hover:text-[var(--gold)] transition-colors flex items-center gap-1.5">
            <MapPin size={14} /> Commercial Land
          </Link>
        </div>
      </div>
    </div>
  );
}
