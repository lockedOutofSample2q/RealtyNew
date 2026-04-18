# Realty Holding and Management Consultants Operations System: Complete Reference

The full operating system for Realty Holding & Management Consultants.
Two-person team: Amritpal Singh (principal) + Hargun (operations, content, CRM, automation).

---

## THE 7 PRE-CONTACT TRUST VIDEOS

Film once. Send via automation forever. These replace 3 in-person meetings worth of trust-building.

**How it works:** Lead contacts. Hargun identifies ICP and trust score. n8n automatically sends the right 1-2 videos in a staggered 24-hour sequence. By the time Amritpal speaks to them, they have watched his content, understand his process, and have pre-sold themselves. His job in the first call is to confirm, not pitch.

### Video 01: "Who I Am — The Honest Version"
- ICP: All ICPs
- Duration: 4-5 minutes
- Language: Hinglish
- Setting: Desk setup
- Purpose: Establishes identity, values, and why Amritpal operates differently from every other agent. Sent to every new lead with trust score 0-2.
- Script structure: "Main tenu das raha haan ki main actually kaun haan" then real personal story then one rule (never recommend what I would not buy) then one deal walked away from (the key moment) then what working with me looks like day to day then soft CTA: "Jede gal karni hai, WhatsApp te message kar deo."
- The deal walked away from is the most important 60 seconds in the entire video.
- Production: Face to camera only. No slides. No B-roll. Warm softbox. Kurta. No script reading.

### Video 02: "How I Evaluate a Pre-Launch: My Exact 9-Point Checklist"
- ICP: HNI + CXO
- Duration: 8-10 minutes
- Language: Hinglish
- Setting: Data-led
- Purpose: Demonstrates expertise through process. HNI and CXO immediately feel this person knows more than I do. Pre-educates so the actual meeting is about decisions, not basics.
- 9 checklist points: developer track record, RERA verification, land ownership clarity, location micro-analysis, price vs comparable transactions, payment plan structure, exit liquidity, rental yield potential, legal due diligence steps
- Secondary use: convert into downloadable PDF lead magnet

### Video 03: "Zameen wechke paisa mileya? Pehle yeh video dekho"
- ICP: Land Seller
- Duration: 7-8 minutes
- Language: Punjabi only
- Setting: Warmer, more personal
- Purpose: Addresses the Land Seller's exact emotional state before a single word has been spoken to them. Makes them feel understood. Trust foundation for this ICP.
- Cover: the 24-month capital gains window, why FD is not the answer (the math), reinvestment options, what to do first

### Video 04: "NRI Property Purchase: Step by Step — Exactly How It Works"
- ICP: NRI Investor
- Duration: 7-8 minutes
- Language: English
- Purpose: Addresses the NRI's core fear of being cheated from far away. Shows the exact process. NRI watches this 3-4 times before making first contact. Often shares with spouse.
- Cover: exact step-by-step NRI process, video walkthrough guarantee before any payment, which documents are verified and how they can verify too, FEMA regulations, POA (when needed and how to use safely), post-purchase management options, "My WhatsApp is open across all time zones"

### Video 05: "3 Deals — What Went Right, What Almost Went Wrong, What I Learned"
- ICP: All ICPs
- Duration: 8-9 minutes
- Language: Hinglish
- Purpose: Anonymised real deal stories. The "almost went wrong" component is the most powerful — shows Amritpal caught a problem before his client was harmed.
- Include: the 8-month plot recovery case (anonymised), the property tax MOU case (anonymised), a positive appreciation case

### Video 06: "Where I Would Invest Right Now in Mohali — My Honest View"
- ICP: HNI primary
- Duration: 6-7 minutes
- Language: Hinglish
- Purpose: Takes a clear investment position. Shows Amritpal has a view and will defend it. The vision investing thesis.
- Include: Airport Road trajectory (Rs 3-4Cr to Rs 12-16Cr), Bharatmala corridor thesis, where growth will price in next

