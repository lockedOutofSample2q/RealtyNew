const https = require('https');
const fs = require('fs');
const path = require('path');

const dir = path.join(process.cwd(), 'public', 'assets', 'images', 'source');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const assets = [
  // 1. INFRASTRUCTURE: Indian Highway (Unsplash)
  { name: 'ind_infra_final.jpg', url: 'https://images.unsplash.com/photo-1590050752117-23a9d7fc6f9a?auto=format&fit=crop&q=80&w=1200' },
  
  // 2. AGRICULTURE: Punjab style field (Pexels)
  { name: 'punjab_land_final.jpg', url: 'https://images.pexels.com/photos/2590740/pexels-photo-2590740.jpeg?auto=compress&cs=tinysrgb&w=1200' },
  
  // 3. LUXURY: Indian high-rise exterior (Unsplash)
  { name: 'ind_lux_final.jpg', url: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?auto=format&fit=crop&q=80&w=1200' },
  
  // 4. WORK/LEGAL: (Unsplash)
  { name: 'ind_work_final.jpg', url: 'https://images.unsplash.com/photo-1590059414871-ccf442ce0060?auto=format&fit=crop&q=80&w=1200' }
];

function download(asset) {
  return new Promise((resolve) => {
    const filePath = path.join(dir, asset.name);
    const file = fs.createWriteStream(filePath);
    const options = { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' } };
    
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
  console.log("Acquiring 4 final high-quality localized backgrounds...");
  for (const asset of assets) {
    await download(asset);
  }
}

start();
