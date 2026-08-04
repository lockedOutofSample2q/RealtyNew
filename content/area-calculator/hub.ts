// content/area-calculator/hub.ts
import { AreaPageContent } from "./types";

export const hubContent: AreaPageContent = {
  slug: "",
  title: "Punjab Land Area Calculator & Measurement Chart | RHMC",
  metaDescription: "Free land area calculator for Punjab & Tricity. Convert marla, kanal, bigha, gaj, killa, and acre across all six regional revenue standards.",
  h1: "Punjab Land Area Calculator & Measurement Converter",
  tier: "hub",
  answerBlock: "Standard land measurement in Punjab uses 1 marla equal to 272.25 square feet, 1 kanal equal to 5,445 square feet, 1 bigha equal to 21,780 square feet, and 1 killa or acre equal to 43,560 square feet.",
  keyFacts: [
    { term: "Standard Karam (Mohali / Urban)", value: "66 inches (5.5 feet)" },
    { term: "Patiala / Rajpura Karam", value: "57.157 inches (4.763 feet)" },
    { term: "Doaba Karam", value: "57.5 inches (4.791 feet)" },
    { term: "Majha Karam", value: "60 inches (5.0 feet)" },
    { term: "Kapurthala Karam", value: "54 inches (4.5 feet)" },
    { term: "Ludhiana Gatha", value: "99 inches (8.25 feet)" },
    { term: "Standard Marla", value: "272.25 sq ft (30.25 sq yd)" },
    { term: "Rajpura Katcha Bigha", value: "9,075 sq ft (0.2083 acre)" },
  ],
  formula: {
    forward: "square feet = marla × 272.25",
    reverse: "marla = square feet ÷ 272.25",
    example: "A 10 marla plot in Sector 82A Mohali equals 10 × 272.25 = 2,722.5 square feet.",
  },
  questions: [
    {
      question: "Why do bigha sizes differ between Mohali and Rajpura?",
      answer: "In Mohali and consolidated urban areas, standard revenue records use a 66-inch karam where 1 bigha equals 21,780 sq ft. In Rajpura and Banur, erstwhile Patiala state records use a 57.157-inch karam where 1 katcha bigha equals 9,075 sq ft.",
    },
    {
      question: "How many marla make 1 kanal in Punjab?",
      answer: "Exactly 20 marla make 1 kanal across all six Punjab revenue measurement systems, although the square foot area of the marla varies by district.",
    },
    {
      question: "How many kanal are in 1 acre in Mohali versus Jalandhar?",
      answer: "In Mohali and standard consolidated areas, 1 acre contains 8 kanal (5,445 sq ft each). In Doaba districts like Jalandhar, 1 acre contains 10.54 kanal (4,132.81 sq ft each).",
    },
    {
      question: "What is a killa in Punjab revenue records?",
      answer: "A killa is a rectangular agricultural parcel of land measuring 36 karam by 40 karam (198 feet by 220 feet), which equals exactly 43,560 square feet or 1 acre.",
    },
    {
      question: "How do I check my plot size against a jamabandi record?",
      answer: "Jamabandi records express land area in Kanal-Marla or Bigha-Biswa notation. Multiply the kanal count by the local kanal area and add the marla portion to calculate total square footage.",
    },
    {
      question: "Is a gaj the same as a square yard?",
      answer: "Yes, 1 gaj (or gajj) is identical to 1 square yard, which equals exactly 9 square feet or 0.836127 square metres.",
    },
  ],
  citations: [
    {
      title: "Punjab Land Records Manual (3rd Edition, 2004)",
      url: "https://jamabandi.punjab.gov.in/",
      source: "Department of Revenue, Rehabilitation and Disaster Management, Government of Punjab",
    },
    {
      title: "Punjab Weight and Measurement Act 1976",
      url: "https://punjab.gov.in/",
      source: "Government of Punjab Legislative Department",
    },
  ],
  statistic: "A standard killa in Punjab agricultural revenue records measures 36 karam by 40 karam, which equals 198 feet by 220 feet or exactly 43,560 square feet.",
  provenance: "Conversion factors sourced from the Punjab Land Records Manual, 3rd edition, 2004. Last verified 26 July 2026.",
  sections: [
    {
      title: "Understanding Land Area Measurement Practice Across Punjab",
      content: "Land measurement across Punjab is governed by historical revenue traditions established during settlement surveys. While urban GMADA plots and licensed housing colonies in Mohali, SAS Nagar, and Chandigarh operate on standard metric and square foot benchmarks, rural agricultural deeds and jamabandi records rely on regional karam units. The standard karam of 66 inches (5.5 feet) yields a marla of 272.25 sq ft and a kanal of 5,445 sq ft. However, buyers transacting in Rajpura, Patiala, Jalandhar, or Amritsar must account for district-specific settlement systems.",
    },
    {
      title: "The Six Revenue Measurement Systems of Punjab",
      content: "Punjab revenue jurisdiction is divided into six primary systems: System A (Standard Punjab 66-inch karam), System B (Patiala/Rajpura 57.157-inch karam katcha bigha), System C (Doaba 57.5-inch karam), System D (Majha 60-inch karam), System E (Kapurthala 54-inch karam), and System F (Ludhiana 99-inch gatha pakka bigha). Failing to identify the applicable system can lead to errors exceeding 50 percent when calculating land value or registry duty.",
    },
    {
      title: "Comparing Urban Plot Sizes and Revenue Records",
      content: "In GMADA urban sectors (such as Sector 82A, Sector 66, and IT City Mohali), residential plots are dimensioned in square yards (gaj) or square feet. A 250 sq yd plot equals 2,250 sq ft or approximately 8.26 marla. In agricultural acquisitions around Airport Road, Banur, and Tepla, land is sold by the bigha or killa. Utilizing this tool allows investors to verify exact land dimensions before entering agreements.",
    },
  ],
  siblingLinks: [
    { slug: "marla-to-square-feet", anchorText: "Marla to Square Feet Converter" },
    { slug: "kanal-to-square-feet", anchorText: "Kanal to Square Feet Converter" },
    { slug: "bigha-to-square-feet", anchorText: "Bigha to Square Feet Converter" },
    { slug: "acre-to-square-feet", anchorText: "Acre to Square Feet Converter" },
    { slug: "bigha-to-acre", anchorText: "Bigha to Acre Converter" },
    { slug: "kanal-to-acre", anchorText: "Kanal to Acre Converter" },
  ],
  entityLinks: [
    { slug: "punjab-land-measurement-chart", anchorText: "Punjab Land Measurement Master Chart" },
    { slug: "bigha-in-rajpura", anchorText: "Rajpura Katcha Bigha Guide" },
    { slug: "bigha-in-punjab", anchorText: "Bigha Disambiguation in Punjab" },
    { slug: "land-measurement-in-mohali", anchorText: "Mohali & GMADA Land Measurement Practice" },
  ],
};
