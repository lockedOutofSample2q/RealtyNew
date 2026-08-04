// lib/area-units.ts
// Single source of truth for all land area conversion constants in Punjab & India.
// Every conversion factor in the application derives from this file.

export const SQFT_TO_SQM = 0.09290304; // 1 ft = 0.3048 m exactly
export const SQM_TO_SQFT = 10.763910416709722;

export type SystemId = "mohali" | "patiala" | "doaba" | "majha" | "kapurthala" | "ludhiana";

export interface RegionSystem {
  id: SystemId;
  name: string;
  shortName: string;
  description: string;
  karamInches: number;
  note: string;
}

export const REGIONS: Record<SystemId, RegionSystem> = {
  mohali: {
    id: "mohali",
    name: "Mohali / Tricity and all urban Punjab (System A)",
    shortName: "Mohali / Standard Punjab",
    description: "Standard 66-inch karam system used in all consolidated areas of Punjab and Haryana, including SAS Nagar, Chandigarh, Panchkula, Zirakpur, Kharar, Kurali, New Chandigarh, and Mullanpur.",
    karamInches: 66,
    note: "",
  },
  patiala: {
    id: "patiala",
    name: "Rajpura, Banur, Dera Bassi, Lalru, Patiala, Nabha, Malerkotla, Fazilka (System B)",
    shortName: "Rajpura / Patiala Katcha Bigha",
    description: "57.157-inch karam system used in the erstwhile princely states of Patiala, Nabha, Malerkotla, Fazilka, and Ropar (excl. Anandpur Sahib).",
    karamInches: 57.157,
    note: "In Rajpura, Banur, and Dera Bassi, 1 bigha is 9,075 sq ft (0.208 acre). This is the katcha bigha used in erstwhile Patiala state revenue records. It is less than half the size of a Mohali bigha.",
  },
  doaba: {
    id: "doaba",
    name: "Jalandhar, Hoshiarpur, Nawanshahr, Anandpur Sahib (System C)",
    shortName: "Doaba Region",
    description: "57.5-inch karam system used in Hoshiarpur, Jalandhar, Anandpur Sahib, Banga, and SBS Nagar.",
    karamInches: 57.5,
    note: "In Doaba revenue practice (Jalandhar, Hoshiarpur), 1 marla is 206.64 sq ft and 1 acre is 10.54 kanal, compared to 8 kanal per acre in Mohali.",
  },
  majha: {
    id: "majha",
    name: "Amritsar, Gurdaspur, Ferozepur, Faridkot (System D)",
    shortName: "Majha Region",
    description: "60-inch karam system used in Amritsar, Gurdaspur, Ferozepur, and Faridkot.",
    karamInches: 60,
    note: "In Majha (Amritsar, Gurdaspur), 1 marla is 225 sq ft and 1 kanal is 4,500 sq ft. An acre equals 9.68 kanal.",
  },
  kapurthala: {
    id: "kapurthala",
    name: "Kapurthala (System E)",
    shortName: "Kapurthala State",
    description: "54-inch karam system used in the erstwhile princely state of Kapurthala.",
    karamInches: 54,
    note: "In Kapurthala revenue records, 1 marla is 182.25 sq ft and 1 kanal is 3,645 sq ft. An acre equals 11 kanal 19 marla.",
  },
  ludhiana: {
    id: "ludhiana",
    name: "Ludhiana (System F)",
    shortName: "Ludhiana Pakka Bigha",
    description: "99-inch gatha system used in Ludhiana district and erstwhile Jind state.",
    karamInches: 99,
    note: "In Ludhiana district, 1 pakka bigha is 27,225 sq ft (3,025 sq yd). 1 acre equals 1.6 pakka bigha.",
  },
};

export type UnitGroup = "punjab" | "universal" | "regional";

export interface UnitDefinition {
  id: string;
  name: string;
  plural: string;
  group: UnitGroup;
  regionDependent?: boolean;
  baseSqft: Record<SystemId, number>; // sqft per unit for each region
  aliases: string[];
  note?: string;
}

// Map base sqft for region-independent units across all systems
function constantSqftMap(sqft: number): Record<SystemId, number> {
  return {
    mohali: sqft,
    patiala: sqft,
    doaba: sqft,
    majha: sqft,
    kapurthala: sqft,
    ludhiana: sqft,
  };
}

