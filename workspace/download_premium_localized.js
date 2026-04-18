const https = require('https');
const fs = require('fs');
const path = require('path');

const dir = path.join(process.cwd(), 'public', 'assets', 'images', 'source');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const highEndRegionalAssets = [
  // 1. INFRASTRUCTURE: Indian Highway (Aerial/Modern)
  { name: 'mohali_infra_premium.jpg', url: 'https://images.pexels.com/photos/15953853/pexels-photo-15953853.jpeg?auto=compress&cs=tinysrgb&w=1200' },
  
  // 2. AGRICULTURE: Lush Punjab-style Green Field
  { name: 'punjab_land_premium.jpg', url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200&auto=format&fit=crop' },
  
  // 3. LUXURY: Modern Indian Architectural Glass Building
  { name: 'indian_lux_premium.jpg', url: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?q=80&w=1200&auto=format&fit=crop' },
  
  // 4. CLEAN OFFICE: Minimalist Indian Office (Trust/Professionalism)
  { name: 'indian_office_premium.jpg', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop' }
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
  console.log("Acquiring 100% Premium Localized Visuals...");
  for (const asset of highEndRegionalAssets) {
    await download(asset);
  }
}

start();
