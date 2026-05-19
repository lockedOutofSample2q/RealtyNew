const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function compressImages() {
  const imgDir = path.join('C:\\Users\\Magicbook\\Desktop\\monter\\public\\assets\\images');
  console.log('Scanning for large images in:', imgDir);
  
  try {
    // Windows command to list all jpg/png/jpeg files recursively
    const { stdout } = await exec(`dir /s /b "${imgDir}\\*.jpg" "${imgDir}\\*.png" "${imgDir}\\*.jpeg"`);
    const fileList = stdout.split('\r\n').filter(Boolean);
    
    for (const file of fileList) {
      const stat = fs.statSync(file);
      // Only process files larger than 1MB
      if (stat.size > 1024 * 1024) {
        console.log(`Compressing ${file} (${(stat.size / 1024 / 1024).toFixed(2)}MB)...`);
        
        const tempFile = file + '.tmp';
        
        // Use sharp to compress and resize
        await sharp(file)
          .resize({ width: 1920, withoutEnlargement: true }) // Max width 1920px
          .webp({ quality: 80 }) // Convert to webp with 80% quality
          .toFile(tempFile);
          
        // Rename original file to backup
        const ext = path.extname(file);
        const newFileName = file.replace(ext, '.webp');
        
        fs.unlinkSync(file);
        fs.renameSync(tempFile, newFileName);
        
        console.log(`--> Saved as ${newFileName}`);
      }
    }
    console.log('Image compression complete.');
  } catch (error) {
    console.error('Error during image compression:', error);
  }
}

compressImages();