export const UNITS: UnitDefinition[] = [
  // --- Punjab System Units (Region Dependent) ---
  {
    id: "sarsahi",
    name: "Sarsahi",
    plural: "Sarsahi",
    group: "punjab",
    regionDependent: true,
    baseSqft: {
      mohali: 30.25,
      patiala: 30.25, // 5.5ft x 5.5ft standard or 22.6875/0.75
      doaba: 3306.25 / 144, // 22.960069444444445
      majha: 25,
      kapurthala: 20.25,
      ludhiana: 68.0625,
    },
    aliases: ["sarsahi", "sarsai", "sarsaai", "sarsahee", "square karam", "sq karam", "ਸਰਸਾਹੀ"],
    note: "1 sarsahi = 1 sq karam",
  },
  {
    id: "biswansi",
    name: "Biswansi",
    plural: "Biswansi",
    group: "punjab",
    regionDependent: true,
    baseSqft: {
      mohali: 54.45,
      patiala: 22.6875,
      doaba: 22.960069444444445,
      majha: 25,
      kapurthala: 18.225,
      ludhiana: 68.0625,
    },
    aliases: ["biswansi", "biswanshi", "biswansee"],
    note: "1/20 biswa",
  },
  {
    id: "marla",
    name: "Marla",
    plural: "Marla",
    group: "punjab",
    regionDependent: true,
    baseSqft: {
      mohali: 272.25,
      patiala: 226.875,
      doaba: 206.640625,
      majha: 225,
      kapurthala: 182.25,
      ludhiana: 272.25,
    },
    aliases: ["marla", "marlah", "मरला", "ਮਰਲਾ"],
    note: "9 sarsahi in standard Punjab",
  },
  {
    id: "biswa",
    name: "Biswa",
    plural: "Biswa",
    group: "punjab",
    regionDependent: true,
    baseSqft: {
      mohali: 1089,
      patiala: 453.75,
      doaba: 826.5625,
      majha: 500,
      kapurthala: 364.5,
      ludhiana: 1361.25,
    },
    aliases: ["biswa", "bissa", "viswa", "बिस्वा", "ਬਿਸਵਾ"],
    note: "4 marla in standard Punjab",
  },
  {
    id: "kanal",
    name: "Kanal",
    plural: "Kanal",
    group: "punjab",
    regionDependent: true,
    baseSqft: {
      mohali: 5445,
      patiala: 4537.5,
      doaba: 4132.8125,
      majha: 4500,
      kapurthala: 3645,
      ludhiana: 5445,
    },
    aliases: ["kanal", "kanaal", "kanál", "canal", "कनाल", "ਕਨਾਲ"],
    note: "20 marla in standard Punjab",
  },
  {
    id: "bigha",
    name: "Bigha",
    plural: "Bigha",
    group: "punjab",
    regionDependent: true,
    baseSqft: {
      mohali: 21780,
      patiala: 9075,
      doaba: 16531.25,
      majha: 10000,
      kapurthala: 7290,
      ludhiana: 27225,
    },
    aliases: ["bigha", "biggha", "bigah", "vigha", "vigah", "विघा", "बीघा", "ਵਿੱਘਾ", "ਬਿੱਘਾ"],
    note: "4 kanal in standard Punjab, 9075 sqft katcha in Rajpura",
  },
  {
    id: "killa",
    name: "Killa / Acre (Punjab)",
    plural: "Killa",
    group: "punjab",
    regionDependent: false,
    baseSqft: constantSqftMap(43560),
    aliases: ["killa", "kila", "keela", "ghumaon", "ghumao", "gumaon"],
    note: "8 kanal = 43,560 sq ft (198 ft x 220 ft)",
  },
  {
    id: "murabba",
    name: "Murabba (Square)",
    plural: "Murabba",
    group: "punjab",
    regionDependent: false,
    baseSqft: constantSqftMap(1089000),
    aliases: ["murabba", "marabba", "murabbah", "square"],
    note: "25 killa / acres",
  },

  // --- Universal Units ---
  {
    id: "sqft",
    name: "Square Foot",
    plural: "Square Feet",
    group: "universal",
    baseSqft: constantSqftMap(1),
    aliases: ["sqft", "sq ft", "sft", "square feet", "square foot", "feet", "ft2"],
  },
  {
    id: "sqyd",
    name: "Square Yard (Gaj)",
    plural: "Square Yards",
    group: "universal",
    baseSqft: constantSqftMap(9),
    aliases: ["square yard", "gaj", "gajj", "gaz", "guz", "sq yard", "sq yd", "yard", "गज", "ਗਜ਼"],
  },
  {
    id: "sqm",
    name: "Square Metre",
    plural: "Square Metres",
    group: "universal",
    baseSqft: constantSqftMap(10.763910416709722),
    aliases: ["sqm", "sq m", "sq mtr", "square meter", "square metre", "m2"],
  },
  {
    id: "are",
    name: "Are",
    plural: "Are",
    group: "universal",
    baseSqft: constantSqftMap(1076.3910416709723),
    aliases: ["are"],
    note: "100 sq m",
  },
  {
    id: "acre",
    name: "Acre",
    plural: "Acres",
    group: "universal",
    baseSqft: constantSqftMap(43560),
    aliases: ["acre", "acres", "एकड़", "ਏਕੜ"],
  },
  {
    id: "hectare",
    name: "Hectare",
    plural: "Hectares",
    group: "universal",
    baseSqft: constantSqftMap(107639.10416709722),
    aliases: ["hectare", "hectares", "ha", "हेक्टेयर"],
    note: "10,000 sq m",
  },

  // --- Secondary Regional State Units ---
  {
    id: "guntha",
    name: "Guntha",
    plural: "Guntha",
    group: "regional",
    baseSqft: constantSqftMap(1089),
    aliases: ["guntha", "gunta"],
    note: "Maharashtra, Gujarat, Karnataka, AP, Telangana, Odisha (1/40 acre)",
  },
  {
    id: "cent",
    name: "Cent",
    plural: "Cents",
    group: "regional",
    baseSqft: constantSqftMap(435.6),
    aliases: ["cent", "cents"],
    note: "Tamil Nadu, Kerala, Karnataka (1/100 acre)",
  },
  {
    id: "dismil",
    name: "Dismil / Decimal",
    plural: "Dismil",
    group: "regional",
    baseSqft: constantSqftMap(435.6),
    aliases: ["dismil", "decimal", "dissmil"],
    note: "Bihar, Jharkhand, UP, WB (1/100 acre)",
  },
  {
    id: "ground",
    name: "Ground",
    plural: "Grounds",
    group: "regional",
    baseSqft: constantSqftMap(2400),
    aliases: ["ground"],
    note: "Tamil Nadu (2,400 sq ft)",
  },
  {
    id: "ankanam",
    name: "Ankanam",
    plural: "Ankanam",
    group: "regional",
    baseSqft: constantSqftMap(72),
    aliases: ["ankanam"],
    note: "Andhra Pradesh, Karnataka",
  },
  {
    id: "kuncham",
    name: "Kuncham",
    plural: "Kuncham",
    group: "regional",
    baseSqft: constantSqftMap(4356),
    aliases: ["kuncham"],
    note: "Andhra Pradesh (484 sq yd)",
  },
  {
    id: "katha_wb",
    name: "Katha (West Bengal)",
    plural: "Katha",
    group: "regional",
    baseSqft: constantSqftMap(720),
    aliases: ["katha wb", "katha west bengal"],
    note: "1/20 WB bigha",
  },
  {
    id: "chatak",
    name: "Chatak",
    plural: "Chatak",
    group: "regional",
    baseSqft: constantSqftMap(45),
    aliases: ["chatak"],
    note: "West Bengal (1/16 katha)",
  },
  {
    id: "katha_bihar",
    name: "Katha (Bihar)",
    plural: "Katha",
    group: "regional",
    baseSqft: constantSqftMap(1361.25),
    aliases: ["katha bihar"],
    note: "1/20 Bihar bigha",
  },
  {
    id: "katha_assam",
    name: "Katha (Assam)",
    plural: "Katha",
    group: "regional",
    baseSqft: constantSqftMap(2880),
    aliases: ["katha assam"],
    note: "1/5 Assam bigha",
  },
  {
    id: "lecha",
    name: "Lecha / Lessa",
    plural: "Lecha",
    group: "regional",
    baseSqft: constantSqftMap(144),
    aliases: ["lecha", "lessa"],
    note: "Assam (1/20 katha)",
  },
  {
    id: "nali",
    name: "Nali",
    plural: "Nali",
    group: "regional",
    baseSqft: constantSqftMap(2160),
    aliases: ["nali"],
    note: "Uttarakhand (240 sq yd)",
  },
  {
    id: "bigha_hp",
    name: "Bigha (Himachal Pradesh)",
    plural: "Bigha",
    group: "regional",
    baseSqft: constantSqftMap(8712),
    aliases: ["bigha hp", "bigha himachal"],
    note: "1/5 acre",
  },
  {
    id: "bigha_rj_pucca",
    name: "Bigha (Rajasthan Pucca)",
    plural: "Bigha",
    group: "regional",
    baseSqft: constantSqftMap(27225),
    aliases: ["bigha rajasthan pucca"],
  },
  {
    id: "bigha_rj_kachha",
    name: "Bigha (Rajasthan Kachha)",
    plural: "Bigha",
    group: "regional",
    baseSqft: constantSqftMap(17424),
    aliases: ["bigha rajasthan kachha"],
    note: "2/5 acre",
  },
  {
    id: "bigha_up",
    name: "Bigha (Uttar Pradesh)",
    plural: "Bigha",
    group: "regional",
    baseSqft: constantSqftMap(27000),
    aliases: ["bigha up", "bigha uttar pradesh"],
  },
  {
    id: "bigha_bihar",
    name: "Bigha (Bihar)",
    plural: "Bigha",
    group: "regional",
    baseSqft: constantSqftMap(27220),
    aliases: ["bigha bihar"],
  },
  {
    id: "bigha_mp",
    name: "Bigha (Madhya Pradesh)",
    plural: "Bigha",
    group: "regional",
    baseSqft: constantSqftMap(12000),
    aliases: ["bigha mp", "bigha madhya pradesh"],
  },
  {
    id: "bigha_gujarat",
    name: "Bigha (Gujarat)",
    plural: "Bigha",
    group: "regional",
    baseSqft: constantSqftMap(17427),
    aliases: ["bigha gujarat"],
  },
  {
    id: "bigha_wb",
    name: "Bigha (West Bengal)",
    plural: "Bigha",
    group: "regional",
    baseSqft: constantSqftMap(14400),
    aliases: ["bigha wb", "bigha west bengal"],
  },
  {
    id: "bigha_assam",
    name: "Bigha (Assam)",
    plural: "Bigha",
    group: "regional",
    baseSqft: constantSqftMap(14400),
    aliases: ["bigha assam"],
  },
  {
    id: "bigha_uk",
    name: "Bigha (Uttarakhand)",
    plural: "Bigha",
    group: "regional",
    baseSqft: constantSqftMap(6804),
    aliases: ["bigha uk", "bigha uttarakhand"],
  },
];

