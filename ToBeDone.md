# To Be Done: Ahrefs Site Audit Low-Severity Items

This file tracks the low-severity issues (Notices and minor Warnings) identified in the Ahrefs Site Audit for **realtyconsultants.in** (Project ID: 9825253). These items should be addressed in subsequent optimization sprints.

---

## 📋 General Notices & Audits

### 1. Structured Data Optimization
- **Structured data has schema.org validation error** (44 pages affected)
  - *Context:* Minor schema nesting issues or missing recommended attributes in the custom page schemas.
  - *Action:* Validate custom JSON-LD payloads for blogs and listings on the official [Schema.org Validator](https://validator.schema.org/).
- **Structured data has Google rich results validation error** (37 pages affected)
  - *Context:* Missing recommended fields (e.g. `priceRange`, `telephone` for local business schemas, or warning on product reviews).
  - *Action:* Fix warnings in Google Search Console's Rich Results Tool to ensure optimal snippet rendering.

### 2. Internal Linking & Crawl Equity
- **Page has only one dofollow incoming internal link** (12 pages affected)
  - *Context:* Thin internal link profile for some deep blog posts or old property detail pages.
  - *Action:* Run an internal linking sweep to add contextual links from higher-traffic pages or main directories (e.g. the blog hub).
- **Page has links to redirect** (9 pages affected)
  - *Context:* Internal links referencing URLs that perform a 301/302 redirect.
  - *Action:* Update the `href` values on these pages to point directly to the destination canonical URLs (e.g. change links pointing to `/properties` to `/properties/flats`).

### 3. External & Technical Audits
- **External 4XX / Broken Links** (4 external links affected)
  - *Context:* Outbound links to external resources that return a 404 or other 4XX errors.
  - *Action:* Replace or remove the dead outbound links.
- **External 3XX redirect** (5 external links affected)
  - *Context:* Outbound links that go through a redirect hop.
  - *Action:* Update the outbound link targets to their direct canonical destinations.
- **HTTP to HTTPS redirect / Redirect chain** (3 pages affected)
  - *Context:* Instances of internal links utilizing `http://` instead of `https://`, or triggering a multi-hop redirect chain.
  - *Action:* Standardize all internal links to use secure `https://` protocol and canonical paths.

---

## 📈 Content & Metadata Tweaks

- **Meta description too short** (3 pages affected)
  - *Action:* Expand short meta descriptions to be between 120-160 characters for maximum search snippet coverage.
- **Title too long** (2 pages affected)
  - *Action:* Shorten page titles that exceed 60 characters to avoid truncation in Google Search Results.
- **Page and SERP titles do not match** (2 pages affected)
  - *Context:* Instances where Google rewrote the title in the Search Results page because the `<title>` tag was not optimal or aligned with page headers.
  - *Action:* Align the page `<title>` tag more closely with the primary `<h1>` text.

---

## ✅ Resolved in This Sprint
The following warning/notice items from the crawl audit were fixed during the current optimization sweep:
1. **Multiple H1 tags** (30 pages affected): Resolved duplicate H1 headings across 28 builder profile pages, the `/about` page, and the `property-rates-mohali-2026-gmada-chandigarh-aerocity-guide` blog post.
2. **H1 tag missing or empty** (18 pages affected): Resolved by moving the `h1_heading` and intro paragraphs outside of the `<Suspense>` client component boundary in the sector detail page router (`/properties/flats/[slug]`), ensuring they are rendered fully on the server.
3. **Non-canonical page in sitemap** (10 pages affected): Removed global fallback canonical URL in favor of self-referencing static page metadata canonicals.
4. **Orphan page (no incoming internal links)** (14 pages affected): Fixed by refactoring the Builders client page to render all 28 developers in the initial markup, rather than hiding them using client-side Javascript.
5. **Page has broken JavaScript / Leaflet SSR crashes** (7 pages affected): Relocated global Leaflet window-dependent declarations into client-side lifecycle hooks.
