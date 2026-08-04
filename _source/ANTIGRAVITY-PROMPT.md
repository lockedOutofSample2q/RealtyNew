# Antigravity Implementation Prompt

**Before you paste this:** copy the `_source/` folder from this package into `C:/Desktop/monter/` so the path is `C:/Desktop/monter/_source/`.

It should contain:

```
_source/
  documents-required-buying-property-india-punjab-checklist.mdx
  property-document-checklist-tool.html
  checklist-data.json
  RHMC-Property-Document-Checklist.pdf
  PROPERTY-CHECKLIST-SCOPE-AND-CONTENT.txt
  citation-answer-blocks.md
  schema-deployment-guide.md
  authority-playbook-property-documentation-punjab.md
  search-intent-and-keyword-research.md
```

Then paste everything below the line into Antigravity.

---
---

# MISSION

You are implementing a three-page content and tooling addition to the Realty Holding & Management Consultants website. The repository is at `C:/Desktop/monter`.

This is a real estate advisory firm in Mohali, Punjab. The goal of these pages is twofold: give a person who is actively buying property something genuinely useful they can carry into a site visit, and make this site the source that Google AI Overviews, ChatGPT, Perplexity and Gemini cite when someone asks what documents are needed to buy property in India or Punjab.

Everything you need is already written. Your job is implementation, not authoring. **Do not rewrite, summarise, shorten, or "improve" any of the supplied copy.** It is calibrated for a specific brand voice and specific search queries. Changing a sentence can break a citation target.

---

# HOW THIS ACTUALLY GETS USED

Read this before you build. It is the reasoning behind requirements that will
otherwise look arbitrary, and it should drive your judgment on anything this
prompt does not specify.

The user is not browsing. They are mid-transaction, with money at stake, in a
process they do not feel qualified to navigate. There are four distinct moments.

### Moment 1: At their desk, papers in front of them

They have found a property. The seller has sent a bundle of photographed
documents over WhatsApp. They search something like "what documents to check
before buying a plot", land on the tool, and start working down the list against
what they were actually sent.

**What this requires of the build:**

- The filter is the first thing they touch. Someone buying a resale flat should
  not be reading about CLU orders for agricultural land. Filtering must be
  immediate and obvious, not buried below the fold.
- The "ask the seller" line matters more than the description. It is the exact
  wording for a conversation they feel unqualified to have. It must be visually
  distinct and never truncated or collapsed behind a toggle.
- Red flags must be visible at a glance, without expanding anything.
- They will be on this page for 10 to 20 minutes and will scroll it repeatedly.
  Scroll position must survive filtering. Nothing may reflow under their cursor.

### Moment 2: Handing it to their lawyer or spouse

They tick what they have verified, copy the link, and send it. The recipient
opens it and sees the same state.

**What this requires of the build:**

- This is the reason state lives in the URL and not in browser storage. It is
  the feature that makes the tool circulate instead of being used once and
  forgotten. Do not substitute an account, a saved session, or a "download your
  progress" file.
- The share button must confirm it worked. A silent clipboard write reads as a
  broken button.
- A link opened cold must restore state correctly with no flash of an unchecked
  list before hydration.

### Moment 3: Standing on the plot

Printed, on paper, in hand, in the sun, with the seller watching.

**What this requires of the build:**

- Checkboxes print empty regardless of screen state, so the sheet works as a
  fresh worksheet.
- Only the filtered items print. Someone buying a GMADA plot should not carry
  four pages of builder-project items.
- Nothing clipped at page edges. No item split across a page break.
- No controls, buttons, or navigation on the printed sheet.

### Moment 4: The firm sends the link instead of explaining

Someone messages asking what papers they need. Instead of typing the same answer
again, the firm sends this URL. It also goes in YouTube descriptions, the Google
Business Profile, and replies on forums.

**What this requires of the build:**

- The page must stand alone with no context. A cold visitor arriving from a
  WhatsApp link needs to understand within one screen what this is, who made it,
  and that it is free.
- It must load fast on a mid-range Android phone on mobile data.
- Social preview metadata matters. This link will be pasted into chat apps far
  more often than it will be clicked from search results.

### The business logic, so you understand the constraints