### Video 07: "Here Is Exactly How I Work — From First Call to After the Registry"
- ICP: CXO primary
- Duration: 5-6 minutes
- Language: Hinglish
- Purpose: Process walkthrough. CXO needs structure. Shows Amritpal is methodical, not ad-hoc.
- Cover: consultation, evaluation, recommendation, documentation, post-possession follow-through

---

## THE WHATSAPP QUALIFICATION SYSTEM

**First message (auto-sent within 60 seconds of first contact):**
"Sat Sri Akal [Name] ji. Main Amritpal Singh, Realty Holding and Management Consultants, Sector 82A Mohali. Main personally har client naal kaam karda haan. Koi pressure nahi, honest advice."

**Second message (5 minute pause, one question only):**
"Tuhanu better help kar sakaan iske liye: aap investment ke liye dekh rahe ho ya rehne ke liye? (Ya dono? Bilkul okay hai)"

**Wait for reply. Hargun tags ICP in CRM within 2 hours.**

**Third message (based on reply):**
- Investment reply: "Kaunsa range comfortable hai, Rs 1-2Cr ya Rs 2Cr se upar?"
- End-use reply: "Sector preference hai? Ya main kuch options suggest karaan?"
- Both: "Perfect. Ik option hai jo dono kaam karda hai. 2 min di call ho sakdi hai?"

**After qualifier answers: Amritpal engages manually.**

**Critical rule:** Never ask more than one question per message. Multiple questions feel like interrogation and kill reply rates. One question per message feels like a natural conversation. This discipline alone increases reply rates 3x.

---

## MEETING TYPES (TidyCal)

**Type 1: Free 30-Minute Consultation**
For all new leads. Virtual or in-person. Discovery conversation. No properties recommended. Only questions asked and answered.
Intake form: budget range, intent (investment/end-use/both), current situation (buying/reinvesting/NRI/other), WhatsApp number.

**Type 2: Site Visit**
Earned only after initial consultation. 90-minute minimum. Hargun prepares Project Brief PDF the evening before. Requires: prior consultation, confirmation of all attendees, specific questions submitted in advance.
Site visit gate: "Confirm: have you had an initial consultation with me first?" Prevents time waste from cold leads bypassing the consultation.

---

## BOOKING FLOW (complete, step by step)

1. Lead clicks booking link (from YouTube description, WhatsApp template, website, Facebook bio)
2. TidyCal intake form completed: budget, intent, property type, WhatsApp number. Auto-qualifies.
3. Instant: confirmation page plus WhatsApp message. 2 pre-contact videos auto-sent.
4. 24-hour reminder: "Meeting kal [time] te. Videos dekh li?" WhatsApp only.
5. 1-hour reminder: "See you at [time]. Amritpal's number: [X] if you need to reach."
6. Meeting happens. Amritpal has reviewed prep card. Lead has watched 2 videos. Trust established.
7. Within 30 minutes post-meeting: n8n sends Template 4 plus Project Brief PDF automatically.

The compounding experience: a lead who goes through this system experiences a level of professionalism they have never encountered from a real estate agent in Mohali. That is the first thing they tell their network.

---

## THE 12 n8n AUTOMATION FLOWS

**Flow 01: Instant WhatsApp Response**
Trigger: new lead contacts on any channel
Action: sends welcome message within 60 seconds, creates CRM entry, sends Hargun a Telegram notification to tag ICP and Trust Score within 2 hours
Purpose: zero leads missed even if Amritpal is in a 3-hour site visit

**Flow 02: ICP-Based Video Delivery (staggered 24 hours)**
Trigger: Hargun updates ICP tag in Notion
Action: Switch by ICP then send Video Set 1 (matched), wait 24 hours, send Video Set 2, update Videos Sent field in Notion
Purpose: correct trust-building sequence without duplication

