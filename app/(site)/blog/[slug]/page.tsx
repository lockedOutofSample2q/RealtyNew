import React from "react";
import { allPosts } from "contentlayer/generated";
import { notFound } from "next/navigation";
import Image from "next/image";
import { format, parseISO } from "date-fns";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import MdxContent from "@/components/blog/MdxContent";
import LeadPopup from "@/components/ui/LeadPopup";
import { siteConfig } from "@/config/site";

const internals =
  (React as any).__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE ||
  (React as any).__SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE ||
  (React as any).__SECRET_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
if (internals) {
  if (internals.A && !internals.A.getOwner) {
    internals.A.getOwner = () => null;
  } else if (!internals.A) {
    internals.A = { getOwner: () => null };
  }
}

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params;
  const post = allPosts.find((post) => post.slug === slug);
  if (!post) return {};

  const titleText = post.metaTitle || post.title;
  const descText = post.metaDescription || post.description || post.excerpt || "The complete list of documents to verify before buying property in India.";

  const imageUrl = post.coverImage
    ? (post.coverImage.startsWith("http") ? post.coverImage : `${siteConfig.url}${post.coverImage.startsWith("/") ? post.coverImage : `/${post.coverImage}`}`)
    : `${siteConfig.url}/og/property-document-checklist.png`;

  return {
    title: titleText,
    description: descText,
    alternates: {
      canonical: `${siteConfig.url}/blog/${post.slug}`,
    },
    openGraph: {
      title: titleText,
      description: descText,
      type: "article",
      url: `${siteConfig.url}/blog/${post.slug}`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: titleText,
      description: descText,
      images: [imageUrl],
    },
  };
}

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = allPosts.find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  const authorName = typeof post.author === "string" 
    ? post.author 
    : (typeof post.author === "object" && post.author !== null && "name" in post.author ? (post.author as any).name : "Realty Holding & Management Consultants");

  const isPillarArticle = slug.includes("documents-required");

  const jsonLd = isPillarArticle ? {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${siteConfig.url}/blog/documents-required-buying-property-india-checklist#article`,
        "headline": "Documents Required to Buy Property in India: The Complete Verification Checklist (2026)",
        "description": "The complete list of documents to verify before buying property in India, with the Punjab and Tricity layer most checklists leave out.",
        "datePublished": "2026-07-26",
        "dateModified": "2026-07-26",
        "inLanguage": "en-IN",
        "author": { "@id": `${siteConfig.url}/about#amritpal-singh` },
        "publisher": { "@id": `${siteConfig.url}/#organization` },
        "mainEntityOfPage": `${siteConfig.url}/blog/documents-required-buying-property-india-checklist`,
        "mainEntity": { "@id": `${siteConfig.url}/tools/property-document-checklist#howto` },
        "mentions": [{ "@id": `${siteConfig.url}/tools/property-document-checklist#checklist` }],
        "about": [
          { "@type": "Thing", "name": "Property documentation in India" },
          { "@type": "Thing", "name": "Property registration in Punjab" }
        ],
        "spatialCoverage": [
          { "@type": "Place", "name": "Punjab, India" },
          { "@type": "Place", "name": "Mohali" },
          { "@type": "Place", "name": "Chandigarh" }
        ]
      },
      {
        "@type": "Person",
        "@id": `${siteConfig.url}/about#amritpal-singh`,
        "name": "Amritpal Singh",
        "jobTitle": "Founder and Principal Consultant",
        "url": `${siteConfig.url}/about`,
        "worksFor": { "@id": `${siteConfig.url}/#organization` },
        "knowsAbout": [
          "Property documentation India",
          "GMADA plot allotment and transfer",
          "PUDA colony licensing and CLU",
          "RERA Punjab compliance",
          "Punjab land records and mutation",
          "Real estate investment advisory"
        ],
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
        "@id": `${siteConfig.url}/blog/documents-required-buying-property-india-checklist#faq`,
        "mainEntity": [
          { "@type": "Question", "name": "What is the single most important document when buying property in India?", "acceptedAnswer": { "@type": "Answer", "text": "The title or conveyance deed. It establishes that the seller legally owns the property. Every other document supports it or depends on it. If the title is not clean, nothing else on the checklist matters." } },
          { "@type": "Question", "name": "What is the difference between fard and jamabandi in Punjab?", "acceptedAnswer": { "@type": "Answer", "text": "Jamabandi is the record of rights maintained by the Revenue Department and updated on a four-year cycle. Fard is a certified extract from that record, used for legal transactions. Jamabandi gives you the broader record and its history. Fard confirms current ownership status in a form you can submit." } },
          { "@type": "Question", "name": "Do I need an encumbrance certificate if I am paying cash and not taking a loan?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. The bank asks for it to protect the bank. You need it to protect yourself. It is the only document that reveals an existing mortgage, lien, or pending litigation on the property, and paying cash does not make those disappear." } },
          { "@type": "Question", "name": "What are the stamp duty and registration charges in Punjab in 2026?", "acceptedAnswer": { "@type": "Answer", "text": "Stamp duty is 7 percent for male buyers, 5 percent for female buyers, and 6 percent where a male and female buy jointly. Registration is 1 percent, capped at ₹2 lakh on most sale deeds. Both are calculated on the higher of the agreement value or the collector rate. Chandigarh applies a uniform 6 percent with no gender concession, plus 1 percent registration." } },
          { "@type": "Question", "name": "Can a builder give possession without an occupancy certificate?", "acceptedAnswer": { "@type": "Answer", "text": "No. Under RERA a promoter cannot offer possession or collect the final payment without a valid occupancy or completion certificate. Punjab RERA has held that doing so violates PAPRA and RERA, and compensation has been awarded. If a builder offers you keys without an OC, that is a compliance failure, not a formality." } },
          { "@type": "Question", "name": "How long does a GMADA property transfer take?", "acceptedAnswer": { "@type": "Answer", "text": "Four to eight weeks when the file is complete. It requires a certified copy carrying the Tehsildar stamp, and fees of roughly ₹4,000 to ₹5,000 for a basic transfer. An OTP is sent to the last registered buyer on record. Incomplete files take considerably longer." } },
          { "@type": "Question", "name": "Is mutation the same as registration?", "acceptedAnswer": { "@type": "Answer", "text": "No. Registration transfers ownership through a registered sale deed at the Sub-Registrar office. Mutation, the intkal, updates the revenue record so the jamabandi shows your name. Registration creates your title. Mutation makes the state's record agree with it. Both are necessary. Expect mutation to take 15 to 30 days after registration." } },
          { "@type": "Question", "name": "What documents do I need for a resale flat as opposed to a new one?", "acceptedAnswer": { "@type": "Answer", "text": "Everything in part one, plus the original allotment letter and the full chain of prior transfers, the occupancy certificate, a no-due certificate from the society or builder, property tax receipts covering the previous three years, and confirmation that the electricity meter is in the seller's name and is separately metered." } },
          { "@type": "Question", "name": "Do NRIs need different documents to buy property in India?", "acceptedAnswer": { "@type": "Answer", "text": "The property-side checklist is identical. What is additional is on the buyer's side: FEMA compliance, payment routed through an NRO or NRE account, PAN, and a properly executed power of attorney if you are not present for registration. Residential property does not require RBI approval. Agricultural land, farmhouses, and plantation property do." } },
          { "@type": "Question", "name": "How much should I budget for legal verification?", "acceptedAnswer": { "@type": "Answer", "text": "Far less than the loss it prevents. A competent property lawyer running a title search, a mother deed review, and a 30-year encumbrance search is a small fraction of a percent of a transaction. Both cases described above were recoverable only because someone chased them for months. Verification before payment costs a fraction of recovery after it." } }
        ]
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${siteConfig.url}${post.url}/#breadcrumb`,
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": siteConfig.url },
          { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${siteConfig.url}/blog` },
          { "@type": "ListItem", "position": 3, "name": post.title, "item": `${siteConfig.url}${post.url}` }
        ]
      }
    ]
  } : {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${siteConfig.url}${post.url}/#blogposting`,
        "mainEntityOfPage": `${siteConfig.url}${post.url}`,
        "headline": post.title,
        "name": post.title,
        "description": post.excerpt || post.description || "",
        "datePublished": post.date,
        "dateModified": post.date,
        "author": (authorName === "Realty Holding and Management Consultants" || authorName === "Realty Holding & Management Consultants" || authorName.includes("Realty Holding"))
          ? { "@type": "Organization", "@id": `${siteConfig.url}/#organization`, "name": "Realty Holding & Management Consultants", "url": siteConfig.url }
          : { "@type": "Person", "@id": post.author_url || `${siteConfig.url}/#person`, "name": authorName, "url": post.author_url || siteConfig.url },
        "publisher": { "@type": "Organization", "@id": `${siteConfig.url}/#organization`, "name": siteConfig.name, "logo": { "@type": "ImageObject", "url": `${siteConfig.url}/icon.png` } },
        "image": post.coverImage?.startsWith('http') ? post.coverImage : `${siteConfig.url}${post.coverImage?.startsWith('/') ? post.coverImage : `/${post.coverImage || 'icon.png'}`}`
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${siteConfig.url}${post.url}/#breadcrumb`,
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": siteConfig.url },
          { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${siteConfig.url}/blog` },
          { "@type": "ListItem", "position": 3, "name": post.title, "item": `${siteConfig.url}${post.url}` }
        ]
      }
    ]
  };

  const tableOfContents = [
    { title: "The one-page checklist", id: "the-one-page-checklist" },
    { title: "Part one: the five documents that apply anywhere in India", id: "part-one-the-five-documents-that-apply-anywhere-in-india" },
    { title: "Part two: what these documents are called in Punjab", id: "part-two-what-these-documents-are-called-in-punjab" },
    { title: "Part three: buying from a builder or a development authority", id: "part-three-buying-from-a-builder-or-a-development-authority" },
    { title: "Part four: the transaction itself", id: "part-four-the-transaction-itself" },
    { title: "Part five: two cases from our own files", id: "part-five-two-cases-from-our-own-files" },
    { title: "Part six: red flags that end the conversation", id: "part-six-red-flags-that-end-the-conversation" },
    { title: "City-by-city: where you actually go", id: "city-by-city-where-you-actually-go" },
    { title: "Frequently asked questions", id: "frequently-asked-questions" },
    { title: "Before you sign anything", id: "before-you-sign-anything" },
    { title: "Related reading", id: "related-reading" },
    { title: "About the author", id: "about-the-author" },
  ];

  if (isPillarArticle) {
    return (
      <article className="min-h-screen bg-white text-charcoal pt-[var(--nav-height)] pb-24 font-body">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
            
            {/* Main Article Column */}
            <main className="w-full flex-1 min-w-0 max-w-[72ch] mx-auto lg:mx-0">
              <Link 
                href="/blog" 
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted hover:text-charcoal transition-colors mb-8"
              >
                <ArrowLeft size={16} /> Back to Insights
              </Link>

              {/* Category Badge & Reading Time */}
              <div className="flex items-center gap-4 mb-6 flex-wrap">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold border border-gold/20 px-4 py-1.5 rounded-full bg-gold/5">
                  {post.category || "Property Verification"}
                </span>
                <div className="flex items-center gap-2 text-muted text-[11px] font-medium uppercase tracking-widest">
                  <span>{format(parseISO(post.date), "MMMM dd, yyyy")}</span>
                  <span className="w-1 h-1 rounded-full bg-gold/30" />
                  <span>{post.readingTime}</span>
                </div>
              </div>

              {/* H1 Title */}
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-charcoal mb-8 leading-[1.1]">
                Documents Required to Buy Property in India: The Complete Verification Checklist
              </h1>

              {/* Author Badge */}
              <div className="flex items-center gap-5 p-1 pr-6 bg-charcoal/5 rounded-full w-fit border border-black/5 mb-10">
                <div className="w-10 h-10 rounded-full bg-white p-1.5 flex items-center justify-center shadow-md border border-black/5 overflow-hidden">
                  <Image 
                    src="/icon.png" 
                    alt="Realty Holding & Management Consultants" 
                    width={40} 
                    height={40}
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest text-muted font-bold">Author</span>
                  <span className="font-display text-base text-charcoal leading-none">{authorName}</span>
                </div>
              </div>

              {/* Cover Image */}
              {post.coverImage && (
                <div className="relative aspect-[16/9] rounded-3xl overflow-hidden mb-10 shadow-xl border border-black/5">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1200px) 100vw, 1200px"
                  />
                </div>
              )}

              {/* Answer Block */}
              <div className="bg-black/[0.02] p-6 sm:p-8 rounded-2xl border border-black/10 border-l-4 border-l-gold mb-10 text-base sm:text-lg leading-relaxed text-black/80">
                <p className="font-semibold text-charcoal mb-4">
                  Before you pay a single rupee for any property in India, verify five documents: the title or conveyance deed, the mother deed, the encumbrance certificate, the sale deed, and clearance receipts for property tax, electricity, water, and maintenance. If you are buying from a builder, add six more: the allotment letter, approved building plan, completion certificate, occupancy certificate, applicable NOCs, and permission to sell where a government authority is involved. At the transaction stage you need an agreement to sell on correct stamp paper, followed by a registered sale deed and then mutation in the revenue record. In Punjab these documents carry local names. Title proof is the fard and jamabandi. Transfer of record is the intkal. Both come from the Revenue Department, not from the seller.
                </p>
                <p className="text-sm text-muted italic m-0">
                  That paragraph is the whole answer. The rest of this page is how to actually get each document, what the seller will tell you instead, and where the process differs in Mohali, Chandigarh, Ludhiana, and Bathinda.
                </p>
              </div>

              {/* Interactive Tool Cross-link Banner */}
              <div className="bg-gold/10 p-6 rounded-2xl border border-gold/20 mb-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                  <span className="font-display text-xs uppercase tracking-widest text-gold font-bold block mb-1">
                    Interactive Due Diligence Tool
                  </span>
                  <p className="font-body text-sm font-medium text-charcoal m-0">
                    Use our free, ungated <Link href="/tools/property-document-checklist" className="underline text-gold font-bold hover:text-charcoal transition-colors">Property Document Verification Checklist</Link> to tick items as you verify them on-site.
                  </p>
                </div>
                <Link
                  href="/tools/property-document-checklist"
                  className="shrink-0 font-display text-xs font-bold uppercase tracking-wider bg-charcoal text-white px-6 py-3.5 rounded-xl hover:bg-black transition-colors shadow-sm"
                >
                  Open Interactive Tool &rarr;
                </Link>
              </div>

              {/* MDX Body Content */}
              <div className="prose prose-lg max-w-none text-black/80 prose-headings:font-serif prose-headings:text-charcoal prose-a:text-gold prose-a:no-underline hover:prose-a:underline prose-table:overflow-x-auto">
                <MdxContent code={post.body.code} />
              </div>

              {/* Inline WhatsApp CTA 1 */}
              <div className="my-12 p-8 bg-charcoal text-white rounded-2xl border border-white/10 shadow-xl">
                <h3 className="font-display text-2xl font-semibold mb-3 text-white">Need a due diligence review on your property file?</h3>
                <p className="text-white/80 text-base mb-6 font-body">
                  Send your document list to our advisory team in Phase 8A, Mohali before you pay token money. We will review your title chain, GMADA status, and revenue records. Read more about <Link href="/about" className="text-gold underline font-bold hover:text-white transition-colors">our advisory credentials on our About page</Link>.
                </p>
                <a
                  href="https://wa.me/917814613916"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block font-display text-xs font-bold uppercase tracking-widest bg-gold text-charcoal px-7 py-4 rounded-xl hover:bg-gold/90 transition-all shadow-md"
                >
                  Chat with an Advisor on WhatsApp &rarr;
                </a>
              </div>
            </main>

            {/* Table of Contents Sticky Sidebar (Desktop Only) */}
            <aside className="hidden lg:block w-[280px] shrink-0 sticky top-28 self-start bg-white p-6 rounded-2xl border border-black/10 shadow-sm">
              <h3 className="font-display text-xs font-bold uppercase tracking-widest text-gold mb-4 pb-2 border-b border-black/10">
                Table of Contents
              </h3>
              <nav className="flex flex-col space-y-2.5 font-body text-xs text-black/70">
                {tableOfContents.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="hover:text-gold transition-colors leading-relaxed"
                  >
                    {item.title}
                  </a>
                ))}
              </nav>
              <div className="mt-6 pt-4 border-t border-black/10 flex flex-col gap-2">
                <Link
                  href="/tools/property-document-checklist"
                  className="font-display text-xs font-bold text-gold hover:underline block"
                >
                  &rarr; Interactive Verification Tool
                </Link>
                <a
                  href="/downloads/RHMC-Property-Document-Checklist.pdf"
                  download
                  className="font-display text-xs text-muted hover:text-charcoal transition-colors block"
                >
                  &darr; Download Printable PDF
                </a>
              </div>
            </aside>

          </div>
        </div>
        <LeadPopup type="blog" />
      </article>
    );
  }

  const dynamicToc = post.body.raw
    ? post.body.raw
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.startsWith('## ') || line.startsWith('### '))
        .map((line) => {
          const rawTitle = line
            .replace(/^#{2,3}\s+/, '')
            .replace(/\*/g, '')
            .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
            .trim();
          const id = rawTitle
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-');
          return { title: rawTitle, id };
        })
        .filter((item) => item.title && item.id)
    : [];

  return (
    <article className="min-h-screen bg-white pt-[var(--nav-height)] pb-24 font-body">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {post.schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: post.schema }}
        />
      )}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Main Article Column */}
          <main className="w-full flex-1 min-w-0 max-w-[72ch] mx-auto lg:mx-0">
            <Link 
              href="/blog" 
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted hover:text-charcoal transition-colors mb-8"
            >
              <ArrowLeft size={16} /> Back to Insights
            </Link>

            <header className="mb-10">
              <div className="flex items-center gap-4 mb-6 flex-wrap">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold border border-gold/20 px-4 py-1.5 rounded-full bg-gold/5">
                  {post.category}
                </span>
                <div className="flex items-center gap-2 text-muted text-[11px] font-medium uppercase tracking-widest">
                  <span>{format(parseISO(post.date), "MMMM dd, yyyy")}</span>
                  <span className="w-1 h-1 rounded-full bg-gold/30" />
                  <span>{post.readingTime}</span>
                </div>
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-medium text-charcoal mb-8 leading-[1.1] tracking-tight">
                {post.title}
              </h1>
              <div className="flex items-center gap-5 p-1 pr-6 bg-charcoal/5 rounded-full w-fit border border-black/5">
                <div className="w-10 h-10 rounded-full bg-white p-1.5 flex items-center justify-center shadow-xl border border-black/5 overflow-hidden">
                  <Image 
                    src="/icon.png" 
                    alt="Realty Holding & Management Consultants" 
                    width={40} 
                    height={40}
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest text-muted font-bold">Author</span>
                  <span className="font-display text-base text-charcoal leading-none">{authorName}</span>
                </div>
              </div>
            </header>

            {post.coverImage && (
              <div className="relative aspect-[16/9] rounded-3xl overflow-hidden mb-10 shadow-xl border border-black/5">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1200px) 100vw, 1200px"
                />
              </div>
            )}

            <div className="prose prose-lg max-w-none text-black/80 prose-headings:font-serif prose-headings:text-charcoal prose-a:text-gold prose-a:no-underline hover:prose-a:underline prose-table:overflow-x-auto">
              <MdxContent code={post.body.code} />
            </div>

            <div className="mt-16 p-8 bg-charcoal text-white rounded-2xl border border-white/10 shadow-xl">
              <h3 className="font-display text-2xl font-semibold mb-3 text-white">Planning a property purchase in Mohali?</h3>
              <p className="text-white/80 text-base mb-6 font-body">
                Use our free <Link href="/tools/mortgage-calculator" className="text-gold font-bold underline hover:text-white transition-colors">EMI Calculator for Mohali property</Link> to estimate your monthly payments before you visit the site &rarr;
              </p>
              <a
                href="https://wa.me/917814613916"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block font-display text-xs font-bold uppercase tracking-widest bg-gold text-charcoal px-7 py-4 rounded-xl hover:bg-gold/90 transition-all shadow-md"
              >
                Chat with an Advisor on WhatsApp &rarr;
              </a>
            </div>
          </main>

          {/* Table of Contents Sticky Sidebar (Desktop Only) */}
          {dynamicToc.length > 0 && (
            <aside className="hidden lg:block w-[280px] shrink-0 sticky top-28 self-start bg-white p-6 rounded-2xl border border-black/10 shadow-sm">
              <h3 className="font-display text-xs font-bold uppercase tracking-widest text-gold mb-4 pb-2 border-b border-black/10">
                Table of Contents
              </h3>
              <nav className="flex flex-col space-y-2.5 font-body text-xs text-black/70 max-h-[60vh] overflow-y-auto pr-1">
                {dynamicToc.map((item, idx) => (
                  <a
                    key={`${item.id}-${idx}`}
                    href={`#${item.id}`}
                    className="hover:text-gold transition-colors leading-relaxed"
                  >
                    {item.title}
                  </a>
                ))}
              </nav>
              <div className="mt-6 pt-4 border-t border-black/10 flex flex-col gap-2.5">
                <Link
                  href="/tools/property-document-checklist"
                  className="font-display text-xs font-bold text-gold hover:underline block"
                >
                  &rarr; Verification Checklist Tool
                </Link>
                <a
                  href="https://wa.me/917814613916"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display text-xs text-muted hover:text-charcoal transition-colors block"
                >
                  &rarr; Chat with Advisory Team
                </a>
              </div>
            </aside>
          )}
        </div>
      </div>
      <LeadPopup type="blog" />
    </article>
  );
}

