import type { Metadata } from "next";
import { faqs } from "@/config/site";
import { ChevronDown } from "lucide-react";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Realty Holding & Management Consultants",
  description: "Find answers to common questions about real estate investment, property buying process, and transparency in Mohali.",
};

export default function FaqPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="pt-[var(--nav-height)] min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* Hero */}
      <div className="bg-white py-24 text-black border-b border-black/10">
        <div className="container-site">
          <h1 className="text-5xl md:text-7xl font-display font-semibold mb-6">FAQ</h1>
          <p className="text-xl text-black/60 max-w-2xl">
            Everything you need to know about investing in Mohali real estate.
          </p>
        </div>
      </div>

      {/* FAQ List */}
      <div className="container-site py-24">
        <div className="max-w-3xl">
          <div className="space-y-12">
            {faqs.map((faq, i) => (
              <div key={i} className="group border-b border-black/10 pb-12 last:border-0">
                <h3 className="text-2xl font-display font-medium mb-6 flex items-start justify-between gap-4">
                  {faq.question}
                </h3>
                <p className="text-lg text-black/60 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-black/5 py-24">
        <div className="container-site text-center">
          <h2 className="text-3xl md:text-5xl font-display font-medium mb-8">Still have questions?</h2>
          <p className="text-xl text-black/60 mb-12 max-w-xl mx-auto">
            Contact our advisors for personalized investment guidance and property advice.
          </p>
          <a
            href="/contact"
            className="inline-block bg-charcoal text-white px-12 py-5 rounded-full font-body font-bold uppercase tracking-widest text-sm hover:bg-black transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  );
}
