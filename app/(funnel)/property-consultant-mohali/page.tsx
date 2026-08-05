import { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { CheckCircle2, Phone, ShieldCheck, Calculator, MapPin, Globe, ArrowDown } from "lucide-react";
import { SmoothScrollButton } from "@/components/ui/SmoothScrollButton";

export const metadata: Metadata = {
  title: "Property Consultant in Mohali — Independent Advisory",
  description: "Independent property consultant in Mohali — not a property dealer. Honest advisory on flats, plots & NRI investments. Free 15-minute call.",
  alternates: {
    canonical: "https://realtyconsultants.in/property-consultant-mohali",
  }
};

export default function PropertyConsultantMohali() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What does a property consultant actually do?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A property consultant gives independent advice on a purchase, sale, or investment — verifying the developer, the RERA registration, and the payment structure, then telling you plainly whether a deal is worth it. That's different from a property dealer, who is typically paid a commission only when you buy, which shapes the advice you get."
        }
      },
      {
        "@type": "Question",
        "name": "How is this different from a property dealer or broker?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most property dealers in Mohali earn a commission on the sale, so their incentive is to close a deal. We're engaged for independent advice first — including telling a client to walk away from a deal, a pre-launch booking, or a plot that doesn't hold up under due diligence. We accept zero commissions from developers."
        }
      },
      {
        "@type": "Question",
        "name": "Do you charge a fee, and how does it work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. We charge a transparent flat fee based on the scope of the due diligence—never a percentage of the deal. We explain this structure plainly on the first call, before any work starts. There is no cost for the initial 15-minute consultation."
        }
      },
      {
        "@type": "Question",
        "name": "Can you help if I'm an NRI and can't visit Mohali in person?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. We handle remote due diligence, virtual site walkthroughs, and coordination with power-of-attorney holders, and we structure transactions to stay compliant with FEMA rules for NRI and OCI buyers."
        }
      },
      {
        "@type": "Question",
        "name": "Which areas of Mohali and the Tricity do you cover?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our advisory covers all of Mohali (Sahibzada Ajit Singh Nagar), including Aerocity, IT City, and the Sector 60–115 corridor, plus Zirakpur, Kharar, and Chandigarh."
        }
      },
      {
        "@type": "Question",
        "name": "How do I get started?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Call, WhatsApp, or use the form below with what you're looking at. We respond within 24 hours to set up a free 15-minute call."
        }
      }
    ]
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Realty Holding & Management Consultants",
    "image": "https://realtyconsultants.in/assets/logo-light-theme.svg",
    "description": "Independent property consultant in Mohali — not a property dealer. Honest advisory on flats, plots & NRI investments.",
    "telephone": "+917814613916",
    "email": "hello@realtyconsultants.in",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Phase 8A, E328, Industrial Area, Sector 75",
      "addressLocality": "SAS Nagar (Mohali)",
      "addressRegion": "Punjab",
      "postalCode": "160055",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "30.7046",
      "longitude": "76.7179"
    },
    "url": "https://realtyconsultants.in/property-consultant-mohali",
    "priceRange": "$$"
  };

  return (
    <div className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />

      {/* HERO SECTION - Editorial Style */}
      <section className="pt-20 pb-16 md:pt-32 md:pb-20 border-b border-border">
        <div className="container-site">
          <div className="max-w-4xl">
            <p className="text-gold font-medium tracking-wide uppercase text-sm mb-6 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-gold"></span>
              Property Consultant · Mohali & Tricity
            </p>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-medium text-charcoal tracking-tight mb-8 leading-[1.1]">
              Independent property advisory in Mohali.
            </h1>
            
            <p className="text-xl md:text-2xl text-muted font-body leading-relaxed max-w-3xl mb-12">
              We are an independent advisory — not a brokerage with inventory to move. For ten years, we have verified flats, plots, and NRI investments across Mohali before anyone signs.
            </p>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
              <SmoothScrollButton targetId="contact" size="lg" className="h-14 px-8 text-base rounded-xl shadow-lg">
                Book a free consultation
              </SmoothScrollButton>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 text-sm text-muted">
                <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> 10 Years Experience</span>
                <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> 180+ Transactions</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE PROBLEM / DIFFERENTIATION */}
      <section className="py-20 md:py-32">
        <div className="container-site">
          <div className="grid md:grid-cols-12 gap-12 md:gap-24">
            <div className="md:col-span-5">
              <h2 className="text-3xl md:text-5xl font-display font-medium text-charcoal mb-6 leading-tight sticky top-24">
                Most property consultants in Mohali are property dealers with a better title.
              </h2>
            </div>
            <div className="md:col-span-7 prose prose-lg text-charcoal/80">
              <p className="text-xl leading-relaxed mb-6">
                Search "property consultant Mohali" and almost everyone you find earns a commission only when you buy — so the incentive runs toward closing, not toward telling you the truth about a deal.
              </p>
              <p className="text-xl leading-relaxed mb-12">
                A consultant is supposed to work the other way around. We evaluate a property, a pre-launch booking, or a deal someone's rushing you to close — and tell you plainly what we'd do in your position. We accept zero backdoor channel-partner cuts. Sometimes our advice is "buy it." Sometimes it's "walk away," and we say that even when there's nothing in it for us.
              </p>
              
              <div className="space-y-12 mt-16">
                <div>
                  <h3 className="text-2xl font-display font-medium text-charcoal mb-3 flex items-center gap-3">
                    <span className="w-8 h-[1px] bg-border"></span>
                    Independent verification
                  </h3>
                  <p className="text-lg text-muted ml-11">
                    Developer track record, RERA registration status, and litigation history checked before you commit — not after.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-display font-medium text-charcoal mb-3 flex items-center gap-3">
                    <span className="w-8 h-[1px] bg-border"></span>
                    Payment-plan analysis
                  </h3>
                  <p className="text-lg text-muted ml-11">
                    What a construction-linked plan actually costs you in delay risk, not just the headline number.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-display font-medium text-charcoal mb-3 flex items-center gap-3">
                    <span className="w-8 h-[1px] bg-border"></span>
                    An honestly short shortlist
                  </h3>
                  <p className="text-lg text-muted ml-11">
                    Not every listing that fits your budget — only the ones that survive due diligence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CASE STUDY SECTION */}
      <section className="py-20 md:py-32 border-t border-border bg-gray-50/50">
        <div className="container-site">
          <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center">
            <div>
              <span className="text-gold font-mono text-sm uppercase tracking-widest mb-6 block">Case Study</span>
              <h2 className="text-3xl md:text-5xl font-display font-medium text-charcoal mb-6 leading-tight">
                The difference between a sales pitch and a due-diligence report.
              </h2>
            </div>
            <div>
              <p className="text-xl text-charcoal/80 leading-relaxed mb-6">
                Recently, we analyzed a luxury pre-launch in Aerocity for an NRI client. The headline price looked highly attractive, and local brokers were pushing for immediate booking. 
              </p>
              <p className="text-xl text-charcoal/80 leading-relaxed mb-6">
                Our payment-plan analysis revealed a severe delay risk buried in the fine print, and our developer background check flagged two stalled projects under a subsidiary name. We advised the client to walk away. 
              </p>
              <p className="text-xl text-charcoal/80 leading-relaxed">
                Six months later, the project remains stalled, and early buyers' funds are locked.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT / CTA (Moved up 2 sections down from Hero) */}
      <section id="contact" className="py-20 md:py-32 bg-white border-t border-border">
        <div className="container-site">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display font-medium text-charcoal mb-6">15 minutes. One honest answer.</h2>
              <p className="text-xl text-muted leading-relaxed">
                Tell us what you're looking at: a pre-launch, a plot, a reinvestment decision, a property you're not sure about. No pitch. No pressure.
              </p>
            </div>
            
            <div className="grid md:grid-cols-5 gap-12 bg-white rounded-3xl border border-border shadow-subtle p-6 md:p-10">
              
              {/* Form */}
              <div className="md:col-span-3">
                <form className="space-y-6" action="https://formspree.io/f/mqkopwvv" method="POST">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-charcoal">What are you looking at?</label>
                    <select name="project_type" className="w-full h-12 px-4 rounded-xl border border-border bg-transparent focus:outline-none focus:ring-2 focus:ring-charcoal focus:border-transparent transition-all text-charcoal">
                      <option>Flat / Apartment</option>
                      <option>Independent House</option>
                      <option>Land / Plot</option>
                      <option>Commercial Property</option>
                      <option>NRI Investment</option>
                      <option>Not sure yet</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-charcoal">How should we reach you?</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Phone', 'WhatsApp', 'Email'].map(method => (
                        <label key={method} className="flex items-center justify-center border border-border rounded-xl h-12 cursor-pointer hover:bg-gray-50 transition-colors has-[:checked]:bg-charcoal has-[:checked]:text-white has-[:checked]:border-charcoal">
                          <input type="radio" name="contact_method" value={method} className="sr-only" defaultChecked={method === 'Phone'} />
                          <span className="text-sm font-medium">{method}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-charcoal">Your details</label>
                    <input type="text" name="contact_detail" required className="w-full h-12 px-4 rounded-xl border border-border bg-transparent focus:outline-none focus:ring-2 focus:ring-charcoal focus:border-transparent transition-all text-charcoal" placeholder="Phone number or email" />
                  </div>
                  
                  <Button size="lg" className="w-full h-14 text-base mt-2 rounded-xl">
                    Book the consultation
                  </Button>
                </form>
              </div>

              {/* Direct Contact Info */}
              <div className="md:col-span-2 flex flex-col justify-center space-y-8 md:pl-8 md:border-l border-border">
                <a href="tel:+917814613916" className="flex items-start gap-4 group">
                  <div className="text-gold mt-1 group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted mb-1">Direct Line / WhatsApp</p>
                    <p className="font-medium text-charcoal group-hover:text-gold transition-colors">+91 7814613916</p>
                  </div>
                </a>
                
                <a href="mailto:hello@realtyconsultants.in" className="flex items-start gap-4 group">
                  <div className="text-gold mt-1 group-hover:scale-110 transition-transform">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted mb-1">Email</p>
                    <p className="font-medium text-charcoal group-hover:text-gold transition-colors">hello@realtyconsultants.in</p>
                  </div>
                </a>
                
                <div className="flex items-start gap-4">
                  <div className="text-gold mt-1">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted mb-1">Office Address</p>
                    <p className="text-charcoal leading-relaxed">Phase 8A, E328, Industrial Area<br/>Sector 75, SAS Nagar<br/>Punjab 160055</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="py-20 md:py-32 bg-gray-50 border-y border-border">
        <div className="container-site">
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-medium text-charcoal mb-4">Three ways we help</h2>
            <p className="text-xl text-muted">Depending on what you're solving for.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                num: "01",
                title: "Property Advisory",
                desc: "Independent evaluation of any property before you commit: developer track record, RERA verification, payment plan analysis, and honest shortlisting. We'll tell you what we'd do in your position, including when the answer is not to buy."
              },
              {
                num: "02",
                title: "Land & Plot Advisory",
                desc: "Title and chain-of-ownership checks, GMADA approval status, and zoning verification on residential and agricultural land across Mohali and the surrounding belt — before money changes hands, not after."
              },
              {
                num: "03",
                title: "NRI & Remote Advisory",
                desc: "Remote due diligence, virtual site walkthroughs, and FEMA-compliant transaction structuring for NRI and OCI buyers who can't be in Mohali in person to inspect a property themselves."
              }
            ].map((service, i) => (
              <div key={i} className="flex flex-col">
                <div className="text-sm font-mono text-gold mb-4 border-b border-border pb-4">SERVICE {service.num}</div>
                <h3 className="text-2xl font-display font-medium text-charcoal mb-4">{service.title}</h3>
                <p className="text-lg text-muted leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS / THE ADVISOR */}
      <section className="py-20 md:py-32">
        <div className="container-site">
          <div className="grid md:grid-cols-2 gap-16 md:gap-24">
            
            {/* Left: How it works */}
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-medium text-charcoal mb-12">From "I'm not sure" to a clear answer.</h2>
              
              <div className="space-y-8">
                {[
                  {
                    step: "1",
                    title: "Tell us what you're looking at",
                    desc: "A pre-launch, a plot, a reinvestment decision, or a deal you're being pressured to close."
                  },
                  {
                    step: "2",
                    title: "Free 15-minute call",
                    desc: "We ask the questions a dealer won't — about the developer, the structure, the timeline."
                  },
                  {
                    step: "3",
                    title: "Independent check",
                    desc: "RERA status, builder history, payment structure, and comparable pricing, verified."
                  },
                  {
                    step: "4",
                    title: "One honest answer",
                    desc: "Buy, wait, negotiate harder, or walk away. No pitch either way."
                  }
                ].map((step, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="shrink-0 w-8 h-8 rounded-full bg-charcoal/5 flex items-center justify-center text-sm font-medium text-charcoal">
                      {step.step}
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-charcoal mb-2">{step.title}</h3>
                      <p className="text-muted leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: The Advisor & Testimonials */}
            <div className="space-y-16">
              <div>
                <h4 className="text-xs font-mono text-muted uppercase tracking-wider mb-6">Who you'll actually talk to</h4>
                <h3 className="text-2xl font-display font-medium text-charcoal mb-2">Amritpal Singh</h3>
                <p className="text-sm text-muted italic mb-6">Lead Advisor, Realty Holding & Management Consultants</p>
                <p className="text-lg text-charcoal/80 leading-relaxed">
                  Amritpal has spent ten years inside Mohali's real estate market — on the development and government-liaison side first, then advising buyers directly. Every consultation is with the same person, not a rotating sales team, and every recommendation carries a personal reputation attached to it.
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono text-muted uppercase tracking-wider mb-6">Client Perspective</h4>
                <div className="space-y-8">
                  <blockquote className="border-l-2 border-gold pl-6">
                    <p className="text-lg italic text-charcoal mb-4">"Realty Holding provided a level of transparency I hadn't seen in the Mohali market. Their advice on GMADA plots saved us from a very expensive mistake."</p>
                    <footer className="text-sm text-muted"><strong>Rajesh Sharma</strong> — NRI Investor, Canada</footer>
                  </blockquote>
                  <blockquote className="border-l-2 border-gold pl-6">
                    <p className="text-lg italic text-charcoal mb-4">"The team's local expertise is unmatched. They found us an off-market villa in Sector 66 that was exactly what we were looking for, at a fair price."</p>
                    <footer className="text-sm text-muted"><strong>Sandeep Kaur</strong> — Homeowner</footer>
                  </blockquote>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-32 bg-gray-50 border-y border-border">
        <div className="container-site">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-display font-medium text-charcoal mb-12 text-center">Common questions</h2>
            
            <div className="space-y-8" itemScope itemType="https://schema.org/FAQPage">
              {[
                {
                  q: "What does a property consultant actually do?",
                  a: "A property consultant gives independent advice on a purchase, sale, or investment — verifying the developer, the RERA registration, and the payment structure, then telling you plainly whether a deal is worth it. That's different from a property dealer, who is typically paid a commission only when you buy, which shapes the advice you get."
                },
                {
                  q: "How is this different from a property dealer or broker?",
                  a: "Most property dealers in Mohali earn a commission on the sale, so their incentive is to close a deal. We're engaged for independent advice first — including telling a client to walk away from a deal, a pre-launch booking, or a plot that doesn't hold up under due diligence. We accept zero commissions from developers."
                },
                {
                  q: "Do you charge a fee, and how does it work?",
                  a: "Yes. We charge a transparent flat fee based on the scope of the due diligence—never a percentage of the deal. We explain this structure plainly on the first call, before any work starts. There is no cost for the initial 15-minute consultation."
                },
                {
                  q: "Can you help if I'm an NRI and can't visit Mohali in person?",
                  a: "Yes. We handle remote due diligence, virtual site walkthroughs, and coordination with power-of-attorney holders, and we structure transactions to stay compliant with FEMA rules for NRI and OCI buyers."
                },
                {
                  q: "Which areas of Mohali and the Tricity do you cover?",
                  a: "Our advisory covers all of Mohali (Sahibzada Ajit Singh Nagar), including Aerocity, IT City, and the Sector 60–115 corridor, plus Zirakpur, Kharar, and Chandigarh."
                },
                {
                  q: "How do I get started?",
                  a: "Call, WhatsApp, or use the form below with what you're looking at. We respond within 24 hours to set up a free 15-minute call."
                }
              ].map((faq, i) => (
                <div key={i} className="border-b border-border pb-8 last:border-0 last:pb-0" itemProp="mainEntity" itemScope itemType="https://schema.org/Question">
                  <h3 className="text-xl font-medium text-charcoal mb-3" itemProp="name">{faq.q}</h3>
                  <div itemProp="acceptedAnswer" itemScope itemType="https://schema.org/Answer">
                    <p className="text-muted leading-relaxed" itemProp="text">{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA BAND */}
      <section className="py-20 bg-white text-center border-b border-border">
        <div className="container-site">
          <h2 className="text-3xl md:text-4xl font-display font-medium text-charcoal mb-6">Ready for an honest answer?</h2>
          <SmoothScrollButton targetId="contact" size="lg" className="h-14 px-8 text-base rounded-xl shadow-lg">
            Book your free consultation
          </SmoothScrollButton>
        </div>
      </section>
    </div>
  );
}
