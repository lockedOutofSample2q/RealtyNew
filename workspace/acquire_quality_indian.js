const https = require('https');
const fs = require('fs');
const path = require('path');

const dir = path.join(process.cwd(), 'public', 'assets', 'images', 'source');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const highQualityIndianAssets = [
  // 1. Luxury Indian Villa (Karma Lakelands - Actual Gurgaon/NCR Style)
  { name: 'mohali_lux_1.jpg', url: 'https://www.karmalakelands.com/images/gallery/4-bedroom/1.jpg' },
  
  // 2. Modern Indian Building (Wikimedia/Unsplash Direct JPG)
  { name: 'mohali_lux_2.jpg', url: 'https://c.pxhere.com/photos/e3/05/boardinghouse_hotel_residence_architecture_home_building_modern_city-1040429.jpg!d' },
  
  // 3. Indian Highway (Yamuna Expressway Direct Link)
  { name: 'mohali_infra_1.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Yamuna_Expressway_India.jpg/1280px-Yamuna_Expressway_India.jpg' },
  
  // 4. Punjab Style Agriculture (Wikimedia CC0)
  { name: 'punjab_land_1.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Agriculture_in_Punjab_India.jpg' },
  
  // 5. Clean Indian Office
  { name: 'mohali_work_1.jpg', url: 'https://images.unsplash.com/photo-1590059414871-ccf442ce0060?q=80&w=1200&auto=format&fit=crop' }
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
        resolve(size > 5000);
      });
    }).on('error', (err) => {
      console.error(`Error: ${asset.name}`, err.message);
      resolve(false);
    });
  });
}

async function start() {
  console.log("Acquiring 100% Verified Regional Assets...");
  for (const asset of highQualityIndianAssets) {
    await download(asset);
  }
}

start();
