const https = require('https');
const fs = require('fs');
const path = require('path');

const dir = path.join(process.cwd(), 'public', 'assets', 'images', 'source');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

// Curated list of IDs that have a strong "Indian/Mohali" or regional fit
// Based on Unsplash's library of Indian urban and rural scenes
const indianAssets = [
  // Modern Indian Urban / Mohali-like High Rises
  { name: 'ind_lux_1.jpg', id: '1595191603741-99745ba510d2' }, // Indian modern building exterior
  { name: 'ind_lux_2.jpg', id: '1582408921715-18e7806365c1' }, // Urban architecture
  { name: 'ind_lux_3.jpg', id: '1560518883-ce09059eeffa' }, // Modern residence
  
  // Infrastructure / Road (Wide highways)
  { name: 'ind_infra_1.jpg', id: '1545143333-573a7a48147e' }, // Large highway infrastructure
  { name: 'ind_infra_2.jpg', id: '1570125909232-eb263c188f7e' }, // Road and greenery
  
  // Punjab-specific Fields / Land (Lush green agriculture)
  { name: 'ind_land_1.jpg', id: '1500382017468-9049fed747ef' }, // Vibrant green fields
  { name: 'ind_land_2.jpg', id: '1500628550463-c8881a54d4d4' }, // Agricultural landscape
  { name: 'ind_land_3.jpg', id: '1610348722380-adb3f92661e4' }, // Indian rural field
  
  // Indian Office / Documents / Legal vibe
  { name: 'ind_work_1.jpg', id: '1554224155-6726b3ff858f' }, // Office/Finances
  { name: 'ind_work_2.jpg', id: '1486406146926-c627a92ad1ab' }, // Business building
  
  // Logos / Seals (Official Government look)
  { name: 'pb_seal.png', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Seal_of_Punjab.svg/1024px-Seal_of_Punjab.svg.png' },
  { name: 'rera_ind.png', url: 'https://rera.punjab.gov.in/images/logo.png' }
];

function download(asset) {
  return new Promise((resolve) => {
    const url = asset.url || `https://images.unsplash.com/photo-${asset.id}?q=80&w=1200&auto=format&fit=crop`;
    const filePath = path.join(dir, asset.name);
    const file = fs.createWriteStream(filePath);
    
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        https.get(res.headers.location, (redir) => redir.pipe(file));
      } else {
        res.pipe(file);
      }
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded: ${asset.name}`);
        resolve();
      });
    }).on('error', (err) => {
      console.error(`Error: ${asset.name}`, err.message);
      resolve();
    });
  });
}

async function start() {
  console.log("Downloading Indian/Mohali context visual assets...");
  for (const asset of indianAssets) {
    await download(asset);
  }
}

start();
