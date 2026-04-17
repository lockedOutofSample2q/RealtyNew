const https = require('https');
const fs = require('fs');
const path = require('path');

const backgroundsDir = path.join(process.cwd(), 'public', 'assets', 'images', 'backgrounds');
if (!fs.existsSync(backgroundsDir)) {
    fs.mkdirSync(backgroundsDir, { recursive: true });
}

const images = [
    { name: 'infrastructure.jpg', url: 'https://images.unsplash.com/photo-1545143333-573a7a48147e?auto=format&fit=crop&w=1200&q=80' },
    { name: 'agriculture.jpg', url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80' },
    { name: 'residential.jpg', url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80' },
    { name: 'commercial.jpg', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80' },
    { name: 'legal.jpg', url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80' },
    { name: 'finance.jpg', url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80' }
];

async function download(image) {
    const file = fs.createWriteStream(path.join(backgroundsDir, image.name));
    return new Promise((resolve, reject) => {
        https.get(image.url, {
            headers: { 'User-Agent': 'Mozilla/5.0' }
        }, response => {
            if (response.statusCode === 302 || response.statusCode === 301) {
                // Handle redirect
                https.get(response.headers.location, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
                    res.pipe(file);
                    file.on('finish', () => { file.close(); resolve(); });
                });
            } else if (response.statusCode === 200) {
                response.pipe(file);
                file.on('finish', () => { file.close(); resolve(); });
            } else {
                reject(new Error(`Failed to download ${image.name}: ${response.statusCode}`));
            }
        }).on('error', err => {
            fs.unlink(path.join(backgroundsDir, image.name), () => {});
            reject(err);
        });
    });
}

async function run() {
    for (const img of images) {
        console.log(`Downloading ${img.name}...`);
        try {
            await download(img);
        } catch (e) {
            console.error(e.message);
        }
    }
}

run();
