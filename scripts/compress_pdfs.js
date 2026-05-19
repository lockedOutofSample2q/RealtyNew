const fs = require('fs');
const path = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function compressPDFs() {
  const pdfDir = path.join('C:\\Users\\Magicbook\\Desktop\\monter\\public\\documents\\maps');
  console.log('Scanning for large PDFs in:', pdfDir);
  
  try {
    const { stdout } = await exec(`dir /s /b "${pdfDir}\\*.pdf"`);
    const fileList = stdout.split('\r\n').filter(Boolean);
    
    for (const file of fileList) {
      const stat = fs.statSync(file);
      // Process files larger than 3MB
      if (stat.size > 1024 * 1024 * 3) {
        console.log(`Compressing ${file} (${(stat.size / 1024 / 1024).toFixed(2)}MB)...`);
        
        const tempFile = file + '.tmp.pdf';
        
        // Use ghostscript to compress PDF
        // Note: gswin64c is the typical ghostscript executable on Windows
        try {
          await exec(`gswin64c -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/ebook -dNOPAUSE -dQUIET -dBATCH -sOutputFile="${tempFile}" "${file}"`);
          
          const newStat = fs.statSync(tempFile);
          console.log(`--> Compressed to ${(newStat.size / 1024 / 1024).toFixed(2)}MB`);
          
          if (newStat.size < stat.size) {
            fs.unlinkSync(file);
            fs.renameSync(tempFile, file);
          } else {
            console.log(`--> Compression didn't reduce size, keeping original.`);
            fs.unlinkSync(tempFile);
          }
        } catch (e) {
          console.error(`Failed to compress ${file}:`, e.message);
          if (fs.existsSync(tempFile)) fs.unlinkSync(tempFile);
        }
      }
    }
    console.log('PDF compression complete.');
  } catch (error) {
    console.error('Error during PDF compression:', error);
  }
}

compressPDFs();