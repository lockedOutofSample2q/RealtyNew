"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Phone, Mail, MapPin, MessageCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { siteConfig } from "@/config/site";
import { contactSubjects } from "@/config/contact";
import FormSelect from "@/components/ui/FormSelect";

// Reusing leaflet map logic since Mapbox implies an interactive map.
const ContactMap = dynamic(() => import("@/components/ui/ContactMap"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-black/10" />
});

export default function ContactClient() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, name: `${form.firstName} ${form.lastName}`, source: "contact" }),
      });
      if (res.ok) {
        toast.success("Message sent! We'll be in touch soon.");
        setForm({ firstName: "", lastName: "", email: "", phone: "", subject: "", message: "" });
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full bg-transparent border-b border-black/10 text-black placeholder:text-black/40 font-body text-[15px] py-4 outline-none focus:border-black transition-colors";

  return (
    <div className="min-h-screen">
      {/* ── Hero Section ────────────────────────────────────────── */}
      <section className="bg-white text-black pt-[calc(var(--nav-height)+4rem)] pb-24 px-6 border-b border-black/5 relative overflow-hidden">
        <div className="container-site max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block border border-black/10 bg-black/5 rounded-full px-4 py-1.5 mb-8">
            <span className="font-body text-[13px] tracking-wide text-black/50 uppercase font-bold">Contact</span>
          </div>
          <h1 className="font-display text-4xl md:text-[56px] font-medium leading-[1.1] mb-6">
            Speak directly with an advisor.
          </h1>
          <p className="font-body text-black/60 text-lg max-w-2xl mx-auto leading-relaxed">
            Whether you are evaluating a specific property, deciding what to do with a land acquisition payout, or looking at Mohali from abroad: bring the question and get a direct answer.
          </p>
        </div>
      </section>

      {/* ── Contact Method Cards ────────────────────────────────── */}
      <section className="-mt-12 relative z-20 px-6">
        <div className="container-site max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <Phone size={24} className="text-black mb-4" strokeWidth={1.5} />,
              title: "Call Us",
              desc: "Speak directly with our team",
              val: siteConfig.contact.phone,
              href: `tel:${siteConfig.contact.phone}`,
            },
            {
              icon: <Mail size={24} className="text-black mb-4" strokeWidth={1.5} />,
              title: "Email Us",
              desc: "Get support via email",
              val: siteConfig.contact.email,
              href: `mailto:${siteConfig.contact.email}`,
            },
            {
              icon: <MapPin size={24} className="text-black mb-4" strokeWidth={1.5} />,
              title: "Visit Us",
              desc: "Drop by our office",
              val: siteConfig.contact.address,
              href: "#map",
            },
            {
              icon: <MessageCircle size={24} className="text-black mb-4" strokeWidth={1.5} />,
              title: "Live Chat",
              desc: "Available 9 AM - 6 PM",
              val: "Start Chat",
              href: "#",
            },
          ].map((c) => (
            <a
              key={c.title}
              href={c.href}
              className="bg-white border border-black/10 rounded-2xl p-8 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300"
            >
              {c.icon}
              <h3 className="font-body font-semibold text-lg text-black mb-1">{c.title}</h3>
              <p className="font-body text-sm text-black/50 mb-6">{c.desc}</p>
              <div className="font-body font-medium text-[15px] text-black">
                {c.val}
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ── Message Form Section ────────────────────────────────── */}
      <section className="py-24 px-6 bg-white">
        <div className="container-site max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Form */}
          <div className="flex-1">
            <h2 className="font-display text-4xl mb-10 text-black">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Your name"
                  required
                  value={form.firstName}
                  onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                  className={inputClass}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  required
                  value={form.lastName}
                  onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputClass}
                />
                <input
                  type="tel"
                  placeholder="Best number to reach you"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className={inputClass}
                />
              </div>
              <FormSelect
                label="Subject"
                value={form.subject}
                options={contactSubjects}
                onChange={(val) => setForm({ ...form, subject: val })}
                placeholder="How can we help?"
              />
              <div className="pt-2">
                <textarea
                  placeholder="What are you trying to decide?"
                  rows={4}
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={`${inputClass} resize-none`}
                />
              </div>
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-black text-white px-8 py-4 rounded-full font-body font-medium text-[15px] flex items-center gap-3 hover:scale-[1.02] transition-transform shadow-xl disabled:opacity-70 disabled:pointer-events-none"
                >
                  {loading ? "Sending..." : "Submit Enquiry"}
                  {!loading && <ArrowRight size={18} />}
                </button>
              </div>
            </form>
          </div>

          {/* Sidebar */}
          <div className="lg:w-[400px] shrink-0">
            <h3 className="font-display text-2xl mb-8 text-black">Explore</h3>
            <div className="space-y-4">
              <Link
                href="/list-your-property"
                className="group flex items-center justify-between p-6 bg-[#F8F8F8] hover:bg-black hover:text-white rounded-2xl transition-colors duration-300"
              >
                <div>
                  <h4 className="font-body font-semibold text-lg mb-1">List Your Property</h4>
                  <p className="font-body text-sm text-black/50 group-hover:text-white/60 transition-colors">Sell or rent with us</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-white group-hover:bg-white/20 flex items-center justify-center text-black group-hover:text-white transition-colors">
                  <ArrowRight size={18} />
                </div>
              </Link>
              <Link
                href="/tools/mortgage-calculator"
                className="group flex items-center justify-between p-6 bg-[#F8F8F8] hover:bg-black hover:text-white rounded-2xl transition-colors duration-300"
              >
                <div>
                  <h4 className="font-body font-semibold text-lg mb-1">Mortgage Calculator</h4>
                  <p className="font-body text-sm text-black/50 group-hover:text-white/60 transition-colors">Estimate your payments</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-white group-hover:bg-white/20 flex items-center justify-center text-black group-hover:text-white transition-colors">
                  <ArrowRight size={18} />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Map Section ────────────────────────────────────────── */}
      <section id="map" className="py-24 px-6 bg-[#F8F8F8]">
        <div className="container-site max-w-[1200px] mx-auto text-center mb-12">
          <h2 className="font-display text-4xl mb-4 text-black">Find Us Here</h2>
            <p className="font-body text-black/60">Visit our office in Mohali</p>
        </div>
        <div className="w-full max-w-[1200px] mx-auto h-[500px] rounded-[32px] overflow-hidden shadow-2xl relative border border-black/5 bg-[#F8F8F8]">
            <ContactMap />
          </div>
      </section>
    </div>
  );
}
