#!/usr/bin/env python3
"""Build the RHMC printable property document checklist PDF."""

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer,
    Table, TableStyle, KeepTogether, HRFlowable
)

# ---------------- fonts ----------------
D = "/usr/share/fonts/truetype/dejavu/"
pdfmetrics.registerFont(TTFont("DJ", D + "DejaVuSans.ttf"))
pdfmetrics.registerFont(TTFont("DJ-B", D + "DejaVuSans-Bold.ttf"))
pdfmetrics.registerFont(TTFont("DJ-I", D + "DejaVuSans-Oblique.ttf"))
pdfmetrics.registerFontFamily("DJ", normal="DJ", bold="DJ-B", italic="DJ-I")

# ---------------- palette ----------------
INK = colors.HexColor("#14212b")
INK2 = colors.HexColor("#3a4a57")
INK3 = colors.HexColor("#6b7a86")
BRASS = colors.HexColor("#9a6b2f")
BRASS_S = colors.HexColor("#f5eee2")
LINE = colors.HexColor("#ddd8ce")
FLAG = colors.HexColor("#a8342a")
FLAG_S = colors.HexColor("#fbeeec")
PAPER = colors.HexColor("#f7f5f0")

PW, PH = A4
MARGIN = 14 * mm

# ---------------- styles ----------------
def S(name, **kw):
    base = dict(name=name, fontName="DJ", fontSize=8.4, leading=11.4,
                textColor=INK2, alignment=TA_LEFT, spaceAfter=0)
    base.update(kw)
    return ParagraphStyle(**base)

st_h1     = S("h1", fontName="DJ-B", fontSize=17, leading=20, textColor=INK, spaceAfter=3)
st_sub    = S("sub", fontSize=9, leading=12.5, textColor=INK3, spaceAfter=8)
st_answer = S("answer", fontSize=8.5, leading=12, textColor=INK2)
st_stage  = S("stage", fontName="DJ-B", fontSize=10.5, leading=13, textColor=colors.white)
st_stagen = S("stagen", fontName="DJ-B", fontSize=6.4, leading=8, textColor=BRASS_S)
st_item   = S("item", fontName="DJ-B", fontSize=8.6, leading=11, textColor=INK)
st_body   = S("body", fontSize=7.8, leading=10.1, textColor=INK2)
st_ask    = S("ask", fontName="DJ-I", fontSize=7.4, leading=9.6, textColor=colors.HexColor("#6d4c1f"))
st_flag   = S("flag", fontSize=7.4, leading=9.6, textColor=colors.HexColor("#7d2820"))
st_sect   = S("sect", fontName="DJ-B", fontSize=11.5, leading=14, textColor=INK, spaceAfter=4)
st_cell   = S("cell", fontSize=7.6, leading=10)
st_cellb  = S("cellb", fontName="DJ-B", fontSize=7.6, leading=10, textColor=INK)
st_th     = S("th", fontName="DJ-B", fontSize=6.6, leading=9, textColor=INK3)
st_walk   = S("walk", fontSize=7.7, leading=10.2, textColor=colors.HexColor("#5c2b25"))
st_fine   = S("fine", fontSize=7.2, leading=9.6, textColor=INK3)
st_ctah   = S("ctah", fontName="DJ-B", fontSize=10, leading=13, textColor=INK)


