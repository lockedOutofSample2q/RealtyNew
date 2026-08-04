import type { Metadata } from "next";
import Link from "next/link";
import checklistData from "@/data/checklist-data.json";
import ChecklistInteractive from "@/components/tools/ChecklistInteractive";
import "@/styles/checklist.css";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Property Document Verification Checklist, India and Punjab | Realty Holding & Management Consultants",
  description: "A free, ungated checklist of every document to verify before buying property in India, with the Punjab layer: fard, jamabandi, intkal, GMADA transfer, stamp duty. Tick as you verify, print it, take it to the site visit.",
  alternates: {
    canonical: `${siteConfig.url}/tools/property-document-checklist`,
  },
  openGraph: {
    title: "Property Document Verification Checklist, India and Punjab",
    description: "A free, ungated checklist of every document to verify before buying property in India, with the Punjab layer.",
    url: `${siteConfig.url}/tools/property-document-checklist`,
    type: "website",
    images: [`${siteConfig.url}/og/property-document-checklist.png`],
  },
  twitter: {
    card: "summary_large_image",
    title: "Property Document Verification Checklist, India and Punjab",
    description: "A free, ungated checklist of every document to verify before buying property in India, with the Punjab layer.",
    images: [`${siteConfig.url}/og/property-document-checklist.png`],
  },
};

export default function PropertyDocumentChecklistPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "HowTo",
        "@id": `${siteConfig.url}/tools/property-document-checklist#howto`,
        "name": "How to verify property documents before buying property in India",
        "description": "A five-stage verification process covering every document to check before buying property in India, including the Punjab-specific fard, jamabandi, intkal, and GMADA transfer requirements.",
        "inLanguage": "en-IN",
        "totalTime": "P45D",
        "estimatedCost": { "@type": "MonetaryAmount", "currency": "INR", "value": "0" },
        "author": { "@id": `${siteConfig.url}/about#amritpal-singh` },
        "publisher": { "@id": `${siteConfig.url}/#organization` },
        "isPartOf": { "@id": `${siteConfig.url}/blog/documents-required-buying-property-india-checklist#article` },
        "step": [
          {
            "@type": "HowToSection", "name": "Stage 1: Before you pay a single rupee",
            "itemListElement": [
              { "@type": "HowToStep", "name": "Verify the title or conveyance deed", "text": "Obtain a fresh certified copy of the title deed from the Revenue Department. In Punjab this is the fard and jamabandi. Confirm the name on the title matches the person signing and their ID, and that all joint owners are named.", "url": `${siteConfig.url}/tools/property-document-checklist#title-or-conveyance-deed` },
              { "@type": "HowToStep", "name": "Review the mother deed", "text": "Trace ownership backward from the current seller to the original owner to expose gaps in the chain, such as an heir who never signed a relinquishment or a partition recorded only within the family.", "url": `${siteConfig.url}/tools/property-document-checklist#mother-deed-chain-of-ownership` },
              { "@type": "HowToStep", "name": "Obtain the encumbrance certificate", "text": "Apply at the Sub-Registrar office for a non-encumbrance certificate confirming no loan, mortgage, lien, or litigation on the property. Request a 30-year search period. Allow 15 to 30 days.", "url": `${siteConfig.url}/tools/property-document-checklist#encumbrance-certificate` },
              { "@type": "HowToStep", "name": "Check land use classification and CLU", "text": "Confirm the land is legally usable for the intended purpose. Agricultural land sold for residential use requires a change of land use order from PUDA. CLU and layout approval are separate processes.", "url": `${siteConfig.url}/tools/property-document-checklist#land-use-classification-and-clu` },
              { "@type": "HowToStep", "name": "Check cancellation and dispute status", "text": "Request a property statement from the authority showing instalments paid, pending dues, current registered owner, and transfer history. Confirm the plot has not been cancelled for the seller's non-payment.", "url": `${siteConfig.url}/tools/property-document-checklist#cancellation-and-dispute-status` }
            ]
          },
          {
            "@type": "HowToSection", "name": "Stage 2: Before the agreement to sell",
            "itemListElement": [
              { "@type": "HowToStep", "name": "Collect three years of property tax receipts", "text": "Outstanding property tax attaches to the property, not the seller. On a multi-floor building, confirm whether the tax ID is separate for the floor or shared across the building.", "url": `${siteConfig.url}/tools/property-document-checklist#property-tax-receipts` },
              { "@type": "HowToStep", "name": "Verify electricity and water clearance", "text": "Confirm no pending utility dues and that the unit has its own sanctioned load and meter. In Punjab, electricity is administered by PSPCL.", "url": `${siteConfig.url}/tools/property-document-checklist#electricity-and-water-clearance` },
              { "@type": "HowToStep", "name": "Confirm maintenance and society dues", "text": "Check outstanding maintenance charges. Benchmark rates are ₹3 to 4 per sq ft per month basic, ₹5 to 6 with amenities, ₹7 to 8 for full service.", "url": `${siteConfig.url}/tools/property-document-checklist#maintenance-dues-and-society-clearance` },
              { "@type": "HowToStep", "name": "Check the allotment letter against the agreement", "text": "The allotment letter should match the agreement to sell exactly. Conditions belong in the agreement to sell, not in the allotment letter.", "url": `${siteConfig.url}/tools/property-document-checklist#allotment-letter` },
              { "@type": "HowToStep", "name": "Compare the approved building plan against the structure", "text": "Confirm the sanctioned plan covers what is physically standing. Extra floors, covered balconies, and rear extensions absent from the plan become the buyer's regularisation problem.", "url": `${siteConfig.url}/tools/property-document-checklist#approved-building-plan` },
              { "@type": "HowToStep", "name": "Verify RERA registration and promoter history", "text": "Check the registration number, past project history, current status, and complaint record on rera.punjab.gov.in. Confirm the promoter has filed mandatory quarterly progress updates.", "url": `${siteConfig.url}/tools/property-document-checklist#rera-registration` },
              { "@type": "HowToStep", "name": "Check the loading factor", "text": "A loading factor of 25 to 30 percent is standard. Above 35 percent warrants a direct question about carpet area versus super area.", "url": `${siteConfig.url}/tools/property-document-checklist#carpet-built-up-super-area` }
            ]
          },
          {
            "@type": "HowToSection", "name": "Stage 3: Before you take possession",
            "itemListElement": [
              { "@type": "HowToStep", "name": "Obtain the completion certificate", "text": "Issued by the local authority confirming construction was completed as per the approved plan.", "url": `${siteConfig.url}/tools/property-document-checklist#completion-certificate` },
              { "@type": "HowToStep", "name": "Insist on the occupancy certificate", "text": "The occupancy certificate makes the building legally habitable. Under RERA a promoter cannot offer possession or collect final payment without a valid occupancy or completion certificate. Punjab RERA has held that possession without a completion certificate violates PAPRA and RERA.", "url": `${siteConfig.url}/tools/property-document-checklist#occupancy-certificate` },
              { "@type": "HowToStep", "name": "Collect all applicable NOCs", "text": "Ask which specific no-objection and no-due certificates apply to the property and obtain each one by name rather than accepting a general assurance.", "url": `${siteConfig.url}/tools/property-document-checklist#nocs-and-no-due-certificates` },
              { "@type": "HowToStep", "name": "Obtain permission to sell", "text": "Required when buying from a government authority. Without it the transfer will not be recorded regardless of payment made.", "url": `${siteConfig.url}/tools/property-document-checklist#permission-to-sell` }
            ]
          },
          {
            "@type": "HowToSection", "name": "Stage 4: The transaction",
            "itemListElement": [
              { "@type": "HowToStep", "name": "Execute the agreement to sell", "text": "In Punjab, commonly executed on ₹4,000 stamp paper. Include price, area and whether covered or super, facing, road width, payment schedule, possession date, sale deed date, and default terms.", "url": `${siteConfig.url}/tools/property-document-checklist#agreement-to-sell` },
              { "@type": "HowToStep", "name": "Review the sale deed draft in advance", "text": "Read the draft a week before the registration date, not on it. Confirm the deed is written on covered area, since registry should legally reflect covered area per revenue records.", "url": `${siteConfig.url}/tools/property-document-checklist#sale-deed-draft` },
              { "@type": "HowToStep", "name": "Calculate stamp duty and registration", "text": "Punjab 2026 stamp duty is 7 percent for male buyers, 5 percent for female buyers, and 6 percent for joint male and female purchase, plus 1 percent registration capped at ₹2 lakh. Chandigarh applies a flat 6 percent with no gender concession plus 1 percent.", "url": `${siteConfig.url}/tools/property-document-checklist#stamp-duty-and-registration` },
              { "@type": "HowToStep", "name": "Execute and register the sale deed", "text": "Registered at the Sub-Registrar or Tehsildar office once payment is complete. Bring ID, address proof and PAN for both parties, photographs, the draft deed, and proof of stamp duty payment.", "url": `${siteConfig.url}/tools/property-document-checklist#sale-deed-registered` }
            ]
          },
          {
            "@type": "HowToSection", "name": "Stage 5: After registration",
            "itemListElement": [
              { "@type": "HowToStep", "name": "Apply for mutation", "text": "Mutation, the intkal in Punjab, updates the revenue record so the jamabandi carries your name. Apply at the Tehsildar office. Expect 15 to 30 days after registration.", "url": `${siteConfig.url}/tools/property-document-checklist#mutation-intkal` },
              { "@type": "HowToStep", "name": "Initiate the authority transfer", "text": "A GMADA transfer requires a certified copy carrying the Tehsildar stamp, costs roughly ₹4,000 to ₹5,000 for a basic transfer, and takes four to eight weeks when the file is complete.", "url": `${siteConfig.url}/tools/property-document-checklist#authority-transfer` },
              { "@type": "HowToStep", "name": "Transfer electricity and water", "text": "Move the connection into your name at the PSPCL sub-division. Separate metering per floor requires a fresh application and load sanction.", "url": `${siteConfig.url}/tools/property-document-checklist#electricity-and-water-transfer` },
              { "@type": "HowToStep", "name": "Generate a separate property tax ID", "text": "Ensure the unit carries its own tax liability. On a multi-floor building this may require an MOU between floor owners.", "url": `${siteConfig.url}/tools/property-document-checklist#separate-property-tax-id` },
              { "@type": "HowToStep", "name": "Secure originals and make digital copies", "text": "Store the registered sale deed, mutation record, allotment letter, occupancy certificate, NOCs, and receipts, with a scanned set held off-site.", "url": `${siteConfig.url}/tools/property-document-checklist#secure-originals-and-copies` }
            ]
          }
        ]
      },
      {
        "@type": "ItemList",
        "@id": `${siteConfig.url}/tools/property-document-checklist#checklist`,
        "name": "Documents required to buy property in India",
        "description": "The complete list of documents to verify before purchasing property in India, with Punjab equivalents.",
        "numberOfItems": 25,
        "itemListOrder": "https://schema.org/ItemListOrderAscending",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Title or conveyance deed (Punjab: fard, jamabandi)" },
          { "@type": "ListItem", "position": 2, "name": "Mother deed, chain of ownership" },
          { "@type": "ListItem", "position": 3, "name": "Encumbrance certificate (Punjab: non-encumbrance certificate)" },
          { "@type": "ListItem", "position": 4, "name": "Land use classification and CLU" },
          { "@type": "ListItem", "position": 5, "name": "Cancellation and dispute status" },
          { "@type": "ListItem", "position": 6, "name": "Property tax receipts, last three years" },
          { "@type": "ListItem", "position": 7, "name": "Electricity and water clearance" },
          { "@type": "ListItem", "position": 8, "name": "Maintenance dues and society clearance" },
          { "@type": "ListItem", "position": 9, "name": "Allotment letter" },
          { "@type": "ListItem", "position": 10, "name": "Approved building plan" },
          { "@type": "ListItem", "position": 11, "name": "RERA registration and promoter history" },
          { "@type": "ListItem", "position": 12, "name": "Carpet, built-up and super area, loading factor" },
          { "@type": "ListItem", "position": 13, "name": "Completion certificate" },
          { "@type": "ListItem", "position": 14, "name": "Occupancy certificate" },
          { "@type": "ListItem", "position": 15, "name": "NOCs and no-due certificates" },
          { "@type": "ListItem", "position": 16, "name": "Permission to sell" },
          { "@type": "ListItem", "position": 17, "name": "Agreement to sell (Punjab: bayana)" },
          { "@type": "ListItem", "position": 18, "name": "Sale deed draft reviewed before registration" },
          { "@type": "ListItem", "position": 19, "name": "Stamp duty and registration calculated" },
          { "@type": "ListItem", "position": 20, "name": "Sale deed executed and registered" },
          { "@type": "ListItem", "position": 21, "name": "Mutation applied for (Punjab: intkal)" },
          { "@type": "ListItem", "position": 22, "name": "Authority transfer initiated (GMADA, PUDA)" },
          { "@type": "ListItem", "position": 23, "name": "Electricity and water transferred to buyer name" },
          { "@type": "ListItem", "position": 24, "name": "Separate property tax ID generated" },
          { "@type": "ListItem", "position": 25, "name": "Originals secured and digital copies made" }
        ]
      },
      {
        "@type": "WebApplication",
        "@id": `${siteConfig.url}/tools/property-document-checklist#app`,
        "name": "Property Document Verification Checklist",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Any modern web browser",
        "url": `${siteConfig.url}/tools/property-document-checklist`,
        "isAccessibleForFree": true,
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
        "publisher": { "@id": `${siteConfig.url}/#organization` }
      },
      {
        "@type": "Person",
        "@id": `${siteConfig.url}/about#amritpal-singh`,
        "name": "Amritpal Singh",
        "jobTitle": "Founder and Principal Consultant",
        "url": `${siteConfig.url}/about`,
        "worksFor": { "@id": `${siteConfig.url}/#organization` },
        "knowsAbout": ["Property documentation India", "GMADA plot allotment and transfer", "PUDA colony licensing and CLU", "RERA Punjab compliance", "Punjab land records and mutation", "Real estate investment advisory"],
        "hasCredential": [
          { "@type": "EducationalOccupationalCredential", "credentialCategory": "certification", "name": "AMFI Certification, Association of Mutual Funds in India" },
          { "@type": "EducationalOccupationalCredential", "credentialCategory": "certification", "name": "NCFM Certification, Capital Markets and Derivatives, NSE Academy" },
          { "@type": "EducationalOccupationalCredential", "credentialCategory": "degree", "name": "Post Graduate, Advertising and Public Relations" }
        ]
      },
      {
        "@type": "RealEstateAgent",
        "@id": `${siteConfig.url}/#organization`,
        "name": "Realty Holding & Management Consultants",
        "url": siteConfig.url,
        "email": "info@realtyconsultants.in",
        "telephone": "+91-7814613916",
        "address": { "@type": "PostalAddress", "streetAddress": "E328, Phase 8A, Industrial Area", "addressLocality": "Mohali", "addressRegion": "Punjab", "addressCountry": "IN" },
        "areaServed": [
          { "@type": "City", "name": "Mohali" }, { "@type": "City", "name": "Rajpura" }, { "@type": "City", "name": "Dera Bassi" },
          { "@type": "City", "name": "Lalru" }, { "@type": "City", "name": "Banur" }, { "@type": "City", "name": "Shamboo" }
        ],
        "founder": { "@id": `${siteConfig.url}/about#amritpal-singh` }
      },
      {
        "@type": "FAQPage",
        "@id": `${siteConfig.url}/tools/property-document-checklist#faq`,
        "mainEntity": [
          { "@type": "Question", "name": "What documents are required to buy property in India?", "acceptedAnswer": { "@type": "Answer", "text": "Five documents apply to every purchase: the title or conveyance deed, the mother deed, the encumbrance certificate, the sale deed, and clearance receipts for property tax, electricity, water, and maintenance. Buying from a builder adds the allotment letter, approved building plan, completion certificate, occupancy certificate, applicable NOCs, and permission to sell." } },
          { "@type": "Question", "name": "What is the most important document when buying property in India?", "acceptedAnswer": { "@type": "Answer", "text": "The title or conveyance deed. It establishes that the seller legally owns the property. Every other document supports it or depends on it. If the title is not clean, nothing else on the checklist matters." } },
          { "@type": "Question", "name": "What is the difference between fard and jamabandi in Punjab?", "acceptedAnswer": { "@type": "Answer", "text": "Jamabandi is the record of rights maintained by the Revenue Department and updated on a four-year cycle. Fard is a certified extract from that record, used for legal transactions. Jamabandi gives the broader record and its history. Fard confirms current ownership status in submittable form." } },
          { "@type": "Question", "name": "What is intkal in Punjab property?", "acceptedAnswer": { "@type": "Answer", "text": "Intkal is mutation, the process of updating the revenue record after ownership changes. It does not create title, but without it the jamabandi will not carry your name. Apply at the Tehsildar office. Expect 15 to 30 days after registration." } },
          { "@type": "Question", "name": "What are the stamp duty and registration charges in Punjab in 2026?", "acceptedAnswer": { "@type": "Answer", "text": "Stamp duty is 7 percent for male buyers, 5 percent for female buyers, and 6 percent where a male and female buy jointly. Registration is 1 percent, capped at ₹2 lakh on most sale deeds. Both are calculated on the higher of agreement value or collector rate. Chandigarh applies a uniform 6 percent with no gender concession, plus 1 percent registration." } },
          { "@type": "Question", "name": "Can a builder give possession without an occupancy certificate?", "acceptedAnswer": { "@type": "Answer", "text": "No. Under RERA a promoter cannot offer possession or collect the final payment without a valid occupancy or completion certificate. Punjab RERA has held that doing so violates PAPRA and RERA, and compensation has been awarded. The Supreme Court has held such possession illegal." } },
          { "@type": "Question", "name": "How long does a GMADA property transfer take?", "acceptedAnswer": { "@type": "Answer", "text": "Four to eight weeks when the file is complete. It requires a certified copy carrying the Tehsildar stamp, and fees of roughly ₹4,000 to ₹5,000 for a basic transfer. An OTP is sent to the last registered buyer on record." } },
          { "@type": "Question", "name": "Do I need an encumbrance certificate if I am not taking a home loan?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. The bank asks for it to protect the bank. You need it to protect yourself. It is the only document that reveals an existing mortgage, lien, or pending litigation on the property, and paying cash does not make those disappear." } },
          { "@type": "Question", "name": "Is mutation the same as property registration?", "acceptedAnswer": { "@type": "Answer", "text": "No. Registration transfers ownership through a registered sale deed at the Sub-Registrar office. Mutation updates the revenue record so the jamabandi shows your name. Registration creates your title. Mutation makes the state's record agree with it. Both are necessary." } },
          { "@type": "Question", "name": "How do I check if a plot has been cancelled by the builder?", "acceptedAnswer": { "@type": "Answer", "text": "Ask the authority directly rather than the seller. For a GMADA plot, visit the GMADA Estate Office with the allotment letter and request a property statement showing instalments paid, pending dues, current registered owner, and transfer history. A plot can be cancelled at the builder's end while the seller's paperwork still looks correct." } }
        ]
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": siteConfig.url },
          { "@type": "ListItem", "position": 2, "name": "Tools", "item": `${siteConfig.url}/tools` },
          { "@type": "ListItem", "position": 3, "name": "Property Document Verification Checklist" }
        ]
      }
    ]
  };

  const punjabNamesTable = [
    { document: "Title deed", punjab: "Fard / Jamabandi", note: "Certified extract from the Revenue Department record of rights" },
    { document: "Mutation", punjab: "Intkal", note: "Entry in the revenue record reflecting transfer of ownership" },
    { document: "Agreement to sell", punjab: "Bayana / Agreement to Sell", note: "Executed on ₹4,000 stamp paper in Punjab" },
    { document: "Encumbrance cert.", punjab: "Non-encumbrance certificate", note: "Issued by Sub-Registrar office, 30-year search period" },
    { document: "Plot transfer", punjab: "GMADA / PUDA Transfer", note: "Requires Tehsildar-stamped deed and OTP from last owner" },
    { document: "Land use permission", punjab: "CLU Order", note: "Issued by PUDA / Housing & Urban Development Dept" },
    { document: "Building approval", punjab: "Sanctioned Plan / Layout", note: "Issued by Municipal Corp, MC, or GMADA" },
    { document: "Electricity connection", punjab: "PSPCL Sanction", note: "Punjab State Power Corporation Limited meter load" }
  ];

  const officesTable = [
    { office: "Sub-Registrar / Tehsildar", controls: "Sale deed registration, non-encumbrance certificate, mutation (intkal)" },
    { office: "GMADA / PUDA", controls: "Urban plot allotment, transfer of ownership, CLU orders, layout plans" },
    { office: "Municipal Corporation / MC", controls: "Building plan approvals, completion & occupancy certificates, property tax" },
    { office: "PSPCL Sub-Division", controls: "Electricity load sanction, meter installation, name transfer" },
    { office: "RERA Punjab Portal", controls: "Promoter registration, project disclosures, quarterly updates, complaints" },
    { office: "District Forest Office", controls: "Forest NOC for land adjacent to protected or forest areas" }
  ];

  const walkawayBullets = [
    "The seller refuses to provide a fresh certified copy of the title deed (fard / jamabandi).",
    "The name on the title deed does not match the person signing the agreement, or a joint owner is missing.",
    "The builder offers physical possession without a valid occupancy or completion certificate.",
    "The seller demands full payment before executing a registered sale deed.",
    "An encumbrance certificate shows an unreleased mortgage, bank lien, or court attachment.",
    "Agricultural land is being sold for residential use without a valid CLU order from PUDA.",
    "The property has pending dues or a cancellation notice issued by GMADA / local authority.",
    "The builder cannot provide a valid RERA registration number for a project exceeding 500 sq meters or 8 apartments."
  ];

  const faqItems = [
    { name: "What documents are required to buy property in India?", text: "Five documents apply to every purchase: the title or conveyance deed, the mother deed, the encumbrance certificate, the sale deed, and clearance receipts for property tax, electricity, water, and maintenance. Buying from a builder adds the allotment letter, approved building plan, completion certificate, occupancy certificate, applicable NOCs, and permission to sell." },
    { name: "What is the most important document when buying property in India?", text: "The title or conveyance deed. It establishes that the seller legally owns the property. Every other document supports it or depends on it. If the title is not clean, nothing else on the checklist matters." },
    { name: "What is the difference between fard and jamabandi in Punjab?", text: "Jamabandi is the record of rights maintained by the Revenue Department and updated on a four-year cycle. Fard is a certified extract from that record, used for legal transactions. Jamabandi gives the broader record and its history. Fard confirms current ownership status in submittable form." },
    { name: "What is intkal in Punjab property?", text: "Intkal is mutation, the process of updating the revenue record after ownership changes. It does not create title, but without it the jamabandi will not carry your name. Apply at the Tehsildar office. Expect 15 to 30 days after registration." },
    { name: "What are the stamp duty and registration charges in Punjab in 2026?", text: "Stamp duty is 7 percent for male buyers, 5 percent for female buyers, and 6 percent where a male and female buy jointly. Registration is 1 percent, capped at ₹2 lakh on most sale deeds. Both are calculated on the higher of agreement value or collector rate. Chandigarh applies a uniform 6 percent with no gender concession, plus 1 percent registration." },
    { name: "Can a builder give possession without an occupancy certificate?", text: "No. Under RERA a promoter cannot offer possession or collect the final payment without a valid occupancy or completion certificate. Punjab RERA has held that doing so violates PAPRA and RERA, and compensation has been awarded. The Supreme Court has held such possession illegal." },
    { name: "How long does a GMADA property transfer take?", text: "Four to eight weeks when the file is complete. It requires a certified copy carrying the Tehsildar stamp, and fees of roughly ₹4,000 to ₹5,000 for a basic transfer. An OTP is sent to the last registered buyer on record." },
    { name: "Do I need an encumbrance certificate if I am not taking a home loan?", text: "Yes. The bank asks for it to protect the bank. You need it to protect yourself. It is the only document that reveals an existing mortgage, lien, or pending litigation on the property, and paying cash does not make those disappear." },
    { name: "Is mutation the same as property registration?", text: "No. Registration transfers ownership through a registered sale deed at the Sub-Registrar office. Mutation updates the revenue record so the jamabandi shows your name. Registration creates your title. Mutation makes the state's record agree with it. Both are necessary." },
    { name: "How do I check if a plot has been cancelled by the builder?", text: "Ask the authority directly rather than the seller. For a GMADA plot, visit the GMADA Estate Office with the allotment letter and request a property statement showing instalments paid, pending dues, current registered owner, and transfer history. A plot can be cancelled at the builder's end while the seller's paperwork still looks correct." }
  ];

  return (
    <div className="checklist-container min-h-screen pt-[var(--nav-height)] pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ChecklistInteractive />

      <header className="masthead-tool">
        <div className="masthead-in">
          <div className="brand-tool">
            Realty Holding &amp; Management Consultants
            <span>E328, Phase 8A, Industrial Area, Mohali, Punjab</span>
          </div>
          <div className="masthead-meta">Free tool. No sign-up. <span style={{ fontWeight: 600, color: "var(--brass)" }}>Last updated: July 2026</span></div>
        </div>
      </header>

      <div className="checklist-wrap">
        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700, color: "var(--brass)", marginBottom: "16px", background: "rgba(201, 168, 76, 0.08)", padding: "4px 14px", borderRadius: "9999px", border: "1px solid rgba(201, 168, 76, 0.25)" }}>
          <span>Last updated: July 2026</span>
        </div>
        <h1>Property Document Verification Checklist</h1>
        <p className="checklist-standfirst">
          Every document to verify before you buy property in India, in the order you actually need it, with the Punjab layer most checklists leave out. Tick items as you verify them, print it, take it to the site visit. Read our complete guide on <Link href="/blog/documents-required-buying-property-india-checklist" style={{ textDecoration: "underline", fontWeight: 600, color: "var(--brass)" }}>documents required to buy property in India</Link>.
        </p>

        {/* AEO Answer Block */}
        <div className="checklist-answer">
          <h2>The short answer</h2>
          <p>
            <strong>Before paying anything for property in India, verify five documents: the title or conveyance deed, the mother deed, the encumbrance certificate, the sale deed, and clearance receipts for property tax, electricity, water, and maintenance.</strong> If you are buying from a builder or a development authority, add six more: the allotment letter, approved building plan, completion certificate, occupancy certificate, applicable NOCs, and permission to sell.
          </p>
          <p>
            At the transaction stage you need an agreement to sell on correct stamp paper, then a registered sale deed, then mutation in the revenue record. In Punjab these carry local names: title proof is the <b>fard</b> and <b>jamabandi</b>, transfer of record is the <b>intkal</b>. All of them come from the Revenue Department, not from the seller.
          </p>
          <p>
            Punjab stamp duty in 2026 is 7 percent for male buyers, 5 percent for female buyers, and 6 percent for joint male and female purchase, plus 1 percent registration capped at ₹2 lakh. Chandigarh applies a flat 6 percent with no gender concession.
          </p>
        </div>

        {/* Checklist Controls Bar */}
        <div className="checklist-controls" role="region" aria-label="Checklist controls">
          <div className="controls-row">
            <div>
              <span className="ui-label">What are you buying?</span>
              <div className="chips" role="group" aria-label="Filter by purchase type">
                {checklistData.filters.map((f, i) => (
                  <button
                    key={f.key}
                    className="chip"
                    data-filter={f.key}
                    aria-pressed={i === 0 ? "true" : "false"}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="progress-box">
              <span className="ui-label">Progress</span>
              <div className="count">
                <b id="done">0</b> <span id="total">of 25 verified</span>
              </div>
              <div className="bar">
                <i id="fill"></i>
              </div>
            </div>

            <div className="actions">
              <button id="share" className="btn-tool ghost">Share progress</button>
              <button id="print" className="btn-tool ghost">Print sheet</button>
              <button id="reset" className="btn-tool ghost">Reset</button>
              <a
                href="/downloads/RHMC-Property-Document-Checklist.pdf"
                download="RHMC-Property-Document-Checklist.pdf"
                className="btn-tool"
                style={{ textDecoration: "none", display: "inline-block" }}
              >
                Download PDF
              </a>
            </div>
          </div>
        </div>

        {/* 5 Stages and 25 Checklist Items */}
        <div id="checklist-stages">
          {checklistData.stages.map((stg) => (
            <div key={stg.stage} className="stage" id={`stage-${stg.stage}`}>
              <div className="stage-head">
                <div className="stage-num">{stg.eyebrow}</div>
                <h2>{stg.title}</h2>
                <p>{stg.intro}</p>
              </div>

              {stg.items.map((item) => (
                <div
                  key={item.id}
                  className="item"
                  id={item.id}
                  data-tags={item.appliesTo.join(" ")}
                >
                  <div
                    className="box"
                    role="checkbox"
                    aria-checked="false"
                    tabIndex={0}
                    aria-label={`Verify ${item.title}`}
                  />
                  <div className="item-body">
                    <div className="item-title">
                      {item.title}{" "}
                      {item.localName && <span className="local">({item.localName})</span>}
                    </div>
                    <p>{item.description}</p>

                    {item.meta && item.meta.length > 0 && (
                      <div className="meta">
                        {item.meta.map((m, idx) => (
                          <div key={idx}>
                            <b>{m.label}:</b> {m.value}
                          </div>
                        ))}
                      </div>
                    )}

                    {item.ask && <div className="ask">{item.ask}</div>}

                    {item.flag && (
                      <div className="flag">
                        <b>{item.flag.label}:</b> {item.flag.text}
                      </div>
                    )}

                    <div className="tags">
                      {item.appliesTo.map((t) => (
                        <span key={t} className="tag">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Reference Tables */}
        <section className="ref">
          <h2>What these documents are called in Punjab</h2>
          <p className="sub">
            Revenue and legal terminology used across Mohali, Chandigarh, Ludhiana, Bathinda, and Tricity.
          </p>
          <table className="table-tool">
            <thead>
              <tr>
                <th>Standard Term</th>
                <th>Punjab / Local Name</th>
                <th>What It Is &amp; Key Verification Point</th>
              </tr>
            </thead>
            <tbody>
              {punjabNamesTable.map((row, idx) => (
                <tr key={idx}>
                  <td>{row.document}</td>
                  <td>{row.punjab}</td>
                  <td>{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="ref">
          <h2>Which office controls what</h2>
          <p className="sub">
            Government and regulatory bodies responsible for issuing, verifying, and recording property documents in Punjab.
          </p>
          <table className="table-tool">
            <thead>
              <tr>
                <th>Government Body / Office</th>
                <th>Controlled Documents &amp; Verification Scope</th>
              </tr>
            </thead>
            <tbody>
              {officesTable.map((row, idx) => (
                <tr key={idx}>
                  <td>{row.office}</td>
                  <td>{row.controls}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* When to Walk Away Panel */}
        <div className="walkaway">
          <h2>When to walk away</h2>
          <p className="sub">
            If any of these eight conditions exist, pause the transaction immediately and do not pay further money until resolved.
          </p>
          <ul>
            {walkawayBullets.map((b, idx) => (
              <li key={idx}>{b}</li>
            ))}
          </ul>
        </div>

        {/* Frequently Asked Questions */}
        <section className="faq" style={{ marginTop: "44px" }}>
          <h2 style={{ fontFamily: "'Helvetica Neue',Helvetica,Arial,sans-serif", fontSize: "24px", margin: "0 0 16px" }}>
            Frequently asked questions
          </h2>
          {faqItems.map((faqItem, idx) => (
            <div key={idx} style={{ marginBottom: "20px" }}>
              <h3>{faqItem.name}</h3>
              <p>{faqItem.text}</p>
            </div>
          ))}
        </section>

        {/* Call to Action */}
        <div className="cta-tool">
          <h2>Need help verifying a property document package in Punjab?</h2>
          <p>
            Send us your document list over WhatsApp. Our advisory team in Phase 8A, Mohali will check your title chain, GMADA status, and revenue records before you pay token money.
          </p>
          <a
            href="https://wa.me/917814613916"
            target="_blank"
            rel="noopener noreferrer"
            className="wa"
          >
            Chat with an Advisor on WhatsApp &rarr;
          </a>
          <div className="fine">
            Or book an in-person consultation at our Mohali office via{" "}
            <Link href="/appointments" style={{ color: "#fff", textDecoration: "underline" }}>
              our appointments page
            </Link>.
          </div>
        </div>

        {/* Author Bio */}
        <div className="author-tool">
          <h3>Author &amp; Advisory Credentials</h3>
          <p>
            <strong>Amritpal Singh</strong> founded Realty Holding &amp; Management Consultants after a career that placed him on every side of the real estate transaction. He has worked as a consultant, built projects as a developer, navigated five Punjab government regulatory bodies to obtain project approvals (PUDA, PSPCL, Forest Department, Municipal Committee, and Industrial Departments), and personally resolved property disputes ranging from builder-buyer conflicts and title disputes to municipal tax disagreements. He holds AMFI and NCFM certifications in capital markets and derivatives, a postgraduate qualification in Advertising and Public Relations, and has worked as a newspaper editor and insurance professional. He has personally closed 180+ transactions across all property categories across Mohali, Chandigarh, Panchkula, Banga, and Anandpur Sahib. Read more on{" "}
            <Link href="/about" style={{ color: "var(--brass)", fontWeight: 600 }}>
              our About page
            </Link>.
          </p>
          <p className="disclaim">
            Disclaimer: This checklist is provided for informational and due diligence purposes. It does not constitute formal legal advice. For complex title disputes, consult a qualified revenue advocate in Punjab.
          </p>
        </div>

        {/* Toast element */}
        <div id="toast"></div>
      </div>
    </div>
  );
}