const UNIT_MAP = new Map<string, UnitDefinition>(UNITS.map((u) => [u.id, u]));

export function getUnit(id: string): UnitDefinition | undefined {
  if (!id) return undefined;
  const cleanId = id.toLowerCase().trim();
  if (UNIT_MAP.has(cleanId)) return UNIT_MAP.get(cleanId);
  
  // Search aliases if direct ID lookup fails
  return UNITS.find((u) => u.aliases.some((a) => a.toLowerCase() === cleanId));
}

// Convert value from one unit to another under a specific region system
export function convertArea(
  value: number,
  fromUnitId: string,
  toUnitId: string,
  systemId: SystemId = "mohali"
): number {
  if (isNaN(value) || !isFinite(value) || value < 0) return 0;

  const fromUnit = getUnit(fromUnitId);
  const toUnit = getUnit(toUnitId);

  if (!fromUnit || !toUnit) return 0;

  const fromSqft = fromUnit.baseSqft[systemId] ?? fromUnit.baseSqft.mohali;
  const toSqft = toUnit.baseSqft[systemId] ?? toUnit.baseSqft.mohali;

  const totalSqft = value * fromSqft;
  return totalSqft / toSqft;
}

// Search units by query (name, alias)
export function searchUnits(query: string): UnitDefinition[] {
  const q = query.trim().toLowerCase();
  if (!q) return UNITS;

  return UNITS.filter((unit) => {
    if (unit.name.toLowerCase().includes(q) || unit.plural.toLowerCase().includes(q)) {
      return true;
    }
    return unit.aliases.some((alias) => alias.toLowerCase().includes(q));
  });
}

