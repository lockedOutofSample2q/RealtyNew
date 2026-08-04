// lib/area-units.test.ts
// Execution & Assertion suite for Land Area Units calculations and conversions

import {
  convertArea,
  getUrbanBreakdown,
  getAgriBreakdown,
  getRevenueBreakdown,
  formatCurrencyINR,
  UNITS,
  REGIONS,
  SQFT_TO_SQM,
  SystemId,
} from "./area-units";

const EPSILON = 1e-6;

function assertClose(actual: number, expected: number, message: string) {
  const diff = Math.abs(actual - expected);
  const relDiff = expected !== 0 ? diff / Math.abs(expected) : diff;
  if (relDiff > EPSILON && diff > EPSILON) {
    throw new Error(`FAIL: ${message}. Expected ${expected}, got ${actual} (diff: ${diff})`);
  }
}

function assertEqual(actual: any, expected: any, message: string) {
  if (actual !== expected) {
    throw new Error(`FAIL: ${message}. Expected "${expected}", got "${actual}"`);
  }
}

console.log("=== RUNNING AREA UNITS TEST SUITE ===");

let passed = 0;
let total = 0;

function test(name: string, fn: () => void) {
  total++;
  try {
    fn();
    passed++;
    console.log(`✓ ${name}`);
  } catch (err: any) {
    console.error(`✗ ${name}: ${err.message}`);
    process.exitCode = 1;
  }
}

// 1. System A Tests
test("System A - Standard Punjab Units", () => {
  assertClose(convertArea(1, "marla", "sqft", "mohali"), 272.25, "1 marla -> sqft");
  assertClose(convertArea(1, "marla", "sqyd", "mohali"), 30.25, "1 marla -> sqyd");
  assertClose(convertArea(1, "kanal", "sqft", "mohali"), 5445, "1 kanal -> sqft");
  assertClose(convertArea(1, "kanal", "marla", "mohali"), 20, "1 kanal -> marla");
  assertClose(convertArea(1, "bigha", "sqft", "mohali"), 21780, "1 bigha -> sqft");
  assertClose(convertArea(1, "bigha", "kanal", "mohali"), 4, "1 bigha -> kanal");
  assertClose(convertArea(1, "bigha", "biswa", "mohali"), 20, "1 bigha -> biswa");
  assertClose(convertArea(1, "killa", "sqft", "mohali"), 43560, "1 killa -> sqft");
  assertClose(convertArea(1, "killa", "kanal", "mohali"), 8, "1 killa -> kanal");
  assertClose(convertArea(1, "killa", "bigha", "mohali"), 2, "1 killa -> bigha");
  assertClose(convertArea(1, "killa", "marla", "mohali"), 160, "1 killa -> marla");
  assertClose(convertArea(1, "killa", "sarsahi", "mohali"), 1440, "1 killa -> sarsahi");
  assertClose(convertArea(1, "killa", "biswa", "mohali"), 40, "1 killa -> biswa");
  assertClose(convertArea(1, "murabba", "acre", "mohali"), 25, "1 murabba -> acre");
  assertClose(convertArea(1, "sarsahi", "sqft", "mohali"), 30.25, "1 sarsahi -> sqft");
  assertClose(convertArea(1, "biswa", "marla", "mohali"), 4, "1 biswa -> marla");
  assertClose(convertArea(1, "biswa", "sqft", "mohali"), 1089, "1 biswa -> sqft");
  assertClose(convertArea(1, "biswansi", "sqft", "mohali"), 54.45, "1 biswansi -> sqft");
});

// 2. System B Tests
test("System B - Patiala / Rajpura Katcha Bigha", () => {
  assertClose(convertArea(1, "bigha", "sqft", "patiala"), 9075, "1 bigha (Patiala) -> sqft");
  assertClose(convertArea(1, "bigha", "sqyd", "patiala"), 1008.3333333, "1 bigha (Patiala) -> sqyd");
  assertClose(convertArea(4.8, "bigha", "acre", "patiala"), 1, "4.8 bigha (Patiala) -> acre");
  assertClose(convertArea(75, "bigha", "acre", "patiala"), 15.625, "75 bigha (Patiala) -> acre");
  assertClose(convertArea(42.5, "bigha", "acre", "patiala"), 8.8541667, "42.5 bigha (Patiala) -> acre");
  assertClose(convertArea(1, "biswa", "sqft", "patiala"), 453.75, "1 biswa (Patiala) -> sqft");
});

// 3. Systems C, D, E, F
test("Systems C, D, E, F Regional Units", () => {
  // System C (Doaba)
  assertClose(convertArea(1, "marla", "sqft", "doaba"), 206.640625, "C: 1 marla -> sqft");
  assertClose(convertArea(1, "kanal", "sqft", "doaba"), 4132.8125, "C: 1 kanal -> sqft");
  assertClose(convertArea(1, "acre", "kanal", "doaba"), 10.5400378, "C: 1 acre -> kanal");

  // System D (Majha)
  assertClose(convertArea(1, "marla", "sqft", "majha"), 225, "D: 1 marla -> sqft");
  assertClose(convertArea(1, "kanal", "sqft", "majha"), 4500, "D: 1 kanal -> sqft");
  assertClose(convertArea(1, "acre", "kanal", "majha"), 9.68, "D: 1 acre -> kanal");
  assertClose(convertArea(1, "bigha", "sqft", "majha"), 10000, "D: 1 bigha -> sqft");

  // System E (Kapurthala)
  assertClose(convertArea(1, "marla", "sqft", "kapurthala"), 182.25, "E: 1 marla -> sqft");
  assertClose(convertArea(1, "kanal", "sqft", "kapurthala"), 3645, "E: 1 kanal -> sqft");
  assertClose(convertArea(1, "acre", "kanal", "kapurthala"), 11.9506173, "E: 1 acre -> kanal");

  // System F (Ludhiana)
  assertClose(convertArea(1, "bigha", "sqft", "ludhiana"), 27225, "F: 1 bigha -> sqft");
  assertClose(convertArea(1, "acre", "bigha", "ludhiana"), 1.6, "F: 1 acre -> bigha");
  assertClose(convertArea(1, "biswa", "sqft", "ludhiana"), 1361.25, "F: 1 biswa -> sqft");
});

