const https = require('https');
const fs = require('fs');
const path = require('path');

const dir = path.join(process.cwd(), 'public', 'assets', 'images', 'source');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

// A curated list of 50+ high-end architectural and landscape IDs from Unsplash
const expandedAssets = [
  // INFRASTRUCTURE & HIGHWAY (Clean, modern)
  { name: 'infra_1.jpg', id: '1545143333-573a7a48147e' },
  { name: 'infra_2.jpg', id: '1515162816999-a0c47dc192f7' },
  { name: 'infra_3.jpg', id: '1590483736148-3c1a30226248' },
  { name: 'infra_4.jpg', id: '1476712395872-c2971d88be7d' },
  
  // LUXURY RESIDENTIAL (Exteriors, modern glass)
  { name: 'lux_ext_1.jpg', id: '1512917774534-00d6fe94bb92' },
  { name: 'lux_ext_2.jpg', id: '1600585154340-be6161a56a0c' },
  { name: 'lux_ext_3.jpg', id: '1480074568708-e7b720bb3f09' },
  { name: 'lux_ext_4.jpg', id: '1513584684374-8bdb74ec9bd1' },
  { name: 'lux_ext_5.jpg', id: '1564013799919-ab600027ffc6' },
  
  // MODERN INTERIORS
  { name: 'int_1.jpg', id: '1502672260266-1c1ef2d93688' },
  { name: 'int_2.jpg', id: '1618221195710-dd6b41fa912c' },
  { name: 'int_3.jpg', id: '1556912177-849a0640bb0b' },
  
  // AGRICULTURE & LAND (Lush, green, premium)
  { name: 'land_1.jpg', id: '1500382017468-9049fed747ef' },
  { name: 'land_2.jpg', id: '1500628550463-c8881a54d4d4' },
  { name: 'land_3.jpg', id: '1473448912268-2022ce9509d8' },
  
  // COMMERCIAL & OFFICE
  { name: 'comm_1.jpg', id: '1486406146926-c627a92ad1ab' },
  { name: 'comm_2.jpg', id: '1497366216548-37526070297c' },
  { name: 'comm_3.jpg', id: '1497215728101-856f4ea42174' },
  
  // ADDITIONAL ARCHITECTURAL DETAILS
  { name: 'arch_1.jpg', id: '1460317442991-0ec239397148' },
  { name: 'arch_2.jpg', id: '1524813686514-a57563d77965' }
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
  console.log("Purging old backgrounds...");
  fs.readdirSync(dir).forEach(file => fs.unlinkSync(path.join(dir, file)));
  
  console.log("Downloading new premium asset pool...");
  for (const asset of expandedAssets) {
    await download(asset);
  }
}

start();
