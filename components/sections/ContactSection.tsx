"use client";
import { useState } from "react";
import { toast } from "sonner";
import { siteConfig } from "@/config/site";
import { contactContent, projectTypes, contactMethods, contactTimes } from "@/config/contact";
import { motion } from "framer-motion";
import { Mail, Phone, MessageCircle, Sun, Clock, Moon } from "lucide-react";

// Icon map — keeps JSX out of the config file
const METHOD_ICONS: Record<string, React.ReactNode> = {
  "mail":           <Mail size={14} strokeWidth={1.5} />,
  "phone":          <Phone size={14} strokeWidth={1.5} />,
  "message-circle": <MessageCircle size={14} strokeWidth={1.5} />,
};

const TIME_ICONS: Record<string, React.ReactNode> = {
  "sun":   <Sun size={13} strokeWidth={1.5} />,
  "moon":  <Moon size={13} strokeWidth={1.5} />,
  "clock": <Clock size={13} strokeWidth={1.5} />,
};

export default function ContactSection() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "",
    contactMethod: "",
    preferredTime: "",
    message: "",
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
        setForm({ name: "", email: "", company: "", projectType: "", contactMethod: "", preferredTime: "", message: "" });
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
    "w-full bg-transparent border-b border-gray-200 text-black placeholder:text-gray-400 font-body text-[15px] py-3.5 outline-none focus:border-gray-500 transition-colors";

  return (
    <section className="section-padding bg-[#F5F5F7]" id="contact">
      <div className="container-site grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

        {/* Left: copy */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:pt-8 lg:sticky lg:top-32"
        >
          <h2 className="font-display font-medium text-black text-4xl md:text-[56px] leading-[1.1] mb-8 tracking-tight whitespace-pre-line">
            {contactContent.heading}
          </h2>
          <p className="font-body text-gray-500 leading-relaxed mb-12 max-w-md text-lg">
            {contactContent.subheading}
          </p>

          <div className="flex flex-col gap-6 font-body">
            <div>
              <div className="text-gray-400 mb-1 tracking-widest uppercase text-xs font-bold">Call us</div>
              <a href={`tel:${siteConfig.contact.phone}`} className="text-black font-medium text-lg hover:text-gray-600 transition-colors">
                {siteConfig.contact.phone}
              </a>
            </div>
            <div>
              <div className="text-gray-400 mb-1 tracking-widest uppercase text-xs font-bold">Email us</div>
              <a href={`mailto:${siteConfig.contact.email}`} className="text-black font-medium text-lg hover:text-gray-600 transition-colors">
                {siteConfig.contact.email}
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right: form card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="bg-white rounded-[28px] p-8 md:p-10 shadow-[0_4px_32px_rgba(0,0,0,0.06)] border border-black/[0.04]"
        >
          {/* Card header */}
          <div className="mb-8">
            <p className="font-body text-[11px] font-bold tracking-[0.18em] uppercase text-black/50 mb-2">
              GET IN TOUCH
            </p>
            <div className="w-10 h-[1.5px] bg-black/20" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-7">

            {/* Row 1: Name + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Name *"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputClass}
              />
              <input
                type="email"
                placeholder="Email *"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={inputClass}
              />
            </div>

            {/* Row 2: Company + Project Type dropdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Company (optional)"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                className={inputClass}
              />
              <div className="relative">
                <label className="block font-body text-[11px] text-gray-400 mb-0.5 tracking-wide">
                  Project Type *
                </label>
                <div className="relative">
                  <select
                    required
                    value={form.projectType}
                    onChange={(e) => setForm({ ...form, projectType: e.target.value })}
                    className="w-full bg-transparent border-b border-gray-200 text-black font-body text-[15px] py-3.5 outline-none focus:border-gray-500 transition-colors appearance-none cursor-pointer pr-8"
                  >
                    <option value="" disabled>Select Project Type</option>
                    {projectTypes.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  {/* Chevron */}
                  <div className="absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    <svg width="12" height="7" viewBox="0 0 12 7" fill="none">
                      <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Method */}
            <div>
              <p className="font-body text-[13px] text-gray-500 mb-3">
                How would you like to be contacted? *
              </p>
              <div className="flex flex-wrap gap-2.5">
                {contactMethods.map(({ label, icon }) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setForm({ ...form, contactMethod: label })}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-body text-[13px] font-medium transition-all border ${
                      form.contactMethod === label
                        ? "border-black/30 bg-black/[0.04] text-black"
                        : "border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:text-black"
                    }`}
                  >
                    <span className="text-gray-400">{METHOD_ICONS[icon]}</span>
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Preferred Contact Time */}
            <div>
              <p className="font-body text-[13px] text-gray-500 mb-3">
                Preferred contact time (optional)
              </p>
              <div className="flex flex-wrap gap-2.5">
                {contactTimes.map(({ label, icon }) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setForm({ ...form, preferredTime: label })}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-body text-[13px] font-medium transition-all border ${
                      form.preferredTime === label
                        ? "border-black/30 bg-black/[0.04] text-black"
                        : "border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:text-black"
                    }`}
                  >
                    <span className="text-gray-400">{TIME_ICONS[icon]}</span>
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Message */}
            <div className="pt-2">
              <textarea
                placeholder="Tell us about your project *"
                rows={4}
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={`${inputClass} resize-none`}
              />
            </div>

            {/* Footer: indicator + submit */}
            <div className="pt-4 flex items-center justify-between gap-4">
              {/* Glowing green dot */}
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                </span>
                <span className="font-body text-[13px] text-gray-500">
                  {contactContent.responseNote}
                </span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-3 py-3.5 px-8 bg-[#7A7A75] text-white rounded-2xl font-body font-medium text-[14px] hover:bg-[#6A6A65] transition-colors disabled:opacity-60 disabled:cursor-not-allowed shadow-md shrink-0"
              >
                {loading ? contactContent.submittingLabel : contactContent.submitLabel}
                {!loading && (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="opacity-80">
                    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