// Format number with display rules:
// - empty/zero guard
// - if |val| >= 1000: 0 dp with Indian digit grouping (1,08,900)
// - if >= 1: 2 dp
// - if < 1: 4 significant figures
export function formatValue(val: number): string {
  if (val === 0 || isNaN(val) || !isFinite(val)) return "0";

  const absVal = Math.abs(val);

  if (absVal >= 1000) {
    const rounded = Math.round(val);
    return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(rounded);
  }

  if (absVal >= 1) {
    return new Intl.NumberFormat("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(val);
  }

  // < 1: 4 significant figures
  return Number(val.toPrecision(4)).toString();
}

// Indian currency Lakh/Crore word formatting
export function formatCurrencyINR(amount: number): { formatted: string; wordForm: string } {
  if (isNaN(amount) || amount <= 0 || !isFinite(amount)) {
    return { formatted: "INR 0", wordForm: "0" };
  }

  const formatted = `INR ${new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(amount)}`;

  let wordForm = "";
  if (amount >= 10000000) {
    const cr = amount / 10000000;
    wordForm = `${cr.toFixed(2)} Cr`;
  } else if (amount >= 100000) {
    const lakh = amount / 100000;
    wordForm = `${lakh.toFixed(2)} Lakh`;
  } else if (amount >= 1000) {
    const th = amount / 1000;
    wordForm = `${th.toFixed(1)} Thousand`;
  } else {
    wordForm = amount.toString();
  }

  return { formatted, wordForm };
}

// --- Composite Breakdown Helpers ---

export interface UrbanBreakdown {
  kanal: number;
  marla: number;
  sarsahi: number;
  formatted: string;
}

export interface AgriBreakdown {
  killa: number;
  kanal: number;
  marla: number;
  sarsahi: number;
  formatted: string;
}

export interface RevenueBreakdown {
  bigha: number;
  biswa: number;
  biswansi: number;
  formatted: string;
}

// Urban Form: X kanal Y marla Z sarsahi (System A)
export function getUrbanBreakdown(sqft: number, systemId: SystemId = "mohali"): UrbanBreakdown {
  const marlaSqft = UNITS.find((u) => u.id === "marla")?.baseSqft[systemId] ?? 272.25;
  const kanalSqft = UNITS.find((u) => u.id === "kanal")?.baseSqft[systemId] ?? 5445;
  const sarsahiSqft = UNITS.find((u) => u.id === "sarsahi")?.baseSqft[systemId] ?? 30.25;

  const kanal = Math.floor(sqft / kanalSqft);
  let remSqft = sqft - kanal * kanalSqft;

  const marla = Math.floor(remSqft / marlaSqft);
  remSqft -= marla * marlaSqft;

  const sarsahi = remSqft / sarsahiSqft;
  const roundedSarsahi = Math.round(sarsahi * 100) / 100;

  const parts: string[] = [];
  if (kanal > 0) parts.push(`${kanal} kanal`);
  parts.push(`${marla} marla`);
  parts.push(`${roundedSarsahi} sarsahi`);

  return {
    kanal,
    marla,
    sarsahi: roundedSarsahi,
    formatted: parts.join(" "),
  };
}

// Agricultural Form: X killa Y kanal Z marla
export function getAgriBreakdown(sqft: number, systemId: SystemId = "mohali"): AgriBreakdown {
  const killaSqft = 43560;
  const kanalSqft = UNITS.find((u) => u.id === "kanal")?.baseSqft[systemId] ?? 5445;
  const marlaSqft = UNITS.find((u) => u.id === "marla")?.baseSqft[systemId] ?? 272.25;
  const sarsahiSqft = UNITS.find((u) => u.id === "sarsahi")?.baseSqft[systemId] ?? 30.25;

  const killa = Math.floor(sqft / killaSqft);
  let remSqft = sqft - killa * killaSqft;

  const kanal = Math.floor(remSqft / kanalSqft);
  remSqft -= kanal * kanalSqft;

  const marla = Math.floor(remSqft / marlaSqft);
  remSqft -= marla * marlaSqft;

  const sarsahi = remSqft / sarsahiSqft;
  const roundedSarsahi = Math.round(sarsahi * 100) / 100;

  const parts: string[] = [];
  if (killa > 0) parts.push(`${killa} killa`);
  parts.push(`${kanal} kanal`);
  parts.push(`${marla} marla`);
  if (roundedSarsahi > 0) parts.push(`${roundedSarsahi} sarsahi`);

  return {
    killa,
    kanal,
    marla,
    sarsahi: roundedSarsahi,
    formatted: parts.join(" "),
  };
}

// Revenue-Record Form: X bigha Y biswa Z biswansi
export function getRevenueBreakdown(sqft: number, systemId: SystemId = "mohali"): RevenueBreakdown {
  const bighaSqft = UNITS.find((u) => u.id === "bigha")?.baseSqft[systemId] ?? 21780;
  const biswaSqft = UNITS.find((u) => u.id === "biswa")?.baseSqft[systemId] ?? 1089;
  const biswansiSqft = UNITS.find((u) => u.id === "biswansi")?.baseSqft[systemId] ?? 54.45;

  const bigha = Math.floor(sqft / bighaSqft);
  let remSqft = sqft - bigha * bighaSqft;

  const biswa = Math.floor(remSqft / biswaSqft);
  remSqft -= biswa * biswaSqft;

  const biswansi = remSqft / biswansiSqft;
  const roundedBiswansi = Math.round(biswansi * 100) / 100;

  const parts: string[] = [];
  if (bigha > 0) parts.push(`${bigha} bigha`);
  parts.push(`${biswa} biswa`);
  parts.push(`${roundedBiswansi} biswansi`);

  return {
    bigha,
    biswa,
    biswansi: roundedBiswansi,
    formatted: parts.join(" "),
  };
}
