const https = require('https');
const fs = require('fs');
const path = require('path');

const dir = path.join(process.cwd(), 'public', 'assets', 'images', 'source');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

// Use direct reliable URLs (Wikimedia and verified Unsplash direct links)
const verifiedIndianAssets = [
  // Infrastructure (Indian Expressways)
  { name: 'ind_infra_1.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Mumbai-Pune_Expressway_near_Lonavala.jpg' },
  
  // Luxury Indian Residential/Architecture
  { name: 'ind_lux_1.jpg', url: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?q=80&w=1200&auto=format&fit=crop' },
  { name: 'ind_lux_2.jpg', url: 'https://images.unsplash.com/photo-1590059414871-ccf442ce0060?q=80&w=1200&auto=format&fit=crop' },
  
  // Punjab-style Landscapes/Land
  { name: 'ind_land_1.jpg', url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200&auto=format&fit=crop' },
  { name: 'ind_land_2.jpg', url: 'https://images.unsplash.com/photo-1500628550463-c8881a54d4d4?q=80&w=1200&auto=format&fit=crop' },
  
  // Commercial/Finance
  { name: 'ind_work_1.jpg', url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1200&auto=format&fit=crop' },
  { name: 'ind_work_2.jpg', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop' }
];

function download(asset) {
  return new Promise((resolve) => {
    const filePath = path.join(dir, asset.name);
    const file = fs.createWriteStream(filePath);
    
    https.get(asset.url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        https.get(res.headers.location, (redir) => redir.pipe(file));
      } else {
        res.pipe(file);
      }
      file.on('finish', () => {
        file.close();
        const size = fs.statSync(filePath).size;
        console.log(`Downloaded: ${asset.name} (${size} bytes)`);
        resolve(size > 5000);
      });
    }).on('error', (err) => {
      console.error(`Error ${asset.name}:`, err.message);
      resolve(false);
    });
  });
}

async function start() {
  console.log("Downloading verified INDIAN visual assets...");
  for (const asset of verifiedIndianAssets) {
    await download(asset);
  }
}

start();
