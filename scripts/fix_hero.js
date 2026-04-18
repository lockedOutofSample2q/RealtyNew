const fs = require('fs');
const file = 'components/sections/HeroSection.tsx';
let data = fs.readFileSync(file, 'utf8');

// replace URLSearchParams constructor args
data = data.replace(
  /const params = new URLSearchParams\({[\s\S]*?}\);/,
  `const params = new URLSearchParams();
    params.set("tab", tab);
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

// fix PillSelect -> PillMultiSelect
data = data.replace(
  /import PillSelect from "@\/components\/ui\/PillSelect";/,
  `import PillSelect from "@/components/ui/PillSelect";\nimport PillMultiSelect from "@/components/ui/PillMultiSelect";`
);

data = data.replace(
  /city: city,\s*sector: ""/g,
  `city: city, sector: []`
);

data = data.replace(
  /<PillSelect\s*label="Sector \/ Area"\s*value=\{filters\.sector\}\s*options=\{filters\.city/g,
  `<PillMultiSelect\n                  label="Sector / Area"\n                  value={filters.sector}\n                  options={filters.city`
);

// Update some(Boolean) for array check
data = data.replace(
  /\[filters\.city,\s*filters\.sector,\s*filters\.type,\s*filters\.bedrooms,\s*filters\.furnishing,\s*filters\.price\]\.some\(Boolean\)/g,
  `[filters.city, ...(Array.isArray(filters.sector) ? filters.sector : []), filters.type, filters.bedrooms, filters.furnishing, filters.price].some(Boolean)`
);


fs.writeFileSync(file, data);