**Flow 03: TidyCal Booking Chain**
Trigger: TidyCal webhook (new booking)
Action: update Notion stage to Pre-Meeting, send confirmation plus 2 videos via WhatsApp, schedule 24hr reminder, schedule 1hr reminder, create meeting prep card in Notion

**Flow 04: Post-Meeting Follow-Up**
Trigger: Amritpal marks stage as Met in Notion
Action: send Template 4 (summary of what was discussed) plus Project Brief PDF within 30 minutes of meeting end

**Flow 05: Cold Lead Reactivation**
Trigger: 30 days of silence from a lead (no contact logged)
Action: sends value-led reactivation message personalised by ICP, resets next trigger to 30 days, shifts non-responders to monthly cadence

**Flow 06: YouTube to Multi-Platform Auto-Publish**
Trigger: YouTube RSS feed detects new video published
Action: post to Facebook Page (custom caption), post to LinkedIn (reformatted for professional tone), send WhatsApp broadcast to Investor List, add to Brevo email campaign queue

**Flow 07: Sunday Weekly Broadcast**
Trigger: Sunday schedule
Action: sends weekly market intelligence broadcast to full WhatsApp list automatically. Zero manual work.

**Flow 08: Portal Sync**
Trigger: weekly schedule (Monday)
Action: Hargun review of all Tier 1 portal listings (99acres, MagicBricks, Housing.com). Refresh, update status, remove sold listings.

**Flow 09: Festival/Seasonal Messages**
Trigger: festival calendar dates
Action: sends culturally appropriate messages to full contact list

**Flow 10: Referral Thank-You**
Trigger: Amritpal tags lead source as Referral in Notion
Action: sends thank-you message to the referring contact

**Flow 11: Deal Closure**
Trigger: Amritpal marks stage as Closed
Action: sends congratulations message to client, triggers referral request message 30 days later

**Flow 12: Monday Digest**
Trigger: Monday morning schedule
Action: sends Amritpal a summary of the week ahead: meetings scheduled, leads to follow up, pipeline status

---

## NOTION CRM SCHEMA

| Field | Type | Values | Who Updates | Purpose |
|---|---|---|---|---|
| Name | Title | Full name | Hargun on intake | Primary identifier |
| Phone/WhatsApp | Phone | +91 or +44/+1 format | Hargun on intake | Contact plus automation trigger |
| ICP Type | Select | HNI/CXO/Land Seller/NRI/Unknown | Hargun within 2 hours | Triggers video delivery flow |
| Budget Band | Select | Rs 50L-1Cr / Rs 1-2Cr / Rs 2-5Cr / Rs 5Cr+ | Hargun after qualifier reply | Which properties Amritpal shows |
| Intent | Select | Investment/End-use/Both/Unclear | Hargun after first message | Which project brief is prepared |
| Stage | Select | New/Nurture/Pre-Meeting/Met/Negotiation/Closed/Lost | Amritpal after every interaction | Pipeline metric plus automation trigger |
| Trust Score | Number 0-5 | 0=cold ad, 5=referral+viewer | Hargun on intake | Determines if videos sent or direct meeting |
| Source | Select | YouTube/Facebook/Portal/Referral/Ad/Walk-in | Hargun on intake | Ad attribution plus content performance |
| Location | Select | Tricity/Punjab/NRI-UK/NRI-CA/NRI-AU/NRI-UAE | Hargun on intake | Meeting format plus time zone |
| Next Follow-Up | Date | Specific date | Amritpal sets after every interaction | Notion reminder plus n8n trigger |
| Last Contact | Date | Auto-populated | n8n updates on every send | Triggers cold reactivation flow |
| Notes | Text | Free-form | Amritpal during and after meetings | Context for next interaction |
| Videos Sent | Multi-select | V01-V07 checkboxes | n8n auto-updates on send | Prevents duplicate sends |

---

## CONTENT PRODUCTION PIPELINE

**Weekly production rhythm (two-person team):**

