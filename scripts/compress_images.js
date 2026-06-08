const fs = require('fs');
const path = require('path');
const https = require('https');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const dotenv = require('dotenv');

// Load environment variables from .env.local
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
}

const apiKey = process.env.TINYPNG_API_KEY;

if (!apiKey) {
  console.error('Error: TINYPNG_API_KEY is not defined in .env.local');
  process.exit(1);
}

function tinypngCompress(filePath, apiKey) {
  return new Promise((resolve, reject) => {
    const fileBuffer = fs.readFileSync(filePath);
    const auth = 'Basic ' + Buffer.from('api:' + apiKey).toString('base64');

    const options = {
      hostname: 'api.tinify.com',
      path: '/shrink',
      method: 'POST',
      headers: {
        'Authorization': auth,
        'Content-Type': 'application/octet-stream',
        'Content-Length': fileBuffer.length
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode !== 201) {
          reject(new Error(`TinyPNG returned status ${res.statusCode}: ${data}`));
          return;
        }

        try {
          const result = JSON.parse(data);
          const downloadUrl = result.output.url;
          
          https.get(downloadUrl, (downloadRes) => {
            if (downloadRes.statusCode !== 200) {
              reject(new Error(`Failed to download from TinyPNG: ${downloadRes.statusCode}`));
              return;
            }
            const chunks = [];
            downloadRes.on('data', (chunk) => { chunks.push(chunk); });
            downloadRes.on('end', () => {
              const compressedBuffer = Buffer.concat(chunks);
              fs.writeFileSync(filePath, compressedBuffer);
              resolve({
                originalSize: result.input.size,
                compressedSize: result.output.size,
              });
            });
          }).on('error', reject);
        } catch (err) {
          reject(err);
        }
      });
    });

    req.on('error', reject);
    req.write(fileBuffer);
    req.end();
  });
}

async function compressImages() {
  const imgDir = path.join(__dirname, '..', 'public', 'assets', 'images');
  console.log('Scanning for large images in:', imgDir);
  
  try {
    // Windows command to list all jpg/png/jpeg files recursively
    const { stdout } = await exec(`dir /s /b "${imgDir}\\*.jpg" "${imgDir}\\*.png" "${imgDir}\\*.jpeg"`);
    const fileList = stdout.split('\r\n').filter(Boolean);
    
    let totalSaved = 0;

    for (const file of fileList) {
      const stat = fs.statSync(file);
      // Process files larger than 100KB
      if (stat.size > 100 * 1024) {
        console.log(`Compressing ${path.basename(file)} (${(stat.size / 1024).toFixed(1)} KB) using TinyPNG API...`);
        
        try {
          const result = await tinypngCompress(file, apiKey);
          const saved = result.originalSize - result.compressedSize;
          totalSaved += saved;
          console.log(`--> Saved ${(saved / 1024).toFixed(1)} KB (New Size: ${(result.compressedSize / 1024).toFixed(1)} KB)`);
        } catch (err) {
          console.error(`--> Error compressing ${path.basename(file)}:`, err.message);
        }
      }
    }
    console.log(`\nTinyPNG compression complete. Total space saved: ${(totalSaved / 1024 / 1024).toFixed(2)} MB`);
  } catch (error) {
    console.error('Error during image compression:', error);
  }
}

compressImages();