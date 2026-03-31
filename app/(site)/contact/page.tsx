// app/site/contact/page.tsx  →  /contact
import type { Metadata } from "next";
import ContactSection from "@/components/sections/ContactSection";
import { siteConfig } from "@/config/site";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description: "Talk to a Monter advisor. Free 15-minute consultation. No pitch — just straight answers about Dubai real estate.",
};

export default function ContactPage() {
  return (
    <div className="pt-[var(--nav-height)] min-h-screen bg-[#0D0D0D]">
      {/* Header */}
      <div className="border-b border-[rgba(201,168,76,0.08)]">
        <div className="container-site pt-16 pb-12">
          <span className="font-body text-xs tracking-widest uppercase text-[var(--gold)] mb-4 block">
            Get in Touch
          </span>
          <h1 className="font-display font-light text-white mb-4">
            Talk to an Advisor
          </h1>
          <p className="font-body text-white/50 max-w-xl leading-relaxed">
            Whether you have a specific property in mind or you're still figuring out the right move —
            a 15-minute call will give you clarity. No pitch. Just the answer.
          </p>
        </div>
      </div>

      {/* Contact details + form */}
      <ContactSection />

      {/* Office info */}
      <section className="section-padding border-t border-[rgba(201,168,76,0.08)] bg-[#080808]">
        <div className="container-site grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <Phone size={18} className="text-[var(--gold)]" />,
              label: "Phone",
              value: siteConfig.contact.phone,
              href: `tel:${siteConfig.contact.phone}`,
            },
            {
              icon: <Mail size={18} className="text-[var(--gold)]" />,
              label: "Email",
              value: siteConfig.contact.email,
              href: `mailto:${siteConfig.contact.email}`,
            },
            {
              icon: <MapPin size={18} className="text-[var(--gold)]" />,
              label: "Office",
              value: siteConfig.contact.address,
              href: null,
            },
            {
              icon: <Clock size={18} className="text-[var(--gold)]" />,
              label: "Hours",
              value: "Mon–Sat, 9am–7pm GST",
              href: null,
            },
          ].map((c) => (
            <div key={c.label}>
              <div className="mb-3">{c.icon}</div>
              <div className="font-body text-xs text-white/40 uppercase tracking-wide mb-1">{c.label}</div>
              {c.href ? (
                <a href={c.href} className="font-body text-sm text-white/70 hover:text-white transition-colors">
                  {c.value}
                </a>
              ) : (
                <p className="font-body text-sm text-white/70">{c.value}</p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
