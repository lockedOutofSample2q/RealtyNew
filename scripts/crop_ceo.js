const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function cropCeoImage() {
  const sourcePath = path.join(process.cwd(), 'public/assets/images/about/ceo.png');
  const destPath = path.join(process.cwd(), 'public/assets/images/leadership/amritpal.jpg');

  if (!fs.existsSync(sourcePath)) {
    console.error(`Source image not found at ${sourcePath}`);
    return;
  }

  try {
    // Ensure destination directory exists
    const destDir = path.dirname(destPath);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    // Crop to square (centered) and save as jpg
    await sharp(sourcePath)
      .resize(800, 800, {
        fit: 'cover',
        position: 'top' // Usually better for portraits to keep the head
      })
      .jpeg({ quality: 90 })
      .toFile(destPath);

    console.log(`Successfully cropped and saved to ${destPath}`);
  } catch (error) {
    console.error('Error processing image:', error);
  }
}

cropCeoImage();