| Day | Amritpal | Hargun |
|---|---|---|
| Monday | Client meetings and follow-ups. No filming. Portal leads called same day. | Portal refresh (20 min). CRM audit. Edit previous week's batch. |
| Tuesday | Content morning: film 2-3 Reels (batched 60-90 min). Site visits in PM. | Edit Tuesday Reels. Auto-subtitle. Thumbnail design. Caption writing. |
| Wednesday | Client meetings plus WhatsApp follow-ups. Prep notes for Thursday long-form. | Post Tuesday Reels to Instagram and Facebook. Write descriptions. |
| Thursday | Film YouTube long-form (1 video, 60-90 min shoot block). No meetings before noon. | Edit Wednesday Reels. Begin YouTube edit from Thursday's shoot. |
| Friday | Client meetings. Review and approve this week's content before Hargun schedules. | Finalise YouTube video. Upload and schedule all posts. Thumbnail final. |
| Saturday | Optional: site visit video (excellent organic content, zero scripting needed). | Weekend off unless urgent. Batch next week's Reel hooks if time allows. |
| Sunday | Weekly review: CRM pipeline check, plan next week's content topics (15 min). | Sunday broadcast sends automatically via n8n. Zero manual work. |

**Repurposing matrix (one YouTube video becomes 8 pieces):**

| Original | Repurposed As | Platform | Time |
|---|---|---|---|
| YouTube long-form 12-18 min | 3 Reels (best 60-90 sec moments) | Instagram + Facebook | 30 min per Reel |
| YouTube long-form | LinkedIn post (key insight as text) | LinkedIn | 10 min |
| YouTube long-form | Facebook video (same file, different caption) | Facebook | 5 min (n8n auto) |
| YouTube long-form | WhatsApp broadcast (2-line summary + link) | WhatsApp Investor List | 5 min (n8n auto) |
| Site visit video (raw) | Property listing video for 99acres/MagicBricks | Portals | 5 min (same file) |
| Reel with 10k+ views | Facebook Ad creative (boost Rs 500) | Facebook Ads Manager | 15 min setup |
| Video with data/numbers | Canva infographic carousel | Instagram | 20 min |
| Any educational video | Brevo email with video thumbnail and link | Email nurture list | 10 min |

---

## PAID ADS SYSTEM

**Rule:** Never run paid ads before Week 6. Wait until organic content has proven what resonates (views, saves, comments, watch time). Spend ad money amplifying what already works, never testing what might work.

**Campaign A: Pre-Launch Investors (HNI + NRI)**
- Objective: WhatsApp lead gen
- Budget: Rs 2,500/month
- Audience: Age 35-60, Chandigarh + Mohali + Panchkula + 25km radius plus UK/Canada/Australia Punjabi diaspora (custom NRI audience built from page engagers)
- Interests: real estate investment, luxury property, financial planning
- Exclude: people who have already engaged with the page
- Creative: best-performing organic Reel (proven hook)
- CTA: "WhatsApp for Free Consultation"

**Campaign B: Land Seller Plots**
- Objective: video views then retarget
- Budget: Rs 1,500/month
- Phase 1 audience: Age 42-70, rural Punjab districts near Mohali (Fatehgarh, Ropar, Patiala, Sangrur), language Punjabi, interests agriculture/land/GMADA
- Creative: Video 03 (Punjabi land seller trust video)
- Phase 2: Retarget 75%+ video viewers with WhatsApp CTA ad

**Campaign C: CXO Retargeting**
- Objective: traffic and retargeting only
- Budget: Rs 1,000/month
- Audience: website visitors (pixel) plus YouTube channel visitors (custom audience)
- Why retargeting only: CXO does not respond to cold ads. They research first (YouTube/website), then decide. Retargeting catches them at the exact decision moment.
- Creative: "Free 30-min consultation" static ad with Amritpal's face and data-driven headline

**Performance benchmarks:**
- Cost per lead (WhatsApp click): good under Rs 150, needs fixing above Rs 300
- 3-second video view rate: good above 25%, needs fixing below 15%
- Lead to meeting conversion: good above 20%, needs fixing below 10%
- Meeting to deal conversion: good above 25%, needs fixing below 10%

