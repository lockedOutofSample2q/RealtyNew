// content/area-calculator/tier2-remaining.ts
import { AreaPageContent } from "./types";

export const remainingTier2Pages: Record<string, AreaPageContent> = {
  "marla-to-square-yard": {
    slug: "marla-to-square-yard",
    title: "1 Marla = 30.25 Sq Yd (Gaj) - Marla to Square Yard Converter",
    metaDescription: "Convert marla to square yards (gaj) in Punjab. 1 marla equals 30.25 sq yd. View formulas, plot dimensions and GMADA sector layout equivalents.",
    h1: "Marla to Square Yard (Gaj) Converter",
    tier: "conversion",
    fromUnitId: "marla",
    toUnitId: "sqyd",
    answerBlock: "1 marla equals 30.25 square yards (gaj) in standard Punjab revenue records. To convert marla to square yards, multiply the number of marlas by 30.25. For example, a 10 marla plot equals 302.5 square yards.",
    keyFacts: [
      { term: "Standard Marla in Sq Yd", value: "30.25 sq yd (gaj)" },
      { term: "4 Marla Plot in Sq Yd", value: "121 sq yd (1,089 sq ft)" },
      { term: "6 Marla Plot in Sq Yd", value: "181.5 sq yd (1,633.5 sq ft)" },
      { term: "8 Marla Plot in Sq Yd", value: "242 sq yd (2,178 sq ft)" },
      { term: "10 Marla Plot in Sq Yd", value: "302.5 sq yd (2,722.5 sq ft)" },
      { term: "Formula", value: "square yards = marla × 30.25" },
    ],
    formula: {
      forward: "square yards = marla × 30.25",
      reverse: "marla = square yards ÷ 30.25",
      example: "A 8 marla plot in Sector 78 Mohali equals 8 × 30.25 = 242 square yards (gaj).",
    },
    questions: [
      {
        question: "How many square yards (gaj) are in 1 marla?",
        answer: "1 marla contains exactly 30.25 square yards (gaj) in standard Punjab revenue records.",
      },
      {
        question: "How many square yards is a 5 marla plot?",
        answer: "A 5 marla plot equals 151.25 square yards (1,361.25 square feet).",
      },
      {
        question: "How do I convert marla to gaj by hand?",
        answer: "Multiply the marla figure by 30.25. For example, 6 marla × 30.25 = 181.5 gaj.",
      },
      {
        question: "Is a gaj the same as a square yard in Mohali?",
        answer: "Yes, gaj (or gajj) is the local Indian term for square yard; 1 gaj equals 9 square feet.",
      },
      {
        question: "How many marla is 250 square yards?",
        answer: "Divide 250 by 30.25 to get 8.264 marla.",
      },
      {
        question: "Why do plot deeds list both marla and square yards?",
        answer: "GMADA urban authorities issue plot allotments in square yards, while revenue registries log deeds in marla-kanal notation.",
      },
    ],
    citations: [
      {
        title: "Punjab Land Records Manual (3rd Edition, 2004)",
        url: "https://jamabandi.punjab.gov.in/",
        source: "Department of Revenue, Punjab",
      },
    ],
    statistic: "30.25 square yards equals 1 standard marla, 121 square yards equals 1 biswa, and 605 square yards equals 1 kanal in Mohali.",
    provenance: "Conversion factors sourced from the Punjab Land Records Manual, 3rd edition, 2004. Last verified 26 July 2026.",
    sections: [
      {
        title: "Navigating Plot Sizes in Square Yards and Marlas",
        content: "In urban property markets like Mohali and Chandigarh, buyers frequently switch between marla and square yard (gaj) terminology. While architectural blueprints specify frontages and depths in feet or square yards, revenue records maintain marla entries. 1 marla equals 30.25 square yards.",
      },
      {
        title: "GMADA Plot Allotment Equivalents",
        content: "Common GMADA residential plot sizes expressed in both units: 4 marla = 121 sq yd, 6 marla = 181.5 sq yd, 8 marla = 242 sq yd, 10 marla = 302.5 sq yd, 1 kanal = 605 sq yd.",
      },
      {
        title: "Calculation Mechanics",
        content: "To convert marla to square yards, multiply by 30.25. To reverse convert from square yards to marla, divide by 30.25.",
      },
    ],
    siblingLinks: [
      { slug: "marla-to-square-feet", anchorText: "Marla to Square Feet Converter" },
      { slug: "square-yard-to-square-feet", anchorText: "Square Yard to Square Feet Converter" },
    ],
    entityLinks: [
      { slug: "marla-in-punjab", anchorText: "Regional Marla Standards" },
    ],
  },

  "square-yard-to-square-feet": {
    slug: "square-yard-to-square-feet",
    title: "1 Sq Yd = 9 Sq Ft - Square Yard to Square Feet Converter",
    metaDescription: "Convert square yards to square feet. 1 square yard equals 9 square feet. Calculate plot areas, covered areas and architectural square footage.",
    h1: "Square Yard to Square Feet Converter (1 Sq Yd = 9 Sq Ft)",
    tier: "conversion",
    fromUnitId: "sqyd",
    toUnitId: "sqft",
    answerBlock: "1 square yard equals exactly 9 square feet. A square yard is a square area measuring 3 feet (36 inches) on each side. To convert square yards to square feet, multiply the square yard figure by 9.",
    keyFacts: [
      { term: "1 Square Yard", value: "9 sq ft (exact)" },
      { term: "100 Sq Yd in Sq Ft", value: "900 sq ft" },
      { term: "200 Sq Yd in Sq Ft", value: "1,800 sq ft" },
      { term: "250 Sq Yd in Sq Ft", value: "2,250 sq ft" },
      { term: "500 Sq Yd in Sq Ft", value: "4,500 sq ft" },
    ],
    formula: {
      forward: "square feet = square yards × 9",
      reverse: "square yards = square feet ÷ 9",
      example: "A 250 sq yd plot in Sector 82A IT City Mohali equals 250 × 9 = 2,250 square feet.",
    },
    questions: [
      {
        question: "How many square feet are in 1 square yard?",
        answer: "There are exactly 9 square feet in 1 square yard.",
      },
      {
        question: "How many square feet is a 200 square yard plot?",
        answer: "A 200 square yard plot equals 1,800 square feet.",
      },
      {
        question: "What is the formula for converting square yards to square feet?",
        answer: "Multiply the number of square yards by 9.",
      },
      {
        question: "Is square yard the same as gaj?",
        answer: "Yes, 1 square yard is functionally identical to 1 gaj in Indian property terminology.",
      },
      {
        question: "How many square yards in 1,000 square feet?",
        answer: "Divide 1,000 by 9 to get 111.11 square yards.",
      },
      {
        question: "How do I calculate plot square footage from dimensions in feet?",
        answer: "Multiply plot width in feet by depth in feet. For example, 30 ft × 60 ft = 1,800 sq ft (200 sq yd).",
      },
    ],
    citations: [
      {
        title: "National Building Code of India (NBC 2016)",
        url: "https://bis.gov.in/",
        source: "Bureau of Indian Standards",
      },
    ],
    statistic: "1 square yard equals 9 square feet, 0.836127 square metres, or 0.033058 marlas in Mohali.",
    provenance: "Standard metric conversion factor. Last verified 26 July 2026.",
    sections: [
      {
        title: "Architectural Layouts and Square Footage Calculations",
        content: "In Indian urban design, master plans and municipal sanction drawings quote total land allotment in square yards while detailing floor plans and room dimensions in square feet. Multiplying square yards by 9 provides the total ground footprint.",
      },
      {
        title: "Standard Allotment Plot Footprints",
        content: "100 sq yd = 900 sq ft (30×30 ft). 150 sq yd = 1,350 sq ft (30×45 ft). 200 sq yd = 1,800 sq ft (30×60 ft). 250 sq yd = 2,250 sq ft (35×64.3 ft). 500 sq yd = 4,500 sq ft (50×90 ft).",
      },
      {
        title: "Mathematical Proof",
        content: "Since 1 yard = 3 feet, 1 square yard = 3 ft × 3 ft = 9 sq ft.",
      },
    ],
    siblingLinks: [
      { slug: "gaj-to-square-feet", anchorText: "Gaj to Square Feet Converter" },
      { slug: "marla-to-square-yard", anchorText: "Marla to Square Yard Converter" },
    ],
    entityLinks: [
      { slug: "land-measurement-in-mohali", anchorText: "Mohali GMADA Allotment Guide" },
    ],
  },

  "gaj-to-square-feet": {
    slug: "gaj-to-square-feet",
    title: "1 Gaj = 9 Sq Ft - Gaj to Square Feet Plot Calculator",
    metaDescription: "Convert gaj (gajj) to square feet for Indian property deals. 1 gaj equals 9 square feet. View plot dimension tables, rates and GMADA examples.",
    h1: "Gaj to Square Feet Converter (1 Gaj = 9 Sq Ft)",
    tier: "conversion",
    fromUnitId: "sqyd",
    toUnitId: "sqft",
    answerBlock: "1 gaj (also spelled gajj or gaz) is equal to 9 square feet in Indian real estate practice. To convert gaj to square feet, multiply the gaj figure by 9. For example, a 150 gaj plot equals 1,350 square feet.",
    keyFacts: [
      { term: "1 Gaj Equivalent", value: "9 sq ft" },
      { term: "100 Gaj Plot", value: "900 sq ft" },
      { term: "150 Gaj Plot", value: "1,350 sq ft" },
      { term: "200 Gaj Plot", value: "1,800 sq ft" },
      { term: "250 Gaj Plot", value: "2,250 sq ft" },
      { term: "500 Gaj Plot", value: "4,500 sq ft" },
    ],
    formula: {
      forward: "square feet = gaj × 9",
      reverse: "gaj = square feet ÷ 9",
      example: "A 200 gaj residential plot in Aerocity Block C Mohali equals 200 × 9 = 1,800 square feet.",
    },
    questions: [
      {
        question: "How many square feet is 1 gaj?",
        answer: "1 gaj equals exactly 9 square feet.",
      },
      {
        question: "How many square feet is a 100 gaj plot?",
        answer: "A 100 gaj plot equals 900 square feet (typically 22.5 ft frontage by 40 ft depth).",
      },
      {
        question: "Is gaj used for plot area or linear length?",
        answer: "In real estate conversations, 'gaj' refers to plot area (square yard). Linear gaj (3 feet) is used for textile or fence lengths.",
      },
      {
        question: "How do I calculate plot price from rate per gaj?",
        answer: "Multiply the total gaj by the rate per gaj. For example, 200 gaj at INR 65,000 per gaj equals INR 1,30,000,00 (1.30 Crore).",
      },
      {
        question: "How many marla in 100 gaj?",
        answer: "100 gaj equals 900 sq ft. Divide by 272.25 to get 3.305 marla.",
      },
      {
        question: "Why do property listings in Mohali quote price per gaj?",
        answer: "In North India, land buyers negotiate plot deals on a 'per gaj' basis, while construction contracts use 'per sq ft'.",
      },
    ],
    citations: [
      {
        title: "Bureau of Indian Standards Building Norms",
        url: "https://bis.gov.in/",
        source: "Government of India",
      },
    ],
    statistic: "In Tricity plot negotiations, pricing is quoted per gaj (e.g. ₹60,000/gaj), while building coverage is calculated in square feet.",
    provenance: "Standard Indian land measurement terminology. Last verified 26 July 2026.",
    sections: [
      {
        title: "Understanding the 'Gaj' Benchmark in North Indian Real Estate",
        content: "Across Punjab, Haryana, Delhi-NCR, and Rajasthan, plot sizes are universally described in 'gaj'. Whether discussing a 100 gaj kothi plot in Kharar or a 500 gaj plot in Aerocity, 1 gaj equals 9 square feet. Understanding the exact square footage helps evaluate building coverage and construction estimates.",
      },
      {
        title: "Standard Plot Dimensions in Gaj and Feet",
        content: "100 gaj = 900 sq ft (20×45 ft or 22.5×40 ft). 150 gaj = 1,350 sq ft (30×45 ft). 200 gaj = 1,800 sq ft (30×60 ft). 250 gaj = 2,250 sq ft (35×64.3 ft). 300 gaj = 2,700 sq ft (36×75 ft). 500 gaj = 4,500 sq ft (50×90 ft).",
      },
      {
        title: "Evaluating Land Quotes",
        content: "To convert a seller's price quote from per gaj to per sq ft: divide the per gaj rate by 9. For instance, ₹63,000 per gaj ÷ 9 = ₹7,000 per sq ft.",
      },
    ],
    siblingLinks: [
      { slug: "square-yard-to-square-feet", anchorText: "Square Yard to Square Feet Converter" },
      { slug: "marla-to-square-yard", anchorText: "Marla to Square Yard Converter" },
    ],
    entityLinks: [
      { slug: "land-measurement-in-mohali", anchorText: "Mohali Sector Plotting Guide" },
    ],
  },

  "square-metre-to-square-feet": {
    slug: "square-metre-to-square-feet",
    title: "1 Sq Metre = 10.7639 Sq Ft - Square Metre to Sq Ft Converter",
    metaDescription: "Convert square metres to square feet instantly. 1 sq m equals 10.7639 sq ft. Metric to imperial area conversion with formulas and RERA examples.",
    h1: "Square Metre to Square Feet Converter",
    tier: "conversion",
    fromUnitId: "sqm",
    toUnitId: "sqft",
    answerBlock: "1 square metre equals 10.76391 square feet. Under RERA compliance guidelines, property floor plans specify carpet area in square metres. To convert square metres to square feet, multiply by 10.7639.",
    keyFacts: [
      { term: "1 Square Metre", value: "10.76391 sq ft" },
      { term: "50 Sq M in Sq Ft", value: "538.20 sq ft" },
      { term: "100 Sq M in Sq Ft", value: "1,076.39 sq ft" },
      { term: "150 Sq M in Sq Ft", value: "1,614.59 sq ft" },
      { term: "Formula", value: "sq ft = sq m × 10.76391" },
    ],
    formula: {
      forward: "square feet = square metres × 10.76391",
      reverse: "square metres = square feet ÷ 10.76391",
      example: "A flat carpet area of 85.5 sq m in JLPL Falcon View Mohali equals 85.5 × 10.76391 = 920.31 square feet.",
    },
    questions: [
      {
        question: "How many square feet are in 1 square metre?",
        answer: "There are exactly 10.76391 square feet in 1 square metre.",
      },
      {
        question: "How many square feet is 100 square metres?",
        answer: "100 square metres equals 1,076.39 square feet.",
      },
      {
        question: "Why do RERA documents specify area in square metres?",
        answer: "The Real Estate (Regulation and Development) Act mandates official metric measurements (square metres) for carpet area disclosures.",
      },
      {
        question: "How do I convert square metres to marla in Mohali?",
        answer: "Multiply square metres by 10.76391 to get square feet, then divide by 272.25.",
      },
      {
        question: "What is 1,000 sq ft in square metres?",
        answer: "Divide 1,000 by 10.76391 to get 92.903 square metres.",
      },
      {
        question: "How do I convert sq metres to square yards (gaj)?",
        answer: "Multiply square metres by 1.19599.",
      },
    ],
    citations: [
      {
        title: "RERA Punjab Carpet Area Disclosure Norms",
        url: "https://rera.punjab.gov.in/",
        source: "Real Estate Regulatory Authority Punjab",
      },
    ],
    statistic: "1 square metre equals exactly 10.76391 square feet or 1.19599 square yards.",
    provenance: "Exact metric definition (1 ft = 0.3048 m). Last verified 26 July 2026.",
    sections: [
      {
        title: "Metric Conversion in RERA Compliance and Builder Disclosures",
        content: "Under RERA regulations in Punjab, developers must state apartment carpet areas in square metres on statutory filings. However, buyers in Mohali think in square feet. Multiplying square metres by 10.76391 converts RERA metrics to standard square feet.",
      },
      {
        title: "Conversion Examples for Apartment Buyers",
        content: "60 sq m carpet area = 645.83 sq ft. 80 sq m carpet area = 861.11 sq ft. 120 sq m carpet area = 1,291.67 sq ft. 150 sq m carpet area = 1,614.59 sq ft.",
      },
      {
        title: "Mathematical Accuracy",
        content: "Because 1 foot equals 0.3048 metres exactly, 1 sq m = 1 / (0.3048 × 0.3048) = 10.7639104167 sq ft.",
      },
    ],
    siblingLinks: [
      { slug: "marla-to-square-metre", anchorText: "Marla to Square Metre Converter" },
      { slug: "square-feet-to-marla", anchorText: "Square Feet to Marla Converter" },
    ],
    entityLinks: [
      { slug: "punjab-land-measurement-chart", anchorText: "Master Land Measurement Chart" },
    ],
  },

  "kanal-to-marla": {
    slug: "kanal-to-marla",
    title: "1 Kanal = 20 Marla - Kanal to Marla Converter",
    metaDescription: "Convert kanal to marla instantly. 1 kanal equals 20 marla across all six revenue systems in Punjab. View worked examples and plot conversions.",
    h1: "Kanal to Marla Converter (1 Kanal = 20 Marla)",
    tier: "conversion",
    fromUnitId: "kanal",
    toUnitId: "marla",
    answerBlock: "1 kanal equals exactly 20 marla across all revenue jurisdictions in Punjab, Haryana and Himachal Pradesh. To convert kanal to marla, multiply the kanal count by 20. For example, 2.5 kanal equals 50 marla.",
    keyFacts: [
      { term: "Kanal to Marla Ratio", value: "1 kanal = 20 marla (exact)" },
      { term: "0.5 Kanal (Half Kanal)", value: "10 marla" },
      { term: "2 Kanal", value: "40 marla" },
      { term: "4 Kanal (1 Bigha)", value: "80 marla" },
      { term: "8 Kanal (1 Acre)", value: "160 marla" },
    ],
    formula: {
      forward: "marla = kanal × 20",
      reverse: "kanal = marla ÷ 20",
      example: "A 3 kanal farmhouse site in Mullanpur New Chandigarh equals 3 × 20 = 60 marla.",
    },
    questions: [
      {
        question: "How many marlas make 1 kanal?",
        answer: "Exactly 20 marlas make 1 kanal.",
      },
      {
        question: "How many marlas is half a kanal?",
        answer: "Half a kanal (0.5 kanal) contains 10 marla.",
      },
      {
        question: "Does the 20 marla per kanal ratio change by district?",
        answer: "No, the 20 marla = 1 kanal ratio is constant across all six Punjab revenue systems, even though square footage varies.",
      },
      {
        question: "How many marlas are in 1 acre?",
        answer: "1 acre (8 kanal) contains 160 marla in standard Punjab revenue practice.",
      },
      {
        question: "How do I convert marlas to kanal?",
        answer: "Divide the marla figure by 20. For example, 35 marla ÷ 20 = 1.75 kanal (1 kanal 15 marla).",
      },
      {
        question: "What is a 1-kanal plot in marlas?",
        answer: "A 1-kanal plot is 20 marla (5,445 sq ft in Mohali).",
      },
    ],
    citations: [
      {
        title: "Punjab Land Records Manual (3rd Edition, 2004)",
        url: "https://jamabandi.punjab.gov.in/",
        source: "Department of Revenue, Punjab",
      },
    ],
    statistic: "20 marla equals 1 kanal across all Punjab revenue systems, representing 5,445 sq ft in Mohali and 4,132.81 sq ft in Doaba.",
    provenance: "Conversion factors sourced from the Punjab Land Records Manual, 3rd edition, 2004. Last verified 26 July 2026.",
    sections: [
      {
        title: "The Universal 20 Marla to 1 Kanal Revenue Ratio",
        content: "While square foot areas per marla vary between Mohali (272.25 sq ft), Jalandhar (206.64 sq ft), and Amritsar (225 sq ft), the internal hierarchy of 20 marla per kanal remains fixed across every tehsil in Punjab.",
      },
      {
        title: "Converting Fractional Kanal Values",
        content: "0.25 kanal = 5 marla. 0.5 kanal = 10 marla. 0.75 kanal = 15 marla. 1.25 kanal = 25 marla. 2.5 kanal = 50 marla.",
      },
      {
        title: "Practical Land Registry Application",
        content: "Jamabandi records state land area in Kanal-Marla format (e.g., 1-15 means 1 kanal 15 marla = 35 marla total).",
      },
    ],
    siblingLinks: [
      { slug: "marla-to-kanal", anchorText: "Marla to Kanal Converter" },
      { slug: "kanal-to-square-feet", anchorText: "Kanal to Square Feet Converter" },
      { slug: "marla-to-square-feet", anchorText: "Marla to Square Feet Converter" },
    ],
    entityLinks: [
      { slug: "kanal-in-punjab", anchorText: "Kanal Regional Variations" },
    ],
  },

  "marla-to-kanal": {
    slug: "marla-to-kanal",
    title: "20 Marla = 1 Kanal - Marla to Kanal Converter",
    metaDescription: "Convert marla to kanal instantly. 20 marla equals 1 kanal in Punjab real estate. Calculate kanal and marla remainders with live formulas.",
    h1: "Marla to Kanal Converter (20 Marla = 1 Kanal)",
    tier: "conversion",
    fromUnitId: "marla",
    toUnitId: "kanal",
    answerBlock: "To convert marla to kanal in Punjab, divide the marla figure by 20. For example, 35 marla divided by 20 equals 1.75 kanal (1 kanal and 15 marla).",
    keyFacts: [
      { term: "Marla to Kanal Factor", value: "20 marla = 1 kanal" },
      { term: "10 Marla in Kanal", value: "0.5 kanal" },
      { term: "25 Marla in Kanal", value: "1.25 kanal (1 kanal 5 marla)" },
      { term: "40 Marla in Kanal", value: "2 kanal" },
      { term: "80 Marla in Kanal", value: "4 kanal (1 bigha)" },
    ],
    formula: {
      forward: "kanal = marla ÷ 20",
      reverse: "marla = kanal × 20",
      example: "45 marla of land in Sector 70 Mohali equals 45 ÷ 20 = 2.25 kanal (2 kanal 5 marla).",
    },
    questions: [
      {
        question: "How many kanal is 20 marla?",
        answer: "20 marla equals exactly 1 kanal.",
      },
      {
        question: "How many kanal is 30 marla?",
        answer: "30 marla equals 1.5 kanal (1 kanal 10 marla).",
      },
      {
        question: "How do I convert marla to kanal?",
        answer: "Divide total marla by 20.",
      },
      {
        question: "How many marla in 4 kanal?",
        answer: "4 kanal contains 80 marla (1 bigha in Mohali).",
      },
      {
        question: "How do I express marla remainders in revenue format?",
        answer: "The whole number gives kanal count; the decimal remainder multiplied by 20 gives remaining marlas.",
      },
      {
        question: "Is marla to kanal conversion the same in Haryana?",
        answer: "Yes, Haryana follows the same 20 marla = 1 kanal ratio.",
      },
    ],
    citations: [
      {
        title: "Punjab Land Records Manual (3rd Edition, 2004)",
        url: "https://jamabandi.punjab.gov.in/",
        source: "Department of Revenue, Punjab",
      },
    ],
    statistic: "20 marla equals 1 kanal, representing 5,445 sq ft in Mohali and 4,500 sq ft in Amritsar.",
    provenance: "Conversion factors sourced from the Punjab Land Records Manual, 3rd edition, 2004. Last verified 26 July 2026.",
    sections: [
      {
        title: "Simplifying Land Records from Marla to Kanal",
        content: "When combining multiple small plot parcels or auditing agricultural deeds, converting marla counts above 20 into kanal notation simplifies site evaluation.",
      },
      {
        title: "Worked Conversion Examples",
        content: "15 marla = 0.75 kanal. 20 marla = 1.0 kanal. 30 marla = 1.5 kanal (1 kanal 10 marla). 50 marla = 2.5 kanal (2 kanal 10 marla). 100 marla = 5.0 kanal.",
      },
      {
        title: "Revenue Notation Rules",
        content: "In revenue deeds, 25 marla is written as 1-5-0 (1 kanal, 5 marla, 0 sarsahi).",
      },
    ],
    siblingLinks: [
      { slug: "kanal-to-marla", anchorText: "Kanal to Marla Converter" },
      { slug: "marla-to-square-feet", anchorText: "Marla to Square Feet Converter" },
    ],
    entityLinks: [
      { slug: "marla-in-punjab", anchorText: "Marla District Guide" },
    ],
  },

  "bigha-to-acre": {
    slug: "bigha-to-acre",
    title: "Bigha to Acre Converter - 2 Bigha = 1 Acre (Mohali) / 4.8 Bigha (Rajpura)",
    metaDescription: "Convert bigha to acre across Punjab. Learn why 2 bigha = 1 acre in Mohali but 4.8 bigha = 1 acre in Rajpura and Banur with full revenue proofs.",
    h1: "Bigha to Acre Converter (Mohali & Rajpura Systems)",
    tier: "conversion",
    fromUnitId: "bigha",
    toUnitId: "acre",
    answerBlock: "In Mohali and standard Punjab (System A), 2 bigha equal 1 acre. In Rajpura, Banur and Patiala (System B), 4.8 bigha (4 bigha 16 biswa) equal 1 acre. In Ludhiana (System F), 1.6 pakka bigha equal 1 acre.",
    keyFacts: [
      { term: "Mohali / Standard Bigha to Acre", value: "2 bigha = 1 acre (0.5 acre/bigha)" },
      { term: "Rajpura / Patiala Bigha to Acre", value: "4.8 bigha = 1 acre (0.2083 acre/bigha)" },
      { term: "Ludhiana Pakka Bigha to Acre", value: "1.6 bigha = 1 acre (0.625 acre/bigha)" },
      { term: "Majha Bigha to Acre", value: "4.356 bigha = 1 acre (0.2296 acre/bigha)" },
    ],
    formula: {
      forward: "acres = bighas ÷ local bigha-per-acre factor",
      reverse: "bighas = acres × local bigha-per-acre factor",
      example: "75 bigha in Rajpura equals 75 ÷ 4.8 = 15.625 acres. 75 bigha in Mohali equals 75 ÷ 2 = 37.5 acres.",
    },
    questions: [
      {
        question: "How many bigha make 1 acre in Mohali?",
        answer: "In Mohali and standard consolidated Punjab, exactly 2 bigha make 1 acre.",
      },
      {
        question: "How many bigha make 1 acre in Rajpura and Banur?",
        answer: "In Rajpura, Banur and Patiala, 4.8 bigha (4 bigha 16 biswa) make 1 acre.",
      },
      {
        question: "How many bigha make 1 acre in Ludhiana?",
        answer: "In Ludhiana, 1.6 pakka bigha make 1 acre.",
      },
      {
        question: "What is 10 bigha in acres in Mohali?",
        answer: "10 bigha in Mohali equals 10 ÷ 2 = 5 acres.",
      },
      {
        question: "What is 10 bigha in acres in Rajpura?",
        answer: "10 bigha in Rajpura equals 10 ÷ 4.8 = 2.083 acres.",
      },
      {
        question: "Why is there a difference between Mohali and Rajpura bigha-to-acre ratios?",
        answer: "Mohali uses standard 21,780 sq ft bighas (0.5 acre), while Rajpura uses Patiala state katcha bighas of 9,075 sq ft (0.2083 acre).",
      },
    ],
    citations: [
      {
        title: "Punjab Land Records Manual (3rd Edition, 2004)",
        url: "https://jamabandi.punjab.gov.in/",
        source: "Department of Revenue, Punjab",
      },
    ],
    statistic: "4.8 bigha in Rajpura equals 1 acre, whereas 2 bigha in Mohali equals 1 acre—a 140% area difference per bigha.",
    provenance: "Conversion factors sourced from the Punjab Land Records Manual, 3rd edition, 2004. Last verified 26 July 2026.",
    sections: [
      {
        title: "The Bigha-to-Acre Conversion Trap in Punjab Agricultural Land Banking",
        content: "When acquiring agricultural or industrial land in Punjab, converting bighas to acres depends on the applicable revenue system. Applying Mohali's 2 bigha/acre factor to a Rajpura listing (where 4.8 bigha = 1 acre) results in a severe overestimation of acreage.",
      },
      {
        title: "Regional Comparison of Bigha-to-Acre Ratios",
        content: "1. Mohali/Kharar (System A): 2 bigha = 1 acre. 2. Rajpura/Patiala (System B): 4.8 bigha = 1 acre. 3. Ludhiana (System F): 1.6 bigha = 1 acre. 4. Majha (System D): 4.356 bigha = 1 acre.",
      },
      {
        title: "Verification Workflow",
        content: "To convert bighas to acres: Select the local land region in the tool above, or divide bighas by 2 for Mohali and by 4.8 for Rajpura.",
      },
    ],
    siblingLinks: [
      { slug: "acre-to-bigha", anchorText: "Acre to Bigha Converter" },
      { slug: "bigha-to-square-feet", anchorText: "Bigha to Square Feet Converter" },
    ],
    entityLinks: [
      { slug: "bigha-in-rajpura", anchorText: "Rajpura 9,075 Sq Ft Bigha Guide" },
      { slug: "bigha-in-punjab", anchorText: "Bigha Disambiguation" },
    ],
  },

  "acre-to-bigha": {
    slug: "acre-to-bigha",
    title: "1 Acre = 2 Bigha (Mohali) / 4.8 Bigha (Rajpura) - Farm Land Converter",
    metaDescription: "Convert acres to bigha across Punjab farmland. 1 acre equals 2 bigha in Mohali and 4.8 bigha in Rajpura and Banur for agricultural transactions.",
    h1: "Acre to Bigha Farmland Calculator (Mohali vs Rajpura)",
    tier: "conversion",
    fromUnitId: "acre",
    toUnitId: "bigha",
    answerBlock: "1 acre equals 2 bigha in Mohali, SAS Nagar, and standard Punjab (System A). In Rajpura, Banur, and Patiala (System B), 1 acre equals 4.8 bigha (4 bigha 16 biswa). In Ludhiana (System F), 1 acre equals 1.6 pakka bigha. To convert acres to bigha, multiply acreage by 2 for Mohali or by 4.8 for Rajpura.",
    keyFacts: [
      { term: "Mohali Farmland Acreage", value: "1 acre = 2 bigha (4 kanal)" },
      { term: "Rajpura Farmland Acreage", value: "1 acre = 4.8 bigha (9,075 sq ft bigha)" },
      { term: "Ludhiana Pakka Bigha", value: "1 acre = 1.6 bigha (27,225 sq ft bigha)" },
      { term: "Farm Stay 2026 Threshold", value: "1 acre = 2 bigha (Mohali) / 4.8 bigha (Rajpura)" },
      { term: "Formula", value: "bighas = acres × local bigha factor" },
    ],
    formula: {
      forward: "bighas = acres × local bigha factor",
      reverse: "acres = bighas ÷ local bigha factor",
      example: "A 5-acre agricultural site along the Tepla-Banur corridor equals 5 × 4.8 = 24 bigha. The same 5-acre site in Kharar equals 5 × 2 = 10 bigha.",
    },
    questions: [
      {
        question: "How many bigha make 1 acre when acquiring farm stay land in Mohali?",
        answer: "In Mohali district, 1 acre (43,560 sq ft) equals exactly 2 bigha.",
      },
      {
        question: "How many bigha make 1 acre for agricultural land in Rajpura?",
        answer: "In Rajpura and Banur tehsils, 1 acre equals 4.8 bigha (4 bigha 16 biswa).",
      },
      {
        question: "How many bigha are in a 10 acre land bank parcel near Rajpura?",
        answer: "10 acres in Rajpura equals 10 × 4.8 = 48 bigha.",
      },
      {
        question: "Why do farm land listings in Banur quote 4.8 bigha per acre?",
        answer: "Banur falls under Patiala state revenue history where 1 katcha bigha is 9,075 sq ft (43,560 ÷ 9,075 = 4.8 bigha/acre).",
      },
      {
        question: "What is 2.5 acres in Mohali bigha units?",
        answer: "2.5 acres in Mohali equals 2.5 × 2 = 5 bigha.",
      },
      {
        question: "How do I convert acres to bighas in Ludhiana?",
        answer: "In Ludhiana, multiply acreage by 1.6 to get pakka bigha.",
      },
    ],
    citations: [
      {
        title: "Punjab Agricultural Land Revenue Manual & Settlement Records",
        url: "https://jamabandi.punjab.gov.in/",
        source: "Department of Revenue, Punjab",
      },
    ],
    statistic: "1 acre converts to 2 bighas in Mohali (21,780 sq ft each) and 4.8 bighas in Rajpura (9,075 sq ft each).",
    provenance: "Conversion factors sourced from the Punjab Land Records Manual, 3rd edition, 2004. Last verified 26 July 2026.",
    sections: [
      {
        title: "Farmland Parcel Valuation: Converting Acreage to Bigha Notation",
        content: "Agricultural land banking transactions around Banur, Tepla, and Airport Road are negotiated in bighas by local farmers and patwaris. Converting total acreage into bighas requires applying the correct regional multiplier for each tehsil.",
      },
      {
        title: "Acreage to Bigha Multiplier Summary",
        content: "Mohali/Kharar: 1 acre = 2 bigha. Rajpura/Banur: 1 acre = 4.8 bigha. Ludhiana: 1 acre = 1.6 pakka bigha. Majha/Amritsar: 1 acre = 4.356 bigha.",
      },
      {
        title: "Land Deal Verification Tip",
        content: "Always check the village Hadbast number to confirm whether System A or System B applies.",
      },
    ],
    siblingLinks: [
      { slug: "bigha-to-acre", anchorText: "Bigha to Acre Converter" },
      { slug: "acre-to-square-feet", anchorText: "Acre to Square Feet Converter" },
    ],
    entityLinks: [
      { slug: "bigha-in-rajpura", anchorText: "Rajpura Bigha Guide" },
    ],
  },

  "kanal-to-acre": {
    slug: "kanal-to-acre",
    title: "8 Kanal = 1 Acre - Kanal to Acre Converter",
    metaDescription: "Convert kanal to acre. 8 kanal equals 1 acre in standard Punjab revenue practice. View district variations for Doaba (10.54 kanal/acre).",
    h1: "Kanal to Acre Converter (8 Kanal = 1 Acre)",
    tier: "conversion",
    fromUnitId: "kanal",
    toUnitId: "acre",
    answerBlock: "In standard Punjab revenue practice (Mohali, SAS Nagar), 8 kanal equal 1 acre (43,560 sq ft). In Doaba (Jalandhar), 10.54 kanal equal 1 acre. To convert kanal to acres in Mohali, divide the kanal count by 8.",
    keyFacts: [
      { term: "Mohali / Standard Ratio", value: "8 kanal = 1 acre (0.125 acre/kanal)" },
      { term: "Doaba (Jalandhar) Ratio", value: "10.54 kanal = 1 acre" },
      { term: "Majha (Amritsar) Ratio", value: "9.68 kanal = 1 acre" },
      { term: "Kapurthala Ratio", value: "11.95 kanal = 1 acre" },
    ],
    formula: {
      forward: "acres = kanal ÷ local kanals-per-acre factor",
      reverse: "kanal = acres × local kanals-per-acre factor",
      example: "16 kanal in Mohali equals 16 ÷ 8 = 2 acres.",
    },
    questions: [
      {
        question: "How many kanal make 1 acre in Mohali?",
        answer: "In Mohali and standard Punjab, 8 kanal make 1 acre.",
      },
      {
        question: "Why does 1 acre have 10.54 kanal in Jalandhar?",
        answer: "In Doaba, 1 kanal is smaller (4,132.81 sq ft), so 43,560 ÷ 4,132.81 = 10.54 kanal per acre.",
      },
      {
        question: "What is 4 kanal in acres?",
        answer: "4 kanal equals 0.5 acres (1 bigha in Mohali).",
      },
      {
        question: "How do I convert kanal to acres?",
        answer: "Divide total kanal by 8 for standard Punjab land.",
      },
      {
        question: "What is 12 kanal in acres?",
        answer: "12 kanal in Mohali equals 12 ÷ 8 = 1.5 acres.",
      },
      {
        question: "Is a killa the same as an acre in kanal conversion?",
        answer: "Yes, 1 killa is 8 kanal (43,560 sq ft), identical to 1 acre.",
      },
    ],
    citations: [
      {
        title: "Punjab Land Records Manual (3rd Edition, 2004)",
        url: "https://jamabandi.punjab.gov.in/",
        source: "Department of Revenue, Punjab",
      },
    ],
    statistic: "8 kanal equals 1 acre in Mohali, whereas 10.54 kanal equals 1 acre in Jalandhar.",
    provenance: "Conversion factors sourced from the Punjab Land Records Manual, 3rd edition, 2004. Last verified 26 July 2026.",
    sections: [
      {
        title: "Kanal to Acre Conversions in Punjab Land Banking",
        content: "Converting kanal to acres is standard practice when evaluating medium agricultural holdings and farmhouse plots in Mohali. Dividing kanal by 8 gives total acreage in standard consolidated districts.",
      },
      {
        title: "District Comparison Table",
        content: "Standard/Mohali: 8 kanal = 1 acre. Majha/Amritsar: 9.68 kanal = 1 acre. Doaba/Jalandhar: 10.54 kanal = 1 acre. Kapurthala: 11.95 kanal = 1 acre.",
      },
      {
        title: "Practical Steps",
        content: "Divide kanal count by 8 for Mohali, SAS Nagar, and Kharar.",
      },
    ],
    siblingLinks: [
      { slug: "acre-to-kanal", anchorText: "Acre to Kanal Converter" },
      { slug: "kanal-to-square-feet", anchorText: "Kanal to Square Feet Converter" },
    ],
    entityLinks: [
      { slug: "kanal-in-punjab", anchorText: "Kanal Regional Guide" },
    ],
  },

  "acre-to-kanal": {
    slug: "acre-to-kanal",
    title: "1 Acre = 8 Kanal - Acre to Kanal Converter",
    metaDescription: "Convert acres to kanal. 1 acre equals 8 kanal in standard Punjab revenue records. View district conversion factors and worked examples.",
    h1: "Acre to Kanal Converter (1 Acre = 8 Kanal)",
    tier: "conversion",
    fromUnitId: "acre",
    toUnitId: "kanal",
    answerBlock: "1 acre equals 8 kanal in standard Punjab revenue records (Mohali, SAS Nagar, Kharar). In Doaba (Jalandhar), 1 acre equals 10.54 kanal. To convert acres to kanal in Mohali, multiply acreage by 8.",
    keyFacts: [
      { term: "Standard Acre to Kanal", value: "1 acre = 8 kanal" },
      { term: "Doaba (Jalandhar) Acre to Kanal", value: "1 acre = 10.54 kanal" },
      { term: "Majha (Amritsar) Acre to Kanal", value: "1 acre = 9.68 kanal" },
      { term: "Kapurthala Acre to Kanal", value: "1 acre = 11.95 kanal" },
    ],
    formula: {
      forward: "kanal = acres × local kanals-per-acre factor",
      reverse: "acres = kanal ÷ local kanals-per-acre factor",
      example: "2.5 acres in Mohali equals 2.5 × 8 = 20 kanal.",
    },
    questions: [
      {
        question: "How many kanal are in 1 acre?",
        answer: "1 acre contains 8 kanal in standard Punjab.",
      },
      {
        question: "How many kanal are in 5 acres?",
        answer: "5 acres contains 5 × 8 = 40 kanal in standard Punjab.",
      },
      {
        question: "How do I convert acres to kanal?",
        answer: "Multiply acreage by 8 for Mohali standard land.",
      },
      {
        question: "How many kanal in 0.5 acres?",
        answer: "0.5 acres (half acre) contains 4 kanal (1 bigha in Mohali).",
      },
      {
        question: "Why do acres convert to 10.54 kanal in Jalandhar?",
        answer: "Because Jalandhar's kanal is smaller (4,132.81 sq ft), requiring 10.54 kanal to equal 43,560 sq ft.",
      },
      {
        question: "Is killa to kanal the same as acre to kanal?",
        answer: "Yes, 1 killa equals 8 kanal.",
      },
    ],
    citations: [
      {
        title: "Punjab Land Records Manual (3rd Edition, 2004)",
        url: "https://jamabandi.punjab.gov.in/",
        source: "Department of Revenue, Punjab",
      },
    ],
    statistic: "1 acre converts to 8 kanal in Mohali, 9.68 kanal in Amritsar, and 10.54 kanal in Jalandhar.",
    provenance: "Conversion factors sourced from the Punjab Land Records Manual, 3rd edition, 2004. Last verified 26 July 2026.",
    sections: [
      {
        title: "Expressing Farm and Land Acquisition in Kanal",
        content: "Converting acreage to kanal is standard when structuring farm plot partitions and checking jamabandi entries.",
      },
      {
        title: "Conversion Examples",
        content: "1 acre = 8 kanal. 2 acres = 16 kanal. 3 acres = 24 kanal. 5 acres = 40 kanal. 10 acres = 80 kanal.",
      },
      {
        title: "Tehsil Guidance",
        content: "Confirm local kanal square footage with the halqa patwari.",
      },
    ],
    siblingLinks: [
      { slug: "kanal-to-acre", anchorText: "Kanal to Acre Converter" },
      { slug: "acre-to-square-feet", anchorText: "Acre to Square Feet Converter" },
    ],
    entityLinks: [
      { slug: "kanal-in-punjab", anchorText: "Kanal Unit Disambiguation" },
    ],
  },

  "bigha-to-kanal": {
    slug: "bigha-to-kanal",
    title: "1 Bigha = 4 Kanal - Bigha to Kanal Subdividing Guide",
    metaDescription: "Convert bigha to kanal. 1 bigha equals 4 kanal in Mohali revenue records and 2 kanal in Rajpura. View farm partition deed calculations.",
    h1: "Bigha to Kanal Subdividing Converter (1 Bigha = 4 Kanal)",
    tier: "conversion",
    fromUnitId: "bigha",
    toUnitId: "kanal",
    answerBlock: "1 bigha equals 4 kanal in standard Punjab revenue records (Mohali, SAS Nagar, System A). In Rajpura and Patiala (System B), 1 katcha bigha equals 2 kanal. To convert bigha to kanal in Mohali, multiply the bigha count by 4.",
    keyFacts: [
      { term: "Mohali / Standard Ratio", value: "1 bigha = 4 kanal (80 marla)" },
      { term: "Patiala / Rajpura Ratio", value: "1 bigha = 2 kanal (katcha)" },
      { term: "Ludhiana Pakka Bigha", value: "1 bigha = 5 kanal" },
      { term: "Majha Bigha", value: "1 bigha = 2.22 kanal" },
    ],
    formula: {
      forward: "kanal = bighas × local kanals-per-bigha factor",
      reverse: "bighas = kanal ÷ local kanals-per-bigha factor",
      example: "5 bigha of agricultural land in Kharar equals 5 × 4 = 20 kanal (2.5 acres).",
    },
    questions: [
      {
        question: "How many kanal are in 1 bigha in Mohali?",
        answer: "1 bigha contains 4 kanal in Mohali (21,780 sq ft ÷ 5,445 sq ft).",
      },
      {
        question: "How many kanal are in 1 bigha in Rajpura?",
        answer: "1 katcha bigha in Rajpura contains 2 kanal (9,075 sq ft ÷ 4,537.5 sq ft).",
      },
      {
        question: "How do I convert bigha to kanal in revenue records?",
        answer: "Multiply bigha by 4 for Mohali standard land, or by 2 for Rajpura.",
      },
      {
        question: "What is 10 bigha in kanal in Mohali?",
        answer: "10 bigha in Mohali equals 10 × 4 = 40 kanal (5 acres).",
      },
      {
        question: "Why does the bigha to kanal ratio differ in Rajpura?",
        answer: "Rajpura uses Patiala katcha bighas (9,075 sq ft), which yield 2 kanal of 4,537.5 sq ft each.",
      },
      {
        question: "How many marla in 1 bigha?",
        answer: "1 standard bigha (4 kanal) contains 80 marla.",
      },
    ],
    citations: [
      {
        title: "Punjab Land Records Manual (3rd Edition, 2004)",
        url: "https://jamabandi.punjab.gov.in/",
        source: "Department of Revenue, Punjab",
      },
    ],
    statistic: "1 standard bigha equals 4 kanal (21,780 sq ft) in Mohali, whereas 1 Rajpura katcha bigha equals 2 kanal (9,075 sq ft).",
    provenance: "Conversion factors sourced from the Punjab Land Records Manual, 3rd edition, 2004. Last verified 26 July 2026.",
    sections: [
      {
        title: "Subdividing Bigha Land Holdings into Kanal Deeds",
        content: "When family partition deeds or land sales divide agricultural bighas into smaller plots, revenue officials express sub-parcels in kanal notation. In Mohali, 1 bigha splits cleanly into 4 kanal.",
      },
      {
        title: "District Revenue Comparisons",
        content: "Mohali (System A): 1 bigha = 4 kanal. Rajpura (System B): 1 bigha = 2 kanal. Ludhiana (System F): 1 pakka bigha = 5 kanal.",
      },
      {
        title: "Worked Partition Example",
        content: "8 bigha in Mohali = 32 kanal = 4 acres.",
      },
    ],
    siblingLinks: [
      { slug: "kanal-to-bigha", anchorText: "Kanal to Bigha Converter" },
      { slug: "bigha-to-square-feet", anchorText: "Bigha to Square Feet Converter" },
    ],
    entityLinks: [
      { slug: "bigha-in-punjab", anchorText: "Punjab Bigha Variations" },
    ],
  },

  "kanal-to-bigha": {
    slug: "kanal-to-bigha",
    title: "4 Kanal = 1 Bigha - Urban Plot Aggregation Calculator",
    metaDescription: "Convert kanal to bigha for urban plot aggregation and GMADA sector plotting. 4 kanal equals 1 bigha in Mohali and 2 kanal equals 1 bigha in Rajpura.",
    h1: "Kanal to Bigha Aggregation Calculator",
    tier: "conversion",
    fromUnitId: "kanal",
    toUnitId: "bigha",
    answerBlock: "To aggregate urban kanal plots into revenue bighas in Mohali (System A), divide the kanal count by 4. 4 kanal measure 21,780 sq ft, forming exactly 1 bigha. In Rajpura (System B), 2 kanal form 1 bigha.",
    keyFacts: [
      { term: "Mohali Plot Consolidation", value: "4 kanal = 1 bigha (21,780 sq ft)" },
      { term: "Rajpura Plot Consolidation", value: "2 kanal = 1 bigha (9,075 sq ft)" },
      { term: "Ludhiana Pakka Consolidation", value: "5 kanal = 1 pakka bigha" },
      { term: "Marla Equivalent", value: "80 marla = 1 bigha (Mohali)" },
      { term: "Formula", value: "bighas = kanals ÷ 4 (Mohali)" },
    ],
    formula: {
      forward: "bighas = kanals ÷ local kanals-per-bigha divisor",
      reverse: "kanals = bighas × local kanals-per-bigha divisor",
      example: "Combining 16 urban kanal plots in Sector 91 Mohali yields 16 ÷ 4 = 4 bigha (2 acres).",
    },
    questions: [
      {
        question: "How many bighas do 4 kanal form in Mohali urban planning?",
        answer: "4 kanal form exactly 1 bigha in Mohali.",
      },
      {
        question: "How many bighas do 8 kanal form in consolidated land?",
        answer: "8 kanal form 2 bigha (1 acre).",
      },
      {
        question: "How do I calculate bighas from a list of kanal plot sizes?",
        answer: "Sum the total kanals and divide by 4 for System A territory.",
      },
      {
        question: "What is 10 kanal converted to bighas in Mohali?",
        answer: "10 kanal equals 10 ÷ 4 = 2.5 bigha (2 bigha 10 biswa).",
      },
      {
        question: "What is 10 kanal converted to bighas in Rajpura?",
        answer: "10 kanal in Rajpura equals 10 ÷ 2 = 5 bigha.",
      },
      {
        question: "Why convert kanal plots to bighas?",
        answer: "Commercial land aggregation proposals and township CLU filings require area statements in bighas.",
      },
    ],
    citations: [
      {
        title: "GMADA Urban Planning Bye-Laws & Town Planning Guidelines",
        url: "https://gmada.gov.in/",
        source: "Greater Mohali Area Development Authority",
      },
    ],
    statistic: "4 kanal equals 1 bigha in Mohali urban plotting, whereas 2 kanal equals 1 bigha in Rajpura.",
    provenance: "Conversion factors sourced from the Punjab Land Records Manual, 3rd edition, 2004. Last verified 26 July 2026.",
    sections: [
      {
        title: "Aggregating Urban Kanal Plots for Township Allotments",
        content: "Developers assembling commercial strips or residential enclaves in GMADA sectors buy adjacent 1-kanal or 2-kanal plots and convert their combined area into bighas for Change of Land Use (CLU) approval.",
      },
      {
        title: "Kanal-to-Bigha Conversion Divisors",
        content: "Mohali (System A): Divide kanals by 4. Rajpura (System B): Divide kanals by 2. Ludhiana (System F): Divide kanals by 5.",
      },
      {
        title: "Site Assembly Example",
        content: "Combining twelve 1-kanal plots = 12 kanal = 3 bigha (1.5 acres).",
      },
    ],
    siblingLinks: [
      { slug: "bigha-to-kanal", anchorText: "Bigha to Kanal Converter" },
      { slug: "kanal-to-square-feet", anchorText: "Kanal to Square Feet Converter" },
    ],
    entityLinks: [
      { slug: "bigha-in-punjab", anchorText: "Punjab Bigha Variations" },
    ],
  },

  "biswa-to-marla": {
    slug: "biswa-to-marla",
    title: "1 Biswa = 4 Marla - Jamabandi Share Sub-Unit Guide",
    metaDescription: "Convert biswa to marla in revenue records. 1 biswa equals 4 marla in Mohali and 2 marla in Rajpura. View fractional khatauni share rules.",
    h1: "Biswa to Marla Revenue Sub-Unit Converter (1 Biswa = 4 Marla)",
    tier: "conversion",
    fromUnitId: "biswa",
    toUnitId: "marla",
    answerBlock: "1 biswa equals 4 marla in standard Punjab revenue records (Mohali, SAS Nagar, System A). In Rajpura and Patiala (System B), 1 biswa equals 2 marla. To convert biswa to marla in Mohali, multiply the biswa figure by 4.",
    keyFacts: [
      { term: "Mohali Biswa to Marla", value: "1 biswa = 4 marla (1,089 sq ft)" },
      { term: "Rajpura Biswa to Marla", value: "1 biswa = 2 marla (453.75 sq ft)" },
      { term: "5 Biswa in Marla", value: "20 marla (1 kanal)" },
      { term: "20 Biswa in Marla", value: "80 marla (1 bigha)" },
    ],
    formula: {
      forward: "marla = biswa × 4",
      reverse: "biswa = marla ÷ 4",
      example: "A 6 biswa parcel share in a Zirakpur jamabandi equals 6 × 4 = 24 marla (1 kanal 4 marla).",
    },
    questions: [
      {
        question: "How many marla are in 1 biswa in Mohali?",
        answer: "1 biswa contains 4 marla in Mohali (1,089 sq ft ÷ 272.25 sq ft).",
      },
      {
        question: "How many marla are in 1 biswa in Rajpura?",
        answer: "1 biswa contains 2 marla in Rajpura (453.75 sq ft ÷ 226.875 sq ft).",
      },
      {
        question: "How do I calculate marlas from biswa in village Jamabandis?",
        answer: "Multiply biswa count by 4 for System A villages.",
      },
      {
        question: "What is 10 biswa in marlas in Mohali?",
        answer: "10 biswa in Mohali equals 10 × 4 = 40 marla (2 kanal).",
      },
      {
        question: "How many biswa make 1 bigha?",
        answer: "20 biswa make 1 bigha across all revenue systems.",
      },
      {
        question: "What is a biswansi?",
        answer: "A biswansi is 1/20th of a biswa (54.45 sq ft in Mohali).",
      },
    ],
    citations: [
      {
        title: "Punjab Land Records Manual (3rd Edition, 2004)",
        url: "https://jamabandi.punjab.gov.in/",
        source: "Department of Revenue, Punjab",
      },
    ],
    statistic: "1 biswa equals 4 marla (1,089 sq ft) in Mohali, and 2 marla (453.75 sq ft) in Rajpura.",
    provenance: "Conversion factors sourced from the Punjab Land Records Manual, 3rd edition, 2004. Last verified 26 July 2026.",
    sections: [
      {
        title: "Decoding Khewat and Khatauni Fractional Shares in Biswa",
        content: "In agricultural jamabandi records, fractional ownership of bigha holdings is expressed in biswa (1/20th bigha) and biswansi. Converting biswa entries into marlas clarifies plot dimensions for urban buyers.",
      },
      {
        title: "System Comparison",
        content: "Mohali (System A): 1 biswa = 4 marla. Rajpura (System B): 1 biswa = 2 marla. Ludhiana (System F): 1 biswa = 5 marla.",
      },
      {
        title: "Deed Audit Steps",
        content: "Check local village settlement records to verify biswa square footage.",
      },
    ],
    siblingLinks: [
      { slug: "biswa-to-square-feet", anchorText: "Biswa to Square Feet Converter" },
      { slug: "marla-to-square-feet", anchorText: "Marla to Square Feet Converter" },
    ],
    entityLinks: [
      { slug: "how-to-read-a-jamabandi-area", anchorText: "Jamabandi Reading Guide" },
    ],
  },

  "biswa-to-square-feet": {
    slug: "biswa-to-square-feet",
    title: "Biswa to Square Feet Calculator (1 Biswa = 1,089 Sq Ft)",
    metaDescription: "Convert biswa to square feet for urban plots and building coverage. 1 biswa equals 1,089 sq ft (121 Gaj) in Mohali and 453.75 sq ft in Rajpura.",
    h1: "Biswa to Square Feet Plot Area Calculator",
    tier: "conversion",
    fromUnitId: "biswa",
    toUnitId: "sqft",
    answerBlock: "1 biswa measures 1,089 square feet (121 square yards or gaj) in Mohali, SAS Nagar, and standard Punjab (System A). In Rajpura and Patiala (System B), 1 biswa measures 453.75 square feet. To calculate total square footage, multiply biswas by 1,089 for Mohali or 453.75 for Rajpura.",
    keyFacts: [
      { term: "Mohali / Standard Biswa Footage", value: "1,089 sq ft (121 Gaj / sq yd)" },
      { term: "Rajpura / Patiala Biswa Footage", value: "453.75 sq ft (50.42 Gaj)" },
      { term: "Ludhiana Pakka Biswa Footage", value: "1,361.25 sq ft (151.25 Gaj)" },
      { term: "Majha Biswa Footage (Amritsar)", value: "500 sq ft (55.56 Gaj)" },
    ],
    formula: {
      forward: "sq ft = biswas × local biswa footage factor",
      reverse: "biswas = sq ft ÷ local biswa footage factor",
      example: "3 biswa of residential plot land in Zirakpur equals 3 × 1,089 = 3,267 sq ft (363 Gaj).",
    },
    questions: [
      {
        question: "How many sq ft is 1 biswa in Mohali urban areas?",
        answer: "1 biswa equals 1,089 sq ft (121 sq yd) in Mohali.",
      },
      {
        question: "How many sq ft is 1 biswa in Rajpura tehsil?",
        answer: "1 biswa equals 453.75 sq ft in Rajpura.",
      },
      {
        question: "How do I calculate building footprint from biswa area?",
        answer: "Multiply total biswas by 1,089 to get gross square feet, then apply local FAR building coverage rules.",
      },
      {
        question: "How many biswa fit in a 2,178 sq ft plot?",
        answer: "2,178 sq ft ÷ 1,089 = exactly 2 biswa (8 marla).",
      },
      {
        question: "Is biswa equal to gaj in square feet?",
        answer: "No, 1 biswa equals 121 gaj (121 × 9 sq ft = 1,089 sq ft).",
      },
      {
        question: "What is 4 biswa in square feet in Mohali?",
        answer: "4 biswa equals 4 × 1,089 = 4,356 sq ft (16 marla).",
      },
    ],
    citations: [
      {
        title: "Punjab Building Bye-Laws & Revenue Conversion Table",
        url: "https://puda.gov.in/",
        source: "Punjab Urban Planning and Development Authority",
      },
    ],
    statistic: "1 Mohali biswa measures 1,089 sq ft (121 sq yd), whereas 1 Rajpura biswa measures 453.75 sq ft.",
    provenance: "Conversion factors sourced from the Punjab Land Records Manual, 3rd edition, 2004. Last verified 26 July 2026.",
    sections: [
      {
        title: "Calculating Building Floor Footprints from Biswa Land Allocations",
        content: "In peri-urban development belts around Mohali, Zirakpur, and Kharar, plot allotments recorded in biswas need conversion to square feet for structural design, covered area estimates, and municipal building plan approvals.",
      },
      {
        title: "District Square Footage Footprints",
        content: "System A (Mohali/Kharar): 1,089 sq ft/biswa. System B (Rajpura/Patiala): 453.75 sq ft/biswa. System F (Ludhiana): 1,361.25 sq ft/biswa. System D (Majha): 500 sq ft/biswa.",
      },
      {
        title: "Architectural Planning Tip",
        content: "Multiply biswas by 121 to quickly determine equivalent Gaj (square yards) for plot pricing.",
      },
    ],
    siblingLinks: [
      { slug: "biswa-to-marla", anchorText: "Biswa to Marla Converter" },
      { slug: "bigha-to-square-feet", anchorText: "Bigha to Square Feet Converter" },
    ],
    entityLinks: [
      { slug: "bigha-in-rajpura", anchorText: "Rajpura Revenue Guide" },
    ],
  },

  "sarsahi-to-square-feet": {
    slug: "sarsahi-to-square-feet",
    title: "1 Sarsahi = 30.25 Sq Ft - Sarsahi to Sq Ft Converter",
    metaDescription: "Convert sarsahi (square karam) to square feet. 1 sarsahi equals 30.25 sq ft in standard Punjab revenue records. View district karam tables.",
    h1: "Sarsahi to Square Feet Converter (1 Sarsahi = 30.25 Sq Ft)",
    tier: "conversion",
    fromUnitId: "sarsahi",
    toUnitId: "sqft",
    answerBlock: "1 sarsahi (or square karam) equals 30.25 square feet (3.36 square yards) in standard Punjab revenue records (66-inch karam). To convert sarsahi to square feet, multiply the sarsahi figure by 30.25.",
    keyFacts: [
      { term: "Standard Sarsahi (Mohali)", value: "30.25 sq ft (3.361 sq yd)" },
      { term: "Doaba Sarsahi (Jalandhar)", value: "22.96 sq ft (2.551 sq yd)" },
      { term: "Majha Sarsahi (Amritsar)", value: "25.0 sq ft (2.778 sq yd)" },
      { term: "Kapurthala Sarsahi", value: "20.25 sq ft (2.25 sq yd)" },
      { term: "Sarsahi per Marla", value: "9 sarsahi = 1 marla" },
    ],
    formula: {
      forward: "square feet = sarsahi × 30.25",
      reverse: "sarsahi = square feet ÷ 30.25",
      example: "4 sarsahi in Mohali equals 4 × 30.25 = 121 square feet.",
    },
    questions: [
      {
        question: "What is a sarsahi in land measurement?",
        answer: "A sarsahi (or sarsai) is 1 square karam (1 karam × 1 karam). 9 sarsahi make 1 marla.",
      },
      {
        question: "How many square feet is 1 sarsahi in Mohali?",
        answer: "1 sarsahi equals 30.25 square feet in Mohali (5.5 ft × 5.5 ft).",
      },
      {
        question: "How do I convert sarsahi to square feet?",
        answer: "Multiply sarsahi by 30.25 for standard Punjab land.",
      },
      {
        question: "How many sarsahi in 1 marla?",
        answer: "Exactly 9 sarsahi make 1 marla.",
      },
      {
        question: "Why is a sarsahi 25 sq ft in Amritsar?",
        answer: "Amritsar uses a 60-inch (5 ft) karam, so 5 ft × 5 ft = 25 sq ft per sarsahi.",
      },
      {
        question: "What is a square karam?",
        answer: "Square karam is another name for sarsahi.",
      },
    ],
    citations: [
      {
        title: "Punjab Land Records Manual (3rd Edition, 2004)",
        url: "https://jamabandi.punjab.gov.in/",
        source: "Department of Revenue, Punjab",
      },
    ],
    statistic: "1 sarsahi equals 30.25 sq ft in Mohali, 25 sq ft in Amritsar, and 20.25 sq ft in Kapurthala.",
    provenance: "Conversion factors sourced from the Punjab Land Records Manual, 3rd edition, 2004. Last verified 26 July 2026.",
    sections: [
      {
        title: "The Sarsahi (Square Karam) Foundation of Punjab Surveys",
        content: "The sarsahi represents the area of 1 square karam. In standard 66-inch karam areas, 5.5 ft × 5.5 ft = 30.25 sq ft. 9 sarsahi form 1 marla (272.25 sq ft).",
      },
      {
        title: "District Variations",
        content: "Mohali (66 in karam): 30.25 sq ft. Majha (60 in karam): 25.0 sq ft. Doaba (57.5 in karam): 22.96 sq ft. Kapurthala (54 in karam): 20.25 sq ft.",
      },
      {
        title: "Calculation Mechanics",
        content: "To convert sarsahi to sq ft, multiply by 30.25.",
      },
    ],
    siblingLinks: [
      { slug: "marla-to-square-feet", anchorText: "Marla to Square Feet Converter" },
    ],
    entityLinks: [
      { slug: "karam-standards-of-punjab", anchorText: "Karam Standards of Punjab" },
    ],
  },

  "marla-to-square-metre": {
    slug: "marla-to-square-metre",
    title: "1 Marla = 25.2929 Sq Metres - Marla to Sq M Converter",
    metaDescription: "Convert marla to square metres. 1 marla equals 25.2929 sq m in standard Punjab. Calculate metric area equivalents with live formulas.",
    h1: "Marla to Square Metre Converter (1 Marla = 25.2929 Sq M)",
    tier: "conversion",
    fromUnitId: "marla",
    toUnitId: "sqm",
    answerBlock: "1 marla equals 25.29285 square metres in standard Punjab revenue records (Mohali, SAS Nagar). To convert marla to square metres, multiply the marla count by 25.2929.",
    keyFacts: [
      { term: "Standard Marla in Sq M", value: "25.29285 sq m" },
      { term: "5 Marla in Sq M", value: "126.464 sq m" },
      { term: "10 Marla in Sq M", value: "252.929 sq m" },
      { term: "20 Marla (1 Kanal) in Sq M", value: "505.857 sq m" },
    ],
    formula: {
      forward: "square metres = marla × 25.29285",
      reverse: "marla = square metres ÷ 25.29285",
      example: "A 10 marla plot in Mohali equals 10 × 25.29285 = 252.93 square metres.",
    },
    questions: [
      {
        question: "How many square metres are in 1 marla?",
        answer: "1 marla contains 25.29285 square metres in standard Punjab.",
      },
      {
        question: "How many square metres is a 5 marla plot?",
        answer: "A 5 marla plot equals 126.464 square metres.",
      },
      {
        question: "How do I convert marla to square metres?",
        answer: "Multiply marlas by 25.2929.",
      },
      {
        question: "How many square metres is 1 kanal?",
        answer: "1 kanal (20 marla) equals 505.857 square metres.",
      },
      {
        question: "Why convert marla to square metres?",
        answer: "Architectural drawings and RERA filings require metric square metre values.",
      },
      {
        question: "What is 100 sq m in marla?",
        answer: "Divide 100 by 25.29285 to get 3.953 marla.",
      },
    ],
    citations: [
      {
        title: "Punjab Land Records Manual (3rd Edition, 2004)",
        url: "https://jamabandi.punjab.gov.in/",
        source: "Department of Revenue, Punjab",
      },
    ],
    statistic: "1 marla equals 25.29285 square metres in Mohali and 20.91 square metres in Jalandhar.",
    provenance: "Conversion factors sourced from the Punjab Land Records Manual, 3rd edition, 2004. Last verified 26 July 2026.",
    sections: [
      {
        title: "Metric Conversion of Marla Plot Sizes",
        content: "Converting marla plot sizes to square metres is required for official architectural plans, RERA Punjab submissions, and municipal building approvals.",
      },
      {
        title: "Conversion Values",
        content: "4 marla = 101.17 sq m. 6 marla = 151.76 sq m. 8 marla = 202.34 sq m. 10 marla = 252.93 sq m. 20 marla (1 kanal) = 505.86 sq m.",
      },
      {
        title: "Calculation Mechanics",
        content: "Multiply marlas by 25.29285 for standard Punjab plots.",
      },
    ],
    siblingLinks: [
      { slug: "marla-to-square-feet", anchorText: "Marla to Square Feet Converter" },
      { slug: "square-metre-to-square-feet", anchorText: "Square Metre to Square Feet Converter" },
    ],
    entityLinks: [
      { slug: "marla-in-punjab", anchorText: "Marla District Guide" },
    ],
  },

  "killa-to-acre": {
    slug: "killa-to-acre",
    title: "1 Killa = 1 Acre (43,560 Sq Ft) - Killa to Acre Converter",
    metaDescription: "Convert killa to acre in Punjab. 1 killa is identical to 1 acre (43,560 sq ft / 8 kanal). View farmland dimensions and revenue rules.",
    h1: "Killa to Acre Converter (1 Killa = 1 Acre)",
    tier: "conversion",
    fromUnitId: "killa",
    toUnitId: "acre",
    answerBlock: "1 killa is identical to 1 acre in Punjab agricultural revenue records. Both measure exactly 43,560 square feet (4,840 square yards or 8 kanal). To convert killa to acre, the ratio is 1 to 1.",
    keyFacts: [
      { term: "Killa to Acre Ratio", value: "1 killa = 1 acre (1:1 exact)" },
      { term: "Killa Area in Sq Ft", value: "43,560 sq ft" },
      { term: "Killa Dimensions", value: "36 karam × 40 karam (198 ft × 220 ft)" },
      { term: "Killa in Kanals", value: "8 kanal" },
      { term: "Killa in Mohali Bighas", value: "2 bigha" },
    ],
    formula: {
      forward: "acres = killa × 1",
      reverse: "killa = acres × 1",
      example: "A 15 killa agricultural land parcel in Kharar equals 15 acres (653,400 sq ft).",
    },
    questions: [
      {
        question: "Is 1 killa the same as 1 acre in Punjab?",
        answer: "Yes, 1 killa equals exactly 1 acre (43,560 sq ft or 8 kanal).",
      },
      {
        question: "What are the dimensions of 1 killa in feet?",
        answer: "A standard killa is a rectangle measuring 36 karam by 40 karam, which equals 198 feet by 220 feet.",
      },
      {
        question: "How many kanal are in 1 killa?",
        answer: "8 kanal make 1 killa.",
      },
      {
        question: "How many bigha are in 1 killa in Mohali?",
        answer: "2 bigha make 1 killa in Mohali.",
      },
      {
        question: "What is ghumaon in relation to killa?",
        answer: "Ghumaon is another regional name for killa/acre in Punjab.",
      },
      {
        question: "How many sarsahi in 1 killa?",
        answer: "1,440 sarsahi make 1 killa (36 × 40 karam).",
      },
    ],
    citations: [
      {
        title: "Punjab Land Records Manual (3rd Edition, 2004)",
        url: "https://jamabandi.punjab.gov.in/",
        source: "Department of Revenue, Punjab",
      },
    ],
    statistic: "A standard killa is laid out as 36 karam × 40 karam (198 ft × 220 ft), yielding 43,560 sq ft or 1 acre.",
    provenance: "Conversion factors sourced from the Punjab Land Records Manual, 3rd edition, 2004. Last verified 26 July 2026.",
    sections: [
      {
        title: "Understanding Killa and Acre Geometry in Punjab Farmland",
        content: "In Punjab revenue terminology, 'killa' is the local word for an acre. During British land consolidation surveys, agricultural land was divided into rectangular Mustatil blocks of 25 killa each. 1 killa = 36×40 karam = 198×220 ft = 43,560 sq ft.",
      },
      {
        title: "Killa Unit Equivalents",
        content: "1 killa = 1 acre = 8 kanal = 160 marla = 2 bigha (Mohali) = 4.8 bigha (Rajpura).",
      },
      {
        title: "Registry Guidance",
        content: "Jamabandi records list individual khasra numbers representing 1 killa each.",
      },
    ],
    siblingLinks: [
      { slug: "acre-to-square-feet", anchorText: "Acre to Square Feet Converter" },
      { slug: "bigha-to-acre", anchorText: "Bigha to Acre Converter" },
    ],
    entityLinks: [
      { slug: "punjab-land-measurement-chart", anchorText: "Master Land Measurement Chart" },
    ],
  },

  "murabba-to-acre": {
    slug: "murabba-to-acre",
    title: "1 Murabba = 25 Acres - Murabba to Acre Converter",
    metaDescription: "Convert murabba (square) to acres in Punjab. 1 murabba equals 25 acres (25 killa / 1,089,000 sq ft). View revenue grid details.",
    h1: "Murabba to Acre Converter (1 Murabba = 25 Acres)",
    tier: "conversion",
    fromUnitId: "murabba",
    toUnitId: "acre",
    answerBlock: "1 murabba (or square) equals 25 acres (25 killa) in Punjab revenue records. This equals 1,089,000 square feet or 121,000 square yards. To convert murabba to acres, multiply by 25.",
    keyFacts: [
      { term: "1 Murabba in Acres", value: "25 acres (killa)" },
      { term: "1 Murabba in Sq Ft", value: "1,089,000 sq ft" },
      { term: "1 Murabba in Sq Yd", value: "121,000 sq yd" },
      { term: "1 Murabba in Kanals", value: "200 kanal" },
      { term: "1 Murabba in Mohali Bighas", value: "50 bigha" },
    ],
    formula: {
      forward: "acres = murabba × 25",
      reverse: "murabba = acres ÷ 25",
      example: "A 2 murabba agricultural land holding near Banur equals 2 × 25 = 50 acres (2,178,000 sq ft).",
    },
    questions: [
      {
        question: "How many acres are in 1 murabba?",
        answer: "1 murabba contains exactly 25 acres (25 killa).",
      },
      {
        question: "How many square feet is 1 murabba?",
        answer: "1 murabba equals 1,089,000 square feet (121,000 square yards).",
      },
      {
        question: "What is a Mustatil in relation to a Murabba?",
        answer: "Mustatil is the revenue term for the 25-acre rectangular grid block (murabba) in jamabandi records.",
      },
      {
        question: "How many kanal in 1 murabba?",
        answer: "1 murabba contains 200 kanal (25 acres × 8 kanal).",
      },
      {
        question: "How many bigha in 1 murabba in Mohali?",
        answer: "1 murabba contains 50 bigha in Mohali (25 acres × 2 bigha).",
      },
      {
        question: "How do I convert murabba to acres?",
        answer: "Multiply the murabba count by 25.",
      },
    ],
    citations: [
      {
        title: "Punjab Land Records Manual (3rd Edition, 2004)",
        url: "https://jamabandi.punjab.gov.in/",
        source: "Department of Revenue, Punjab",
      },
    ],
    statistic: "1 murabba equals 25 acres, 200 kanal, 50 bigha (Mohali), or 1,089,000 square feet.",
    provenance: "Conversion factors sourced from the Punjab Land Records Manual, 3rd edition, 2004. Last verified 26 July 2026.",
    sections: [
      {
        title: "The Murabba (Square) Grid System in Punjab Land Surveys",
        content: "A murabba is the largest standard revenue grid unit used in Punjab land surveys. Formed during land consolidation (murabbabandi), 1 murabba comprises a square grid of 25 khasra numbers (1 acre/killa each).",
      },
      {
        title: "Unit Breakdown",
        content: "1 murabba = 25 acres = 200 kanal = 4,000 marla = 50 bigha (Mohali) = 120 bigha (Rajpura).",
      },
      {
        title: "Agricultural Land Banking Usage",
        content: "Large land banking deals around Tepla, Banur, and Airport Road are negotiated in murabbas or acres.",
      },
    ],
    siblingLinks: [
      { slug: "killa-to-acre", anchorText: "Killa to Acre Converter" },
      { slug: "acre-to-square-feet", anchorText: "Acre to Square Feet Converter" },
    ],
    entityLinks: [
      { slug: "punjab-land-measurement-chart", anchorText: "Master Revenue Chart" },
    ],
  },

  "hectare-to-acre": {
    slug: "hectare-to-acre",
    title: "1 Hectare = 2.471 Acres - Hectare to Acre Converter",
    metaDescription: "Convert hectares to acres. 1 hectare equals 2.47105 acres (10,000 sq m / 107,639 sq ft). Metric to agricultural land area converter.",
    h1: "Hectare to Acre Converter (1 Hectare = 2.471 Acres)",
    tier: "conversion",
    fromUnitId: "hectare",
    toUnitId: "acre",
    answerBlock: "1 hectare equals 2.47105 acres (2 acres 3 kanal 15 marla). In metric land terms, 1 hectare equals 10,000 square metres or 107,639.1 square feet. To convert hectares to acres, multiply by 2.47105.",
    keyFacts: [
      { term: "1 Hectare in Acres", value: "2.4710538 acres" },
      { term: "1 Hectare in Sq M", value: "10,000 sq m (exact)" },
      { term: "1 Hectare in Sq Ft", value: "107,639.10 sq ft" },
      { term: "1 Hectare in Kanals (Mohali)", value: "19.768 kanal" },
      { term: "1 Hectare in Bighas (Mohali)", value: "4.942 bigha" },
    ],
    formula: {
      forward: "acres = hectares × 2.4710538",
      reverse: "hectares = acres ÷ 2.4710538",
      example: "A 10-hectare agricultural development site in Banur equals 10 × 2.47105 = 24.71 acres.",
    },
    questions: [
      {
        question: "How many acres are in 1 hectare?",
        answer: "There are 2.4710538 acres in 1 hectare.",
      },
      {
        question: "How many square metres is 1 hectare?",
        answer: "1 hectare equals exactly 10,000 square metres.",
      },
      {
        question: "How do I convert hectares to acres?",
        answer: "Multiply the hectare figure by 2.47105.",
      },
      {
        question: "How many kanal in 1 hectare in Mohali?",
        answer: "1 hectare equals 19.768 kanal in Mohali (2.471 acres × 8).",
      },
      {
        question: "Why is hectare used in official government surveys?",
        answer: "Hectare is the international standard metric unit used in government agricultural statistics and satellite GIS surveys.",
      },
      {
        question: "What is 5 hectares in acres?",
        answer: "5 hectares equals 5 × 2.47105 = 12.355 acres.",
      },
    ],
    citations: [
      {
        title: "International System of Units (SI Metric Standards)",
        url: "https://bipm.org/",
        source: "International Bureau of Weights and Measures",
      },
    ],
    statistic: "1 hectare equals 10,000 square metres, 2.47105 acres, or 107,639.1 square feet.",
    provenance: "Exact metric definition. Last verified 26 July 2026.",
    sections: [
      {
        title: "Converting Metric Hectares to Revenue Acres",
        content: "Government surveys, environmental clearance reports, and GIS mapping use hectares, whereas local buyers negotiate in acres and killa. Multiplying hectares by 2.47105 converts metric land areas to acres.",
      },
      {
        title: "Conversion Table",
        content: "1 ha = 2.471 acres. 2 ha = 4.942 acres. 5 ha = 12.355 acres. 10 ha = 24.711 acres. 50 ha = 123.553 acres.",
      },
      {
        title: "Calculation Mechanics",
        content: "Multiply hectares by 2.47105 for acres; multiply by 107,639.1 for square feet.",
      },
    ],
    siblingLinks: [
      { slug: "acre-to-hectare", anchorText: "Acre to Hectare Converter" },
      { slug: "acre-to-square-feet", anchorText: "Acre to Square Feet Converter" },
    ],
    entityLinks: [
      { slug: "punjab-land-measurement-chart", anchorText: "Master Measurement Chart" },
    ],
  },

  "acre-to-hectare": {
    slug: "acre-to-hectare",
    title: "1 Acre = 0.4047 Hectares - Acre to Hectare Converter",
    metaDescription: "Convert acres to hectares. 1 acre equals 0.404686 hectares (4,046.86 sq m). Calculate metric land area with live formulas.",
    h1: "Acre to Hectare Converter (1 Acre = 0.4047 Hectares)",
    tier: "conversion",
    fromUnitId: "acre",
    toUnitId: "hectare",
    answerBlock: "1 acre equals 0.404686 hectares (4,046.86 square metres). To convert acres to hectares, divide the acreage figure by 2.47105 or multiply by 0.404686.",
    keyFacts: [
      { term: "1 Acre in Hectares", value: "0.4046856 ha" },
      { term: "5 Acres in Hectares", value: "2.023428 ha" },
      { term: "10 Acres in Hectares", value: "4.046856 ha" },
      { term: "Formula", value: "hectares = acres ÷ 2.47105" },
    ],
    formula: {
      forward: "hectares = acres × 0.4046856",
      reverse: "acres = hectares ÷ 0.4046856",
      example: "A 25-acre land site in Tepla Industrial corridor equals 25 × 0.404686 = 10.117 hectares.",
    },
    questions: [
      {
        question: "How many hectares are in 1 acre?",
        answer: "1 acre equals 0.4046856 hectares.",
      },
      {
        question: "How do I convert acres to hectares?",
        answer: "Multiply acreage by 0.404686 or divide by 2.47105.",
      },
      {
        question: "What is 10 acres in hectares?",
        answer: "10 acres equals 4.046856 hectares.",
      },
      {
        question: "Why convert acres to hectares?",
        answer: "Environmental impact reports and foreign direct investment (FDI) applications require metric hectare disclosures.",
      },
      {
        question: "How many square metres is 1 acre?",
        answer: "1 acre equals 4,046.856 square metres.",
      },
      {
        question: "What is 1 killa in hectares?",
        answer: "1 killa (1 acre) equals 0.404686 hectares.",
      },
    ],
    citations: [
      {
        title: "International System of Units (SI Metric Standards)",
        url: "https://bipm.org/",
        source: "International Bureau of Weights and Measures",
      },
    ],
    statistic: "1 acre equals 0.4046856 hectares or 4,046.856 square metres.",
    provenance: "Exact metric definition. Last verified 26 July 2026.",
    sections: [
      {
        title: "Converting Acreage to Metric Hectares",
        content: "Converting acreage to hectares is essential when filing environmental clearances, industrial project proposals, or corporate filings.",
      },
      {
        title: "Worked Conversion Table",
        content: "1 acre = 0.4047 ha. 2 acres = 0.8094 ha. 5 acres = 2.0234 ha. 10 acres = 4.0469 ha. 25 acres (1 murabba) = 10.1171 ha.",
      },
      {
        title: "Calculation Mechanics",
        content: "Divide acres by 2.47105 to obtain hectares.",
      },
    ],
    siblingLinks: [
      { slug: "hectare-to-acre", anchorText: "Hectare to Acre Converter" },
      { slug: "acre-to-square-feet", anchorText: "Acre to Square Feet Converter" },
    ],
    entityLinks: [
      { slug: "punjab-land-measurement-chart", anchorText: "Master Measurement Chart" },
    ],
  },

  "guntha-to-square-feet": {
    slug: "guntha-to-square-feet",
    title: "1 Guntha = 1,089 Sq Ft - Guntha to Sq Ft Satbara Converter",
    metaDescription: "Convert guntha (gunta) to square feet for Satbara (7/12) land records in Maharashtra and Gujarat. 1 guntha equals 1,089 sq ft (121 sq yd).",
    h1: "Guntha to Square Feet Converter (Satbara 7/12 Land Records)",
    tier: "conversion",
    fromUnitId: "guntha",
    toUnitId: "sqft",
    answerBlock: "1 guntha (or gunta) equals 1,089 square feet (121 square yards or gaj). It represents 1/40th of an acre. In Maharashtra, Gujarat, and Goa 7/12 (Satbara Utara) extract land records, plot sizes are recorded in guntha. To convert guntha to square feet, multiply by 1,089.",
    keyFacts: [
      { term: "1 Guntha Area", value: "1,089 sq ft (121 sq yd / gaj)" },
      { term: "Satbara 7/12 Unit", value: "Standard revenue unit in MH & GJ" },
      { term: "Guntha per Acre", value: "40 guntha = 1 acre" },
      { term: "Gunthewari Regularisation", value: "Urban plot regularisation norm" },
      { term: "Mohali Equivalent", value: "1 Mohali biswa (1,089 sq ft)" },
    ],
    formula: {
      forward: "square feet = guntha × 1,089",
      reverse: "guntha = square feet ÷ 1,089",
      example: "A 5 guntha residential plot in Pune or Gujarat equals 5 × 1,089 = 5,445 sq ft (1 kanal in Mohali).",
    },
    questions: [
      {
        question: "How many square feet is 1 guntha in Satbara (7/12) records?",
        answer: "1 guntha equals 1,089 square feet in Satbara land extracts (121 square yards).",
      },
      {
        question: "What is Gunthewari regularisation?",
        answer: "Gunthewari refers to the regularisation of small unapproved plot layouts sold in guntha fractions across Maharashtra municipal limits.",
      },
      {
        question: "How many guntha make 1 acre in Western India?",
        answer: "40 guntha make 1 acre (43,560 sq ft ÷ 1,089 sq ft).",
      },
      {
        question: "How do I convert guntha to square feet?",
        answer: "Multiply total gunthas by 1,089.",
      },
      {
        question: "How does 1 guntha compare to 1 Mohali biswa?",
        answer: "Both 1 guntha and 1 Mohali biswa measure exactly 1,089 square feet.",
      },
      {
        question: "How many guntha in 10,000 square feet?",
        answer: "Divide 10,000 by 1,089 to get 9.18 guntha.",
      },
    ],
    citations: [
      {
        title: "Maharashtra Land Revenue Code 1966 & Gunthewari Act",
        url: "https://maharashtra.gov.in/",
        source: "Department of Revenue, Government of Maharashtra",
      },
    ],
    statistic: "1 guntha equals 1,089 sq ft (121 sq yd), representing 1/40th of an acre in Maharashtra and Gujarat land records.",
    provenance: "Standard revenue unit definition under the Maharashtra Land Revenue Code 1966. Last verified 26 July 2026.",
    sections: [
      {
        title: "Satbara Utara (7/12) Extracts and Guntha Measurements",
        content: "In Western India, farmland ownership is recorded in 7/12 Satbara Utara extracts where land shares are expressed in Hectare-Acre-Guntha notation. Converting guntha entries into square feet allows buyers from Maharashtra and Gujarat to evaluate plot footprints when investing in North Indian real estate.",
      },
      {
        title: "Guntha Conversion Benchmarks",
        content: "1 guntha = 1,089 sq ft (121 sq yd). 2 guntha = 2,178 sq ft (8 marla in Mohali). 5 guntha = 5,445 sq ft (1 kanal). 10 guntha = 10,890 sq ft (2 kanal / 0.25 acre). 20 guntha = 21,780 sq ft (1 bigha in Mohali). 40 guntha = 43,560 sq ft (1 acre).",
      },
      {
        title: "Mathematical Formula",
        content: "Square Feet = Guntha × 1,089.",
      },
    ],
    siblingLinks: [
      { slug: "biswa-to-square-feet", anchorText: "Biswa to Square Feet Converter" },
      { slug: "marla-to-square-yard", anchorText: "Marla to Square Yard Converter" },
    ],
    entityLinks: [
      { slug: "punjab-land-measurement-chart", anchorText: "Master Land Measurement Chart" },
    ],
  },

  "cent-to-square-feet": {
    slug: "cent-to-square-feet",
    title: "1 Cent = 435.6 Sq Ft - Cent to Sq Ft Patta Chitta Calculator",
    metaDescription: "Convert cent to square feet for Patta and Chitta land deeds in Tamil Nadu, Kerala & Karnataka. 1 cent equals 435.6 sq ft (48.4 sq yd).",
    h1: "Cent to Square Feet Converter (Patta & Chitta Land Records)",
    tier: "conversion",
    fromUnitId: "cent",
    toUnitId: "sqft",
    answerBlock: "1 cent equals 435.6 square feet (48.4 square yards). In South Indian real estate (Tamil Nadu, Kerala, Coastal Karnataka, and Andhra Pradesh), plot allocations on Patta and Chitta deeds are stated in cents. 1 cent represents 1/100th of an acre. To convert cent to square feet, multiply by 435.6.",
    keyFacts: [
      { term: "1 Cent Area", value: "435.6 sq ft (48.4 sq yd)" },
      { term: "Patta / Chitta Unit", value: "Primary plot unit in South India" },
      { term: "Cents per Acre", value: "100 cent = 1 acre (exact)" },
      { term: "Ground Equivalent", value: "5.51 cents = 1 Ground (2,400 sq ft)" },
      { term: "Mohali Marla Ratio", value: "1 cent ≈ 1.6 marla in Mohali" },
    ],
    formula: {
      forward: "square feet = cent × 435.6",
      reverse: "cent = square feet ÷ 435.6",
      example: "A 10 cent plot in Chennai, Kochi, or Bengaluru suburbs equals 10 × 435.6 = 4,356 sq ft (16 marla in Mohali).",
    },
    questions: [
      {
        question: "How many square feet is 1 cent in Patta documents?",
        answer: "1 cent equals 435.6 square feet in official revenue Patta and Chitta documents.",
      },
      {
        question: "How many cents make 1 acre in South India?",
        answer: "100 cents make 1 acre (43,560 sq ft ÷ 435.6 sq ft).",
      },
      {
        question: "What is the difference between 1 cent and 1 Ground in Tamil Nadu?",
        answer: "1 Ground is 2,400 sq ft, whereas 1 cent is 435.6 sq ft (1 Ground = 5.51 cents).",
      },
      {
        question: "How do I convert cents to square feet by hand?",
        answer: "Multiply the cent count by 435.6.",
      },
      {
        question: "How many cents equal 1 Mohali kanal?",
        answer: "1 Mohali kanal (5,445 sq ft) equals 5,445 ÷ 435.6 = 12.5 cents.",
      },
      {
        question: "What is a 5 cent plot size in feet dimensions?",
        answer: "5 cents equals 2,178 sq ft (e.g., a 33 ft frontage by 66 ft depth plot).",
      },
    ],
    citations: [
      {
        title: "Tamil Nadu Revenue Code & Kerala Land Reforms Manual",
        url: "https://tn.gov.in/",
        source: "Revenue & Land Administration Department",
      },
    ],
    statistic: "1 cent equals 435.6 sq ft (48.4 sq yd), representing 1/100th of an acre in South Indian Patta extracts.",
    provenance: "Standard revenue unit definition under Tamil Nadu and Kerala Land Revenue Acts. Last verified 26 July 2026.",
    sections: [
      {
        title: "Patta and Chitta Revenue Extracts in Cent Notation",
        content: "Across South India, residential house sites, agricultural plots, and coconut plantations are bought and sold in cents (1 cent = 1/100th acre = 435.6 sq ft). Converting cents to square feet helps buyers cross-reference South Indian plot sizes with North Indian land metrics.",
      },
      {
        title: "Cent Unit Conversions",
        content: "1 cent = 435.6 sq ft. 5 cent = 2,178 sq ft (8 marla in Mohali). 10 cent = 4,356 sq ft (16 marla). 25 cent = 10,890 sq ft (2 kanal / 0.25 acre). 50 cent = 21,780 sq ft (1 bigha in Mohali). 100 cent = 43,560 sq ft (1 acre).",
      },
      {
        title: "Calculation Rule",
        content: "Square Feet = Cent × 435.6.",
      },
    ],
    siblingLinks: [
      { slug: "square-feet-to-acre", anchorText: "Square Feet to Acre Converter" },
      { slug: "marla-to-square-feet", anchorText: "Marla to Square Feet Converter" },
    ],
    entityLinks: [
      { slug: "punjab-land-measurement-chart", anchorText: "Master Land Measurement Chart" },
    ],
  },
};
