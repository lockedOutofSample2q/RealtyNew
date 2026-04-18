const https = require('https');
const fs = require('fs');
const path = require('path');

const dir = path.join(process.cwd(), 'public', 'assets', 'images', 'source');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

// Curated regional assets for Mohali/Punjab
const regionalAssets = [
  // 1. INFRASTRUCTURE: Mohali Airport Road / Indian Expressway
  { name: 'mohali_infra_1.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Mumbai-Pune_Expressway_near_Lonavala.jpg' }, // Modern wide expressway proxy
  { name: 'mohali_infra_2.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/Atal_Setu_MTHL_Mumbai.jpg' }, // Infrastructure engineering
  
  // 2. LUXURY: Indian High-Rise Exteriors (Marbella/Falcon View style)
  { name: 'mohali_lux_1.jpg', url: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?q=80&w=1200&auto=format&fit=crop' }, // Modern Indian High Rise
  { name: 'mohali_lux_2.jpg', url: 'https://images.unsplash.com/photo-1590059414871-ccf442ce0060?q=80&w=1200&auto=format&fit=crop' }, // Modern Architecture India
  
  // 3. LAND: Punjab Agriculture (Wheat/Mustard vibe)
  { name: 'punjab_land_1.jpg', url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200&auto=format&fit=crop' }, // Green fields
  { name: 'punjab_land_2.jpg', url: 'https://images.unsplash.com/photo-1500628550463-c8881a54d4d4?q=80&w=1200&auto=format&fit=crop' }, // Golden landscape
  { name: 'punjab_land_3.jpg', url: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=1200&auto=format&fit=crop' }, // Forest/Greenery Punjab
  
  // 4. OFFICE/LEGAL: Indian Stamp Paper / Registry Office style
  { name: 'ind_legal_1.jpg', url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1200&auto=format&fit=crop' }, // Documents/Finances
  { name: 'ind_legal_2.jpg', url: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1200&auto=format&fit=crop' }, // Modern clean office
  
  // 5. OFFICIAL SEALS
  { name: 'seal_pb.png', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Seal_of_Punjab.svg/1024px-Seal_of_Punjab.svg.png' },
  { name: 'logo_rera.png', url: 'https://rera.punjab.gov.in/images/logo.png' }
];

function download(asset) {
  return new Promise((resolve) => {
    const filePath = path.join(dir, asset.name);
    const file = fs.createWriteStream(filePath);
    const options = { headers: { 'User-Agent': 'Mozilla/5.0' } };
    
    https.get(asset.url, options, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        https.get(res.headers.location, options, (redir) => redir.pipe(file));
      } else {
        res.pipe(file);
      }
      file.on('finish', () => {
        file.close();
        const size = fs.statSync(filePath).size;
        console.log(`Downloaded: ${asset.name} (${size} bytes)`);
        resolve(size > 2000);
      });
    }).on('error', (err) => {
      console.error(`Error ${asset.name}:`, err.message);
      resolve(false);
    });
  });
}

async function start() {
  console.log("Acquiring regional visual assets for Mohali/Punjab context...");
  for (const asset of regionalAssets) {
    await download(asset);
  }
}

start();
