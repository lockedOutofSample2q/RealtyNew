================================================================================
RHMC PROPERTY DOCUMENT CHECKLIST
Handover package for implementation
Realty Holding & Management Consultants, Mohali
Prepared 26 July 2026
================================================================================


WHAT THIS IS

Everything needed to build three pages and one downloadable asset on
realtyconsultants.in. All content is written, verified and final. This is an
implementation job, not a writing job.

  A pillar article      /blog/documents-required-buying-property-india-checklist
  An interactive tool   /tools/property-document-checklist
  An author page        /about
  A printable PDF       /downloads/RHMC-Property-Document-Checklist.pdf


--------------------------------------------------------------------------------
HOW TO USE THIS PACKAGE
--------------------------------------------------------------------------------

STEP 1
  Copy the _source folder into your project so the path becomes:
      C:/Desktop/monter/_source/

STEP 2
  Open ANTIGRAVITY-PROMPT.md. Copy everything below the divider near the top.
  Paste it into Antigravity.

STEP 3
  Antigravity will inspect the project and report back on the framework,
  routing, styling and content pipeline before writing any code. Approve its
  file plan, then let it build.

STEP 4
  When it says it is finished, it must work through the acceptance checklist
  and report the result of every line. Do not accept "done" without that.


--------------------------------------------------------------------------------
WHAT IS IN HERE
--------------------------------------------------------------------------------

AT THE TOP LEVEL

  README.txt
      This file.

  ANTIGRAVITY-PROMPT.md
      The paste-in prompt. Includes the discovery phase, the five
      non-negotiable rules, per-page requirements, and the acceptance
      checklist. Start here.

  SCOPE-OF-WORK.txt
      The same job described as a brief rather than a prompt. States what must
      exist without prescribing how. Use this if a human developer or an
      agency is doing the work instead of Antigravity, or as the document you
      sign off against.


INSIDE _source

  documents-required-buying-property-india-punjab-checklist.mdx
      The pillar article. Approximately 4,400 words with YAML frontmatter
      carrying title, description, canonical URL, dates and keywords.

  property-document-checklist-tool.html
      A complete, working, self-contained build of the interactive tool.
      Open it in a browser to see exactly what is being asked for. Its
      structured data is embedded at the bottom of the file and has been
      validated.

  checklist-data.json
      All 25 checklist items as structured data: title, Punjab name,
      description, issuing office, the question to ask the seller, the red
      flag, and which purchase types each item applies to. Import this rather
      than retyping the items.

  RHMC-Property-Document-Checklist.pdf
      The printable version. 4 pages, A4. Goes to /downloads/ and must be
      downloadable without a form.

  PROPERTY-CHECKLIST-SCOPE-AND-CONTENT.txt
      Everything in one file: the scope, plus every word of copy for all three
      pages written out in full. Use this if you want to read the content
      without opening the MDX and HTML.

  article-faq-schema.json
      The article's 10 FAQ questions with answers, already matched character
      for character to the article text, ready to drop in as FAQPage schema.

  citation-answer-blocks.md
      30+ answers written to be extracted by AI search engines, each matched
      to a specific query. Reference material for the pages that come after
      these three.

  schema-deployment-guide.md
      Which structured data goes on which page, and how the three pages link
      into one entity graph.

  authority-playbook-property-documentation-punjab.md
      Strategy context. Contains the article's structured data block and the
      off-page work that makes the on-page work pay off.

  search-intent-and-keyword-research.md
      Why these pages exist in this form. Query clusters, what the competition
      is missing, and the 25-page content plan these three pages open.


--------------------------------------------------------------------------------
THE FIVE THINGS THAT MATTER MOST
--------------------------------------------------------------------------------

If everything else is negotiable, these are not.

  1. NOTHING IS GATED.
     No email form, no phone wall, no modal, no PDF gate. The only conversion
     elements are a WhatsApp link and a booking link.

  2. THE CONTENT MUST BE READABLE WITHOUT JAVASCRIPT.
     If a crawler cannot read all 25 items, the page fails its main purpose.
     Interactivity is layered on top. It is not the only way the content
     exists.

  3. NO BROWSER STORAGE.
     Tick state lives in the page address. That is what lets a buyer send
     their progress to their lawyer.

  4. THE ANSWER COMES FIRST.
     On both content pages, a complete answer to the page's core question
     appears within the first 150 words, above everything else.

  5. THE COPY IS NOT TO BE EDITED.
     No rewriting, condensing or paraphrasing. It is calibrated to a brand
     voice and to specific search queries. No em dashes anywhere.


--------------------------------------------------------------------------------
FIGURES THAT MUST NOT BE CHANGED
--------------------------------------------------------------------------------

Verified against sources on 26 July 2026.

  Punjab stamp duty          7% male, 5% female, 6% joint male and female
  Punjab registration        1%, capped at Rs 2 lakh on most sale deeds
  Chandigarh stamp duty      6% flat, no gender concession, plus 1%
  GMADA basic transfer       roughly Rs 4,000 to Rs 5,000, 4 to 8 weeks
  Encumbrance certificate    15 to 30 days
  Mutation after registry    15 to 30 days
  Acceptable loading factor  25 to 30 percent, above 35 percent is a red flag

Review quarterly. When a figure changes, update the visible text, the
structured data, and the page's last-modified date together.


--------------------------------------------------------------------------------
QUESTIONS THIS PACKAGE ANSWERS
--------------------------------------------------------------------------------

  What am I building?              ANTIGRAVITY-PROMPT.md, or SCOPE-OF-WORK.txt
  What words go on the pages?      PROPERTY-CHECKLIST-SCOPE-AND-CONTENT.txt
  What should the tool look like?  open property-document-checklist-tool.html
  What are the 25 items?           checklist-data.json
  What structured data goes where? schema-deployment-guide.md
  What is NOT supplied?            "Not supplied" section in SCOPE-OF-WORK.txt
  Why does this exist?             search-intent-and-keyword-research.md
  How do I know it is finished?    the acceptance checklist in either document


================================================================================
Realty Holding & Management Consultants
E328, Phase 8A, Industrial Area, Mohali, Punjab
+91 78146 13916  ·  info@realtyconsultants.in  ·  realtyconsultants.in
================================================================================
