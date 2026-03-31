"use client";
// components/sections/ContactSection.tsx

import { useState } from "react";
import { toast } from "sonner";
import { Send } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function ContactSection() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", message: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "contact" }),
      });
      if (res.ok) {
        toast.success("Message sent! We'll be in touch within 24 hours.");
        setForm({ name: "", email: "", phone: "", message: "" });
      } else {
        toast.error("Something went wrong. Please try WhatsApp instead.");
      }
    } catch {
      toast.error("Network error. Please try WhatsApp.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full bg-[#141414] border border-white/10 text-white placeholder:text-white/30 font-body text-sm px-4 py-3.5 outline-none focus:border-[var(--gold)] transition-colors";

  return (
    <section className="section-padding bg-[#080808]" id="contact">
      <div className="container-site grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left: copy */}
        <div className="lg:pt-4">
          <span className="font-body text-xs tracking-widest uppercase text-[var(--gold)] mb-5 block">
            Get in Touch
          </span>
          <h2 className="font-display font-light text-white mb-6">
            Let's create something<br />
            <em>exceptional</em> together.
          </h2>
          <p className="font-body text-white/55 leading-relaxed mb-10 max-w-md">
            Whether you're buying your first investment, relocating with family, or offloading an asset — we'll give you straight answers and zero pressure.
          </p>
          <div className="space-y-5">
            {[
              { label: "Phone", value: siteConfig.contact.phone, href: `tel:${siteConfig.contact.phone}` },
              { label: "Email", value: siteConfig.contact.email, href: `mailto:${siteConfig.contact.email}` },
              { label: "WhatsApp", value: "Message us directly", href: `https://wa.me/${siteConfig.contact.whatsapp}` },
            ].map((c) => (
              <div key={c.label} className="flex items-center gap-4">
                <span className="font-body text-xs text-[var(--gold)] uppercase tracking-widest w-20">
                  {c.label}
                </span>
                <a
                  href={c.href}
                  target={c.href.startsWith("https") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="font-body text-sm text-white/70 hover:text-white transition-colors"
                >
                  {c.value}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Right: form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Your Name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={inputClass}
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className={inputClass}
            />
          </div>
          <input
            type="email"
            placeholder="Email Address"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={inputClass}
          />
          <textarea
            placeholder="What are you looking for? (optional)"
            rows={5}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className={`${inputClass} resize-none`}
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-4 bg-[var(--gold)] text-black font-body font-medium text-sm tracking-wide hover:bg-[var(--gold-light)] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <Send size={16} />
            {loading ? "Sending..." : "Send Message"}
          </button>
          <p className="font-body text-xs text-white/30 text-center">
            We respond within 24 hours, usually within the hour.
          </p>
        </form>
      </div>
    </section>
  );
}
