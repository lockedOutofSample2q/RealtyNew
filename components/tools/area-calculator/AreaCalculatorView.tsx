// components/tools/area-calculator/AreaCalculatorView.tsx
import Link from "next/link";
import { AreaPageContent } from "@/content/area-calculator";
import { AreaCalculatorClient } from "./AreaCalculatorClient";
import { UNITS, REGIONS, convertArea, formatValue, SystemId } from "@/lib/area-units";
import { ChevronRight, BookOpen, ShieldCheck, CheckCircle2, Info, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";

interface AreaCalculatorViewProps {
  content: AreaPageContent;
}

export function AreaCalculatorView({ content }: AreaCalculatorViewProps) {
  const isHub = content.tier === "hub";
  const activeRegion: SystemId = content.defaultRegion || "mohali";
  const fromUnit = UNITS.find((u) => u.id === (content.fromUnitId || "bigha")) || UNITS[0];
  const toUnit = UNITS.find((u) => u.id === (content.toUnitId || "sqft")) || UNITS[8];

  // Common values table data for conversion pages (1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 50, 100, 500, 1000)
  const commonSteps = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 50, 100, 500, 1000];

  // JSON-LD @graph construction
  const canonicalUrl = isHub
    ? `${siteConfig.url}/tools/area-calculator`
    : `${siteConfig.url}/tools/area-calculator/${content.slug}`;

  const jsonLdGraph: any[] = [
    {
      "@type": "WebApplication",
      "@id": `${canonicalUrl}#application`,
      "name": content.title,
      "url": canonicalUrl,
      "description": content.metaDescription,
      "applicationCategory": "UtilitiesApplication",
      "operatingSystem": "Any",
      "isAccessibleForFree": true,
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "INR",
      },
      "publisher": {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        "name": siteConfig.name,
        "url": siteConfig.url,
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${canonicalUrl}#breadcrumb`,
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": siteConfig.url,
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Tools",
          "item": `${siteConfig.url}/tools`,
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": isHub ? "Land Area Calculator" : content.h1,
          "item": canonicalUrl,
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${canonicalUrl}#faq`,
      "mainEntity": content.questions.map((q) => ({
        "@type": "Question",
        "name": q.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": q.answer,
        },
      })),
    },
    {
      "@type": "WebPage",
      "@id": `${canonicalUrl}#webpage`,
      "url": canonicalUrl,
      "name": content.title,
      "description": content.metaDescription,
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": ["[data-answer]", "#key-facts-list"],
      },
    },
  ];

  // DefinedTermSet & DefinedTerm for entity recognition
  jsonLdGraph.push({
    "@type": "DefinedTermSet",
    "@id": `${canonicalUrl}#termset`,
    "name": "Punjab Land Measurement Terms",
    "hasDefinedTerm": UNITS.map((u) => ({
      "@type": "DefinedTerm",
      "name": u.name,
      "alternateName": u.aliases,
      "description": u.note || `${u.name} is a traditional land area measurement unit used in India and Punjab revenue records.`,
      "inDefinedTermSet": `${canonicalUrl}#termset`,
    })),
  });

  // TechArticle for Tier 3 entity pages
  if (content.tier === "entity") {
    jsonLdGraph.push({
      "@type": "TechArticle",
      "@id": `${canonicalUrl}#article`,
      "headline": content.h1,
      "description": content.metaDescription,
      "author": {
        "@type": "Organization",
        "name": siteConfig.name,
        "url": siteConfig.url,
      },
      "datePublished": "2026-07-26",
      "dateModified": "2026-07-26",
    });
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": jsonLdGraph,
  };

  return (
    <div className="pt-[var(--nav-height)] min-h-screen bg-white text-black font-body">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Header */}
      <section className="bg-black/[0.02] border-b border-black/10 py-10 sm:py-14">
        <div className="container-site space-y-4">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-muted">
            <Link href="/" className="hover:text-charcoal transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-muted/60" />
            <Link href="/tools" className="hover:text-charcoal transition-colors">Tools</Link>
            <ChevronRight className="w-3 h-3 text-muted/60" />
            {isHub ? (
              <span className="text-charcoal font-medium">Area Calculator</span>
            ) : (
              <>
                <Link href="/tools/area-calculator" className="hover:text-charcoal transition-colors">
                  Area Calculator
                </Link>
                <ChevronRight className="w-3 h-3 text-muted/60" />
                <span className="text-charcoal font-medium truncate max-w-[200px] sm:max-w-none">
                  {content.h1}
                </span>
              </>
            )}
          </nav>

          <h1 className="text-4xl sm:text-5xl font-serif font-medium text-charcoal tracking-tight leading-tight">
            {content.h1}
          </h1>

          {/* Answer Block with Gold Accent Border */}
          <div data-answer className="bg-black/[0.02] p-5 sm:p-6 rounded-2xl border border-black/10 border-l-4 border-l-gold text-base sm:text-lg leading-relaxed text-charcoal/90 font-body max-w-4xl shadow-sm">
            {content.answerBlock}
          </div>
        </div>
      </section>

      {/* Main Interactive Tool Section */}
      <section className="py-10 border-b border-black/10">
        <div className="container-site">
          <AreaCalculatorClient
            initialValue={content.fromUnitId === "sqft" ? 1000 : 1}
            initialFromUnit={content.fromUnitId || "bigha"}
            initialRegion={activeRegion}
          />
        </div>
      </section>

      {/* SEO & AEO Content Layer */}
      <section className="py-14 bg-white">
        <div className="container-site max-w-4xl space-y-12">
          {/* Key Facts List (<dl>) */}
          <div id="key-facts-list" className="bg-black/[0.02] border border-black/10 rounded-2xl p-6 space-y-4">
            <h2 className="text-lg font-serif font-semibold text-charcoal flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-gold" />
              Key Facts & Revenue Parameters
            </h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {content.keyFacts.map((fact, idx) => (
                <div key={idx} className="bg-white border border-black/10 p-4 rounded-xl shadow-sm">
                  <dt className="text-xs font-semibold text-muted uppercase tracking-wider">
                    {fact.term}
                  </dt>
                  <dd className="text-sm font-semibold text-charcoal font-display mt-1">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Formula & Worked Example Block */}
          <div className="bg-white border border-black/10 rounded-2xl p-6 space-y-4 shadow-sm">
            <h2 className="text-xl font-serif font-semibold text-charcoal">
              Conversion Formula & Worked Example
            </h2>
            <div className="bg-charcoal text-white/90 p-4 rounded-xl font-mono text-sm space-y-1">
              <div>{content.formula.forward}</div>
              <div>{content.formula.reverse}</div>
            </div>
            <p className="text-sm text-charcoal/80 leading-relaxed font-body">
              <strong>Worked Example:</strong> {content.formula.example}
            </p>
          </div>

          {/* Real HTML Tables */}
          {/* Table 1: Common Step Values */}
          {!isHub && (
            <div className="space-y-4">
              <h2 className="text-2xl font-serif font-semibold text-charcoal">
                Common Conversion Values: {fromUnit.name} to {toUnit.name}
              </h2>
              <div className="overflow-x-auto border border-black/10 rounded-2xl shadow-sm">
                <table className="w-full text-left text-sm border-collapse font-sans">
                  <caption className="sr-only">
                    Conversion table for {fromUnit.name} to {toUnit.name}
                  </caption>
                  <thead className="bg-charcoal text-white text-xs uppercase font-bold tracking-wider">
                    <tr>
                      <th scope="col" className="px-4 py-3.5 text-white">{fromUnit.name}</th>
                      <th scope="col" className="px-4 py-3.5 text-white">{toUnit.name}</th>
                      <th scope="col" className="px-4 py-3.5 text-white">Square Feet Equivalent</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/5 bg-white">
                    {commonSteps.map((val) => {
                      const converted = convertArea(val, fromUnit.id, toUnit.id, activeRegion);
                      const sqftVal = convertArea(val, fromUnit.id, "sqft", activeRegion);
                      return (
                        <tr key={val} className="hover:bg-gold/5 transition-colors">
                          <td className="px-4 py-3.5 font-semibold text-charcoal">
                            {val} {val === 1 ? fromUnit.name : fromUnit.plural}
                          </td>
                          <td className="px-4 py-3.5 font-medium text-charcoal">
                            {formatValue(converted)} {toUnit.plural}
                          </td>
                          <td className="px-4 py-3.5 text-muted font-mono">
                            {formatValue(sqftVal)} sq ft
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Table 2: Regional Variation Table across all 6 Punjab Systems */}
          <div className="space-y-4">
            <h2 className="text-2xl font-serif font-semibold text-charcoal">
              Regional Variations Across Punjab Revenue Systems
            </h2>
            <div className="overflow-x-auto border border-black/10 rounded-2xl shadow-sm">
              <table className="w-full text-left text-sm border-collapse font-sans">
                <caption className="sr-only">
                  Comparison of measurement systems across Punjab districts
                </caption>
                <thead className="bg-charcoal text-white text-xs uppercase font-bold tracking-wider">
                  <tr>
                    <th scope="col" className="px-4 py-3.5 text-white">System & Region</th>
                    <th scope="col" className="px-4 py-3.5 text-white">Karam</th>
                    <th scope="col" className="px-4 py-3.5 text-white">1 Marla</th>
                    <th scope="col" className="px-4 py-3.5 text-white">1 Kanal</th>
                    <th scope="col" className="px-4 py-3.5 text-white">1 Bigha</th>
                    <th scope="col" className="px-4 py-3.5 text-white">Kanals / Acre</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5 bg-white">
                  {Object.values(REGIONS).map((reg) => {
                    const marlaSqft = convertArea(1, "marla", "sqft", reg.id);
                    const kanalSqft = convertArea(1, "kanal", "sqft", reg.id);
                    const bighaSqft = convertArea(1, "bigha", "sqft", reg.id);
                    const kanalsPerAcre = 43560 / kanalSqft;

                    return (
                      <tr key={reg.id} className="hover:bg-gold/5 transition-colors">
                        <td className="px-4 py-3.5 font-medium text-charcoal max-w-[200px]">
                          <div className="font-semibold">{reg.shortName}</div>
                          <div className="text-xs text-muted truncate">{reg.name}</div>
                        </td>
                        <td className="px-4 py-3.5 text-charcoal/80">{reg.karamInches} in</td>
                        <td className="px-4 py-3.5 font-mono text-charcoal/90">{formatValue(marlaSqft)} sq ft</td>
                        <td className="px-4 py-3.5 font-mono text-charcoal/90">{formatValue(kanalSqft)} sq ft</td>
                        <td className="px-4 py-3.5 font-mono text-charcoal/90">{formatValue(bighaSqft)} sq ft</td>
                        <td className="px-4 py-3.5 font-semibold text-gold">{kanalsPerAcre.toFixed(2)} kanal</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Prose Sections with Question-form H2s */}
          <div className="space-y-8">
            {content.sections.map((section, idx) => (
              <div key={idx} className="space-y-3">
                <h2 className="text-2xl font-serif font-semibold text-charcoal tracking-tight">
                  {section.title}
                </h2>
                <p className="text-base text-charcoal/80 leading-relaxed font-body">
                  {section.content}
                </p>
              </div>
            ))}
          </div>

          {/* Citations & Statistics */}
          <div className="bg-black/[0.02] border border-black/10 rounded-2xl p-6 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gold flex items-center gap-1.5 font-display">
              <BookOpen className="w-4 h-4 text-gold" />
              Statutory Citations & Source Documentation
            </h3>
            <ul className="space-y-2 text-sm text-charcoal/80">
              {content.citations.map((cite, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <ArrowUpRight className="w-4 h-4 text-gold shrink-0" />
                  <a
                    href={cite.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-charcoal hover:text-gold transition-colors underline-offset-4"
                  >
                    {cite.title}
                  </a>
                  <span className="text-muted text-xs">({cite.source})</span>
                </li>
              ))}
            </ul>
            <div className="pt-3 border-t border-black/10 text-xs text-muted space-y-1">
              <p><strong className="text-charcoal">Verified Statistic:</strong> {content.statistic}</p>
              <p><strong className="text-charcoal">Provenance:</strong> {content.provenance}</p>
              <p className="text-muted italic pt-1">
                "Revenue practice varies by tehsil and by whether the area was consolidated. Before any registry, confirm the conversion against the jamabandi and the local patwari record."
              </p>
            </div>
          </div>

          {/* E-E-A-T Block (Reviewed By line) */}
          <div className="p-4 bg-gold/5 border border-gold/20 rounded-2xl flex items-center gap-3 shadow-sm text-xs text-charcoal/80">
            <CheckCircle2 className="w-5 h-5 text-gold shrink-0" />
            <div>
              Reviewed by the advisory team at{" "}
              <Link href="/about" className="font-bold text-charcoal hover:text-gold transition-colors">
                Realty Holding and Management Consultants, Mohali
              </Link>
              . 180+ transactions closed across residential, agricultural, industrial and commercial land in Punjab.
            </div>
          </div>

          {/* FAQ Section */}
          <div className="space-y-6 pt-4 border-t border-black/10">
            <h2 className="text-2xl font-serif font-semibold text-charcoal">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {content.questions.map((q, idx) => (
                <div key={idx} className="bg-white border border-black/10 p-6 rounded-2xl space-y-2 shadow-sm">
                  <h3 className="text-base font-semibold font-serif text-charcoal">
                    {q.question}
                  </h3>
                  <p className="text-sm text-charcoal/80 leading-relaxed font-body">
                    {q.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Internal Links Grid */}
          <div className="pt-8 border-t border-black/10 space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted font-display">
              Related Conversion Tools & Reference Guides
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              {content.siblingLinks.map((link, idx) => (
                <Link
                  key={idx}
                  href={`/tools/area-calculator/${link.slug}`}
                  className="p-3.5 bg-black/[0.02] border border-black/10 hover:border-gold/40 hover:bg-gold/5 rounded-xl text-charcoal font-medium transition-colors flex items-center justify-between"
                >
                  <span>{link.anchorText}</span>
                  <ChevronRight className="w-4 h-4 text-gold" />
                </Link>
              ))}
              {content.entityLinks?.map((link, idx) => (
                <Link
                  key={`ent-${idx}`}
                  href={`/tools/area-calculator/${link.slug}`}
                  className="p-3.5 bg-gold/5 border border-gold/20 hover:border-gold rounded-xl text-charcoal font-medium transition-colors flex items-center justify-between"
                >
                  <span>{link.anchorText}</span>
                  <ChevronRight className="w-4 h-4 text-gold" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