---

## PORTAL STRATEGY

**Tier 1 (always active):** 99acres, MagicBricks, Housing.com
Every active listing must be on all three. Response rule: portal leads must be called within 2 hours. Portal leads have zero loyalty and have messaged 4-5 agents simultaneously. First credible response wins.

**Listing quality rule:**
Never post without: 5+ photos, exact sector, carpet area, RERA number, floor plan, and video walkthrough link.

**Trust score for portal leads:** 0. Send Video 01 plus Video 07 immediately after first contact.

**The portal mistake:** Building the entire business around portals. Portal leads are expensive, have zero loyalty, and go to whoever calls first. Content system generates better pre-sold leads at near-zero cost. Use portals as supplementary coverage, never as foundation.

**Standard listing structure:**
- Headline: [BHK] [Type] | Sector [X] Mohali | [Rs range] | [1 USP in 5 words]
- Description line 1: Property overview — size, floor, facing, possession status
- Description line 2: Location advantages — connectivity, IT Park, schools
- Description line 3: Project specifics — developer, amenities, RERA number
- Description line 4: Investment angle — current psf rate, appreciation, rental yield
- Description line 5: "For video walkthrough plus complete documents: WhatsApp [number]"
- Description line 6: Amritpal Singh | RERA Reg: [number] | Realty Holding and Management Consultants

---

## TECH STACK AND BUDGET

| Tool | Purpose | Cost |
|---|---|---|
| Hostinger Hosting + Domain | Website infrastructure | Rs 300/month |
| n8n (self-hosted on Hostinger) | All 12 automation flows | Free |
| WhatsApp Business App | Lead management plus broadcasts | Free |
| TidyCal | Meeting booking | Rs 200/month equivalent (one-time Rs 2,400) |
| Notion | CRM plus properties database | Free |
| Canva Pro | Thumbnails, PDFs, graphics | Rs 500/month |
| CapCut + DaVinci Resolve | Video editing | Free |
| Brevo | Email marketing (free up to 300/day) | Free |
| Google Business Profile | Local SEO plus reviews | Free |
| Facebook/Instagram Ads | 3 campaigns from Month 2 | Rs 5,000/month |
| OpenRouter API | n8n message formatting in Hinglish | Rs 200/month |
| **Total recurring (including ads from Month 2)** | | **Rs 6,200/month** |

**Scale triggers:**
- WhatsApp API: when volume demands it (upgrade from Business App)
- Notion Plus: at 50+ active leads (Rs 800/month)
- Adobe Premiere Pro: at 3+ videos/week for 3 months (Rs 1,675/month)
- Facebook Ads increase to Rs 15,000/month: after first Rs 5Cr+ deal closes
- LinkedIn Sales Navigator: at Rs 10Cr+ pipeline active (Rs 3,000/month)

---

## 90-DAY BUILD PLAN

**Week 1:** Infrastructure live. Website, WhatsApp, CRM, TidyCal, Google Business Profile. Amritpal films V01 and V03. All existing contacts added to Notion CRM and tagged.

**Week 2:** n8n Flows 01-06 live and tested. Brevo email nurture sequence built (5-email, 3-week cadence). Amritpal films V02, V04, V05.

**Week 3:** First public content published. YouTube plus Reels plus Facebook. Flows 07-10 live.

**Week 4:** All 7 trust videos done. All 12 flows live. System complete. LinkedIn profile updated. WhatsApp broadcast lists populated.

**Weeks 5-8:** First paid ads live (Week 6). First inbound leads from content system. 3+ meetings per week from inbound.

**Weeks 9-12:** Direct CTAs live. 30-50 warm leads in pipeline. First online-sourced deals close.

**The 90-day principle:** Build the system before you need it. Every deal closed in the next 90 days should come from existing network. Every system built in the next 90 days will generate deals for the next 3 years.