There is no lead capture anywhere in this, deliberately. A person who has ticked
19 of 25 items and stalled on the occupancy certificate is already the most
qualified lead this firm can get. They will make contact because they have a
specific problem, not because a form asked them to.

Any friction added to help conversion will reduce conversion here. That is why
the no-gating rule is absolute rather than a preference.

The second reason is mechanical: content behind a form, or content that only
exists after JavaScript runs, cannot be read by the AI engines this page is
built to be cited by. Gating it would defeat the page's other purpose entirely.

---

# PHASE 0: DISCOVERY (do this first, report before building)

Do not write any code until you have completed this phase and reported findings.

1. Read `package.json`, any framework config (`next.config.*`, `astro.config.*`, `vite.config.*`, `gatsby-config.*`), and `tsconfig.json` if present.
2. Map the routing convention. Find where existing pages live and how routes are declared.
3. Find how an existing page sets its `<title>`, meta description, canonical URL, and Open Graph tags. You will follow the same mechanism.
4. Determine whether MDX is already supported. Check for `@next/mdx`, `contentlayer`, `@astrojs/mdx`, `next-mdx-remote`, `mdx-bundler`, or similar. If none exists, report this and propose the lightest option that fits the stack before installing anything.
5. Identify the styling system: Tailwind, CSS Modules, styled-components, SCSS, plain CSS. You will use whatever is already there. Do not introduce a second styling system.
6. Find any existing blog or article route and note its layout, typography scale, and component structure.
7. Check for an existing JSON-LD or structured data helper. If one exists, use it.
8. Check `robots.txt` and any sitemap generation. You will need to add the new routes.
9. Note the site's existing colour tokens and font stack.

**Report back:** framework and version, routing convention, MDX status, styling system, metadata mechanism, existing schema helper, sitemap mechanism. Then propose your file plan and wait for approval before building.

---

# WHAT YOU ARE BUILDING

Three routes.

| Route | Type | Source of truth |
|---|---|---|
| `/blog/documents-required-buying-property-india-checklist` | Long-form pillar article | `_source/documents-required-buying-property-india-punjab-checklist.mdx` |
| `/tools/property-document-checklist` | Interactive checklist tool | `_source/property-document-checklist-tool.html` + `_source/checklist-data.json` |
| `/about` | Author and firm credentials | Spec in this prompt, section "PAGE 3" |

Plus one static asset:

| Asset | Path | Source |
|---|---|---|
| Printable PDF | `/downloads/RHMC-Property-Document-Checklist.pdf` | `_source/RHMC-Property-Document-Checklist.pdf` |

---

# THE FIVE NON-NEGOTIABLE RULES

These override any convention you find in the codebase. If one conflicts with existing patterns, flag it and follow the rule.

### Rule 1: All checklist content must be in the server-rendered HTML

The 25 checklist items, their descriptions, their "ask the seller" lines and their red flags must be present in the HTML that arrives from the server, before any JavaScript runs.

JavaScript may only *layer interactivity on top*: toggling checkbox state, filtering visibility with a CSS class, calculating progress, encoding the share URL.

**Never** render checklist items from a client-side `map()` in a component that only runs in the browser. If a crawler with JS disabled cannot read every item, the page has failed its primary purpose.

Verify this by running `curl` on the built page, or by disabling JavaScript in DevTools and confirming all 25 items are visible.

### Rule 2: No gating, no capture, no interstitials

No email form. No phone number wall. No modal. No "download the PDF by entering your details." No cookie-consent overlay that blocks content on first paint. No newsletter popup.

The only conversion element is a WhatsApp link and a booking link, both plain anchors, both below the content.

### Rule 3: No browser storage APIs

Do not use `localStorage`, `sessionStorage`, `IndexedDB`, or cookies for checklist state.

State lives in the URL hash. The supplied implementation encodes the 25 checkbox states as a bitfield converted to base36 and writes it to `location.hash` via `history.replaceState`. This has been round-trip tested across 3,000 random states with zero failures. Port it as written.

This is deliberate: it makes progress shareable. A buyer can tick what they have verified and send the link to their lawyer.

### Rule 4: The answer comes first

On both content pages, the first substantive block after the H1 is a complete, standalone answer to the page's core question. It must appear within the first 150 words.

