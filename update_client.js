const fs = require('fs');
const file = 'app/(site)/properties/PropertiesClient.tsx';
let data = fs.readFileSync(file, 'utf8');

data = data.replace(
  /sector:\s*searchParams\.get\("sector"\)\s*\?\?\s*""/g,
  'sector: searchParams.getAll("sector") || []'
);

// update filtering
data = data.replace(
  `    const desiredSector = normalize(filters.sector);`,
  `    const desiredSector = filters.sector;`
);

data = data.replace(
  `      if (desiredSector && desiredSector !== "all") {
        const inLocation = normalize(p.location).includes(desiredSector);
        const inCommunity = normalize(p.community).includes(desiredSector);
        if (!inLocation && !inCommunity) return false;
      }`,
  `      if (desiredSector && desiredSector.length > 0 && !desiredSector.includes("All") && !desiredSector.includes("all")) {
        const inSector = desiredSector.some(sec => {
          const normSec = normalize(sec);
          return normalize(p.location).includes(normSec) || normalize(p.community).includes(normSec);
        });
        if (!inSector) return false;
      }`
);

// update URL param construction
// The existing is new URLSearchParams({ ... })
data = data.replace(
  /const params = new URLSearchParams\({([\s\S]*?)}\);/,
  `const params = new URLSearchParams();
    params.set("tab", activeTab);
    if (filters.city) params.set("city", filters.city);
    if (filters.sector && filters.sector.length > 0) {
      if (typeof filters.sector === "string") {
        params.append("sector", filters.sector);
      } else {
        filters.sector.forEach(s => params.append("sector", s));
      }
    }
    if (filters.type) params.set("type", filters.type);
    if (filters.bedrooms && tab !== "lands") params.set("bedrooms", filters.bedrooms);
    if (filters.furnishing && tab !== "lands") params.set("furnishing", filters.furnishing);
    if (filters.price) params.set("price", filters.price);
    if (filters.currency) params.set("currency", filters.currency);`
);

// Update some(Boolean) for array check
data = data.replace(
  /\[filters\.city,\s*filters\.sector,\s*filters\.type,\s*filters\.bedrooms,\s*filters\.furnishing,\s*filters\.price\]\.some\(Boolean\)/g,
  `[filters.city, ...(Array.isArray(filters.sector) ? filters.sector : []), filters.type, filters.bedrooms, filters.furnishing, filters.price].some(Boolean)`
);

// update UI PillSelect to PillMultiSelect and onChange city -> sector reset
data = data.replace(
  /onChange=\{\(city\) => setFilters\(\{ \.\.\.filters, city: city, sector: "" \}\)\}/g,
  `onChange={(city) => setFilters({ ...filters, city: city, sector: [] })}`
);
data = data.replace(
  /<PillSelect\s*label="Sector \/ Area"\s*value=\{filters\.sector\}\s*options=\{filters\.city/g,
  `<PillMultiSelect\n                  label="Sector / Area"\n                  value={filters.sector}\n                  options={filters.city`
);

fs.writeFileSync(file, data);
console.log("Updated PropertiesClient.tsx");
