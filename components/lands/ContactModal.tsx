"use client";
import { useState } from "react";
import { X, Phone, User, Send, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import type { Property } from "@/types";

interface ContactModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ property, isOpen, onClose }: ContactModalProps) {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
  });

  if (!isOpen || !property) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          email: "land-enquiry@monter.in", // Placeholder email
          message: `Enquiry for Land: ${property.title}. Coordinates: ${property.latitude}, ${property.longitude}`,
          source: "land_listing",
          property_id: property.id
        }),
      });
      if (res.ok) {
        setSubmitted(true);
        toast.success("Enquiry sent!");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 transition-colors z-10"
        >
          <X size={18} />
        </button>

        {!submitted ? (
          <div className="p-8">
            <div className="mb-6">
              <span className="text-[10px] uppercase tracking-widest text-black/40 font-bold mb-2 block">Enquire Now</span>
              <h2 className="font-display text-2xl font-medium text-black">Interested in this Land?</h2>
              <p className="text-sm text-black/50 mt-2 line-clamp-2">
                {property.title}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30" />
                <input
                  type="text"
                  placeholder="Your Full Name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-black/5 border-none rounded-xl py-3.5 pl-11 pr-4 text-sm outline-none focus:ring-2 focus:ring-black/5 transition-all"
                />
              </div>

              <div className="relative">
                <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30" />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full bg-black/5 border-none rounded-xl py-3.5 pl-11 pr-4 text-sm outline-none focus:ring-2 focus:ring-black/5 transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-4 rounded-xl font-body font-medium text-sm flex items-center justify-center gap-2 hover:bg-charcoal transition-all shadow-lg shadow-black/10 disabled:opacity-50"
              >
                {loading ? "Sending..." : "Submit Interest"}
                {!loading && <Send size={14} />}
              </button>
            </form>
            
            <p className="text-[10px] text-center text-black/30 mt-6 uppercase tracking-wider">
              We usually respond within 24 hours
            </p>
          </div>
        ) : (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Send size={24} />
            </div>
            <h2 className="font-display text-2xl font-medium text-black mb-2">Thank You!</h2>
            <p className="text-black/50 text-sm leading-relaxed mb-8">
              We have received your enquiry. Our advisor will contact you shortly to provide more details about this location.
            </p>
            <button
              onClick={onClose}
              className="px-8 py-3 bg-black text-white rounded-full font-body font-medium text-sm inline-flex items-center gap-2"
            >
              Close <ArrowRight size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
