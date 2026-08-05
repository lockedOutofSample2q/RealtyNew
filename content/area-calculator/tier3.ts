// content/area-calculator/tier3.ts
import { AreaPageContent } from "./types";

export const tier3Pages: Record<string, AreaPageContent> = {
  "punjab-land-measurement-chart": {
    slug: "punjab-land-measurement-chart",
    title: "Punjab Land Measurement Chart (All 6 Systems)",
    metaDescription: "Master reference chart of land measurement units across all 6 Punjab revenue systems. Bigha, marla, kanal, killa, sarsahi, biswa and karam standards.",
    h1: "Punjab Land Measurement Chart: The Master Revenue Reference",
    tier: "entity",
    answerBlock: "Standard land measurement in Punjab uses 1 marla equal to 272.25 square feet, 1 kanal equal to 5,445 square feet, 1 bigha equal to 21,780 square feet, and 1 killa equal to 43,560 square feet. Six distinct regional systems govern local revenue records across Punjab districts.",
    keyFacts: [
      { term: "System A (Mohali / Standard)", value: "66 in karam | 272.25 sq ft marla | 21,780 sq ft bigha" },
      { term: "System B (Rajpura / Patiala)", value: "57.157 in karam | 226.88 sq ft marla | 9,075 sq ft katcha bigha" },
      { term: "System C (Doaba / Jalandhar)", value: "57.5 in karam | 206.64 sq ft marla | 4,132.81 sq ft kanal" },
      { term: "System D (Majha / Amritsar)", value: "60 in karam | 225 sq ft marla | 10,000 sq ft bigha" },
      { term: "System E (Kapurthala)", value: "54 in karam | 182.25 sq ft marla | 3,645 sq ft kanal" },
      { term: "System F (Ludhiana)", value: "99 in gatha | 27,225 sq ft pakka bigha | 1.6 bigha/acre" },
    ],
    formula: {
      forward: "square feet = value × unit sq ft factor (active system)",
      reverse: "units = square feet ÷ unit sq ft factor (active system)",
      example: "75 bigha in Rajpura (System B) = 75 × 9,075 = 680,625 sq ft (15.625 acres). 75 bigha in Mohali (System A) = 75 × 21,780 = 1,633,500 sq ft (37.5 acres).",
    },
    questions: [
      {
        question: "What are the six land measurement systems of Punjab?",
        answer: "The six systems are: System A (Standard 66-inch karam), System B (Patiala/Rajpura 57.157-inch karam), System C (Doaba 57.5-inch karam), System D (Majha 60-inch karam), System E (Kapurthala 54-inch karam), and System F (Ludhiana 99-inch gatha).",
      },
      {
        question: "Why does Punjab have six different measurement systems?",
        answer: "The variation stems from pre-independence land settlements conducted independently by the British administration and princely state rulers (Patiala, Nabha, Kapurthala, Jind).",
      },
      {
        question: "Which system applies to Mohali and Tricity?",
        answer: "Mohali, SAS Nagar, Chandigarh, Panchkula, Zirakpur, Kharar, Kurali, New Chandigarh, and Mullanpur operate on System A (Standard 66-inch karam).",
      },
      {
        question: "How many marlas make a kanal across all systems?",
        answer: "In all six Punjab systems, exactly 20 marlas make 1 kanal. However, the square footage of the marla varies by system.",
      },
      {
        question: "What is a sarsahi or square karam?",
        answer: "A sarsahi (or square karam) is the area of a square measuring 1 karam on each side. 9 sarsahi make 1 marla in System A.",
      },
      {
        question: "How do I determine which system applies to my agricultural land?",
        answer: "Refer to the revenue settlement notes in the jamabandi record or consult the local halqa patwari. The settlement year and karam length are explicitly recorded.",
      },
    ],
    citations: [
      {
        title: "Punjab Land Records Manual (3rd Edition, 2004, pp. 183-185)",
        url: "https://jamabandi.punjab.gov.in/",
        source: "Department of Revenue, Rehabilitation and Disaster Management, Government of Punjab",
      },
      {
        title: "Punjab Weight and Measurement Act 1976",
        url: "https://punjab.gov.in/",
        source: "Government of Punjab Legislative Department",
      },
    ],
    statistic: "Across Punjab's six revenue systems, 1 acre ranges from 8 kanal in Mohali to 10.54 kanal in Doaba and 11.95 kanal in Kapurthala.",
    provenance: "Conversion factors sourced from the Punjab Land Records Manual, 3rd edition, 2004. Last verified 26 July 2026.",
    sections: [
      {
        title: "Historical Genesis of Punjab Revenue Measurements",
        content: "Land administration in Punjab rests on settlement surveys conducted in the late 19th and early 20th centuries. The British administration standardized the 66-inch karam (5.5 feet) for consolidated districts, creating a uniform hierarchy: 1 karam = 5.5 ft, 1 sarsahi = 30.25 sq ft, 1 marla = 272.25 sq ft, 1 kanal = 5,445 sq ft, 1 bigha = 21,780 sq ft, 1 killa = 43,560 sq ft. However, erstwhile princely states retained their own measurement chains, resulting in six distinct regional systems that remain active in revenue records today.",
      },
      {
        title: "Detailed Comparative Analysis of Systems A through F",
        content: "System A (Mohali/Urban Punjab) uses 66-inch karam where 1 bigha = 21,780 sq ft. System B (Patiala, Rajpura, Banur, Dera Bassi) uses 57.157-inch karam where 1 katcha bigha = 9,075 sq ft (4.8 bigha/acre). System C (Doaba - Jalandhar, Hoshiarpur) uses 57.5-inch karam where 1 marla = 206.64 sq ft and 1 acre = 10.54 kanal. System D (Majha - Amritsar, Gurdaspur) uses 60-inch karam where 1 marla = 225 sq ft and 1 bigha = 10,000 sq ft. System E (Kapurthala) uses 54-inch karam where 1 marla = 182.25 sq ft and 1 acre = 11.95 kanal. System F (Ludhiana) uses 99-inch gatha where 1 pakka bigha = 27,225 sq ft (1.6 bigha/acre).",
      },
      {
        title: "Practical Guidance for Real Estate Buyers and Investors",
        content: "When transacting land in Punjab, price quotes per bigha or kanal cannot be compared across district lines without applying system conversions. A seller quoting INR 50 Lakh per bigha in Rajpura is asking INR 551 per sq ft (INR 2.4 Cr/acre), whereas INR 50 Lakh per bigha in Mohali is asking INR 229 per sq ft (INR 1.0 Cr/acre). Understanding these nuances protects buyers from major financial miscalculations.",
      },
    ],
    siblingLinks: [
      { slug: "bigha-to-square-feet", anchorText: "Bigha to Square Feet Converter" },
      { slug: "marla-to-square-feet", anchorText: "Marla to Square Feet Converter" },
      { slug: "kanal-to-square-feet", anchorText: "Kanal to Square Feet Converter" },
      { slug: "bigha-to-acre", anchorText: "Bigha to Acre Converter" },
    ],
    entityLinks: [
      { slug: "bigha-in-rajpura", anchorText: "Rajpura Katcha Bigha Analysis" },
      { slug: "karam-standards-of-punjab", anchorText: "Karam Standards by District" },
      { slug: "how-to-read-a-jamabandi-area", anchorText: "Jamabandi Area Reading Guide" },
    ],
  },

  "bigha-in-rajpura": {
    slug: "bigha-in-rajpura",
    title: "1 Bigha in Rajpura = 9,075 Sq Ft - Revenue Guide & Calculations",
    metaDescription: "1 bigha in Rajpura, Banur and Patiala is 9,075 sq ft (katcha bigha), not 21,780 sq ft. Learn why 4.8 bigha equal 1 acre with revenue record proofs.",
    h1: "Bigha in Rajpura & Banur: The 9,075 Sq Ft Katcha Bigha Standard",
    tier: "entity",
    answerBlock: "1 bigha in Rajpura, Banur, Dera Bassi and Patiala equals exactly 9,075 square feet (1,008.33 square yards). In former Patiala princely state revenue records, 4 bigha 16 biswa (4.8 bigha) equal 1 acre. This katcha bigha is less than half the size of a Mohali bigha.",
    keyFacts: [
      { term: "Rajpura Bigha Area", value: "9,075 sq ft (1,008.33 sq yd)" },
      { term: "Bighas per Acre in Rajpura", value: "4.8 bigha = 1 acre" },
      { term: "Rajpura Biswa", value: "453.75 sq ft" },
      { term: "Rajpura Biswansi", value: "22.6875 sq ft" },
      { term: "Karam Length", value: "57.157 inches (4.763 feet)" },
      { term: "Coverage Area", value: "Rajpura, Banur, Shamboo, Dera Bassi, Lalru, Patiala, Nabha" },
    ],
    formula: {
      forward: "acres = Rajpura bighas ÷ 4.8",
      reverse: "Rajpura bighas = acres × 4.8",
      example: "A 42.5 bigha land parcel in Banur equals 42.5 ÷ 4.8 = 8.854 acres (8 acres 6 kanal 16 marla). 75 bigha in Rajpura equals 75 ÷ 4.8 = 15.625 acres.",
    },
    questions: [
      {
        question: "How many square feet is 1 bigha in Rajpura?",
        answer: "1 bigha in Rajpura is 9,075 square feet (1,008.33 square yards), which is the katcha bigha of former Patiala state revenue records.",
      },
      {
        question: "How many bigha make 1 acre in Rajpura and Banur?",
        answer: "Exactly 4.8 bigha (4 bigha 16 biswa) make 1 acre in Rajpura and Banur.",
      },
      {
        question: "Why is a bigha in Rajpura smaller than in Mohali?",
        answer: "Mohali uses standard 66-inch karams (21,780 sq ft bigha). Rajpura was part of Patiala state, which used a 57.157-inch karam yielding a 9,075 sq ft katcha bigha.",
      },
      {
        question: "What is 75 bigha in acres in Rajpura?",
        answer: "75 bigha in Rajpura equals 15.625 acres (not 37.5 acres as generic calculators incorrectly report).",
      },
      {
        question: "How much is a 42.5 bigha plot in Banur in acres?",
        answer: "42.5 bigha in Banur equals 8.854 acres (8 acres 6 kanal 16 marla).",
      },
      {
        question: "How do I check if my land deed uses the Rajpura katcha bigha?",
        answer: "Check the tehsil name. If the land is registered in Rajpura, Banur, Dera Bassi, or Patiala tehsils, the revenue record uses the 9,075 sq ft katcha bigha.",
      },
    ],
    citations: [
      {
        title: "Punjab Land Records Manual (3rd Edition, 2004, System B)",
        url: "https://jamabandi.punjab.gov.in/",
        source: "Department of Revenue, Punjab",
      },
      {
        title: "Patiala State Settlement Manual 1908",
        url: "https://pepsu.gov.in/",
        source: "Erstwhile PEPSU Revenue Records Archive",
      },
    ],
    statistic: "75 bigha in Rajpura equals 15.625 acres, whereas 75 bigha in Mohali equals 37.5 acres—a factual gap that leads to frequent valuation errors.",
    provenance: "Conversion factors sourced from the Punjab Land Records Manual, 3rd edition, 2004. Last verified 26 July 2026.",
    sections: [
      {
        title: "The Rajpura and Banur Katcha Bigha Revenue Standard",
        content: "In the agricultural and industrial land corridor encompassing Rajpura, Banur, Shamboo, Dera Bassi, Lalru, Patiala, Nabha, and Malerkotla, revenue records use the Patiala princely state katcha bigha. Defined as 9,075 square feet (1,008.33 square yards), 4.8 bighas make 1 acre. Generic online converters that apply the 21,780 sq ft standard overestimate land area by more than 140 percent.",
      },
      {
        title: "Mathematical Proof of the 9,075 Sq Ft Bigha",
        content: "Revenue definition: 1 karam = 57.157 inches = 4.763083 feet. 1 sarsai (sq karam) = 22.6875 sq ft. 1 biswansi = 22.6875 sq ft. 20 biswansi = 1 biswa = 453.75 sq ft. 20 biswa = 1 bigha = 9,075 sq ft. Since 1 acre = 43,560 sq ft, 43,560 ÷ 9,075 = 4.8 bighas per acre.",
      },
      {
        title: "Real World Case Studies: Avoiding Costly Land Buying Errors",
        content: "Case 1: A 75 bigha land parcel quoted for industrial setup in Rajpura equals 75 ÷ 4.8 = 15.625 acres. If calculated using Mohali standards (21,780 sq ft), a buyer would expect 37.5 acres—a mistake of 21.875 acres. Case 2: A 42.5 bigha farm parcel in Banur equals 42.5 ÷ 4.8 = 8.854 acres.",
      },
    ],
    siblingLinks: [
      { slug: "bigha-to-square-feet", anchorText: "Bigha to Square Feet Converter" },
      { slug: "bigha-to-acre", anchorText: "Bigha to Acre Converter" },
      { slug: "square-feet-to-bigha", anchorText: "Square Feet to Bigha Converter" },
    ],
    entityLinks: [
      { slug: "punjab-land-measurement-chart", anchorText: "Punjab Master Land Measurement Chart" },
      { slug: "bigha-in-punjab", anchorText: "Bigha Disambiguation Across Punjab" },
    ],
  },

  "bigha-in-punjab": {
    slug: "bigha-in-punjab",
    title: "Bigha in Punjab Disambiguation - 6 Regional Standards Explained",
    metaDescription: "Comprehensive disambiguation of bigha sizes across Punjab. Compare Mohali (21,780 sq ft), Rajpura (9,075 sq ft), Ludhiana (27,225 sq ft) and Majha (10,000 sq ft).",
    h1: "Bigha in Punjab: The Definitive Regional Disambiguation Guide",
    tier: "entity",
    answerBlock: "A bigha in Punjab is not a single uniform unit. In Mohali and standard consolidated areas, 1 bigha is 21,780 sq ft. In Rajpura and Patiala, 1 bigha is 9,075 sq ft. In Ludhiana, 1 pakka bigha is 27,225 sq ft. In Majha, 1 bigha is 10,000 sq ft.",
    keyFacts: [
      { term: "Mohali / Standard Bigha", value: "21,780 sq ft (0.5 acre)" },
      { term: "Rajpura / Patiala Katcha Bigha", value: "9,075 sq ft (0.2083 acre)" },
      { term: "Ludhiana Pakka Bigha", value: "27,225 sq ft (0.625 acre)" },
      { term: "Majha / Amritsar Bigha", value: "10,000 sq ft (0.2296 acre)" },
      { term: "Doaba Bigha", value: "16,531.25 sq ft (0.3795 acre)" },
      { term: "Kapurthala Bigha", value: "7,290 sq ft (0.1673 acre)" },
    ],
    formula: {
      forward: "square feet = bigha × district bigha factor",
      reverse: "bigha = square feet ÷ district bigha factor",
      example: "10 bigha in Ludhiana = 272,250 sq ft; 10 bigha in Mohali = 217,800 sq ft; 10 bigha in Rajpura = 90,750 sq ft.",
    },
    questions: [
      {
        question: "Why are there different bigha sizes in Punjab?",
        answer: "Different historical land settlement systems used different measuring rod (karam/gatha) lengths across British territories and princely states.",
      },
      {
        question: "Which bigha is used in Mohali and Chandigarh?",
        answer: "Mohali and Chandigarh use the 21,780 sq ft standard bigha (System A), where 2 bigha equal 1 acre.",
      },
      {
        question: "Which bigha is used in Rajpura, Banur and Patiala?",
        answer: "Rajpura, Banur and Patiala use the 9,075 sq ft katcha bigha (System B), where 4.8 bigha equal 1 acre.",
      },
      {
        question: "What is a pakka bigha in Ludhiana?",
        answer: "In Ludhiana, a pakka bigha is 27,225 sq ft (3,025 sq yd), where 1.6 bigha equal 1 acre.",
      },
      {
        question: "How do I know which bigha standard applies to my land deal?",
        answer: "Check the tehsil where the property is registered and consult the revenue settlement notes in the jamabandi.",
      },
      {
        question: "How does bigha convert to acres across districts?",
        answer: "Mohali: 2 bigha = 1 acre. Rajpura: 4.8 bigha = 1 acre. Ludhiana: 1.6 bigha = 1 acre. Majha: 4.356 bigha = 1 acre.",
      },
    ],
    citations: [
      {
        title: "Punjab Land Records Manual (3rd Edition, 2004)",
        url: "https://jamabandi.punjab.gov.in/",
        source: "Department of Revenue, Punjab",
      },
    ],
    statistic: "The size of 1 bigha in Punjab varies by up to 200 percent depending on whether the land is in Rajpura (9,075 sq ft), Mohali (21,780 sq ft), or Ludhiana (27,225 sq ft).",
    provenance: "Conversion factors sourced from the Punjab Land Records Manual, 3rd edition, 2004. Last verified 26 July 2026.",
    sections: [
      {
        title: "The Bigha Confusion in Punjab Real Estate",
        content: "The term 'bigha' is widely used across agricultural land markets in Punjab, but its physical area depends entirely on the district revenue jurisdiction. While buyers assuming a single standard face confusion, revenue records strictly adhere to regional settlement definitions.",
      },
      {
        title: "District-by-District Bigha Breakdown",
        content: "1. Mohali & Tricity (21,780 sq ft): Standard 66-inch karam. 2 bigha = 1 acre. 2. Rajpura & Patiala (9,075 sq ft): Patiala katcha bigha. 4.8 bigha = 1 acre. 3. Ludhiana (27,225 sq ft): Pakka bigha. 1.6 bigha = 1 acre. 4. Majha (10,000 sq ft): 60-inch karam. 4.356 bigha = 1 acre. 5. Doaba (16,531.25 sq ft): 57.5-inch karam bigha.",
      },
      {
        title: "Valuation Impact",
        content: "Comparing price per bigha across district borders without adjusting for square footage results in distorted financial projections. Always convert bighas to square feet or acres before completing negotiations.",
      },
    ],
    siblingLinks: [
      { slug: "bigha-to-square-feet", anchorText: "Bigha to Square Feet Converter" },
      { slug: "bigha-to-acre", anchorText: "Bigha to Acre Converter" },
    ],
    entityLinks: [
      { slug: "bigha-in-rajpura", anchorText: "Rajpura Bigha Deep-Dive" },
      { slug: "punjab-land-measurement-chart", anchorText: "Master Revenue Chart" },
    ],
  },

  "marla-in-punjab": {
    slug: "marla-in-punjab",
    title: "Marla in Punjab - Standard 272.25 Sq Ft vs District Variations",
    metaDescription: "Comprehensive guide to marla sizes in Punjab. Standard 272.25 sq ft (Mohali) vs Jalandhar (206.64 sq ft), Amritsar (225 sq ft) and Patiala (226.88 sq ft).",
    h1: "Marla in Punjab: Standard Benchmarks & District Variations",
    tier: "entity",
    answerBlock: "In standard Punjab revenue practice (Mohali, SAS Nagar, Chandigarh), 1 marla is 272.25 square feet (30.25 square yards). However, marla sizes vary by district: 206.64 sq ft in Jalandhar, 225 sq ft in Amritsar, and 226.88 sq ft in Patiala.",
    keyFacts: [
      { term: "Standard Marla (Mohali)", value: "272.25 sq ft (30.25 sq yd)" },
      { term: "Doaba Marla (Jalandhar)", value: "206.64 sq ft (22.96 sq yd)" },
      { term: "Majha Marla (Amritsar)", value: "225 sq ft (25 sq yd)" },
      { term: "Patiala Marla", value: "226.88 sq ft (25.21 sq yd)" },
      { term: "Kapurthala Marla", value: "182.25 sq ft (20.25 sq yd)" },
      { term: "Marlas per Kanal", value: "20 marla = 1 kanal (All districts)" },
    ],
    formula: {
      forward: "square feet = marla × local marla sq ft factor",
      reverse: "marla = square feet ÷ local marla sq ft factor",
      example: "A 10 marla plot in Mohali is 10 × 272.25 = 2,722.5 sq ft. A 10 marla plot in Jalandhar is 10 × 206.64 = 2,066.4 sq ft.",
    },
    questions: [
      {
        question: "How many square feet is 1 marla in Mohali?",
        answer: "1 marla equals 272.25 square feet in Mohali and all GMADA urban sectors.",
      },
      {
        question: "Why is a marla smaller in Jalandhar?",
        answer: "Jalandhar uses the Doaba 57.5-inch karam standard, yielding a marla of 206.64 sq ft.",
      },
      {
        question: "How many marlas make 1 kanal?",
        answer: "Exactly 20 marlas make 1 kanal across all districts in Punjab.",
      },
      {
        question: "What are typical marla plot sizes in Mohali?",
        answer: "Common plot sizes in GMADA sectors: 4 marla (1,089 sq ft), 6 marla (1,633.5 sq ft), 8 marla (2,178 sq ft), 10 marla (2,722.5 sq ft), 1 kanal (5,445 sq ft).",
      },
      {
        question: "How do I convert marla to square yards?",
        answer: "Divide square feet by 9. Standard marla (272.25 sq ft) equals 30.25 square yards (gaj).",
      },
      {
        question: "What is a sarsahi?",
        answer: "A sarsahi is 1/9th of a marla (30.25 sq ft in standard Punjab).",
      },
    ],
    citations: [
      {
        title: "Punjab Land Records Manual (3rd Edition, 2004)",
        url: "https://jamabandi.punjab.gov.in/",
        source: "Department of Revenue, Punjab",
      },
    ],
    statistic: "A 10 marla plot in Mohali (2,722.5 sq ft) is over 31 percent larger than a 10 marla plot in Jalandhar (2,066.4 sq ft).",
    provenance: "Conversion factors sourced from the Punjab Land Records Manual, 3rd edition, 2004. Last verified 26 July 2026.",
    sections: [
      {
        title: "The Marla Unit in Punjab Residential Real Estate",
        content: "The marla is the fundamental benchmark for residential plotting across Punjab. In Mohali, SAS Nagar, and Tricity, 1 marla is defined as 272.25 sq ft (30.25 sq yd). GMADA urban planning and architectural bylaws calculate floor area ratio (FAR) based on 272.25 sq ft per marla.",
      },
      {
        title: "District Variations Explained",
        content: "Standard Punjab (Mohali, Kharar, Zirakpur): 272.25 sq ft. Doaba (Jalandhar, Hoshiarpur): 206.64 sq ft. Majha (Amritsar, Gurdaspur): 225 sq ft. Patiala/Rajpura: 226.88 sq ft. Kapurthala: 182.25 sq ft.",
      },
      {
        title: "Practical Purchasing Guidance",
        content: "Always confirm plot area in square feet or square yards alongside the marla figure when reviewing property deeds.",
      },
    ],
    siblingLinks: [
      { slug: "marla-to-square-feet", anchorText: "Marla to Square Feet Converter" },
      { slug: "marla-to-square-yard", anchorText: "Marla to Square Yard Converter" },
    ],
    entityLinks: [
      { slug: "punjab-land-measurement-chart", anchorText: "Punjab Land Measurement Chart" },
      { slug: "karam-standards-of-punjab", anchorText: "District Karam Standards" },
    ],
  },

  "kanal-in-punjab": {
    slug: "kanal-in-punjab",
    title: "Kanal in Punjab - 5,445 Sq Ft Standard vs District Kanal Sizes",
    metaDescription: "Complete guide to kanal land measurement in Punjab. Standard 5,445 sq ft (Mohali) vs Jalandhar (4,132.81 sq ft) and why Doaba has 10.54 kanal per acre.",
    h1: "Kanal in Punjab: Revenue Standards & District Comparisons",
    tier: "entity",
    answerBlock: "In standard Punjab revenue practice (Mohali, SAS Nagar), 1 kanal equals 5,445 square feet (605 square yards) and contains 20 marla. In Doaba (Jalandhar), 1 kanal is 4,132.81 square feet, resulting in 10.54 kanal per acre instead of the standard 8.",
    keyFacts: [
      { term: "Standard Kanal (Mohali)", value: "5,445 sq ft (605 sq yd)" },
      { term: "Doaba Kanal (Jalandhar)", value: "4,132.81 sq ft (459.20 sq yd)" },
      { term: "Majha Kanal (Amritsar)", value: "4,500 sq ft (500 sq yd)" },
      { term: "Patiala Kanal", value: "4,537.5 sq ft (504.17 sq yd)" },
      { term: "Standard Acre in Kanal", value: "8 kanal = 1 acre" },
      { term: "Doaba Acre in Kanal", value: "10.54 kanal = 1 acre" },
    ],
    formula: {
      forward: "square feet = kanal × local kanal sq ft factor",
      reverse: "kanal = square feet ÷ local kanal sq ft factor",
      example: "2 kanal in Mohali = 2 × 5,445 = 10,890 sq ft. 2 kanal in Jalandhar = 2 × 4,132.81 = 8,265.62 sq ft.",
    },
    questions: [
      {
        question: "How many square feet is 1 kanal in Mohali?",
        answer: "1 kanal is 5,445 square feet in Mohali and standard Punjab.",
      },
      {
        question: "Why does 1 acre have 10.54 kanal in Jalandhar?",
        answer: "In Doaba, 1 kanal is smaller (4,132.81 sq ft). Since 1 acre is 43,560 sq ft, dividing 43,560 by 4,132.81 yields 10.54 kanal.",
      },
      {
        question: "How many marlas in 1 kanal?",
        answer: "20 marlas equal 1 kanal in all Punjab districts.",
      },
      {
        question: "How many kanals in 1 bigha?",
        answer: "4 kanals equal 1 standard bigha in Mohali.",
      },
      {
        question: "What is a 1-kanal kothi size in Mohali?",
        answer: "A 1-kanal kothi plot in Mohali measures 5,445 sq ft (605 sq yd), typically dimensioned as 50 feet by 108.9 feet.",
      },
      {
        question: "How do I convert kanal to acres?",
        answer: "In Mohali, divide kanal by 8. In Doaba, divide kanal by 10.54.",
      },
    ],
    citations: [
      {
        title: "Punjab Land Records Manual (3rd Edition, 2004)",
        url: "https://jamabandi.punjab.gov.in/",
        source: "Department of Revenue, Punjab",
      },
    ],
    statistic: "In Mohali, 8 kanal equal 1 acre, whereas in Jalandhar and Hoshiarpur, 10.54 kanal equal 1 acre.",
    provenance: "Conversion factors sourced from the Punjab Land Records Manual, 3rd edition, 2004. Last verified 26 July 2026.",
    sections: [
      {
        title: "The Kanal Benchmark in Punjab Estate Real Estate",
        content: "The kanal is the traditional measure for luxury residential kothis, farmhouses, and medium agricultural parcels in Punjab. 1 standard kanal equals 5,445 sq ft (605 sq yd).",
      },
      {
        title: "Why Doaba Has 10.54 Kanal per Acre",
        content: "Because Doaba settlement records use a 57.5-inch karam, 1 kanal is 4,132.81 sq ft. Since the acre is fixed at 43,560 sq ft, 43,560 ÷ 4,132.81 = 10.54 kanal.",
      },
      {
        title: "District Comparison Table",
        content: "Standard/Mohali: 5,445 sq ft (8 kanal/acre). Patiala: 4,537.5 sq ft (9.6 kanal/acre). Majha: 4,500 sq ft (9.68 kanal/acre). Doaba: 4,132.81 sq ft (10.54 kanal/acre). Kapurthala: 3,645 sq ft (11.95 kanal/acre).",
      },
    ],
    siblingLinks: [
      { slug: "kanal-to-square-feet", anchorText: "Kanal to Square Feet Converter" },
      { slug: "kanal-to-acre", anchorText: "Kanal to Acre Converter" },
    ],
    entityLinks: [
      { slug: "punjab-land-measurement-chart", anchorText: "Master Land Measurement Chart" },
    ],
  },

  "land-measurement-in-mohali": {
    slug: "land-measurement-in-mohali",
    title: "Land Measurement in Mohali - GMADA, PUDA & Municipal Practice",
    metaDescription: "Guide to land measurement practice in Mohali, SAS Nagar, Kharar, Zirakpur and GMADA sectors. Standard 66-inch karam, sq yd plots and jamabandi rules.",
    h1: "Land Measurement Practice in Mohali & GMADA Sectors",
    tier: "entity",
    answerBlock: "Land measurement in Mohali, SAS Nagar, and GMADA sectors strictly follows System A (Standard 66-inch karam). Residential plots are dimensioned in square yards (gaj) or square feet, while agricultural land around Airport Road and Kharar is recorded in kanal, marla, and 21,780 sq ft bighas.",
    keyFacts: [
      { term: "Standard Karam", value: "66 inches (5.5 feet)" },
      { term: "1 Marla Area", value: "272.25 sq ft (30.25 sq yd)" },
      { term: "1 Kanal Area", value: "5,445 sq ft (605 sq yd)" },
      { term: "1 Bigha Area", value: "21,780 sq ft (2,420 sq yd)" },
      { term: "1 Killa / Acre Area", value: "43,560 sq ft (4,840 sq yd)" },
      { term: "Authority Jurisdiction", value: "GMADA, PUDA, Municipal Corporation SAS Nagar" },
    ],
    formula: {
      forward: "square feet = marla × 272.25",
      reverse: "marla = square feet ÷ 272.25",
      example: "A 250 sq yd plot in Sector 82A IT City Mohali equals 250 × 9 = 2,250 sq ft (8.265 marla).",
    },
    questions: [
      {
        question: "What measurement system is used in Mohali?",
        answer: "Mohali uses System A (Standard 66-inch karam), where 1 marla = 272.25 sq ft and 1 bigha = 21,780 sq ft.",
      },
      {
        question: "How are residential plots measured in GMADA sectors?",
        answer: "GMADA allotment letters specify plot size in square yards (gaj), e.g., 100 sq yd, 150 sq yd, 200 sq yd, 250 sq yd, 300 sq yd, 400 sq yd, 500 sq yd (1 kanal).",
      },
      {
        question: "What is the marla equivalent of a 200 sq yd plot in Mohali?",
        answer: "200 sq yd equals 1,800 sq ft, which divides by 272.25 to equal 6.61 marla.",
      },
      {
        question: "How is agricultural land measured in Mohali district?",
        answer: "Agricultural land in Mohali tehsils (Kharar, Derabassi, Majri) is recorded in jamabandis in Kanal-Marla or Bigha-Biswa.",
      },
      {
        question: "Does Zirakpur and Kharar use the same system as Mohali?",
        answer: "Yes, Kharar and Zirakpur municipal areas follow System A (66-inch karam, 272.25 sq ft marla).",
      },
      {
        question: "How do I verify plot dimensions before buying in Mohali?",
        answer: "Compare physical site dimensions with the approved GMADA demarcation plan and the possession slip.",
      },
    ],
    citations: [
      {
        title: "GMADA Building Bylaws & Allotment Rules 2024",
        url: "https://gmada.gov.in/",
        source: "Greater Mohali Area Development Authority",
      },
    ],
    statistic: "All GMADA sectors (Sectors 66 to 125, IT City, Aerocity, Eco City) operate on a uniform 66-inch karam standard (272.25 sq ft per marla).",
    provenance: "Conversion factors sourced from GMADA allotment guidelines and Punjab Land Records Manual 2004. Last verified 26 July 2026.",
    sections: [
      {
        title: "GMADA Sector Plotting Standards",
        content: "In GMADA planned sectors across Mohali (Aerocity, IT City, Sector 82A, Eco City New Chandigarh), residential plots are allotted in standard square yard denominations: 100 sq yd (900 sq ft / 3.3 marla), 150 sq yd (1,350 sq ft / 4.96 marla), 200 sq yd (1,800 sq ft / 6.61 marla), 250 sq yd (2,250 sq ft / 8.26 marla), 300 sq yd (2,700 sq ft / 9.91 marla), 400 sq yd (3,600 sq ft / 13.22 marla), 500 sq yd (4,500 sq ft / 16.53 marla / 1 kanal equivalent in gaj).",
      },
      {
        title: "Agricultural Land Transactions around Airport Road & Banur",
        content: "Outside municipal sectors, agricultural land acquisition around Airport Road, Tepla, and Banur uses killa (43,560 sq ft) or bigha. Land in Kharar tehsil uses System A bighas (21,780 sq ft), while land south of Banur switches to Patiala System B bighas (9,075 sq ft).",
      },
      {
        title: "Verification Advice for Buyers",
        content: "Verify whether the property is GMADA allotted (sq yd) or rural revenue (kanal-marla / bigha-biswa) to ensure correct registry valuation.",
      },
    ],
    siblingLinks: [
      { slug: "marla-to-square-feet", anchorText: "Marla to Square Feet Converter" },
      { slug: "kanal-to-square-feet", anchorText: "Kanal to Square Feet Converter" },
    ],
    entityLinks: [
      { slug: "punjab-land-measurement-chart", anchorText: "Punjab Master Revenue Chart" },
      { slug: "karam-standards-of-punjab", anchorText: "District Karam Standards" },
    ],
  },

  "karam-standards-of-punjab": {
    slug: "karam-standards-of-punjab",
    title: "Karam Standards of Punjab - 66, 60, 57.5, 57.157 & 54 Inch Standards",
    metaDescription: "Detailed technical guide to karam measurement standards in Punjab by district. 66-inch, 60-inch, 57.5-inch, 57.157-inch and 54-inch karams explained.",
    h1: "Karam Standards of Punjab: District-by-District Technical Analysis",
    tier: "entity",
    answerBlock: "A karam (or karm) is the traditional measuring rod used in Punjab revenue land surveys. The standard karam is 66 inches (5.5 feet). District variations include 60 inches in Majha, 57.5 inches in Doaba, 57.157 inches in Patiala/Rajpura, and 54 inches in Kapurthala.",
    keyFacts: [
      { term: "Standard Karam", value: "66 inches (5.5 feet) | 30.25 sq ft sarsahi" },
      { term: "Patiala / Rajpura Karam", value: "57.157 inches (4.763 feet) | 22.6875 sq ft sarsahi" },
      { term: "Doaba Karam", value: "57.5 inches (4.791 feet) | 22.96 sq ft sarsahi" },
      { term: "Majha Karam", value: "60 inches (5.0 feet) | 25 sq ft sarsahi" },
      { term: "Kapurthala Karam", value: "54 inches (4.5 feet) | 20.25 sq ft sarsahi" },
      { term: "Ludhiana Gatha", value: "99 inches (8.25 feet) | 68.0625 sq ft sq gatha" },
    ],
    formula: {
      forward: "sarsahi sq ft = (karam inches ÷ 12)²",
      reverse: "karam feet = √(sarsahi sq ft)",
      example: "66-inch karam: (66 ÷ 12)² = (5.5)² = 30.25 sq ft per sarsahi. 9 sarsahi = 272.25 sq ft per marla.",
    },
    questions: [
      {
        question: "What is a karam in land measurement?",
        answer: "A karam is a wooden measuring stick or stride unit used by revenue officials (patwaris) to survey land boundaries.",
      },
      {
        question: "How long is a standard karam in feet?",
        answer: "A standard karam is 66 inches or exactly 5.5 feet long.",
      },
      {
        question: "How does karam length determine marla size?",
        answer: "1 sarsahi = 1 square karam. 9 sarsahi = 1 marla. For a 66-inch karam (5.5 ft), 5.5 × 5.5 = 30.25 sq ft per sarsahi, × 9 = 272.25 sq ft per marla.",
      },
      {
        question: "What is a gatha?",
        answer: "A gatha (used in Ludhiana and Jind) is a 99-inch measuring pole (8.25 feet). 1 square gatha = 68.0625 sq ft (1 biswansi).",
      },
      {
        question: "Why were different karam lengths introduced historically?",
        answer: "Different ruler dynasties (Patiala, Kapurthala, Jind, British Raj) instituted distinct survey rods during 19th-century land settlements.",
      },
      {
        question: "Can a karam length be changed today?",
        answer: "No, revenue survey units are fixed by law under the Punjab Land Records Manual 2004.",
      },
    ],
    citations: [
      {
        title: "Punjab Land Records Manual (3rd Edition, 2004, Chapter 7)",
        url: "https://jamabandi.punjab.gov.in/",
        source: "Department of Revenue, Punjab",
      },
    ],
    statistic: "Because area scales quadratically with karam length, a 66-inch karam yields a marla (272.25 sq ft) that is 49 percent larger than a 54-inch karam marla (182.25 sq ft).",
    provenance: "Conversion factors sourced from the Punjab Land Records Manual, 3rd edition, 2004. Last verified 26 July 2026.",
    sections: [
      {
        title: "The Physics and Geometry of the Karam Measurement System",
        content: "All land area calculations in Punjab derive from the linear karam. Because area equals length squared, small changes in linear karam length produce large differences in square footage. 1 sarsahi = (karam in feet)². 1 marla = 9 sarsahi. 1 kanal = 20 marla.",
      },
      {
        title: "Mathematical Derivation of All Five Karam Standards",
        content: "1. 66-inch (5.5 ft): 5.5² = 30.25 sq ft sarsahi → 272.25 sq ft marla. 2. 60-inch (5.0 ft): 5.0² = 25.0 sq ft sarsahi → 225.0 sq ft marla. 3. 57.5-inch (4.79167 ft): 4.79167² = 22.96 sq ft sarsahi → 206.64 sq ft marla. 4. 57.157-inch (4.76308 ft): 4.76308² = 22.6875 sq ft sarsahi → 226.875 sq ft marla. 5. 54-inch (4.5 ft): 4.5² = 20.25 sq ft sarsahi → 182.25 sq ft marla.",
      },
      {
        title: "Revenue Audit Significance",
        content: "When auditing old jamabandi deeds, checking the recorded karam standard guarantees that physical boundaries match legal title.",
      },
    ],
    siblingLinks: [
      { slug: "marla-to-square-feet", anchorText: "Marla to Square Feet Converter" },
      { slug: "sarsahi-to-square-feet", anchorText: "Sarsahi to Square Feet Converter" },
    ],
    entityLinks: [
      { slug: "punjab-land-measurement-chart", anchorText: "Master Measurement Chart" },
      { slug: "how-to-read-a-jamabandi-area", anchorText: "How to Read Jamabandi Records" },
    ],
  },

  "how-to-read-a-jamabandi-area": {
    slug: "how-to-read-a-jamabandi-area",
    title: "How to Read Area in a Jamabandi Record - Worked Examples & Notation",
    metaDescription: "Learn how to read land area in Punjab jamabandi revenue records. Decode Kanal-Marla-Sarsahi and Bigha-Biswa-Biswansi notation with real worked examples.",
    h1: "How to Read Land Area in a Punjab Jamabandi Record",
    tier: "entity",
    answerBlock: "Land area in a Punjab jamabandi is recorded in Column 5 under 'Rakba' using triple notation: Kanal-Marla-Sarsahi (e.g. 2-4-0.69) or Bigha-Biswa-Biswansi (e.g. 4-10-0). To calculate total square footage, convert each component using the local tehsil factors.",
    keyFacts: [
      { term: "Jamabandi Column for Area", value: "Column 5 (Rakba)" },
      { term: "Urban Format", value: "Kanal - Marla - Sarsahi" },
      { term: "Revenue Record Format", value: "Bigha - Biswa - Biswansi" },
      { term: "Killa / Acre Rect Notation", value: "Mustatils and Khasra Numbers (e.g. Mustatil 14, Khasra 8)" },
      { term: "Standard Karam Check", value: "Specified in settlement header" },
      { term: "Official Portal", value: "jamabandi.punjab.gov.in" },
    ],
    formula: {
      forward: "total sq ft = (kanal × kanal factor) + (marla × marla factor) + (sarsahi × sarsahi factor)",
      reverse: "Format as X kanal Y marla Z sarsahi",
      example: "Jamabandi entry '2-4-0.69' in Mohali = (2 × 5,445) + (4 × 272.25) + (0.69 × 30.25) = 10,890 + 1,089 + 20.87 = 12,000 sq ft.",
    },
    questions: [
      {
        question: "Which column in a jamabandi shows land area?",
        answer: "Column 5 of a Punjab jamabandi shows the total area (Rakba) and ownership share.",
      },
      {
        question: "What does '2-4-0' mean in a jamabandi entry?",
        answer: "It denotes 2 kanal, 4 marla, and 0 sarsahi (11,979 sq ft in standard Punjab).",
      },
      {
        question: "What does '4-12-0' mean in a Bigha-Biswa jamabandi?",
        answer: "It denotes 4 bigha, 12 biswa, and 0 biswansi.",
      },
      {
        question: "How do I calculate my exact share from a joint jamabandi khata?",
        answer: "Multiply the total parcel area by your fractional share (e.g., 1/4th share of 8 kanal = 2 kanal).",
      },
      {
        question: "Where can I view my jamabandi online in Punjab?",
        answer: "Access the official portal at jamabandi.punjab.gov.in using your district, tehsil, village, and khewat number.",
      },
      {
        question: "What is a Mustatil and Khasra number?",
        answer: "A Mustatil is a large rectangular grid block (usually 25 acres), and a Khasra number is an individual 1-acre/killa plot within that block.",
      },
    ],
    citations: [
      {
        title: "Punjab Land Records Online Portal",
        url: "https://jamabandi.punjab.gov.in/",
        source: "Department of Revenue, Punjab",
      },
      {
        title: "Punjab Land Records Manual (3rd Edition, 2004)",
        url: "https://jamabandi.punjab.gov.in/",
        source: "Department of Revenue, Punjab",
      },
    ],
    statistic: "In Punjab jamabandi records, Mustatil grid blocks contain up to 25 khasra numbers (1 killa each), forming a total grid of 1 murabba (1,089,000 sq ft).",
    provenance: "Conversion factors sourced from the Punjab Land Records Manual, 3rd edition, 2004. Last verified 26 July 2026.",
    sections: [
      {
        title: "Understanding the Structure of a Jamabandi Record",
        content: "A jamabandi is the official record of rights (RoR) maintained by the revenue department. It contains 12 columns detailing Khewat number, Khatoni number, Owner name (Malik), Cultivator (Kashtkar), Land Area (Rakba - Column 5), Soil classification, and Irrigation details.",
      },
      {
        title: "Decoding Area Notation: Step-by-Step Worked Examples",
        content: "Example 1 (Mohali Standard): Recorded area '3-10-4' = 3 kanal (16,335 sq ft) + 10 marla (2,722.5 sq ft) + 4 sarsahi (121 sq ft) = 19,178.5 sq ft. Example 2 (Rajpura Bigha): Recorded area '5-10-0' = 5 bigha (45,375 sq ft) + 10 biswa (4,537.5 sq ft) = 49,912.5 sq ft (1.145 acres).",
      },
      {
        title: "Verifying Fractional Ownership Shares",
        content: "When buying undivided agricultural land, the deed states a fraction (e.g. 15/160 share in Khewat 42). Multiply total area by the fraction to compute exact purchased square footage.",
      },
    ],
    siblingLinks: [
      { slug: "marla-to-square-feet", anchorText: "Marla to Square Feet Converter" },
      { slug: "kanal-to-square-feet", anchorText: "Kanal to Square Feet Converter" },
      { slug: "bigha-to-square-feet", anchorText: "Bigha to Square Feet Converter" },
    ],
    entityLinks: [
      { slug: "punjab-land-measurement-chart", anchorText: "Punjab Land Measurement Master Chart" },
      { slug: "bigha-in-rajpura", anchorText: "Rajpura Katcha Bigha Guide" },
    ],
  },
};
