// content/area-calculator/tier2-all.ts
import { AreaPageContent } from "./types";
import { tier2Pages as initialTier2 } from "./tier2";

export const tier2AllPages: Record<string, AreaPageContent> = {
  ...initialTier2,

  "square-feet-to-bigha": {
    slug: "square-feet-to-bigha",
    title: "Square Feet to Bigha Converter | Mohali & Rajpura Bigha Table",
    metaDescription: "Convert square feet to bigha instantly. Compare Mohali bigha (21,780 sq ft) vs Rajpura katcha bigha (9,075 sq ft) with formulas and district tables.",
    h1: "Square Feet to Bigha Converter",
    tier: "conversion",
    fromUnitId: "sqft",
    toUnitId: "bigha",
    answerBlock: "To convert square feet to bigha in Mohali, divide square feet by 21,780. In Rajpura and Banur, divide square feet by 9,075. For example, 43,560 square feet equals 2 bigha in Mohali and 4.8 bigha in Rajpura.",
    keyFacts: [
      { term: "Mohali Bigha Factor", value: "21,780 sq ft" },
      { term: "Rajpura Bigha Factor", value: "9,075 sq ft" },
      { term: "Ludhiana Bigha Factor", value: "27,225 sq ft" },
      { term: "1 Acre in Mohali Bigha", value: "2 bigha" },
      { term: "1 Acre in Rajpura Bigha", value: "4.8 bigha" },
    ],
    formula: {
      forward: "bigha = square feet ÷ local bigha factor",
      reverse: "square feet = bigha × local bigha factor",
      example: "108,900 sq ft in Mohali equals 108,900 ÷ 21,780 = 5 bigha.",
    },
    questions: [
      {
        question: "How many bigha is 10,000 square feet?",
        answer: "10,000 square feet equals 0.459 bigha in Mohali (21,780 sq ft per bigha) and 1.102 bigha in Rajpura (9,075 sq ft per bigha).",
      },
      {
        question: "How many bigha is 1 acre in Punjab?",
        answer: "In Mohali and standard Punjab, 1 acre (43,560 sq ft) is 2 bigha. In Rajpura and Patiala, 1 acre is 4.8 bigha.",
      },
      {
        question: "What is the formula for sq ft to bigha?",
        answer: "Divide square feet by the local bigha factor: 21,780 for Mohali, 9,075 for Rajpura, 27,225 for Ludhiana.",
      },
      {
        question: "How many sq ft in half a bigha?",
        answer: "In Mohali, half a bigha is 10,890 sq ft. In Rajpura, half a bigha is 4,537.5 sq ft.",
      },
      {
        question: "Why do online calculators give wrong bigha answers for Rajpura?",
        answer: "Generic online converters only know the 21,780 sq ft standard bigha and ignore Patiala princely state katcha bigha revenue records.",
      },
      {
        question: "How do I verify the bigha factor in my jamabandi?",
        answer: "Check the karam length recorded in the revenue settlement notes. 66-inch karam = 21,780 sq ft bigha; 57.157-inch karam = 9,075 sq ft bigha.",
      },
    ],
    citations: [
      {
        title: "Punjab Land Records Manual (3rd Edition, 2004)",
        url: "https://jamabandi.punjab.gov.in/",
        source: "Department of Revenue, Punjab",
      },
    ],
    statistic: "43,560 square feet equals exactly 2 bigha in Mohali but 4.8 bigha in Rajpura and Banur.",
    provenance: "Conversion factors sourced from the Punjab Land Records Manual, 3rd edition, 2004. Last verified 26 July 2026.",
    sections: [
      {
        title: "Converting Square Feet to Bighas across Punjab Regions",
        content: "When evaluating land parcels in Punjab, converting square feet to bighas requires selecting the correct regional revenue standard. In SAS Nagar and GMADA territory, 21,780 sq ft equals 1 bigha. In Patiala, Banur, and Rajpura, 9,075 sq ft equals 1 bigha.",
      },
      {
        title: "Worked Conversion Examples for Land Buyers",
        content: "A 100,000 sq ft industrial land parcel in Tepla/Rajpura: 100,000 ÷ 9,075 = 11.02 bigha. The same parcel in Airport Road Mohali: 100,000 ÷ 21,780 = 4.59 bigha.",
      },
      {
        title: "Tehsil Verification Guidelines",
        content: "Always confirm with the patwari whether the land falls under consolidated revenue records (System A) or princely state records (System B).",
      },
    ],
    siblingLinks: [
      { slug: "bigha-to-square-feet", anchorText: "Bigha to Square Feet Converter" },
      { slug: "bigha-to-acre", anchorText: "Bigha to Acre Converter" },
      { slug: "acre-to-bigha", anchorText: "Acre to Bigha Converter" },
    ],
    entityLinks: [
      { slug: "bigha-in-rajpura", anchorText: "Rajpura Katcha Bigha Detail" },
      { slug: "bigha-in-punjab", anchorText: "Punjab Bigha Variations" },
    ],
  },

  "acre-to-square-feet": {
    slug: "acre-to-square-feet",
    title: "1 Acre = 43,560 Sq Ft | Acre to Square Feet Converter",
    metaDescription: "1 acre is exactly 43,560 square feet. Convert acre to square feet, marla, kanal and bigha instantly with standard revenue formulas.",
    h1: "Acre to Square Feet Converter (1 Acre = 43,560 Sq Ft)",
    tier: "conversion",
    fromUnitId: "acre",
    toUnitId: "sqft",
    answerBlock: "1 acre is exactly 43,560 square feet. In Punjab agricultural revenue records, 1 acre is equal to 1 killa (or ghumaon), which consists of 8 kanal or 160 marla. To convert acre to square feet, multiply by 43,560.",
    keyFacts: [
      { term: "1 Acre in Sq Ft", value: "43,560 sq ft (exact)" },
      { term: "1 Acre in Sq Yd (Gaj)", value: "4,840 sq yd" },
      { term: "1 Acre in Sq Metres", value: "4,046.856 sq m" },
      { term: "1 Acre in Kanals (Standard)", value: "8 kanal" },
      { term: "1 Acre in Mohali Bighas", value: "2 bigha" },
      { term: "1 Acre in Rajpura Bighas", value: "4.8 bigha" },
    ],
    formula: {
      forward: "square feet = acre × 43,560",
      reverse: "acre = square feet ÷ 43,560",
      example: "A 5-acre agricultural farm in Zirakpur equals 5 × 43,560 = 217,800 square feet (24,200 square yards).",
    },
    questions: [
      {
        question: "How many square feet are in 1 acre?",
        answer: "There are exactly 43,560 square feet in 1 acre universally.",
      },
      {
        question: "Is 1 acre the same as 1 killa in Punjab?",
        answer: "Yes, in Punjab revenue parlance, 1 killa (36×40 karam rect) is identical to 1 acre (43,560 sq ft).",
      },
      {
        question: "How many marla make 1 acre?",
        answer: "Exactly 160 marla make 1 acre in standard Punjab revenue measurement (8 kanal × 20 marla).",
      },
      {
        question: "How many square yards is 1 acre?",
        answer: "1 acre equals exactly 4,840 square yards (gaj).",
      },
      {
        question: "How many hectares in 1 acre?",
        answer: "1 acre equals 0.404686 hectares (1 hectare = 2.471 acres).",
      },
      {
        question: "How do I convert acres to square feet by hand?",
        answer: "Multiply the acreage figure by 43,560. For example, 2.5 acres × 43,560 = 108,900 square feet.",
      },
    ],
    citations: [
      {
        title: "Punjab Land Records Manual (3rd Edition, 2004)",
        url: "https://jamabandi.punjab.gov.in/",
        source: "Department of Revenue, Punjab",
      },
    ],
    statistic: "A standard killa/acre in Punjab is laid out as 36 karam by 40 karam (198 feet by 220 feet), giving exactly 43,560 square feet.",
    provenance: "Conversion factors sourced from the Punjab Land Records Manual, 3rd edition, 2004. Last verified 26 July 2026.",
    sections: [
      {
        title: "Understanding Acre and Killa Standards in Punjab Land Acquisitions",
        content: "Across agricultural, industrial, and township land transactions in Mohali, Banur, Kharar, and New Chandigarh, the acre (killa) is the standard high-level unit. 1 acre equals 43,560 sq ft or 4,840 sq yd. A killa is traditionally laid out rectangularly as 36 karam by 40 karam (198 ft × 220 ft).",
      },
      {
        title: "Relationship Between Acre, Kanal, Bigha, and Hectare",
        content: "In standard Punjab (System A): 1 acre = 8 kanal = 2 bigha = 160 marla = 43,560 sq ft. In Rajpura (System B): 1 acre = 4.8 bigha = 43,560 sq ft. Metric system: 1 hectare = 2.471 acres = 107,639.1 sq ft.",
      },
      {
        title: "Practical Conversion Guide",
        content: "Multiply acreage by 43,560 to obtain total square feet. To obtain square yards (gaj), multiply acreage by 4,840.",
      },
    ],
    siblingLinks: [
      { slug: "square-feet-to-acre", anchorText: "Square Feet to Acre Converter" },
      { slug: "killa-to-acre", anchorText: "Killa to Acre Converter" },
      { slug: "bigha-to-acre", anchorText: "Bigha to Acre Converter" },
      { slug: "hectare-to-acre", anchorText: "Hectare to Acre Converter" },
    ],
    entityLinks: [
      { slug: "punjab-land-measurement-chart", anchorText: "Master Punjab Land Measurement Chart" },
    ],
  },

  "square-feet-to-acre": {
    slug: "square-feet-to-acre",
    title: "Square Feet to Acre Converter | 43,560 Sq Ft = 1 Acre",
    metaDescription: "Convert square feet to acres instantly. 43,560 sq ft equals 1 acre. Calculate acreage, killa, kanal and marla breakdown with live formulas.",
    h1: "Square Feet to Acre Converter",
    tier: "conversion",
    fromUnitId: "sqft",
    toUnitId: "acre",
    answerBlock: "To convert square feet to acres, divide the total square feet by 43,560. For example, 108,900 square feet divided by 43,560 equals 2.5 acres.",
    keyFacts: [
      { term: "Acre Conversion Factor", value: "43,560 sq ft" },
      { term: "10,000 Sq Ft in Acres", value: "0.2295 acres" },
      { term: "100,000 Sq Ft in Acres", value: "2.2957 acres" },
      { term: "Formula", value: "acres = sq ft ÷ 43,560" },
    ],
    formula: {
      forward: "acres = square feet ÷ 43,560",
      reverse: "square feet = acres × 43,560",
      example: "A land site of 217,800 sq ft equals 217,800 ÷ 43,560 = 5 acres.",
    },
    questions: [
      {
        question: "How many acres is 100,000 square feet?",
        answer: "100,000 square feet equals 2.2957 acres (2 acres 2 kanal 7 marla 2.79 sarsahi).",
      },
      {
        question: "How many square feet is 1 acre?",
        answer: "1 acre equals exactly 43,560 square feet.",
      },
      {
        question: "How do I convert square feet to acres?",
        answer: "Divide total square feet by 43,560.",
      },
      {
        question: "How many acres is 1 bigha in Mohali?",
        answer: "1 standard bigha (21,780 sq ft) is 0.5 acres.",
      },
      {
        question: "How many acres is 1 bigha in Rajpura?",
        answer: "1 Rajpura katcha bigha (9,075 sq ft) is 0.2083 acres.",
      },
      {
        question: "What is the formula for sq ft to acre?",
        answer: "acre = square feet ÷ 43,560.",
      },
    ],
    citations: [
      {
        title: "Punjab Land Records Manual (3rd Edition, 2004)",
        url: "https://jamabandi.punjab.gov.in/",
        source: "Department of Revenue, Punjab",
      },
    ],
    statistic: "43,560 square feet equals 1 acre, 1 killa, 8 kanal, or 2 bigha in Mohali.",
    provenance: "Conversion factors sourced from the Punjab Land Records Manual, 3rd edition, 2004. Last verified 26 July 2026.",
    sections: [
      {
        title: "Converting Large Plot Sizes to Acreage",
        content: "For commercial land acquisitions, plotting projects, and agricultural land banking around Mohali, land area is evaluated in acres. Dividing total square footage by 43,560 provides exact acreage.",
      },
      {
        title: "Agricultural Breakdown: Killa, Kanal, Marla",
        content: "When converting 100,000 sq ft to agricultural form: 2 killa (87,120 sq ft) + 2 kanal (10,890 sq ft) + 7 marla (1,905.75 sq ft) + 2.79 sarsahi (84.25 sq ft) = 100,000 sq ft.",
      },
      {
        title: "Universal Application",
        content: "Unlike bighas or marlas, the 43,560 sq ft acre is constant across all Indian states and international real estate.",
      },
    ],
    siblingLinks: [
      { slug: "acre-to-square-feet", anchorText: "Acre to Square Feet Converter" },
      { slug: "killa-to-acre", anchorText: "Killa to Acre Converter" },
      { slug: "bigha-to-acre", anchorText: "Bigha to Acre Converter" },
    ],
    entityLinks: [
      { slug: "punjab-land-measurement-chart", anchorText: "Punjab Land Measurement Chart" },
    ],
  },
};
