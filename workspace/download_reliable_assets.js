const https = require('https');
const fs = require('fs');
const path = require('path');

const dir = path.join(process.cwd(), 'public', 'assets', 'images', 'source');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const reliableAssets = [
  // 1. Modern High Rise (Indian metro style)
  { name: 'ind_lux_1.jpg', url: 'https://images.unsplash.com/photo-1590059414871-ccf442ce0060?q=80&w=1200&auto=format&fit=crop' },
  
  // 2. Punjab Landscape (Lush green field)
  { name: 'ind_land_1.jpg', url: 'https://images.pexels.com/photos/2590740/pexels-photo-2590740.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
  
  // 3. Indian Expressway
  { name: 'ind_infra_1.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Mumbai-Pune_Expressway_near_Lonavala.jpg' },
  
  // 4. Premium Office
  { name: 'ind_work_1.jpg', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop' }
];

function download(asset) {
  return new Promise((resolve) => {
    const filePath = path.join(dir, asset.name);
    const file = fs.createWriteStream(filePath);
    
    https.get(asset.url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
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
  for (const asset of reliableAssets) {
    await download(asset);
  }
}

start();
