// content/area-calculator/tier2.ts
import { AreaPageContent } from "./types";

export const tier2Pages: Record<string, AreaPageContent> = {
  "marla-to-square-feet": {
    slug: "marla-to-square-feet",
    title: "1 Marla = 272.25 Sq Ft | Marla to Square Feet Converter",
    metaDescription: "1 marla is 272.25 square feet in standard Punjab revenue records. Convert marla to square feet instantly with formulas, worked examples and district variations.",
    h1: "Marla to Square Feet Converter (1 Marla = 272.25 Sq Ft)",
    tier: "conversion",
    fromUnitId: "marla",
    toUnitId: "sqft",
    answerBlock: "1 marla is 272.25 square feet. In Punjab, Haryana and Himachal Pradesh, where the standard karam is 66 inches, 1 marla equals 272.25 sq ft or 30.25 square yards. To convert marla to square feet, multiply the number of marla by 272.25.",
    keyFacts: [
      { term: "Standard Marla (Mohali/Tricity)", value: "272.25 sq ft (30.25 sq yd)" },
      { term: "Patiala / Rajpura Marla", value: "226.875 sq ft (25.21 sq yd)" },
      { term: "Doaba Marla (Jalandhar)", value: "206.64 sq ft (22.96 sq yd)" },
      { term: "Majha Marla (Amritsar)", value: "225 sq ft (25 sq yd)" },
      { term: "Kapurthala Marla", value: "182.25 sq ft (20.25 sq yd)" },
      { term: "Relation to Kanal", value: "1 kanal = 20 marla" },
    ],
    formula: {
      forward: "square feet = marla × 272.25",
      reverse: "marla = square feet ÷ 272.25",
      example: "A 5 marla residential plot in SAS Nagar Mohali measures 5 × 272.25 = 1,361.25 square feet (151.25 square yards).",
    },
    questions: [
      {
        question: "How many square feet is 1 marla in Mohali?",
        answer: "1 marla equals exactly 272.25 square feet in Mohali, SAS Nagar, Chandigarh, Panchkula, and all consolidated urban sectors of Punjab.",
      },
      {
        question: "Why is marla size different in Jalandhar or Amritsar?",
        answer: "Marla size depends on the historical karam length used during district land settlements. Mohali uses a 66-inch karam (272.25 sq ft/marla), Majha uses 60 inches (225 sq ft/marla), and Doaba uses 57.5 inches (206.64 sq ft/marla).",
      },
      {
        question: "How do I convert marla to square feet by hand?",
        answer: "Multiply the total marla figure by 272.25 for standard Punjab land. For example, 8 marla × 272.25 = 2,178 square feet.",
      },
      {
        question: "How many marla is a 1,000 sq ft plot?",
        answer: "To convert 1,000 sq ft to marla, divide 1,000 by 272.25, which gives 3.673 marla (or 3 marla 6 sarsahi).",
      },
      {
        question: "What is a 10 marla plot dimensions in feet?",
        answer: "A 10 marla plot equals 2,722.5 square feet (302.5 sq yd). Typical dimensions are 35 feet width by 77.78 feet depth.",
      },
      {
        question: "Is marla size in Pakistan the same as Punjab India?",
        answer: "In Pakistan urban development (like DHA), a marla is usually standard 225 sq ft (based on 5-yard karam) or 272.25 sq ft in older revenue records, whereas Indian Punjab standard revenue is 272.25 sq ft.",
      },
    ],
    citations: [
      {
        title: "Punjab Land Records Manual (3rd Edition, 2004)",
        url: "https://jamabandi.punjab.gov.in/",
        source: "Department of Revenue, Punjab",
      },
      {
        title: "Haryana Revenue Unit Definitions",
        url: "https://jamabandi.nic.in/",
        source: "Haryana Land Records Department",
      },
    ],
    statistic: "A standard 66-inch karam yields a square karam of 30.25 sq ft, making 9 square karams (sarsahi) equal to exactly 272.25 square feet.",
    provenance: "Conversion factors sourced from the Punjab Land Records Manual, 3rd edition, 2004. Last verified 26 July 2026.",
    sections: [
      {
        title: "The Standard Marla in Punjab and Tricity Property Markets",
        content: "In Mohali, SAS Nagar, Chandigarh, Panchkula, and all consolidated urban municipal sectors of Punjab, the marla is the foundational land unit for residential plotting. Derived from 9 sarsahi (or square karam), a standard marla measures exactly 272.25 square feet. When buying a 4 marla, 6 marla, or 8 marla plot in GMADA approved sectors, all architectural layout plans calculate coverage based on 272.25 sq ft per marla.",
      },
      {
        title: "District Variations in Marla Sizes Across Punjab Revenue Records",
        content: "While urban plots in SAS Nagar and GMADA colonies strictly follow 272.25 sq ft, agricultural jamabandi records in older princely or non-consolidated districts vary. In Patiala and Rajpura (System B), a marla is 226.88 sq ft. In Jalandhar and Hoshiarpur (System C), a marla is 206.64 sq ft. In Amritsar and Gurdaspur (System D), a marla is 225 sq ft. Always verify which tehsil system applies before signing sale deeds.",
      },
      {
        title: "Step-by-Step Conversion from Marla to Square Feet",
        content: "To convert any marla measurement to square feet: (1) Identify the applicable district revenue system. (2) Multiply the number of marlas by the conversion factor (272.25 for standard Punjab). (3) Add any remaining sarsahi by multiplying sarsahi count by 30.25. For example, 2 marla 3 sarsahi equals (2 × 272.25) + (3 × 30.25) = 544.5 + 90.75 = 635.25 sq ft.",
      },
    ],
    siblingLinks: [
      { slug: "square-feet-to-marla", anchorText: "Square Feet to Marla Converter" },
      { slug: "marla-to-square-yard", anchorText: "Marla to Square Yard Converter" },
      { slug: "kanal-to-marla", anchorText: "Kanal to Marla Converter" },
      { slug: "kanal-to-square-feet", anchorText: "Kanal to Square Feet Converter" },
    ],
    entityLinks: [
      { slug: "marla-in-punjab", anchorText: "Detailed Marla Size Breakdown by District" },
      { slug: "karam-standards-of-punjab", anchorText: "District Karam Standards in Punjab" },
    ],
  },

  "square-feet-to-marla": {
    slug: "square-feet-to-marla",
    title: "Square Feet to Marla Converter | 272.25 Sq Ft = 1 Marla",
    metaDescription: "Convert square feet to marla instantly. 272.25 sq ft equals 1 standard marla in Punjab. View formulas, composite breakdowns and district comparison tables.",
    h1: "Square Feet to Marla Converter",
    tier: "conversion",
    fromUnitId: "sqft",
    toUnitId: "marla",
    answerBlock: "To convert square feet to marla in Punjab, divide the total square feet by 272.25. For example, 1,361.25 square feet divided by 272.25 equals exactly 5 marla in standard revenue practice.",
    keyFacts: [
      { term: "Standard Marla Equivalent", value: "272.25 sq ft = 1 marla" },
      { term: "1,000 Sq Ft in Marla", value: "3.673 marla" },
      { term: "2,250 Sq Ft in Marla", value: "8.265 marla" },
      { term: "5,445 Sq Ft in Marla", value: "20 marla (1 kanal)" },
      { term: "Formula", value: "marla = sq ft ÷ 272.25" },
    ],
    formula: {
      forward: "marla = square feet ÷ 272.25",
      reverse: "square feet = marla × 272.25",
      example: "A plot of 2,178 sq ft in Mohali equals 2,178 ÷ 272.25 = 8 marla.",
    },
    questions: [
      {
        question: "How many marla is 1,000 square feet?",
        answer: "1,000 square feet equals 3.673 marla in standard Punjab revenue terms (3 marla and 6.06 sarsahi).",
      },
      {
        question: "How many marla is a 1,500 square feet plot?",
        answer: "1,500 square feet equals 5.51 marla (5 marla and 4.59 sarsahi) in Mohali.",
      },
      {
        question: "What is the formula to convert square feet to marla?",
        answer: "Divide the total square feet by 272.25 for standard Punjab land, or by the local marla sq ft factor for other districts.",
      },
      {
        question: "How many square feet make half a marla?",
        answer: "Half a marla (0.5 marla) equals 136.125 square feet (15.125 square yards).",
      },
      {
        question: "How many marla in 100 square yards?",
        answer: "100 square yards is 900 square feet. Divided by 272.25, 900 sq ft equals 3.305 marla.",
      },
      {
        question: "Why divide by 272.25 instead of 225?",
        answer: "In Indian Punjab, standard revenue records use 66-inch karams yielding 272.25 sq ft per marla. 225 sq ft applies only to Majha district or Pakistan DHA plots.",
      },
    ],
    citations: [
      {
        title: "Punjab Land Records Manual (3rd Edition, 2004)",
        url: "https://jamabandi.punjab.gov.in/",
        source: "Department of Revenue, Punjab",
      },
    ],
    statistic: "272.25 square feet equals 1 standard marla, 1,089 square feet equals 1 biswa, and 5,445 square feet equals 1 kanal in Punjab.",
    provenance: "Conversion factors sourced from the Punjab Land Records Manual, 3rd edition, 2004. Last verified 26 July 2026.",
    sections: [
      {
        title: "Converting Square Feet to Marla in Tricity Real Estate",
        content: "When evaluating property listings in Mohali or Zirakpur quoted in square feet, converting to marla provides immediate clarity on layout scale. Dividing total square feet by 272.25 converts the area to marlas. For instance, a 2,722.5 sq ft plot equals exactly 10 marla.",
      },
      {
        title: "Understanding Fractional Marla and Sarsahi Remainders",
        content: "Not all plot areas divide cleanly into whole marlas. The remainder is expressed in sarsahi (where 1 sarsahi = 30.25 sq ft). For example, 1,000 sq ft equals 3 marla (816.75 sq ft) plus 183.25 sq ft remainder, which corresponds to 6.06 sarsahi.",
      },
      {
        title: "Impact of District Revenue Systems on Conversion",
        content: "When converting square feet to marlas in Patiala, divide by 226.875; in Jalandhar, divide by 206.64; in Amritsar, divide by 225. Select the appropriate region in the calculator above to apply local tehsil factors.",
      },
    ],
    siblingLinks: [
      { slug: "marla-to-square-feet", anchorText: "Marla to Square Feet Converter" },
      { slug: "kanal-to-square-feet", anchorText: "Kanal to Square Feet Converter" },
      { slug: "square-feet-to-kanal", anchorText: "Square Feet to Kanal Converter" },
    ],
    entityLinks: [
      { slug: "marla-in-punjab", anchorText: "Regional Marla Standards in Punjab" },
    ],
  },

  "kanal-to-square-feet": {
    slug: "kanal-to-square-feet",
    title: "1 Kanal = 5,445 Sq Ft | Kanal to Square Feet Converter",
    metaDescription: "1 kanal is 5,445 square feet in standard Punjab revenue land measurement. Convert kanal to square feet with district tables, formulas and worked examples.",
    h1: "Kanal to Square Feet Converter (1 Kanal = 5,445 Sq Ft)",
    tier: "conversion",
    fromUnitId: "kanal",
    toUnitId: "sqft",
    answerBlock: "1 kanal is 5,445 square feet. In Punjab standard revenue records, 1 kanal consists of 20 marla or 605 square yards. To convert kanal to square feet, multiply the kanal count by 5,445.",
    keyFacts: [
      { term: "Standard Kanal", value: "5,445 sq ft (605 sq yd)" },
      { term: "Kanal in Marlas", value: "20 marla = 1 kanal" },
      { term: "Patiala / Rajpura Kanal", value: "4,537.5 sq ft (504.17 sq yd)" },
      { term: "Doaba Kanal (Jalandhar)", value: "4,132.81 sq ft (459.20 sq yd)" },
      { term: "Majha Kanal (Amritsar)", value: "4,500 sq ft (500 sq yd)" },
      { term: "Kanal to Acre", value: "8 kanal = 1 acre (Standard)" },
    ],
    formula: {
      forward: "square feet = kanal × 5,445",
      reverse: "kanal = square feet ÷ 5,445",
      example: "A 2 kanal farmhouse plot near New Chandigarh equals 2 × 5,445 = 10,890 square feet (1,210 sq yd).",
    },
    questions: [
      {
        question: "How many square feet is 1 kanal in Punjab?",
        answer: "1 kanal is 5,445 square feet in standard Punjab revenue practice (Mohali, SAS Nagar, Chandigarh, Panchkula).",
      },
      {
        question: "How many square yards (gaj) are in 1 kanal?",
        answer: "1 kanal equals exactly 605 square yards (gaj) in standard Punjab measurement.",
      },
      {
        question: "How many kanal are in 1 acre?",
        answer: "In standard Punjab revenue practice, 1 acre equals 8 kanal (43,560 sq ft). In Doaba, 1 acre equals 10.54 kanal.",
      },
      {
        question: "How do I convert kanal to square feet by hand?",
        answer: "Multiply the number of kanal by 5,445. For example, 4 kanal × 5,445 = 21,780 square feet (which equals 1 bigha).",
      },
      {
        question: "What is half a kanal in square feet?",
        answer: "Half a kanal (0.5 kanal or 10 marla) equals 2,722.5 square feet (302.5 square yards).",
      },
      {
        question: "Why is kanal smaller in Jalandhar than in Mohali?",
        answer: "Jalandhar follows the Doaba settlement standard (57.5-inch karam), where 1 kanal is 4,132.81 sq ft. Mohali follows the 66-inch standard (5,445 sq ft).",
      },
    ],
    citations: [
      {
        title: "Punjab Land Records Manual (3rd Edition, 2004)",
        url: "https://jamabandi.punjab.gov.in/",
        source: "Department of Revenue, Punjab",
      },
    ],
    statistic: "8 kanal equals 1 acre (43,560 sq ft) and 4 kanal equals 1 standard bigha (21,780 sq ft) in Mohali.",
    provenance: "Conversion factors sourced from the Punjab Land Records Manual, 3rd edition, 2004. Last verified 26 July 2026.",
    sections: [
      {
        title: "The Role of Kanal in Farmhouses and Estate Land in Punjab",
        content: "The kanal is the standard unit for expressing medium-to-large land holdings, luxury farmhouses, and kothi plots across Mohali and Tricity. 1 kanal equals 20 marla or 5,445 square feet. 1-kanal kothis in Phase 7 or Sector 70 Mohali are built on 5,445 sq ft plots (605 gaj).",
      },
      {
        title: "Comparing Kanal Sizes across Punjab Districts",
        content: "While a Mohali kanal is 5,445 sq ft, local revenue definitions vary: Rajpura/Patiala (4,537.5 sq ft), Doaba/Jalandhar (4,132.81 sq ft), Majha/Amritsar (4,500 sq ft), Kapurthala (3,645 sq ft). Buyers transacting outside SAS Nagar must verify local tehsil standards.",
      },
      {
        title: "Converting Kanal to Square Feet and Gaj",
        content: "To convert kanal to square feet, multiply by 5,445. To convert to square yards (gaj), multiply by 605. For example, 1.5 kanal equals 1.5 × 5,445 = 8,167.5 sq ft (907.5 gaj).",
      },
    ],
    siblingLinks: [
      { slug: "square-feet-to-kanal", anchorText: "Square Feet to Kanal Converter" },
      { slug: "kanal-to-marla", anchorText: "Kanal to Marla Converter" },
      { slug: "kanal-to-acre", anchorText: "Kanal to Acre Converter" },
      { slug: "bigha-to-kanal", anchorText: "Bigha to Kanal Converter" },
    ],
    entityLinks: [
      { slug: "kanal-in-punjab", anchorText: "Kanal Regional Disambiguation Guide" },
    ],
  },

  "square-feet-to-kanal": {
    slug: "square-feet-to-kanal",
    title: "Square Feet to Kanal Converter | 5,445 Sq Ft = 1 Kanal",
    metaDescription: "Convert square feet to kanal instantly. 5,445 sq ft equals 1 standard kanal in Punjab. Calculate kanal, marla and sarsahi remainders with live formulas.",
    h1: "Square Feet to Kanal Converter",
    tier: "conversion",
    fromUnitId: "sqft",
    toUnitId: "kanal",
    answerBlock: "To convert square feet to kanal in Punjab, divide the total square feet by 5,445. For example, 10,890 square feet divided by 5,445 equals exactly 2 kanal.",
    keyFacts: [
      { term: "Standard Kanal", value: "5,445 sq ft" },
      { term: "10,000 Sq Ft in Kanal", value: "1.836 kanal (1 kanal 16.7 marla)" },
      { term: "21,780 Sq Ft in Kanal", value: "4 kanal (1 bigha)" },
      { term: "43,560 Sq Ft in Kanal", value: "8 kanal (1 acre)" },
    ],
    formula: {
      forward: "kanal = square feet ÷ 5,445",
      reverse: "square feet = kanal × 5,445",
      example: "A land parcel of 16,335 sq ft equals 16,335 ÷ 5,445 = 3 kanal.",
    },
    questions: [
      {
        question: "How many kanal is 10,000 square feet?",
        answer: "10,000 square feet equals 1.836 kanal (1 kanal 16 marla 6.4 sarsahi) in standard Punjab measurement.",
      },
      {
        question: "How many square feet is 2 kanal?",
        answer: "2 kanal equals exactly 10,890 square feet (1,210 square yards).",
      },
      {
        question: "What is the formula to convert square feet to kanal?",
        answer: "Divide total square feet by 5,445 for standard Punjab revenue records.",
      },
      {
        question: "How many kanal in 1 acre?",
        answer: "1 acre (43,560 sq ft) contains exactly 8 kanal in standard Punjab.",
      },
      {
        question: "How many kanal in 1 bigha?",
        answer: "1 standard bigha (21,780 sq ft) contains exactly 4 kanal.",
      },
      {
        question: "What is the remainder when converting sq ft to kanal?",
        answer: "The whole integer gives the kanal count; the decimal remainder multiplied by 20 gives the marla count.",
      },
    ],
    citations: [
      {
        title: "Punjab Land Records Manual (3rd Edition, 2004)",
        url: "https://jamabandi.punjab.gov.in/",
        source: "Department of Revenue, Punjab",
      },
    ],
    statistic: "5,445 square feet equals 1 kanal, 21,780 square feet equals 1 bigha, and 43,560 square feet equals 1 killa/acre in Mohali.",
    provenance: "Conversion factors sourced from the Punjab Land Records Manual, 3rd edition, 2004. Last verified 26 July 2026.",
    sections: [
      {
        title: "Converting Commercial and Residential Land to Kanal Notation",
        content: "When dealing with large residential plots, institutional land, or commercial sites in Mohali, expressing total area in kanal provides a clear land profile. Dividing square feet by 5,445 gives the exact kanal figure.",
      },
      {
        title: "Breaking Down Square Feet into Kanal, Marla, and Sarsahi",
        content: "To convert 12,000 sq ft: 12,000 ÷ 5,445 = 2 kanal (10,890 sq ft), leaving 1,110 sq ft remainder. 1,110 ÷ 272.25 = 4 marla (1,089 sq ft), leaving 21 sq ft remainder. 21 ÷ 30.25 = 0.69 sarsahi. Result: 2 kanal 4 marla 0.69 sarsahi.",
      },
      {
        title: "Regional Tehsil Considerations",
        content: "Divide by 4,537.5 for Rajpura/Patiala, 4,132.81 for Jalandhar, and 4,500 for Amritsar when converting square feet to local kanal.",
      },
    ],
    siblingLinks: [
      { slug: "kanal-to-square-feet", anchorText: "Kanal to Square Feet Converter" },
      { slug: "marla-to-kanal", anchorText: "Marla to Kanal Converter" },
      { slug: "acre-to-kanal", anchorText: "Acre to Kanal Converter" },
    ],
    entityLinks: [
      { slug: "kanal-in-punjab", anchorText: "Kanal Regional Unit Overview" },
    ],
  },

  "bigha-to-square-feet": {
    slug: "bigha-to-square-feet",
    title: "1 Bigha = 21,780 Sq Ft (Mohali) / 9,075 Sq Ft (Rajpura)",
    metaDescription: "Convert bigha to square feet in Punjab. Learn why 1 bigha is 21,780 sq ft in Mohali but 9,075 sq ft in Rajpura and Banur with full revenue tables.",
    h1: "Bigha to Square Feet Converter",
    tier: "conversion",
    fromUnitId: "bigha",
    toUnitId: "sqft",
    answerBlock: "1 bigha is 21,780 square feet in Mohali and standard consolidated Punjab (System A). However, in Rajpura, Banur and Patiala (System B), 1 katcha bigha is 9,075 square feet. To convert bigha to square feet, multiply by 21,780 for Mohali or 9,075 for Rajpura.",
    keyFacts: [
      { term: "Mohali / Standard Bigha", value: "21,780 sq ft (2,420 sq yd)" },
      { term: "Rajpura / Patiala Bigha", value: "9,075 sq ft (1,008.33 sq yd)" },
      { term: "Ludhiana Pakka Bigha", value: "27,225 sq ft (3,025 sq yd)" },
      { term: "Majha Bigha (Amritsar)", value: "10,000 sq ft (1,111.11 sq yd)" },
      { term: "Himachal Pradesh Bigha", value: "8,712 sq ft (968 sq yd)" },
      { term: "UP Pucca Bigha", value: "27,000 sq ft (3,000 sq yd)" },
    ],
    formula: {
      forward: "square feet = bigha × local bigha sq ft factor",
      reverse: "bigha = square feet ÷ local bigha sq ft factor",
      example: "75 bigha of agricultural land in Rajpura equals 75 × 9,075 = 680,625 sq ft (15.625 acres), whereas 75 bigha in Mohali equals 75 × 21,780 = 1,633,500 sq ft (37.5 acres).",
    },
    questions: [
      {
        question: "How many square feet is 1 bigha in Mohali?",
        answer: "In Mohali, SAS Nagar, and standard urban Punjab, 1 bigha equals 21,780 square feet (2,420 square yards or 4 kanal).",
      },
      {
        question: "How many square feet is 1 bigha in Rajpura and Banur?",
        answer: "In Rajpura, Banur, and Patiala district revenue records, 1 katcha bigha equals 9,075 square feet (1,008.33 square yards). This is less than half the size of a Mohali bigha.",
      },
      {
        question: "Why does bigha size vary so much across Punjab?",
        answer: "Bigha definitions depend on the karam standard used during historical land settlements. Standard consolidated areas use the 66-inch karam (21,780 sq ft), while former Patiala princely state areas use the 57.157-inch karam (9,075 sq ft).",
      },
      {
        question: "How many bigha are in 1 acre in Rajpura versus Mohali?",
        answer: "In Mohali, 2 bigha equal 1 acre (43,560 sq ft). In Rajpura, 4.8 bigha equal 1 acre.",
      },
      {
        question: "How do I convert bigha to square feet?",
        answer: "Select your land region in the tool above, then multiply the bigha value by the local sq ft factor (21,780 for Mohali, 9,075 for Rajpura, 27,225 for Ludhiana).",
      },
      {
        question: "What is a pakka bigha versus a katcha bigha?",
        answer: "A pakka bigha (used in Ludhiana or Rajasthan) is 27,225 sq ft. A katcha bigha (used in Patiala/Rajpura) is 9,075 sq ft, exactly 1/3 of a pakka bigha.",
      },
    ],
    citations: [
      {
        title: "Punjab Land Records Manual (3rd Edition, 2004)",
        url: "https://jamabandi.punjab.gov.in/",
        source: "Department of Revenue, Punjab",
      },
    ],
    statistic: "75 bigha in Rajpura equals 15.625 acres, whereas 75 bigha in Mohali equals 37.5 acres—a critical difference for agricultural land buyers.",
    provenance: "Conversion factors sourced from the Punjab Land Records Manual, 3rd edition, 2004. Last verified 26 July 2026.",
    sections: [
      {
        title: "The Bigha Size Discrepancy: Mohali vs Rajpura & Patiala",
        content: "One of the most frequent traps for land buyers in Punjab is assuming that a bigha is a uniform unit across the state. In Mohali, Zirakpur, and GMADA territory, 1 bigha is 21,780 sq ft (0.5 acre). In Rajpura, Banur, Dera Bassi, and Patiala, revenue deeds use the erstwhile Patiala princely state katcha bigha of 9,075 sq ft (0.2083 acre).",
      },
      {
        title: "Regional Bigha Standards Across India",
        content: "Bigha definitions vary widely across Indian states: Ludhiana Pakka Bigha (27,225 sq ft), Uttar Pradesh (27,000 sq ft), Bihar (27,220 sq ft), West Bengal (14,400 sq ft), Gujarat (17,427 sq ft), Himachal Pradesh (8,712 sq ft), and Uttarakhand (6,804 sq ft). Always specify the district when negotiating land by the bigha.",
      },
      {
        title: "Converting Bigha to Square Feet Safely",
        content: "Always check the jamabandi heading for the applicable karam standard. For Mohali: sq ft = bigha × 21,780. For Rajpura/Patiala: sq ft = bigha × 9,075.",
      },
    ],
    siblingLinks: [
      { slug: "square-feet-to-bigha", anchorText: "Square Feet to Bigha Converter" },
      { slug: "bigha-to-acre", anchorText: "Bigha to Acre Converter" },
      { slug: "bigha-to-kanal", anchorText: "Bigha to Kanal Converter" },
    ],
    entityLinks: [
      { slug: "bigha-in-rajpura", anchorText: "Rajpura 9,075 Sq Ft Bigha Explainer" },
      { slug: "bigha-in-punjab", anchorText: "Punjab Bigha Disambiguation" },
    ],
  },
};