// 4. Metric Conversions
test("Metric Conversions", () => {
  assertClose(convertArea(1, "sqft", "sqm", "mohali"), SQFT_TO_SQM, "1 sqft -> sqm");
  assertClose(convertArea(1, "acre", "sqm", "mohali"), 4046.8564224, "1 acre -> sqm");
  assertClose(convertArea(1, "hectare", "acre", "mohali"), 2.4710538146716536, "1 hectare -> acre");
  assertClose(convertArea(1, "hectare", "sqft", "mohali"), 107639.10416709722, "1 hectare -> sqft");
  assertClose(convertArea(1, "marla", "sqm", "mohali"), 25.29285264, "1 marla -> sqm");
  assertClose(convertArea(1, "kanal", "sqm", "mohali"), 505.8570528, "1 kanal -> sqm");
});

// 5. Property Tests
test("Property Tests (Round-trip, Symmetry, Additivity, Region Invariance)", () => {
  const testUnits = ["sqft", "marla", "kanal", "bigha", "acre"];
  const testSystems: SystemId[] = ["mohali", "patiala", "doaba", "majha", "kapurthala", "ludhiana"];
  const testValues = [1, 7.5, 1234.567];

  // Round trip
  for (const u of testUnits) {
    for (const s of testSystems) {
      for (const x of testValues) {
        const sqftVal = convertArea(x, u, "sqft", s);
        const backVal = convertArea(sqftVal, "sqft", u, s);
        assertClose(backVal, x, `Roundtrip ${x} ${u} in ${s}`);
      }
    }
  }

  // Symmetry
  for (const s of testSystems) {
    const f1 = convertArea(1, "marla", "sqft", s);
    const f2 = convertArea(1, "sqft", "marla", s);
    assertClose(f1 * f2, 1, `Symmetry marla <-> sqft in ${s}`);
  }

  // Additivity
  const a = 5.5, b = 12.3;
  const sumConverted = convertArea(a + b, "marla", "sqft", "mohali");
  const separateSum = convertArea(a, "marla", "sqft", "mohali") + convertArea(b, "marla", "sqft", "mohali");
  assertClose(sumConverted, separateSum, "Additivity test");

  // Region invariance for universal units
  const uniUnits = ["acre", "hectare", "sqft", "sqyd", "sqm"];
  for (const u of uniUnits) {
    const baseVal = convertArea(100, u, "sqft", "mohali");
    for (const s of testSystems) {
      const sVal = convertArea(100, u, "sqft", s);
      assertClose(sVal, baseVal, `Region invariance for ${u} in ${s}`);
    }
  }
});

// 6. Composite Breakdown Tests
test("Composite Breakdown Calculations", () => {
  const b1 = getUrbanBreakdown(12000, "mohali");
  assertEqual(b1.formatted, "2 kanal 4 marla 0.69 sarsahi", "12,000 sqft urban breakdown");

  const b2_urban = getUrbanBreakdown(43560, "mohali");
  assertEqual(b2_urban.formatted, "8 kanal 0 marla 0 sarsahi", "43,560 sqft urban breakdown");

  const b2_agri = getAgriBreakdown(43560, "mohali");
  assertEqual(b2_agri.formatted, "1 killa 0 kanal 0 marla", "43,560 sqft agri breakdown");

  const b3_urban = getUrbanBreakdown(100000, "mohali");
  assertEqual(b3_urban.formatted, "18 kanal 7 marla 2.79 sarsahi", "100,000 sqft urban breakdown");

  const b3_agri = getAgriBreakdown(100000, "mohali");
  assertEqual(b3_agri.formatted, "2 killa 2 kanal 7 marla 2.79 sarsahi", "100,000 sqft agri breakdown");
});

// 7. Rate Panel Calculations
test("Rate Panel Calculation Formats", () => {
  // INR 45,00,000 per bigha in Patiala -> per sqft
  const bighaSqftPatiala = 9075;
  const ratePerSqft = 4500000 / bighaSqftPatiala;
  assertClose(ratePerSqft, 495.867768595, "Rate per sqft from Patiala bigha");

  const ratePerAcre = ratePerSqft * 43560;
  const formattedAcre = formatCurrencyINR(ratePerAcre);
  assertEqual(formattedAcre.wordForm, "2.16 Cr", "Rate per acre word form");

  // INR 8,000 per sqft -> per marla in Mohali (272.25 sqft)
  const ratePerMarla = 8000 * 272.25;
  assertEqual(ratePerMarla, 2178000, "INR 8,000 per sqft to per marla");
});

console.log(`\nRESULTS: ${passed}/${total} assertions passed.`);
if (passed !== total) {
  process.exit(1);
}