# ---------------- checklist data ----------------
# (title, punjab_name, body, ask, flag)
STAGES = [
    ("Stage 1", "Before you pay a single rupee",
     "Token money is the hardest money to get back. Everything here happens before it changes hands.", [
        ("Title or conveyance deed", "Punjab: fard, jamabandi, CD",
         "Proves the seller legally owns what they are selling. Revenue Department, via Sewa Kendra, Fard Kendra, or the PLRS portal. The name on the title must match the person signing and their ID.",
         "Ask: “Can you give me a fresh certified copy, not a photocopy?”",
         "Walk away if the seller is vague about this one. That hesitation is your answer."),
        ("Mother deed", "chain of ownership",
         "Traces ownership backward to the original owner. Its job is to expose gaps, and gaps are where disputes live. Matters most on older properties and inherited land.",
         "Ask: “Has any transfer in this chain happened through power of attorney rather than a registered deed?”",
         None),
        ("Encumbrance certificate", "Punjab: non-encumbrance certificate",
         "Confirms no loan, mortgage, lien, or litigation on the property. Sub-Registrar office. Punjab issues these online through the Revenue Courts Management System. Allow 15 to 30 days.",
         "Ask your lawyer for a 30-year search period, not the cheaper 12-year one.",
         "Needed even if you are paying cash. The bank asks for it to protect the bank."),
        ("Land use classification and CLU", "plots and land",
         "Agricultural land sold for residential use requires a change of land use order from PUDA. CLU and layout approval are two separate processes. Both must be complete.",
         "Ask: “Is this PUDA approved, or has an application been submitted?” Not the same thing.",
         "Walk away if agricultural land is being sold for residential use with no CLU on record."),
        ("Cancellation and dispute status", "authority and builder plots",
         "Confirms the plot has not already been cancelled for the seller's non-payment. At GMADA, request a property statement showing instalments paid, pending dues, registered owner, and transfer history.",
         "Ask the authority directly, not the seller.",
         "From our files: a buyer had paid 65% of the price before discovering both plots were cancelled. Recovery took 8 months."),
     ]),

    ("Stage 2", "Before the agreement to sell",
     "Dues attach to the property, not to the person who created them.", [
        ("Property tax receipts, last three years", None,
         "Outstanding tax becomes yours the moment the property does. Municipal Committee or Corporation. One current receipt tells you nothing about the four years before it.",
         "On any multi-floor building ask: “Is the property tax ID separate for this floor, or shared?”",
         "From our files: a building-level tax ID left a ground-floor buyer liable across all three floors. Three months to resolve."),
        ("Electricity and water clearance", None,
         "No pending dues, and the meter is identifiable. PSPCL for electricity in Punjab. On a multi-floor building, confirm the unit has its own meter and sanctioned load.",
         "A separate meter is what makes a no-due certificate possible at resale.",
         None),
        ("Maintenance and society dues", "builder projects",
         "Benchmark: Rs 3 to 4 per sq ft per month basic, Rs 5 to 6 with amenities, Rs 7 to 8 full service.",
         "Ask: “What is the current monthly maintenance, and is anything outstanding on this unit?”",
         None),
        ("Allotment letter", "builder and authority",
         "Property details, price, and payment schedule agreed at booking. It should match your agreement to sell exactly.",
         "Conditions do not belong in an allotment letter. They belong in the agreement to sell, where both parties negotiate them.",
         "Watch for conditions inserted that were never discussed. Raise them before the next instalment."),
        ("Approved building plan", "built-up property",
         "Confirms the local authority sanctioned the plan the building was constructed from. Compare the sanctioned plan against what is physically standing.",
         "Ask: “Does the sanctioned plan show this balcony, this floor, this rear extension?”",
         "Extra floors and extensions absent from the plan become your regularisation problem."),
        ("RERA Punjab registration and history", "builder projects",
         "Check registration number, promoter's past projects, current status, and complaint record on rera.punjab.gov.in.",
         "An empty quarterly-update log on a project claiming 70% completion is information.",
         "Walk away if the RERA number does not resolve, or complaints show repeated possession delays."),
        ("Carpet, built-up, super area and loading", "flats",
         "25 to 30 percent loading is standard. Above 35 percent deserves a direct question.",
         "Ask: “What is the carpet area, and what is the loading factor on this unit?”",
         None),
     ]),

    ("Stage 3", "Before you take possession",
     "Once you are living in a building, your leverage is gone.", [
        ("Completion certificate", "builder projects",
         "Confirms construction was completed as per the approved plan. Issued by the local authority.",
         None, None),
        ("Occupancy certificate (OC)", "builder projects",
         "Makes the building legally habitable. Under RERA a promoter cannot offer possession or collect the final payment without a valid OC or CC. Punjab RERA has held possession without a CC violates PAPRA and RERA.",
         "Ask: “Can I see the OC before I accept the keys?” Then wait for it.",
         "Do not take possession without it. The offer will be warm and your rent is running. Take the keys anyway and your legal position weakens."),
        ("NOCs and no-due certificates", "builder, society, authority",
         "Confirms nothing outstanding with the society, the authority, or the builder.",
         "Do not accept a general assurance. Ask which specific NOCs apply, and get each one named.",
         None),
        ("Permission to sell", "government authority",
         "The authority's consent to the transfer. Without it the transfer will not be recorded, regardless of what you have paid.",
         None, None),
     ]),

    ("Stage 4", "The transaction",
     "A verbal understanding is not a term. If it is not written here, it does not exist.", [
        ("Agreement to sell", "Punjab: bayana",
         "In Punjab practice, commonly on Rs 4,000 stamp paper. Must contain: price, area and whether covered or super, facing, road width, payment schedule, possession date, sale deed date, and what happens on either side's default.",
         "Punjab and Haryana High Court: an agreement to sell reciting delivery of possession attracts stamp duty as a conveyance. Have that clause drafted deliberately.",
         None),
        ("Sale deed draft, reviewed in advance", None,
         "Read the draft a week before registration day, not on it. On the day you will be in a queue with a token number. That is how unfavourable clauses survive.",
         "Check whether the deed is written on covered area. Registry should legally reflect covered area per revenue records.",
         "The super area trap: registering on super area inflates the value and you pay the extra stamp duty."),
        ("Stamp duty and registration calculated", None,
         "Punjab 2026: 7% male, 5% female, 6% joint male and female, plus 1% registration capped at Rs 2 lakh. Chandigarh: flat 6% regardless of gender, plus 1%. Calculated on the higher of agreement value or collector rate.",
         "On a Rs 1 crore registry, the male-versus-female difference is Rs 2 lakh. Two women buying jointly still pay 5%. Have this conversation before the deed is drafted.",
         None),
        ("Sale deed executed and registered", None,
         "At the Sub-Registrar or Tehsildar office once payment is complete. Bring ID, address proof and PAN for both parties, photographs, the draft deed, and proof of stamp duty payment.",
         "Until it is registered, you are a person with a receipt, not an owner.",
         None),
     ]),

    ("Stage 5", "After registration, and do not let this drift",
     "The stage most buyers skip. It is also the one that causes problems when you try to sell.", [
        ("Mutation applied for", "Punjab: intkal",
         "Updates the revenue record so the jamabandi carries your name. Tehsildar or Naib Tehsildar, trackable on the PLRS portal. 15 to 30 days after registration.",
         "Without mutation, the next check anyone runs on this property still points at the seller.",
         None),
        ("Authority transfer initiated", "GMADA, PUDA",
         "Requires a certified copy carrying the Tehsildar stamp. WhatsApp photos are not accepted. Roughly Rs 4,000 to Rs 5,000, four to eight weeks when the file is complete. An OTP goes to the last registered buyer.",
         "Initiate the moment your booking or registry is done, not months later.",
         None),
        ("Electricity and water transferred", None,
         "Into your name at the PSPCL sub-division. Separate metering per floor needs a fresh application and load sanction.",
         None, None),
        ("Separate property tax ID generated", None,
         "So your unit carries its own liability. On a multi-floor building this may require an MOU between floor owners.",
         "Do this while the other owners are cooperative, not at resale when you need an NDC urgently.",
         None),
        ("Originals secured, digital copies made", None,
         "Sale deed, mutation record, allotment letter, OC, NOCs, receipts. Keep a scanned set off-site.",
         "Your buyer, five years from now, will ask for exactly this file.",
         None),
     ]),
]

