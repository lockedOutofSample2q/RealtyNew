const fs = require('fs');
const file = 'components/search/propertySearchOptions.ts';
let options = fs.readFileSync(file, 'utf8');

const numbers = Array.from({length: 127}, (_, i) => `Sector ${i + 1}`);
const named = ['Sector 82A', 'Sector 118', 'Sector 119', 'Aerocity', 'IT City', 'Eco City', 'Eco City 1', 'Eco City 2', 'Sunny Enclave', 'TDI City', 'Wave Estate', 'Omaxe', 'Quark City', 'Airport Road', 'Phase 1', 'Phase 2', 'Phase 3', 'Phase 4', 'Phase 5', 'Phase 6', 'Phase 7', 'Phase 8', 'Phase 9', 'Phase 10', 'Phase 11', 'Industrial Area Phase 8A', 'Industrial Area Phase 8B'];
const sectors = ['All', ...numbers, ...named];

options = options.replace(
  /Mohali:\s*\[([^\]]*)\]/,
  `Mohali: ${JSON.stringify([...new Set(sectors)])}`
);

options = options.replace(/sector: string;/g, 'sector: string[];');
options = options.replace(/sector: "",/g, 'sector: [],');

fs.writeFileSync(file, options);
console.log("Updated propertySearchOptions.ts");
