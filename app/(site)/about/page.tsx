// app/site/about/page.tsx
// ============================================================
// ABOUT PAGE
// Premium architectural layout matching the brand's aesthetic
// ============================================================

import AboutHero from "@/components/sections/AboutHero";
import AboutStats from "@/components/sections/AboutStats";
import AboutText from "@/components/sections/AboutText";
import AboutProcess from "@/components/sections/AboutProcess";
import AboutLeadership from "@/components/sections/AboutLeadership";
import { siteConfig } from "@/config/site";
import { CheckCircle2, MapPin, Phone, Mail, Globe } from "lucide-react";

export const metadata = {
  title: "About Our Advisory | Realty Holding & Management Consultants",
  description: "Amritpal Singh founded Realty Holding & Management Consultants after a career that placed him on every side of the real estate transaction in Mohali.",
  alternates: {
    canonical: `${siteConfig.url}/about`,
  },
};

export default function AboutPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${siteConfig.url}/about/#webpage`,
        "url": `${siteConfig.url}/about`,
        "name": "About | Realty Holding & Management Consultants",
        "description": "Amritpal Singh founded Realty Holding & Management Consultants after a career that placed him on every side of the real estate transaction.",
        "inLanguage": "en-IN"
      },
      {
        "@type": "Person",
        "@id": `${siteConfig.url}/about#amritpal-singh`,
        "name": "Amritpal Singh",
        "jobTitle": "Founder and Principal Consultant",
        "url": `${siteConfig.url}/about`,
        "worksFor": { "@id": `${siteConfig.url}/#organization` },
        "description": "Amritpal Singh founded Realty Holding & Management Consultants after a career that placed him on every side of the real estate transaction.",
        "knowsAbout": [
          "Property documentation India",
          "GMADA plot allotment and transfer",
          "PUDA colony licensing and CLU",
          "RERA Punjab compliance",
          "Punjab land records and mutation",
          "Real estate investment advisory"
        ],
        "hasCredential": [
          {
            "@type": "EducationalOccupationalCredential",
            "credentialCategory": "certification",
            "name": "AMFI Certification, Association of Mutual Funds in India"
          },
          {
            "@type": "EducationalOccupationalCredential",
            "credentialCategory": "certification",
            "name": "NCFM Certification, Capital Markets and Derivatives, NSE Academy"
          },
          {
            "@type": "EducationalOccupationalCredential",
            "credentialCategory": "degree",
            "name": "Post Graduate, Advertising and Public Relations"
          }
        ]
      },
      {
        "@type": "RealEstateAgent",
        "@id": `${siteConfig.url}/#organization`,
        "name": "Realty Holding & Management Consultants",
        "url": siteConfig.url,
        "email": "info@realtyconsultants.in",
        "telephone": "+91-7814613916",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "E328, Phase 8A, Industrial Area",
          "addressLocality": "Mohali",
          "addressRegion": "Punjab",
          "postalCode": "160055",
          "addressCountry": "IN"
        },
        "areaServed": [
          { "@type": "City", "name": "Mohali" },
          { "@type": "City", "name": "Rajpura" },
          { "@type": "City", "name": "Dera Bassi" },
          { "@type": "City", "name": "Lalru" },
          { "@type": "City", "name": "Banur" },
          { "@type": "City", "name": "Shamboo" }
        ],
        "founder": { "@id": `${siteConfig.url}/about#amritpal-singh` }
      }
    ]
  };

  const credentials = [
    "10+ years across real estate development, government liaisoning, capital markets and media",
    "180+ transactions personally closed, across all six property categories",
    "AMFI certified, Association of Mutual Funds in India",
    "NCFM certified, Capital Markets and Derivatives, NSE Academy",
    "Post Graduate, Advertising and Public Relations",
    "Director and Sales Head of a RERA-approved private limited company",
    "Direct liaisoning experience with GMADA, PUDA, PSPCL, Municipal Committee, Forest and Conservation Authorities, and the Industrial Departments of Punjab",
    "Editor of an RNIS-registered fortnightly newspaper, English and Hindi editions"
  ];

  const serviceAreas = ["Mohali", "Rajpura", "Dera Bassi", "Lalru", "Banur", "Shamboo"];

  return (
    <article className="bg-black min-h-screen">
      <p className="sr-only">About Realty Holding & Management Consultants in Mohali</p>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <AboutHero />
      <AboutStats />
      
      {/* Verbatim Founder Bio & Credentials Section */}
      <section className="bg-[#0a0a0a] border-t border-white/10 py-20 text-white">
        <div className="container-site max-w-5xl mx-auto px-4">
          <div className="mb-12">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#9a6b2f] border border-[#9a6b2f]/30 px-4 py-1.5 rounded-full bg-[#9a6b2f]/10">
              Founder & Principal Advisor
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-medium text-white mt-6 mb-8">
              Amritpal Singh
            </h2>
            <p className="text-white/80 text-lg md:text-xl font-light leading-relaxed mb-12">
              Amritpal Singh founded Realty Holding & Management Consultants after a career that placed him on every side of the real estate transaction. He has worked as a consultant, built projects as a developer, navigated five Punjab government regulatory bodies to obtain project approvals (PUDA, PSPCL, Forest Department, Municipal Committee, and Industrial Departments), and personally resolved property disputes ranging from builder-buyer conflicts and title disputes to municipal tax disagreements. He holds AMFI and NCFM certifications in capital markets and derivatives, a postgraduate qualification in Advertising and Public Relations, and has worked as a newspaper editor and insurance professional. He has personally closed 180+ transactions across all property categories across Mohali, Chandigarh, Panchkula, Banga, and Anandpur Sahib.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-8 border-t border-white/10">
            {/* Structured Credentials List */}
            <div>
              <h3 className="text-xl font-display font-semibold text-white mb-6">
                Verified Professional Credentials
              </h3>
              <ul className="space-y-4">
                {credentials.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-white/70">
                    <CheckCircle2 size={18} className="text-[#9a6b2f] shrink-0 mt-1" />
                    <span className="text-sm md:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* NAP Block & Service Areas */}
            <div className="bg-white/5 p-8 rounded-2xl border border-white/10 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-display font-semibold text-white mb-6">
                  Firm Contact & Office (NAP)
                </h3>
                <address className="not-italic space-y-4 text-white/80 text-sm md:text-base mb-8">
                  <div className="font-semibold text-white text-lg">Realty Holding & Management Consultants</div>
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="text-[#9a6b2f] shrink-0 mt-1" />
                    <span>E328, Phase 8A, Industrial Area, Mohali, Punjab</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={18} className="text-[#9a6b2f] shrink-0" />
                    <span>+91 78146 13916</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail size={18} className="text-[#9a6b2f] shrink-0" />
                    <span>info@realtyconsultants.in</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe size={18} className="text-[#9a6b2f] shrink-0" />
                    <span>https://realtyconsultants.in</span>
                  </div>
                </address>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-widest text-[#9a6b2f] font-bold mb-3">Primary Service Areas</h4>
                <div className="flex flex-wrap gap-2">
                  {serviceAreas.map((area) => (
                    <span key={area} className="px-3 py-1 bg-white/10 text-white/90 rounded-full text-xs font-medium border border-white/10">
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AboutText />
      <AboutProcess />
      <AboutLeadership />
    </article>
  );
}