WALKAWAY = [
    "The seller cannot produce the title document, or resists giving a fresh certified copy.",
    "The name on the title does not match the person negotiating, and the explanation involves an unregistered family arrangement.",
    "The sale is structured through a general power of attorney rather than a registered sale deed, with no clear reason.",
    "The builder is offering possession and asking for final payment without an occupancy certificate.",
    "Agricultural land is being sold for residential use with no CLU on record.",
    "The project claims approval but the promoter can show only an application, not a sanction.",
    "The RERA number does not resolve to a live listing, or complaints show repeated possession delays.",
    "The seller pushes for speed. Genuine sellers with clean files are patient. Urgency belongs to the party with something to lose from a slow check.",
]

PUNJABI_TERMS = [
    ("Land record, title extract", "Fard, fard badar", "Revenue Dept, Sewa Kendra, Fard Kendra"),
    ("Record of rights", "Jamabandi", "Revenue Dept, four-year cycle"),
    ("Mutation, transfer of record", "Intkal", "Tehsildar or Naib Tehsildar"),
    ("Daily register of proceedings", "Rojnamcha", "Patwari"),
    ("Plot and survey identifiers", "Khasra, khewat, khatauni", "Revenue records"),
    ("Encumbrance certificate", "Non-encumbrance certificate", "Sub-Registrar office"),
    ("Change of land use", "CLU", "PUDA"),
    ("Allotment and transfer record", "Allotment letter, transfer memo", "GMADA or PUDA"),
]


