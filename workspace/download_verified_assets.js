const https = require('https');
const fs = require('fs');
const path = require('path');

const dir = path.join(process.cwd(), 'public', 'assets', 'images', 'source');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const highResAssets = [
  // Luxury Residential
  { name: 'lux_1.jpg', url: 'https://images.unsplash.com/photo-1512917774534-00d6fe94bb92?q=80&w=1200&auto=format&fit=crop' },
  { name: 'lux_2.jpg', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop' },
  { name: 'lux_3.jpg', url: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=1200&auto=format&fit=crop' },
  { name: 'lux_4.jpg', url: 'https://images.unsplash.com/photo-1513584684374-8bdb74ec9bd1?q=80&w=1200&auto=format&fit=crop' },
  
  // Infrastructure
  { name: 'infra_1.jpg', url: 'https://images.unsplash.com/photo-1545143333-573a7a48147e?q=80&w=1200&auto=format&fit=crop' },
  { name: 'infra_2.jpg', url: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=1200&auto=format&fit=crop' },
  { name: 'infra_3.jpg', url: 'https://images.unsplash.com/photo-1590483736148-3c1a30226248?q=80&w=1200&auto=format&fit=crop' },
  
  // Agriculture/Land
  { name: 'land_1.jpg', url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200&auto=format&fit=crop' },
  { name: 'land_2.jpg', url: 'https://images.unsplash.com/photo-1500628550463-c8881a54d4d4?q=80&w=1200&auto=format&fit=crop' },
  { name: 'land_3.jpg', url: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=1200&auto=format&fit=crop' },
  
  // Commercial
  { name: 'comm_1.jpg', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop' },
  { name: 'comm_2.jpg', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop' },
  
  // Clean Workspace/Legal
  { name: 'work_1.jpg', url: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1200&auto=format&fit=crop' },
  { name: 'work_2.jpg', url: 'https://images.unsplash.com/photo-1460317442991-0ec239397148?q=80&w=1200&auto=format&fit=crop' }
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
        const size = fs.statSync(filePath).size;
        console.log(`Downloaded: ${asset.name} (${size} bytes)`);
        resolve(size > 1000); // Only return true if it's likely a real image
      });
    }).on('error', (err) => {
      console.error(`Error: ${asset.name}`, err.message);
      resolve(false);
    });
  });
}

async function start() {
  console.log("Downloading verified high-res visual assets...");
  for (const asset of highResAssets) {
    await download(asset);
  }
}

start();
