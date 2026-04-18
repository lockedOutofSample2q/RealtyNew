const https = require('https');
const fs = require('fs');
const path = require('path');

const dir = path.join(process.cwd(), 'public', 'assets', 'images', 'source');

const assets = [
  { name: 'bg-luxury.jpg', id: '1545324418-f1d3ac1ef739' },
  { name: 'bg-highway.jpg', id: '1515162816999-a0c47dc192f7' },
  { name: 'bg-interior.jpg', id: '1502672260266-1c1ef2d93688' }
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
        console.log(`Downloaded: ${asset.name} (${fs.statSync(filePath).size} bytes)`);
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