Do not put a hero image, a breadcrumb bar, a table of contents, an author card, or a "reading time" widget between the H1 and the answer block. Those go after.

### Rule 5: FAQ schema text must match visible page text exactly

Every answer in the `FAQPage` JSON-LD must be character-identical to the corresponding answer visible on the page. If you edit one, edit both. Mismatches reduce extraction confidence.

---

# PAGE 1: THE PILLAR ARTICLE

**Route:** `/blog/documents-required-buying-property-india-checklist`
**Source:** `_source/documents-required-buying-property-india-punjab-checklist.mdx`

The MDX file has YAML frontmatter with `title`, `metaTitle`, `description`, `slug`, `canonical`, `date`, `updated`, `category`, `author`, `readingTime`, `primaryKeyword`, `secondaryKeywords`, and `serviceAreas`. Wire these into the site's metadata mechanism.

**Body:** approximately 4,400 words. Render as-is. Preserve every heading level, every table, and the horizontal rules that separate sections.

**Rendering requirements:**

- Tables must be responsive. On mobile, allow horizontal scroll within the table rather than shrinking text below 13px or breaking the layout.
- Max line length 70 to 75 characters for body copy. This is a long read and line length is the single biggest factor in whether people finish it.
- The `## Frequently asked questions` section uses bold question lines followed by answer paragraphs. Render each question as an H3 so it becomes a linkable anchor and appears in the table of contents.
- Generate slug anchors on all H2 and H3 headings.
- Add a sticky or floating table of contents on desktop, built from the H2 headings. Hide it on mobile. It must be generated from the rendered headings, not hardcoded.
- The `## Related reading` section contains six internal links. Five of those target pages do not exist yet. Render them as normal links. Do not remove them and do not create placeholder pages.

**Two CTA placements, one action.** The article has an existing CTA under `## Before you sign anything`. Add one additional inline CTA block after the `## Part five: two cases from our own files` section. Both point to the same WhatsApp link. Do not invent a second, different call to action.

**Schema for this page:** `Article` + `FAQPage` + `BreadcrumbList`.

- The `Article` and `BreadcrumbList` blocks are in `_source/authority-playbook-property-documentation-punjab.md` under "Layer 2: Schema markup". Use them verbatim.
- For `FAQPage`, use `_source/article-faq-schema.json`. It contains all 10 questions with answers already matched character for character to the article text. Do not use the abbreviated 5-question version in the playbook file, which predates it.
- Then add the cross-links specified in `_source/schema-deployment-guide.md`.

---

# PAGE 2: THE INTERACTIVE TOOL

**Route:** `/tools/property-document-checklist`
**Reference implementation:** `_source/property-document-checklist-tool.html`
**Data:** `_source/checklist-data.json`

The reference HTML file is a complete, working, self-contained implementation. Read it fully before you start. Your job is to port it into the site's component architecture while preserving its behaviour exactly.

## Data shape

Move `checklist-data.json` into the project's data or content directory. Structure:

```
{
  version, updated,
  publisher: { name, address, phone, whatsapp, email, url, booking },
  filters: [ { key, label } ],          // 5 filters: all, resale, builder, authority, land
  stages: [
    {
      stage,        // 1-5
      eyebrow,      // "Stage 1"
      title,        // "Before you pay a single rupee"
      intro,        // one-line description
      items: [
        {
          id,           // kebab-case slug, use as the DOM id and anchor
          title,        // "Title or conveyance deed"
          localName,    // "Punjab: fard, jamabandi, CD" or null
          description,  // one or two sentences
          meta: [ { label, value } ],   // "Issued by", "Verify", "Timeline", etc.
          ask,          // the question to put to the seller, or null
          flag,         // { label, text } or null
          appliesTo     // subset of ["resale","builder","authority","land"]
        }
      ]
    }
  ]
}
```

**25 items across 5 stages: 5, 7, 4, 4, 5.** 21 items have an `ask`. 11 have a `flag`. Every item has at least one `appliesTo` tag.

## Required behaviour

**Filtering.** Five filter chips. `all` shows everything. The other four show only items whose `appliesTo` includes that key. When a filter empties an entire stage, hide that stage's header too. Filtering must not reset checkbox state.

