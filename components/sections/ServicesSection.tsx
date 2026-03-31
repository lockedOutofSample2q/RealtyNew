// components/sections/ServicesSection.tsx
// EDIT services array in config/site.ts

import { Building2, Key, Palette, Sparkles } from "lucide-react";
import { services } from "@/config/site";

const ICONS: Record<string, React.ReactNode> = {
  building: <Building2 size={28} strokeWidth={1.2} />,
  key: <Key size={28} strokeWidth={1.2} />,
  palette: <Palette size={28} strokeWidth={1.2} />,
  sparkles: <Sparkles size={28} strokeWidth={1.2} />,
};

export default function ServicesSection() {
  return (
    <section className="section-padding bg-[#080808] relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-[var(--gold)] to-transparent opacity-40" />

      <div className="container-site">
        <div className="text-center mb-14">
          <span className="font-body text-xs tracking-widest uppercase text-[var(--gold)] mb-4 block">
            What We Do
          </span>
          <h2 className="font-display font-light text-white">Our Services</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[rgba(201,168,76,0.08)]">
          {services.map((service, i) => (
            <div
              key={service.title}
              className="bg-[#0D0D0D] p-8 hover:bg-[#141414] transition-colors group"
            >
              <div className="text-[var(--gold)] mb-6 group-hover:scale-110 transition-transform origin-left">
                {ICONS[service.icon] ?? <Building2 size={28} strokeWidth={1.2} />}
              </div>
              <h3 className="font-display text-xl text-white font-light mb-3">
                {service.title}
              </h3>
              <p className="font-body text-sm text-white/50 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
