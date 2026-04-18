const https = require('https');
const fs = require('fs');
const path = require('path');

const dir = path.join(process.cwd(), 'public', 'assets', 'images', 'source');

const assets = [
  { name: 'bg-luxury.jpg', url: 'https://images.unsplash.com/photo-1545324418-f1d3ac1ef739?q=80&w=1200&auto=format&fit=crop' },
  { name: 'bg-highway.jpg', url: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=1200&auto=format&fit=crop' },
  { name: 'gmada.png', url: 'https://gmada.gov.in/themes/puda/logo.png' },
  { name: 'rera.png', url: 'https://rera.punjab.gov.in/images/logo.png' }
];

function download(asset) {
  return new Promise((resolve) => {
    const filePath = path.join(dir, asset.name);
    const file = fs.createWriteStream(filePath);
    
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Referer': 'https://www.google.com/'
      }
    };

    https.get(asset.url, options, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        https.get(res.headers.location, options, (redir) => redir.pipe(file));
      } else if (res.statusCode === 200) {
        res.pipe(file);
      } else {
        console.error(`Failed ${asset.name}: ${res.statusCode}`);
      }
      file.on('finish', () => {
        file.close();
        console.log(`Finished: ${asset.name} (${fs.statSync(filePath).size} bytes)`);
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