**Checkboxes.** Custom elements with `role="checkbox"`, `aria-checked`, and `tabindex="0"`. They must respond to click, Space, and Enter. Checking an item strikes through its title. Do not use native `<input type=checkbox>` styled with `appearance:none` unless the site already does that elsewhere.

**Progress.** A counter reading "N of M verified" plus a progress bar. M is the count of *currently visible* items, not the total. Filtering to "From a builder" changes M to 21.

**Share link.** Copies `origin + pathname + '#s=' + encoded` to clipboard and shows a transient toast: "Link copied. Send it to your lawyer to share your progress." On load, read `location.hash` for `s=` and restore state. Port the encode/decode functions exactly:

```js
function encode(boxes) {
  const bits = boxes.map(b => b.getAttribute('aria-checked') === 'true' ? '1' : '0').join('');
  return parseInt(bits, 2).toString(36);
}
function decode(h, count) {
  const n = parseInt(h, 36);
  if (isNaN(n)) return null;
  let bits = n.toString(2);
  while (bits.length < count) bits = '0' + bits;
  return [...bits].map(c => c === '1');
}
```

**Print.** A button calling `window.print()`. The print stylesheet in the reference file is tuned to produce a clean 4-page A4 document. Port it. Specifically it must: hide the controls, actions, toast and tags; keep `.item` blocks from breaking across pages; render checkboxes as empty outlines regardless of checked state so the printout is usable as a fresh worksheet; and force background colours on stage headers and callouts with `print-color-adjust: exact`.

**Reset.** Clears all checkboxes, updates the hash, shows a toast.

## Also on this page

- The AEO answer block, three paragraphs, immediately after the H1. Copy is in the reference file under `<div class="answer">`.
- Two reference tables after the checklist: "What these documents are called in Punjab" (8 rows) and "Which office controls what" (6 rows).
- The "When to walk away" panel, 8 bullets.
- A visible "Frequently asked questions" section, 10 questions rendered as H3 headings with answer paragraphs. These must match the `FAQPage` schema character for character. Both are in the reference file.
- The CTA block and author bio.
- A link to download `/downloads/RHMC-Property-Document-Checklist.pdf`, labelled as the printable version. Direct link, no gate.

**Schema for this page:** already written and embedded at the bottom of the reference HTML file. It contains `HowTo` (5 sections, 25 steps), `ItemList` (25 items), `WebApplication`, `Person`, `RealEstateAgent`, `FAQPage` (10 questions), and `BreadcrumbList`. Lift the entire `@graph` and inject it through the site's JSON-LD mechanism. It has been validated as parsing cleanly.

---

# PAGE 3: THE ABOUT PAGE

**Route:** `/about`

If this page already exists, extend it rather than replacing it. It must end up carrying the canonical `Person` and `RealEstateAgent` schema nodes, because every other page references them by `@id`.

**Author bio, use verbatim:**

> Amritpal Singh founded Realty Holding & Management Consultants after a career that placed him on every side of the real estate transaction. He has worked as a consultant, built projects as a developer, navigated five Punjab government regulatory bodies to obtain project approvals (PUDA, PSPCL, Forest Department, Municipal Committee, and Industrial Departments), and personally resolved property disputes ranging from builder-buyer conflicts and title disputes to municipal tax disagreements. He holds AMFI and NCFM certifications in capital markets and derivatives, a postgraduate qualification in Advertising and Public Relations, and has worked as a newspaper editor and insurance professional. He has personally closed 180+ transactions across all property categories across Mohali, Chandigarh, Panchkula, Banga, and Anandpur Sahib.

**Credentials to display as a structured list:**

- 10+ years across real estate development, government liaisoning, capital markets and media
- 180+ transactions personally closed, across all six property categories
- AMFI certified, Association of Mutual Funds in India
- NCFM certified, Capital Markets and Derivatives, NSE Academy
- Post Graduate, Advertising and Public Relations
- Director and Sales Head of a RERA-approved private limited company
- Direct liaisoning experience with GMADA, PUDA, PSPCL, Municipal Committee, Forest and Conservation Authorities, and the Industrial Departments of Punjab
- Editor of an RNIS-registered fortnightly newspaper, English and Hindi editions