# ---------------- flowable helpers ----------------
def tickbox_row(title, local, body, ask, flag, avail):
    """One checklist item as a two-column table: tickbox + content."""
    head = title if not local else (
        '%s  <font name="DJ" size="7" color="#9a6b2f">%s</font>' % (title, local)
    )
    inner = [[Paragraph(head, st_item)],
             [Paragraph(body, st_body)]]
    if ask:
        inner.append([Table([[Paragraph(ask, st_ask)]],
                            colWidths=[avail - 15 * mm],
                            style=TableStyle([
                                ("BACKGROUND", (0, 0), (-1, -1), BRASS_S),
                                ("LEFTPADDING", (0, 0), (-1, -1), 5),
                                ("RIGHTPADDING", (0, 0), (-1, -1), 5),
                                ("TOPPADDING", (0, 0), (-1, -1), 2.8),
                                ("BOTTOMPADDING", (0, 0), (-1, -1), 2.8),
                            ]))])
    if flag:
        inner.append([Table([[Paragraph(flag, st_flag)]],
                            colWidths=[avail - 15 * mm],
                            style=TableStyle([
                                ("BACKGROUND", (0, 0), (-1, -1), FLAG_S),
                                ("LINEBEFORE", (0, 0), (0, -1), 1.4, FLAG),
                                ("LEFTPADDING", (0, 0), (-1, -1), 5),
                                ("RIGHTPADDING", (0, 0), (-1, -1), 5),
                                ("TOPPADDING", (0, 0), (-1, -1), 2.8),
                                ("BOTTOMPADDING", (0, 0), (-1, -1), 2.8),
                            ]))])

    content = Table(inner, colWidths=[avail - 15 * mm],
                    style=TableStyle([
                        ("LEFTPADDING", (0, 0), (-1, -1), 0),
                        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                        ("TOPPADDING", (0, 0), (-1, -1), 0),
                        ("BOTTOMPADDING", (0, 0), (-1, -1), 2.5),
                        ("VALIGN", (0, 0), (-1, -1), "TOP"),
                    ]))

    box = Table([[""]], colWidths=[9], rowHeights=[9],
                style=TableStyle([
                    ("BOX", (0, 0), (-1, -1), 0.9, INK2),
                    ("BACKGROUND", (0, 0), (-1, -1), colors.white),
                ]))

    return Table([[box, content]],
                 colWidths=[13 * mm, avail - 13 * mm],
                 style=TableStyle([
                     ("VALIGN", (0, 0), (-1, -1), "TOP"),
                     ("LEFTPADDING", (0, 0), (0, -1), 2),
                     ("LEFTPADDING", (1, 0), (1, -1), 0),
                     ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                     ("TOPPADDING", (0, 0), (-1, -1), 3.6),
                     ("BOTTOMPADDING", (0, 0), (-1, -1), 3.6),
                     ("LINEBELOW", (0, 0), (-1, -1), 0.4, LINE),
                 ]))


def stage_header(num, title, sub, avail):
    t = Table([[Paragraph(num.upper(), st_stagen)],
               [Paragraph(title, st_stage)],
               [Paragraph('<font color="#c9d2d8">%s</font>' % sub, st_body)]],
              colWidths=[avail],
              style=TableStyle([
                  ("BACKGROUND", (0, 0), (-1, -1), INK),
                  ("LEFTPADDING", (0, 0), (-1, -1), 8),
                  ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                  ("TOPPADDING", (0, 0), (0, 0), 6),
                  ("BOTTOMPADDING", (0, -1), (-1, -1), 6),
                  ("TOPPADDING", (0, 1), (-1, -1), 1),
                  ("BOTTOMPADDING", (0, 0), (-1, -2), 1),
              ]))
    return t


