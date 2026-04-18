const https = require('https');
const fs = require('fs');
const path = require('path');

const dir = path.join(process.cwd(), 'public', 'assets', 'images', 'source');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const assets = [
    // Logos
    { name: 'rera.png', url: 'https://rera.punjab.gov.in/images/logo.png' },
    { name: 'gmada.png', url: 'https://gmada.gov.in/themes/puda/logo.png' },
    
    // Backgrounds (Using direct Unsplash source URLs)
    { name: 'bg-highway.jpg', url: 'https://images.unsplash.com/photo-1545143333-573a7a48147e?q=80&w=1200&auto=format&fit=crop' },
    { name: 'bg-fields.jpg', url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200&auto=format&fit=crop' },
    { name: 'bg-luxury.jpg', url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop' },
    { name: 'bg-commercial.jpg', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop' },
    { name: 'bg-legal.jpg', url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1200&auto=format&fit=crop' },
    { name: 'bg-finance.jpg', url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1200&auto=format&fit=crop' }
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
            console.error(`Error downloading ${asset.name}:`, err.message);
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