**NAP block, must be byte-identical everywhere it appears on the site:**

```
Realty Holding & Management Consultants
E328, Phase 8A, Industrial Area, Mohali, Punjab
+91 78146 13916
info@realtyconsultants.in
https://realtyconsultants.in
```

**Service areas:** Mohali, Rajpura, Dera Bassi, Lalru, Banur, Shamboo.

**Schema:** the full `Person` and `RealEstateAgent` definitions from `_source/schema-deployment-guide.md`. Define them completely here. Other pages reference them by `@id` only.

---

# DESIGN SYSTEM

Use the site's existing tokens if they exist. If not, these are the values in the reference implementation:

```
--ink:        #14212b   /* headings, primary text */
--ink-2:      #3a4a57   /* body text */
--ink-3:      #6b7a86   /* meta, labels, captions */
--paper:      #fbfaf7   /* page background */
--card:       #ffffff   /* card background */
--line:       #e3ded4   /* borders, rules */
--brass:      #9a6b2f   /* accent, eyebrows, links */
--brass-soft: #f5eee2   /* "ask the seller" callout background */
--flag:       #a8342a   /* red flag border */
--flag-soft:  #fbeeec   /* red flag background */
--ok:         #2f6b4f   /* checked state */
```

Serif for body copy, sans-serif for headings, labels and UI. If the site already has a type stack, use it and ignore this.

**Responsive:** the tool must work on a phone. Someone will open it standing in front of a plot. Filter chips wrap. The sticky control bar becomes static below 620px. Tap targets minimum 44px.

**Accessibility:** correct heading hierarchy with no skipped levels, visible focus rings on all interactive elements, `aria-pressed` on filter chips, `aria-checked` on checkboxes, `aria-live="polite"` on the toast, and colour contrast of at least 4.5:1 for body text.

---

# WIRING AND HOUSEKEEPING

1. Add all three routes to the sitemap.
2. Confirm `robots.txt` does not disallow `/tools/`. If it does, fix it.
3. Set self-referencing canonical URLs on all three pages.
4. Cross-link: blog links to tool in at least two places, tool links back to blog once, both link to `/about` through the author bio.
5. Open Graph and Twitter Card metadata on both content pages.
6. Place the PDF at `/downloads/RHMC-Property-Document-Checklist.pdf` and confirm it serves with `Content-Type: application/pdf`.
7. All external links get `rel="noopener"`. The WhatsApp link opens in a new tab.
8. Preserve the `<html lang="en-IN">` locale.

---

# GAPS YOU WILL HIT, AND WHAT TO DO ABOUT THEM

These are known. They are not oversights, and they are not yours to invent your way around. Report each one in your Phase 0 findings and proceed as directed.

### Assets not supplied in this package

**Social share image.** No Open Graph image exists for either content page. Do not generate one, do not use a stock photo, and do not skip the tag. Check whether the site has a default OG image and use it. If it does not, add the OG tags pointing at a placeholder path of `/og/property-document-checklist.png` and flag it in your report as needing a real asset. Leave a broken image reference rather than silently omitting the tag.

**Author photograph.** The `/about` page and the `Person` schema would both benefit from one. None is supplied. Build the page to accommodate a portrait image, use whatever the site already has if anything, and flag it. Do not use an illustration, an avatar generator, or a stock headshot.

**Favicon and brand marks.** Out of scope. Use whatever the site already has.

### Routes referenced but not commissioned

**`/tools`** appears as the parent in the tool page's breadcrumb schema. If no `/tools` index route exists, either create a minimal one listing this single tool, or change the breadcrumb to point at the site root. State which you chose and why. Do not leave a breadcrumb pointing at a 404.

**`/appointments`** is linked from the CTA blocks. Verify it exists. If it does not, report it and point the CTA at the WhatsApp link only rather than shipping a dead link.

**The five "Related reading" targets** in the article do not exist. They stay in the markup as ordinary links. Do not create placeholder pages, do not remove them, and do not add `nofollow`. Confirm your build does not fail on unresolved internal links, and if it does, report that before working around it.

### Decisions that are yours

If something is genuinely not covered by this prompt, the supplied files, or the site's existing conventions, make the call that best serves the four usage moments described earlier, then report the decision. Do not stall, and do not guess silently.