# ---------------- page furniture ----------------
def draw_page(canv, doc):
    canv.saveState()
    # header rule
    canv.setStrokeColor(LINE)
    canv.setLineWidth(0.6)
    canv.line(MARGIN, PH - MARGIN + 5 * mm, PW - MARGIN, PH - MARGIN + 5 * mm)
    canv.setFont("DJ-B", 6.6)
    canv.setFillColor(BRASS)
    canv.drawString(MARGIN, PH - MARGIN + 7.5 * mm, "REALTY HOLDING & MANAGEMENT CONSULTANTS")
    canv.setFont("DJ", 6.6)
    canv.setFillColor(INK3)
    canv.drawRightString(PW - MARGIN, PH - MARGIN + 7.5 * mm,
                         "Property Document Verification Checklist  ·  July 2026")
    # footer
    canv.setStrokeColor(LINE)
    canv.line(MARGIN, MARGIN - 2 * mm, PW - MARGIN, MARGIN - 2 * mm)
    canv.setFont("DJ", 6.4)
    canv.setFillColor(INK3)
    canv.drawString(MARGIN, MARGIN - 5.5 * mm,
                    "E328, Phase 8A, Industrial Area, Mohali  ·  +91 78146 13916  ·  realtyconsultants.in")
    canv.drawRightString(PW - MARGIN, MARGIN - 5.5 * mm, "Page %d" % canv.getPageNumber())
    canv.restoreState()


