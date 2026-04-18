const https = require('https');
const fs = require('fs');
const path = require('path');

const dir = path.join(process.cwd(), 'public', 'assets', 'images', 'source');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

// A small, hand-picked list of HIGH-QUALITY local/regional assets
const premiumLocalAssets = [
  // 1. MOHALI LUXURY: Falcon View (Actual High-Res Image from Developer)
  { name: 'mohali_falcon_view.jpg', url: 'https://jantaland.com/wp-content/uploads/2023/05/falcon-view-actual-image-1.jpg' },
  
  // 2. MOHALI LUXURY: Marbella Grand (High-Res Exterior)
  { name: 'mohali_marbella.jpg', url: 'https://marbellagrand.com/wp-content/uploads/2021/06/marbella-grand-exterior.jpg' },
  
  // 3. INFRASTRUCTURE: Modern Indian Expressway (Clean Wide Road)
  { name: 'indian_expressway.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Yamuna_Expressway_India.jpg/1280px-Yamuna_Expressway_India.jpg' },
  
  // 4. PUNJAB LAND: Lush Green Fields (Authentic Rural Vibe)
  { name: 'punjab_fields.jpg', url: 'https://images.pexels.com/photos/2590740/pexels-photo-2590740.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
  
  // 5. LEGAL/OFFICE: Clean, high-end desk (No clutter)
  { name: 'premium_desk.jpg', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200' }
];

function download(asset) {
  return new Promise((resolve) => {
    const filePath = path.join(dir, asset.name);
    const file = fs.createWriteStream(filePath);
    const options = { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' } };
    
    https.get(asset.url, options, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        https.get(res.headers.location, options, (redir) => redir.pipe(file));
      } else if (res.statusCode === 200) {
        res.pipe(file);
      } else {
        console.error(`Failed: ${asset.name} (${res.statusCode})`);
      }
      
      file.on('finish', () => {
        file.close();
        const size = fs.statSync(filePath).size;
        if (size > 10000) {
           console.log(`Success: ${asset.name} (${(size/1024).toFixed(1)} KB)`);
           resolve(true);
        } else {
           fs.unlinkSync(filePath);
           console.error(`Rejected: ${asset.name} is too small (${size} bytes)`);
           resolve(false);
        }
      });
    }).on('error', (err) => {
      console.error(`Error ${asset.name}:`, err.message);
      resolve(false);
    });
  });
}

async function start() {
  console.log("Acquiring high-quality, authentic regional assets...");
  for (const asset of premiumLocalAssets) {
    await download(asset);
  }
}

start();
