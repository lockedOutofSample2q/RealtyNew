const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const matter = require('gray-matter');

const imagePlanPath = path.join(process.cwd(), 'content', 'images', 'image-plan.json');
const imagePlan = JSON.parse(fs.readFileSync(imagePlanPath, 'utf8'));
const blogDir = path.join(process.cwd(), 'content', 'blog');
const publicDir = path.join(process.cwd(), 'public');
const sourceDir = path.join(publicDir, 'assets', 'images', 'source');

// Clean out small/broken files before processing
const verifiedFiles = fs.readdirSync(sourceDir).filter(f => f.startsWith('ind_') && fs.statSync(path.join(sourceDir, f)).size > 5000);
console.log(`Verified source files: ${verifiedFiles.join(', ')}`);

const mapping = {
  'Sector Intelligence': ['ind_lux_1.jpg', 'ind_work_2.jpg'],
  'Land Seller Series': ['ind_land_1.jpg', 'ind_land_2.jpg'],
  'Buyer Guide': ['ind_lux_1.jpg', 'ind_work_2.jpg'],
  'Investment Thesis': ['ind_lux_1.jpg', 'ind_work_2.jpg'],
  'Legal Updates': ['ind_work_1.jpg', 'ind_work_2.jpg'],
  'Process & Paperwork': ['ind_work_1.jpg', 'ind_work_2.jpg'],
  'Market Analysis': ['ind_lux_1.jpg', 'ind_work_1.jpg'],
  'NRI Investor Series': ['ind_lux_1.jpg', 'ind_work_2.jpg'],
  'AEO Anchor & Authority Builders': ['ind_lux_1.jpg', 'ind_work_2.jpg'],
  'Buyer Protection': ['ind_work_1.jpg', 'ind_work_2.jpg'],
  'Foundation & Master Reference': ['ind_lux_1.jpg', 'ind_land_1.jpg'],
  'Investment Tips': ['ind_work_1.jpg', 'ind_lux_1.jpg'],
  'Developer Due Diligence': ['ind_lux_1.jpg', 'ind_work_2.jpg'],
  'default': ['ind_lux_1.jpg', 'ind_land_1.jpg', 'ind_work_1.jpg']
};

function escapeXml(unsafe) {
  return unsafe.replace(/[<>&"']/g, (c) => {
    switch (c) {
      case '<': return '&lt;'; case '>': return '&gt;'; case '&': return '&amp;'; case '"': return '&quot;'; case "'": return '&apos;';
    }
  });
}

function wrapText(text, maxChars) {
  const words = text.split(' ');
  const lines = [];
  let currentLine = '';
  words.forEach(word => {
    if ((currentLine + word).length > maxChars) {
      lines.push(currentLine.trim());
      currentLine = word + ' ';
    } else {
      currentLine += word + ' ';
    }
  });
  lines.push(currentLine.trim());
  return lines;
}

async function generateCover(outPath, title, category, seed) {
  const pool = mapping[category] || mapping.default;
  const bgName = pool[seed % pool.length];
  const bgPath = path.join(sourceDir, bgName);
  
  const lines = wrapText(title, 32);
  const escapedTitleLines = lines.map(line => escapeXml(line));
  const width = 1200;
  const height = 630;

  const svgOverlay = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="black" fill-opacity="0.5" />
      <rect x="40" y="40" width="${width-80}" height="${height-80}" fill="none" stroke="#C9A84C" stroke-width="2" stroke-opacity="0.4" />
      <text x="50%" y="100" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#C9A84C" text-anchor="middle" letter-spacing="5">${escapeXml(category.toUpperCase())}</text>
      <g transform="translate(600, 315)">
        ${escapedTitleLines.map((line, i) => `
          <text x="0" y="${(i - (escapedTitleLines.length - 1) / 2) * 75}" font-family="Arial, sans-serif" font-size="56" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle" style="text-shadow: 2px 2px 10px rgba(0,0,0,0.8);">${line}</text>
        `).join('')}
      </g>
      <text x="50%" y="570" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#C9A84C" text-anchor="middle">realtyconsultants.in</text>
    </svg>`;

  const finalPath = path.join(publicDir, outPath.startsWith('/') ? outPath.slice(1) : outPath);
  const dir = path.dirname(finalPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  await sharp(bgPath).resize(width, height).composite([{ input: Buffer.from(svgOverlay), top: 0, left: 0 }]).jpeg({ quality: 90 }).toFile(finalPath);
}

async function generateInline(outPath, seed) {
  const bgName = verifiedFiles[seed % verifiedFiles.length];
  const bgPath = path.join(sourceDir, bgName);
  const finalPath = path.join(publicDir, outPath.startsWith('/') ? outPath.slice(1) : outPath);
  const dir = path.dirname(finalPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  await sharp(bgPath).resize(1200, 630).jpeg({ quality: 85 }).toFile(finalPath);
}

async function run() {
  const blogs = Object.keys(imagePlan);
  console.log(`Generating INDIAN/LOCALIZED visual assets for ${blogs.length} blogs...`);

  let count = 0;
  for (const id of blogs) {
    const plan = imagePlan[id];
    try {
      const mdxPath = path.join(blogDir, `${plan.slug}.mdx`);
      if (fs.existsSync(mdxPath)) {
        const { data } = matter(fs.readFileSync(mdxPath, 'utf8'));
        const seed = parseInt(id);

        await generateCover(plan.coverImage, data.title || 'Untitled', data.category || 'Real Estate', seed);
        for (let i = 0; i < plan.inlineImages.length; i++) {
          await generateInline(plan.inlineImages[i].path, seed + i + 1000);
        }
        count++;
        if (count % 10 === 0) process.stdout.write(`${count}...`);
      }
    } catch (e) {
      console.error(`\nFailed ${plan.slug}:`, e.message);
    }
  }
  console.log('\nSuccess: Localized visual transformation complete.');
}

run();