def build(path):
    avail = PW - 2 * MARGIN
    doc = BaseDocTemplate(path, pagesize=A4,
                          leftMargin=MARGIN, rightMargin=MARGIN,
                          topMargin=MARGIN, bottomMargin=MARGIN + 2 * mm,
                          title="Property Document Verification Checklist, India and Punjab",
                          author="Amritpal Singh, Realty Holding & Management Consultants",
                          subject="Documents required to buy property in India, with Punjab equivalents")
    frame = Frame(MARGIN, MARGIN + 2 * mm, avail, PH - 2 * MARGIN - 4 * mm, id="f")
    doc.addPageTemplates([PageTemplate(id="main", frames=[frame], onPage=draw_page)])

    s = []
    s.append(Paragraph("Property Document Verification Checklist", st_h1))
    s.append(Paragraph(
        "Every document to verify before you buy property in India, in the order you actually need it, "
        "with the Punjab layer most checklists leave out. Tick as you verify. Take it to the site visit.",
        st_sub))

    # answer block
    ans = ("<b>Before paying anything, verify five documents:</b> the title or conveyance deed, the mother deed, "
           "the encumbrance certificate, the sale deed, and clearance receipts for property tax, electricity, water "
           "and maintenance. Buying from a builder or authority adds six: the allotment letter, approved building plan, "
           "completion certificate, occupancy certificate, applicable NOCs, and permission to sell. "
           "In Punjab, title proof is the <b>fard</b> and <b>jamabandi</b>, and transfer of record is the <b>intkal</b>. "
           "All of them come from the Revenue Department, not from the seller.")
    s.append(Table([[Paragraph(ans, st_answer)]], colWidths=[avail],
                   style=TableStyle([
                       ("BACKGROUND", (0, 0), (-1, -1), PAPER),
                       ("LINEBEFORE", (0, 0), (0, -1), 2.2, BRASS),
                       ("LEFTPADDING", (0, 0), (-1, -1), 8),
                       ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                       ("TOPPADDING", (0, 0), (-1, -1), 6),
                       ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
                   ])))
    s.append(Spacer(1, 7))

    for num, title, sub, items in STAGES:
        s.append(KeepTogether([
            stage_header(num, title, sub, avail),
            Spacer(1, 1),
            tickbox_row(*items[0], avail=avail),
        ]))
        for it in items[1:]:
            s.append(tickbox_row(*it, avail=avail))
        s.append(Spacer(1, 7))

    # punjab terms table
    rows = [[Paragraph("Standard name", st_th), Paragraph("Punjab equivalent", st_th),
             Paragraph("Where it comes from", st_th)]]
    for a, b, c in PUNJABI_TERMS:
        rows.append([Paragraph(a, st_cellb), Paragraph(b, st_cell), Paragraph(c, st_cell)])
    terms = Table(rows, colWidths=[avail * 0.32, avail * 0.30, avail * 0.38], repeatRows=1,
                  style=TableStyle([
                      ("BACKGROUND", (0, 0), (-1, 0), PAPER),
                      ("LINEBELOW", (0, 0), (-1, -1), 0.4, LINE),
                      ("BOX", (0, 0), (-1, -1), 0.6, LINE),
                      ("VALIGN", (0, 0), (-1, -1), "TOP"),
                      ("LEFTPADDING", (0, 0), (-1, -1), 6),
                      ("RIGHTPADDING", (0, 0), (-1, -1), 6),
                      ("TOPPADDING", (0, 0), (-1, -1), 3.2),
                      ("BOTTOMPADDING", (0, 0), (-1, -1), 3.2),
                  ]))
    s.append(KeepTogether([
        Paragraph("What these documents are called in Punjab", st_sect),
        terms,
    ]))
    s.append(Spacer(1, 8))

    # walk away
    walk_rows = [[Paragraph("<b>When to walk away</b>", S("wh", fontName="DJ-B", fontSize=10.5,
                                                          leading=13, textColor=colors.HexColor("#7d2820")))]]
    for w in WALKAWAY:
        walk_rows.append([Paragraph("•&nbsp;&nbsp;" + w, st_walk)])
    s.append(KeepTogether(Table(walk_rows, colWidths=[avail],
                                style=TableStyle([
                                    ("BACKGROUND", (0, 0), (-1, -1), FLAG_S),
                                    ("BOX", (0, 0), (-1, -1), 0.6, colors.HexColor("#e8cdc8")),
                                    ("LEFTPADDING", (0, 0), (-1, -1), 9),
                                    ("RIGHTPADDING", (0, 0), (-1, -1), 9),
                                    ("TOPPADDING", (0, 0), (0, 0), 8),
                                    ("TOPPADDING", (0, 1), (-1, -1), 2),
                                    ("BOTTOMPADDING", (0, 0), (-1, -2), 2),
                                    ("BOTTOMPADDING", (0, -1), (-1, -1), 8),
                                ]))))
    s.append(Spacer(1, 8))

    # CTA + author
    cta = [
        [Paragraph("If something on this list is not adding up", st_ctah)],
        [Paragraph(
            "This checklist is free and there is nothing to sign up for. If you are mid-transaction in Mohali, Rajpura, "
            "Dera Bassi, Lalru, Banur or Shamboo and want a second opinion on a specific file before you commit, "
            "one conversation is usually enough to tell you whether the paperwork is clean. Fifteen minutes. No pitch.<br/>"
            "<b>WhatsApp +91 78146 13916</b>  ·  realtyconsultants.in", st_body)],
        [Spacer(1, 5)],
        [Paragraph(
            "<b>Amritpal Singh</b> is the founder of Realty Holding &amp; Management Consultants, E328, Phase 8A, "
            "Industrial Area, Mohali. With over 10 years across real estate development, government liaisoning, capital "
            "markets and media, he has personally closed 180+ transactions across all property categories in Punjab. "
            "He has obtained project approvals across five Punjab regulatory bodies including GMADA, PUDA, PSPCL, the "
            "Municipal Committee and the Forest Department. AMFI and NCFM certified.", st_fine)],
        [Paragraph(
            "<i>General information based on our transaction experience in Punjab. Not legal advice. Requirements vary "
            "by state and circumstance. Engage a qualified property lawyer in the district where the property is located "
            "before completing any transaction. Figures current as of July 2026.</i>", st_fine)],
    ]
    s.append(KeepTogether(Table(cta, colWidths=[avail],
                                style=TableStyle([
                                    ("BOX", (0, 0), (-1, -1), 1.1, INK),
                                    ("LEFTPADDING", (0, 0), (-1, -1), 10),
                                    ("RIGHTPADDING", (0, 0), (-1, -1), 10),
                                    ("TOPPADDING", (0, 0), (0, 0), 9),
                                    ("TOPPADDING", (0, 1), (-1, -1), 3),
                                    ("BOTTOMPADDING", (0, 0), (-1, -2), 3),
                                    ("BOTTOMPADDING", (0, -1), (-1, -1), 9),
                                ]))))

    doc.build(s)
    print("built:", path)


if __name__ == "__main__":
    build("/sessions/clever-sharp-bardeen/mnt/outputs/RHMC-Property-Document-Checklist.pdf")
