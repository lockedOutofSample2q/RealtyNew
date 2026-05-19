const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
sharp.cache(false);
const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function compressWebP() {
  const imgDir = path.join('C:\\Users\\Magicbook\\Desktop\\monter\\public\\assets\\images');
  console.log('Scanning for WebP images in:', imgDir);
  
  try {
    // Windows command to list all webp files recursively
    const { stdout } = await exec(`dir /s /b "${imgDir}\\*.webp"`);
    const fileList = stdout.split('\r\n').filter(Boolean);
    
    let totalSaved = 0;
    
    for (const file of fileList) {
      if (file.endsWith('.tmp.webp')) continue;
      const stat = fs.statSync(file);
      // Only process files larger than 100KB
      if (stat.size > 100 * 1024) {
        const sizeMB = (stat.size / 1024).toFixed(1);
        console.log(`Optimizing ${path.basename(file)} (${sizeMB} KB)...`);
        
        const tempFile = file + '.tmp.webp';
        
        // Determine max width
        const isHero = file.toLowerCase().includes('hero');
        const maxWidth = isHero ? 1600 : 1200;
        
        // Use sharp to compress
        await sharp(file)
          .resize({ width: maxWidth, withoutEnlargement: true })
          .webp({ quality: 75, effort: 6 }) // 75% quality, max compression effort
          .toFile(tempFile);
          
        const newStat = fs.statSync(tempFile);
        
        if (newStat.size < stat.size) {
          const savedKB = ((stat.size - newStat.size) / 1024).toFixed(1);
          totalSaved += (stat.size - newStat.size);
          
          fs.unlinkSync(file);
          fs.renameSync(tempFile, file);
          console.log(`--> Saved ${savedKB} KB (New Size: ${(newStat.size / 1024).toFixed(1)} KB)`);
        } else {
          console.log(`--> Already optimal, keeping original.`);
          fs.unlinkSync(tempFile);
        }
      }
    }
    
    console.log(`\nWebP optimization complete. Total space saved: ${(totalSaved / 1024 / 1024).toFixed(2)} MB`);
  } catch (error) {
    console.error('Error during WebP optimization:', error);
  }
}

compressWebP();
