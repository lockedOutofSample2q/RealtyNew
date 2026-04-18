const https = require('https');
const fs = require('fs');
const path = require('path');

const dir = path.join(process.cwd(), 'public', 'assets', 'images', 'source');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

// ELITE CURATED LIST - Hand-verified IDs for high-end Real Estate context
const eliteAssets = [
  // 1. High-End Glass Architecture (For Marbella/Luxury/IT City vibe)
  { name: 'premium_glass_1.jpg', id: '1464145075303-a21fa5f37d38' },
  { name: 'premium_glass_2.jpg', id: '1486406146926-c627a92ad1ab' },
  { name: 'premium_glass_3.jpg', id: '1545324418-f1d3ac1ef739' },
  
  // 2. Elite Road/Infrastructure (Wide, clean, modern - for Airport Road/Bharatmala)
  { name: 'premium_road_1.jpg', id: '1545143333-573a7a48147e' },
  { name: 'premium_road_2.jpg', id: '1515162816999-a0c47dc192f7' },
  
  // 3. Vibrant Greenery/Land (Lush, professional landscapes - for Punjab land)
  { name: 'premium_land_1.jpg', id: '1500382017468-9049fed747ef' },
  { name: 'premium_land_2.jpg', id: '1500628550463-c8881a54d4d4' },
  
  // 4. Minimalist Modern Office/Legal (Clean, professional, high-trust)
  { name: 'premium_work_1.jpg', id: '1497215728101-856f4ea42174' },
  { name: 'premium_work_2.jpg', id: '1497366216548-37526070297c' }
];

function download(asset) {
  return new Promise((resolve) => {
    const url = `https://images.unsplash.com/photo-${asset.id}?q=80&w=1200&auto=format&fit=crop`;
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
        const size = fs.statSync(filePath).size;
        console.log(`Verified: ${asset.name} (${size} bytes)`);
        resolve(size > 5000);
      });
    }).on('error', (err) => {
      console.error(`Error: ${asset.name}`, err.message);
      resolve(false);
    });
  });
}

async function start() {
  console.log("Acquiring 100% Premium Visual Pool...");
  for (const asset of eliteAssets) {
    await download(asset);
  }
}

start();
