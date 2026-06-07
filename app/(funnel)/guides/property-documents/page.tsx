import { Metadata } from "next";
import LeadMagnetClient from "./LeadMagnetClient";
import { Suspense } from "react";
import { siteConfig } from "@/config/site";

const PAGE_URL = `${siteConfig.url}/guides/property-documents`;

export const metadata: Metadata = {
  title: "Property Document Checklist for Mohali Buyers | Realty Consultants",
  description: "Most Mohali buyers skip 6 of these 14 documents. One missed document is all it takes to lose your booking amount, your possession, or your title. Get the free checklist.",
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "Property Document Checklist for Mohali Buyers | Realty Consultants",
    description: "Most Mohali buyers skip 6 of these 14 documents. One missed document is all it takes. Get the free verification checklist.",
    url: PAGE_URL,
    type: "article",
    images: [
      {
        url: `${siteConfig.url}/assets/images/guides/checklist-mockup.webp`,
        width: 1200,
        height: 630,
        alt: "Property Document Checklist — Mohali",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Property Document Checklist — Mohali",
    description: "Most Mohali buyers skip 6 of these 14 documents. One missed document is all it takes. Free checklist.",
    images: [`${siteConfig.url}/assets/images/guides/checklist-mockup.webp`],
  },
};

const FormSkeleton = () => (
  <div className="w-full bg-white border border-charcoal/10 rounded-3xl p-8 space-y-6 animate-pulse shadow-sm">
    <div className="flex justify-between items-center mb-6">
      <div className="w-20 h-4 bg-charcoal/10 rounded"></div>
      <div className="w-16 h-1 bg-charcoal/10 rounded"></div>
      <div className="w-20 h-4 bg-charcoal/10 rounded"></div>
    </div>
    <div className="space-y-4">
      <div className="w-32 h-6 bg-charcoal/15 rounded"></div>
      <div className="w-48 h-4 bg-charcoal/10 rounded"></div>
    </div>
    <div className="space-y-2 pt-4">
      <div className="w-full h-12 bg-charcoal/5 rounded-full"></div>
    </div>
    <div className="w-full h-16 bg-charcoal/10 rounded-full mt-6"></div>
  </div>
);

export default function PropertyDocumentsPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What documents are required to buy a flat in Mohali?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To buy a flat or plot in Mohali, you must verify: Title Deed or Conveyance Deed (issued by governing authority or revenue department), Sale Deed, Mother Deed (chain of ownership from original owner to current seller), Encumbrance Certificate for 30 years (confirms no mortgages, loans, or litigation), Tax Receipts (property tax, electricity, municipal and water charges), Building Plan Approval from the relevant local authority, Occupancy Certificate (for builder properties, issued by Municipal Authority or Town Planning Department), Completion Certificate (for built-up properties, issued after construction matches approved plan), No Objection Certificates from relevant authorities, No Due Certificate (NDC), Permission to Sell (for government authority properties), Agreement to Sell on stamp paper of Rs. 4000, Allotment Letter (for builder properties, outlines property details, price, payment schedule), and registered Sale Deed executed at the Tehsildar or Revenue Officer's office with applicable stamp duty."
        }
      },
      {
        "@type": "Question",
        "name": "What is a Mother Deed in property documents?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A Mother Deed is a document that records the complete chain of ownership of a property from the original owner to the current seller. It is essential to verify that no link in this chain is missing or unregistered, as any break in the chain can create a title defect that affects your ability to resell or mortgage the property."
        }
      },
      {
        "@type": "Question",
        "name": "What is an Encumbrance Certificate and why is it required in Mohali?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "An Encumbrance Certificate (EC) is issued by the revenue department and confirms that a property is free from any monetary or legal liabilities such as mortgages, loans, or litigation. For properties in Mohali, it is obtained from the Sub-Registrar's office or via igrpunjab.gov.in and should cover the last 30 years. Any entry in the EC means the property carries a financial or legal liability that must be resolved before you purchase."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between Occupancy Certificate and Completion Certificate in Punjab?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Occupancy Certificate (OC) is applicable when buying from a builder and is issued by the local Municipal Authority or Department of Town Planning upon completion of construction. It certifies the building is fit for occupation. The Completion Certificate (CC) is issued by local authorities after construction of a built-up property is completed as per the approved plan. Under RERA, a developer cannot issue a valid possession letter without an OC. Without OC, utility connections (electricity, water) and home loan disbursements may be refused."
        }
      },
      {
        "@type": "Question",
        "name": "What is a No Objection Certificate (NOC) required for in Mohali real estate?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A No Objection Certificate (NOC) is usually required when buying from a government authority, cooperative society, or a builder. It confirms that the issuing body has no objection to the transfer or sale of the property. A No Due Certificate (NDC) confirms all dues to the authority are cleared. Both are required to complete a clean transfer in Mohali, especially for GMADA or PUDA properties."
        }
      },
      {
        "@type": "Question",
        "name": "What is an Agreement to Sell and why must it be on stamp paper?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Agreement to Sell is a legal document that defines all terms of the property transaction including price, size, facing, road size, location, payment schedule, possession date, and conditions for the final sale deed. In Punjab it must be executed on stamp paper of Rs. 4000. It ensures all essential aspects of the sale are documented before the final registered Sale Deed is executed at the Tehsildar or Revenue Officer's office."
        }
      },
      {
        "@type": "Question",
        "name": "What is stamp duty for property in Mohali Punjab in 2025–26?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Stamp duty for property in Mohali (Punjab) is 7% for male buyers and 5% for female buyers of the higher of the circle rate or agreement value. Registration charge is 1% for all buyers. The Sale Deed is executed at the office of the Tehsildar or Revenue Officer after payment of applicable stamp duty."
        }
      },
      {
        "@type": "Question",
        "name": "What is a Permission to Sell document in Punjab real estate?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A Permission to Sell is a document required specifically when buying property from a government authority such as GMADA or PUDA. It confirms the authority has granted permission for the current owner to sell the property to a buyer. Without it, the transfer cannot be legally completed."
        }
      }
    ]
  };

  const webpageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Property Document Checklist for Mohali Buyers",
    "description": "A gated document verification checklist for buyers purchasing flats, plots, or builder floors in Mohali, Chandigarh, or Panchkula (Tricity, Punjab).",
    "url": PAGE_URL,
    "author": {
      "@type": "Person",
      "name": "Amritpal Singh",
      "jobTitle": "Property Consultant",
      "telephone": "+917814613916",
      "worksFor": {
        "@type": "Organization",
        "name": "Realty Consultants",
        "url": siteConfig.url
      }
    }
  };

  return (
    <main className="bg-white text-charcoal min-h-screen pt-24 pb-16">
      {/* Schema Markups */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageJsonLd) }}
      />

      <div className="container-site max-w-6xl mx-auto px-4">
        {/* Eyebrow and Main Header Section */}
        <div className="max-w-4xl mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-charcoal/5 text-charcoal/60 text-xs font-mono tracking-widest uppercase font-semibold mb-4">
            Free Resource · Mohali Property Buyers
          </span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-tight text-charcoal mb-6">
            Most Buyers Skip at Least 6 of These 14 Documents. <br />
            <span className="text-charcoal/80">One Missed Document Is All It Takes.</span>
          </h1>
          <p className="font-body text-lg sm:text-xl text-charcoal/60 leading-relaxed max-w-3xl">
            Not to lose money. Not to regret later. To lose the flat, the booking amount, or the legal right to the property you already paid for.
          </p>
        </div>

        {/* Two Column Layout (PAS content & Sticky Form) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Visual copy */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* Pain Section */}
            <section className="prose max-w-none">
              <h2 className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-charcoal mb-4">
                It Happens More Often Than Anyone Talks About
              </h2>
              <div className="font-body text-base text-charcoal/70 leading-relaxed space-y-4">
                <p>
                  A buyer in Mohali pays the booking amount. Signs the agreement. Starts telling people about the new flat.
                </p>
                <p>
                  Then, weeks or months later, one of these things happens:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>The bank refuses the home loan because one approval is missing.</li>
                  <li>The builder cannot hand over possession because a certificate was never obtained.</li>
                  <li>The resale three years later falls through because the title has a defect that was there from day one.</li>
                  <li>The property tax dues from a previous owner appear as your liability after registration.</li>
                </ul>
                <p>
                  None of these buyers thought they were being careless. They asked questions. They trusted the agent. They checked what they knew to check.
                </p>
                <p>
                  The problem is not carelessness. The problem is not knowing which documents exist, what each one actually confirms, and which ones a seller or developer can legally skip until it is too late for you to walk away.
                </p>
              </div>
            </section>

            {/* Agitation Section */}
            <section className="prose max-w-none">
              <h2 className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-charcoal mb-4">
                The Document You Did Not Know to Ask for Is the Most Dangerous One
              </h2>
              <div className="font-body text-base text-charcoal/70 leading-relaxed space-y-4">
                <p>
                  There are documents in this checklist that most buyers in Mohali have never heard of.
                </p>
                <p>
                  Not because they are rare. Because no one in the transaction has an incentive to tell you about them.
                </p>
                <p>
                  The agent wants the deal to close. The developer wants the booking amount in the bank. The seller wants to move on.
                </p>
                <p>
                  You are the only person in the room whose interest is in knowing everything before you sign anything.
                </p>
                <p>
                  One of these documents tracks the property's ownership all the way back to the original owner. If there is a gap in that chain, you can pay in full, get possession, and still have someone with a legal claim appear years later.
                </p>
                <p>
                  One of them determines whether your electricity connection will be sanctioned after you move in.
                </p>
                <p>
                  One of them is mandatory for your home loan disbursement, and some builders in Mohali are handing over flats without it right now.
                </p>
                <p>
                  One of them must be on a specific stamp paper value in Punjab, and a verbal agreement without it gives you almost no legal protection if the developer defaults.
                </p>
                <p>
                  You do not need to become a legal expert. You need a list of exactly what to ask for, what each document confirms, and what it means if it is missing.
                </p>
                <p>
                  That is what this checklist is.
                </p>
              </div>
            </section>

            {/* Tease Section */}
            <section className="prose max-w-none">
              <h2 className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-charcoal mb-4">
                What Is in the Checklist
              </h2>
              <div className="font-body text-base text-charcoal/70 leading-relaxed space-y-4">
                <p>
                  Fourteen documents. Each one described in plain language: what it is, who issues it, and why it matters specifically for buyers in Mohali, Chandigarh, and Panchkula.
                </p>
                <p>
                  It covers the documents required for:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Buying from a builder (under-construction and ready-to-move)</li>
                  <li>Buying from a private seller (resale flat or floor)</li>
                  <li>Buying from a government authority</li>
                </ul>
                <p>
                  It includes the one document most buyers never ask for, that a developer with an outstanding construction loan is hoping you forget.
                </p>
                <p>
                  And it includes the alert that Amritpal Singh gives every client before they sign anything: <strong>before buying any property — from a government body, a builder, or a private seller — all documents must be seen and verified.</strong> Not promised. Not shown as copies. Seen and verified.
                </p>
                <p>
                  Enter your name and WhatsApp number. The checklist is sent to you instantly.
                </p>
              </div>
            </section>

          </div>

          {/* Right Column: Sticky Form Checkout Card */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="bg-white border border-charcoal/10 rounded-[32px] p-8 shadow-sm">
              <Suspense fallback={<FormSkeleton />}>
                <LeadMagnetClient />
              </Suspense>
            </div>
          </div>

        </div>

        {/* Divider line */}
        <hr className="my-16 border-charcoal/10" />

        {/* Why Document Verification Goes Wrong Section */}
        <section className="max-w-4xl mb-16">
          <h2 className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-charcoal mb-8">
            Why Document Verification Goes Wrong in Mohali
          </h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="font-display text-xl font-medium text-charcoal mb-2">
                Buyers do not know what they do not know
              </h3>
              <p className="font-body text-base text-charcoal/70 leading-relaxed">
                The most common failure is not skipping a document that was on a list. It is not knowing the document exists at all. Mohali's real estate market spans GMADA-licensed plots, PUDA-approved colonies, builder floors, and private developments, each governed by different authorities with different approval chains. A document required for a GMADA plot transfer is not the same as what you need for a builder flat in a licensed colony. The checklist maps this clearly.
              </p>
            </div>

            <div>
              <h3 className="font-display text-xl font-medium text-charcoal mb-2">
                Sellers and developers are not required to tell you what to check
              </h3>
              <p className="font-body text-base text-charcoal/70 leading-relaxed">
                Nothing in any transaction legally obligates the other side to hand you a complete document list. Due diligence is the buyer's responsibility. The checklist removes the information gap.
              </p>
            </div>

            <div>
              <h3 className="font-display text-xl font-medium text-charcoal mb-2">
                By the time the problem appears, it is too late to walk away cleanly
              </h3>
              <p className="font-body text-base text-charcoal/70 leading-relaxed">
                Title defects, missing certificates, and unpaid dues almost never surface before you pay. They appear at registration, at possession, or at the point of resale. At that stage, recovering your money requires legal action that takes years and costs more than the verification would have. The checklist takes thirty minutes to work through. A property dispute takes years.
              </p>
            </div>
          </div>
        </section>

        {/* About Amritpal Singh Section */}
        <section className="max-w-4xl mb-16 bg-white border border-charcoal/5 rounded-[32px] p-8 md:p-12 shadow-sm">
          <h2 className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-charcoal mb-4">
            About Amritpal Singh
          </h2>
          <p className="font-body text-base text-charcoal/70 leading-relaxed mb-6">
            Amritpal Singh has personally closed 180+ transactions across all property categories in Mohali, Chandigarh, Panchkula, Banga, and Anandpur Sahib. Over ten years he has worked as a property consultant, a developer, and a government liaisoning agent across GMADA, PUDA, PSPCL, the Municipal Committee, and Forest and Conservation Authorities. He has navigated builder-buyer disputes, property tax resolution for multi-floor buildings, title disputes, and plot cancellation and recovery cases.
          </p>
          <p className="font-body text-base text-charcoal/70 leading-relaxed mb-8">
            AMFI certified. NCFM (Capital Markets and Derivatives) certified.
          </p>
          <div>
            <p className="font-body text-sm text-charcoal/50 mb-2">Have a specific question about a property you are evaluating?</p>
            <a 
              href="https://wa.me/917814613916" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-4 bg-charcoal text-white rounded-full font-mono text-sm tracking-wider uppercase font-bold hover:bg-charcoal/90 transition-colors"
            >
              WhatsApp Amritpal Directly →
            </a>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-4xl">
          <h2 className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-charcoal mb-8">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-4">
            <details className="group border-b border-charcoal/10 pb-4 cursor-pointer outline-none">
              <summary className="flex justify-between items-center font-display text-lg font-medium text-charcoal select-none list-none [&::-webkit-details-marker]:hidden">
                <span>What documents are required to buy a flat in Mohali?</span>
                <span className="w-5 h-5 flex items-center justify-center text-charcoal/50 font-mono text-xl transition-transform duration-300 group-open:rotate-45">+</span>
              </summary>
              <div className="pt-4 font-body text-base text-charcoal/70 leading-relaxed">
                There are 14 documents to verify. The checklist above covers each one in plain language with context specific to Mohali, Chandigarh, and Panchkula buyers. Enter your WhatsApp number above to receive it instantly.
              </div>
            </details>

            <details className="group border-b border-charcoal/10 pb-4 cursor-pointer outline-none">
              <summary className="flex justify-between items-center font-display text-lg font-medium text-charcoal select-none list-none [&::-webkit-details-marker]:hidden">
                <span>Is this checklist relevant for GMADA plots as well as builder flats?</span>
                <span className="w-5 h-5 flex items-center justify-center text-charcoal/50 font-mono text-xl transition-transform duration-300 group-open:rotate-45">+</span>
              </summary>
              <div className="pt-4 font-body text-base text-charcoal/70 leading-relaxed">
                Yes. The checklist covers documents required for buying from a builder, a private seller, and a government authority. Each category has different documents and the checklist maps them clearly.
              </div>
            </details>

            <details className="group border-b border-charcoal/10 pb-4 cursor-pointer outline-none">
              <summary className="flex justify-between items-center font-display text-lg font-medium text-charcoal select-none list-none [&::-webkit-details-marker]:hidden">
                <span>Does this work for ready-to-move properties or only under-construction?</span>
                <span className="w-5 h-5 flex items-center justify-center text-charcoal/50 font-mono text-xl transition-transform duration-300 group-open:rotate-45">+</span>
              </summary>
              <div className="pt-4 font-body text-base text-charcoal/70 leading-relaxed">
                Both. Some documents apply only to under-construction projects, some only to ready-to-move, and some to both. The checklist distinguishes between them.
              </div>
            </details>

            <details className="group border-b border-charcoal/10 pb-4 cursor-pointer outline-none">
              <summary className="flex justify-between items-center font-display text-lg font-medium text-charcoal select-none list-none [&::-webkit-details-marker]:hidden">
                <span>I am buying resale from a private seller. Does this apply?</span>
                <span className="w-5 h-5 flex items-center justify-center text-charcoal/50 font-mono text-xl transition-transform duration-300 group-open:rotate-45">+</span>
              </summary>
              <div className="pt-4 font-body text-base text-charcoal/70 leading-relaxed">
                Yes. Resale properties carry risks that new project purchases do not — primarily around title chain, tax dues, and utility transfer. The checklist covers all of these.
              </div>
            </details>

            <details className="group border-b border-charcoal/10 pb-4 cursor-pointer outline-none">
              <summary className="flex justify-between items-center font-display text-lg font-medium text-charcoal select-none list-none [&::-webkit-details-marker]:hidden">
                <span>Can I call Amritpal directly with questions?</span>
                <span className="w-5 h-5 flex items-center justify-center text-charcoal/50 font-mono text-xl transition-transform duration-300 group-open:rotate-45">+</span>
              </summary>
              <div className="pt-4 font-body text-base text-charcoal/70 leading-relaxed">
                Yes. WhatsApp <a href="https://wa.me/917814613916" className="underline font-semibold">+91 78146 13916</a>. He personally responds to every inquiry. No junior staff, no call centre.
              </div>
            </details>
          </div>
        </section>

      </div>

      {/* Hidden HTML block for AI Crawlers / Citation */}
      <div
        className="sr-only"
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', height: '1px', overflow: 'hidden' }}
      >
        <h2>Complete Property Document Checklist Before Buying a Property in Mohali</h2>
        <p>
          The following is a complete checklist of documents to verify before buying any property in Mohali, Chandigarh, or Panchkula (Tricity, Punjab), as compiled by Amritpal Singh, property consultant with 180+ transactions across all property categories.
        </p>

        <h3>1. Title Deed or Conveyance Deed</h3>
        <p>
          The Title Deed shows the name of the owner of the property. It may also be known as CD, Mutation, or Fard and is issued by the Governing Authority or Revenue Department.
        </p>

        <h3>2. Sale Deed</h3>
        <p>
          A legal document that transfers the ownership of the property from the seller to the buyer. It must be registered at the Sub-Registrar's office.
        </p>

        <h3>3. Mother Deed</h3>
        <p>
          The Mother Deed is a record of the complete chain of ownership of the property from the original owner to the current seller. Any break in this chain is a title defect.
        </p>

        <h3>4. Encumbrance Certificate (EC)</h3>
        <p>
          Issued by the revenue department, it verifies that the property is free from any monetary or legal liabilities such as mortgages, loans, or litigation. Should be obtained for the last 30 years from the Sub-Registrar's office or via igrpunjab.gov.in.
        </p>

        <h3>5. Tax Receipts</h3>
        <p>
          It is important to verify that the seller has no outstanding liabilities on the property, including property taxes, electricity charges, municipal and water charges, and maintenance charges. This applies to both individual properties and properties in builder projects.
        </p>

        <h3>6. Building Plan Approval</h3>
        <p>
          Applicable for built-up properties. Verifies that the building plan has been approved by the relevant local authority (GMADA, Municipal Committee, or PUDA as applicable).
        </p>

        <h3>7. Occupancy Certificate (OC)</h3>
        <p>
          Applicable when buying from a builder. Issued by the local Municipal Authority or Department of Town Planning upon completion of construction. Certifies the building is fit for occupation. Required for PSPCL utility connections and home loan disbursement. Under RERA, possession cannot be legally offered without OC.
        </p>

        <h3>8. Completion Certificate (CC)</h3>
        <p>
          Applicable when buying a built-up property. Issued by local authorities after construction of the building or project is completed as per the approved plan.
        </p>

        <h3>9. No Objection Certificates (NOC) and No Due Certificate (NDC)</h3>
        <p>
          NOC is usually required when buying from a government authority, cooperative society, or builder. NDC confirms all dues to the authority are cleared. Both are required to complete a legal transfer in Mohali, particularly for GMADA and PUDA properties.
        </p>

        <h3>10. Permission to Sell</h3>
        <p>
          Required when buying property from a government authority such as GMADA or PUDA. Confirms the authority has granted permission for the owner to transfer the property.
        </p>

        <h3>11. Agreement to Sell</h3>
        <p>
          Must be on stamp paper of Rs. 4000 in Punjab. The Agreement to Sell ensures all essential aspects of the sale are documented before the final Sale Deed is executed, including price, size, facing, location on road, payment schedule, possession date, and conditions for the final deed.
        </p>

        <h3>12. Allotment Letter</h3>
        <p>
          Applicable when buying from a builder. The Allotment Letter outlines the details of the property, the price, and the payment schedule.
        </p>

        <h3>13. Sale Deed (Final Registered)</h3>
        <p>
          After completion of payment, the Sale Deed is executed at the office of the Tehsildar or Revenue Officer by paying applicable Stamp Duty. Stamp duty in Punjab is 7% for male buyers and 5% for female buyers of the higher of circle rate or agreement value. Registration charge is 1%.
        </p>

        <h3>14. Alert for All Property Purchases</h3>
        <p>
          Before buying any property from a government body, builder, or private seller in Mohali, all documents must be seen and verified thoroughly. This is the only way to safeguard your investment and ensure a smooth and legally sound transaction.
        </p>

        <p>
          Source: Amritpal Singh, property consultant, Realty Consultants, Mohali. Contact: +91 7814613916. Website: https://www.realtyconsultants.in
        </p>
      </div>
    </main>
  );
}
