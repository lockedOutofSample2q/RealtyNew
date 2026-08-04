# Schema Deployment Guide

**Prepared for:** Realty Holding & Management Consultants
**Date:** 26 July 2026

Three pages, one connected entity graph. This file says what goes where and how the pieces link.

---

## The pages

| URL | Purpose | Schema it carries |
|---|---|---|
| `/blog/documents-required-buying-property-india-checklist` | The pillar article | Article, FAQPage, BreadcrumbList |
| `/tools/property-document-checklist` | The interactive tool | HowTo, ItemList, WebApplication, FAQPage, BreadcrumbList |
| `/about` | Author and firm credentials | Person, RealEstateAgent |

The tool page schema is **already embedded** in `property-document-checklist-tool.html`. Nothing to paste there. The blog page schema is in the authority playbook. The `/about` schema is the Person and RealEstateAgent nodes, hosted canonically on that page.

---

## The rule that makes this work: shared @id

Every page repeats the same two `@id` values:

- `https://realtyconsultants.in/about#amritpal-singh`
- `https://realtyconsultants.in/#organization`

Define them in full **once**, on `/about`. On every other page, reference them by `@id` only:

```json
"author": { "@id": "https://realtyconsultants.in/about#amritpal-singh" },
"publisher": { "@id": "https://realtyconsultants.in/#organization" }
```

This is what tells a search engine that the Amritpal Singh on the blog, the one on the tool, and the one on the About page are one person, not three. Entity consolidation is the whole point. Get this wrong and each page builds authority separately, which means none of them build much.

The tool file currently carries full definitions of both nodes so it works standalone. Once `/about` is live with the canonical definitions, you can either leave them (harmless, schema.org merges on matching `@id`) or trim them to `@id` references.

---

## Cross-linking the two content pages

Add to the **blog page** schema:

```json
"mainEntity": { "@id": "https://realtyconsultants.in/tools/property-document-checklist#howto" },
"mentions": [{ "@id": "https://realtyconsultants.in/tools/property-document-checklist#checklist" }]
```

Add to the **tool page** HowTo node:

```json
"isPartOf": { "@id": "https://realtyconsultants.in/blog/documents-required-buying-property-india-checklist#article" }
```

Now the engine sees one subject covered in two formats by one entity, rather than two competing pages.

---

## Why each type is here

**HowTo** is the highest-value type on this subject. It is one of the few schema types AI engines use to reconstruct a process answer rather than just quoting a sentence. Five `HowToSection` blocks with 25 `HowToStep` items means an engine asked "how do I verify property documents in Punjab" has a complete structured answer available.

**ItemList** makes the checklist itself machine-readable as a list, which is the exact shape of the query. Twenty-five positioned items.

**WebApplication** with `isAccessibleForFree: true` and a zero-price Offer signals this is a free tool. Useful for tool-intent queries and for surfacing in "free property checklist" style searches.

**FAQPage** mirrors the on-page answers word for word. Matching visible text and schema text raises extraction confidence. Do not let the two drift apart.

**Person with hasCredential** is the E-E-A-T carrier. AMFI, NCFM, and the postgraduate qualification are declared as structured credentials rather than prose, and `knowsAbout` states the subjects the author is authoritative on.

---

## Deployment steps

1. Publish `/about` first, with the full Person and RealEstateAgent definitions. Everything else references it.
2. Publish the tool. Schema is already inline.
3. Publish the blog with the Article, FAQPage, and BreadcrumbList block from the authority playbook, plus the cross-links above.
4. Run each URL through Google's Rich Results Test and the Schema.org validator. Fix errors, ignore benign warnings about optional fields.
5. Submit all three URLs in Search Console. Request indexing.
6. Confirm the NAP block on every page is byte-identical to the Google Business Profile listing:
   - Realty Holding & Management Consultants
   - E328, Phase 8A, Industrial Area, Mohali
   - +91 78146 13916
   - https://realtyconsultants.in

---

## Maintenance

Stamp duty rates, GMADA fees, and RERA positions change. When any figure changes:

1. Update the visible text on the page.
2. Update the matching FAQPage answer, word for word.
3. Update `dateModified`.

Freshness is a ranking and citation signal, particularly for Perplexity. A quarterly review costs an hour and keeps the page ahead of the competing content, which is mostly never updated at all.

---

## What to validate before going live

- [ ] JSON-LD parses without error on all three URLs
- [ ] `@id` values identical across pages, character for character
- [ ] FAQPage answers match the visible on-page text exactly
- [ ] ItemList `numberOfItems` matches the actual item count
- [ ] Rich Results Test shows FAQ and HowTo as eligible
- [ ] NAP identical across pages and Google Business Profile
- [ ] Canonical URLs set and self-referencing
- [ ] Tool page is not blocked in robots.txt and not set to noindex
