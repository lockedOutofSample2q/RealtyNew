const https = require('https');
const fs = require('fs');
const path = require('path');

const dir = path.join(process.cwd(), 'public', 'assets', 'images', 'source');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

// Robust Unsplash IDs for high-end real estate and infrastructure
const assets = [
  { name: 'bg-highway.jpg', id: '1545143333-573a7a48147e' },
  { name: 'bg-fields.jpg', id: '1500382017468-9049fed747ef' },
  { name: 'bg-luxury.jpg', id: '1480074568708-e7b720bb3f09' },
  { name: 'bg-commercial.jpg', id: '1486406146926-c627a92ad1ab' },
  { name: 'bg-legal.jpg', id: '1589829545856-d10d557cf95f' },
  { name: 'bg-finance.jpg', id: '1554224155-6726b3ff858f' },
  { name: 'bg-construction.jpg', id: '1503387762-592deb58ef4e' },
  { name: 'bg-township.jpg', id: '1524813686514-a57563d77965' },
  { name: 'bg-modern.jpg', id: '1460317442991-0ec239397148' }
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
  for (const asset of assets) {
    await download(asset);
  }
}

start();