---

# ACCEPTANCE CRITERIA

Work through this list and report the result of each item. Do not declare the task complete until every box passes.

**Crawlability**

- [ ] `curl` on the built tool page returns all 25 item titles in the HTML source
- [ ] With JavaScript disabled, every checklist item, description, ask and flag is readable
- [ ] The AEO answer block appears within the first 150 words of both content pages
- [ ] No content is hidden behind a click-to-expand on first load

**Function**

- [ ] All 25 checkboxes toggle by click, Space and Enter
- [ ] Each of the 5 filters shows the correct item count: all 25, resale 13, builder 21, authority 19, land 12
- [ ] Filtering does not reset checked state
- [ ] Scroll position is preserved when a filter is applied, and nothing reflows under the cursor
- [ ] Progress counter reflects visible items, not total
- [ ] Share link round-trips: check 7 arbitrary items, copy link, open in a fresh tab, same 7 are checked
- [ ] Opening a shared link shows the correct state on first paint, with no flash of an unchecked list
- [ ] Share button gives visible confirmation that the link was copied
- [ ] Reset clears everything and updates the hash
- [ ] Print preview produces a clean A4 document with no clipped content and no controls visible
- [ ] Print output contains only the currently filtered items, not all 25
- [ ] PDF downloads on a plain click with no form

**Schema**

- [ ] All three pages pass Google's Rich Results Test with no errors
- [ ] `FAQPage` answers are character-identical to the visible page text, on both the article (10 questions) and the tool (10 different questions)
- [ ] Every question in each `FAQPage` block is also visible on that page. A question in schema with no matching text on the page is a failure
- [ ] `ItemList` `numberOfItems` equals 25 and there are 25 `ListItem` entries
- [ ] `HowTo` contains 5 sections and 25 steps
- [ ] `@id` values for the Person and Organization are identical across all three pages
- [ ] Every breadcrumb item resolves to a real route, or the breadcrumb was changed and the change reported

**Content integrity**

- [ ] Word count of the rendered article is within 5% of 4,400
- [ ] Zero em dashes anywhere in the rendered output
- [ ] The phrases "7 percent", "5 percent", "6 percent", "₹2 lakh", "four to eight weeks", "₹4,000 to ₹5,000", "15 to 30 days", "65 percent" all appear and are unaltered
- [ ] The NAP block is byte-identical on all three pages
- [ ] No supplied copy has been reworded

**Performance and a11y**

- [ ] Lighthouse Accessibility 95 or above on both content pages
- [ ] Lighthouse SEO 100 on both content pages
- [ ] No cumulative layout shift from the sticky control bar
- [ ] Tool is usable at 360px width
- [ ] Tool page scores 85 or above on Lighthouse mobile performance, throttled to slow 4G
- [ ] Open Graph and Twitter Card tags present on both content pages, and the link preview renders correctly when pasted into a chat app

**Reported, not assumed**

- [ ] Every item in "Gaps you will hit" has been addressed and reported, with the decision taken stated for each

---

# DO NOT

- Do not rewrite, condense, or paraphrase any supplied copy.
- Do not add em dashes. The brand voice uses colons, periods and commas instead. This is a hard rule.
- Do not add an email capture form, newsletter signup, exit-intent modal, or PDF gate.
- Do not use `localStorage`, `sessionStorage`, or cookies.
- Do not render checklist items client-side only.
- Do not add stock photography of houses, handshakes, or keys.
- Do not change any figure. The stamp duty rates, GMADA fees and timelines were verified against sources on 26 July 2026.
- Do not add a second styling system or a component library the project does not already use.
- Do not create the five placeholder blog pages referenced in "Related reading."
- Do not soften the "When to walk away" language. Its directness is the point.

---

# BUILD ORDER

1. Phase 0 discovery. Report. Wait for approval.
2. `/about` first, since it hosts the canonical schema entities other pages reference.
3. The tool at `/tools/property-document-checklist`, including data file and PDF asset.
4. The pillar article at `/blog/documents-required-buying-property-india-checklist`.
5. Cross-links, sitemap, robots, canonicals.
6. Run the full acceptance checklist and report every result.

Start with Phase 0.
