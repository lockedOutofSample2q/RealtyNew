const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const matter = require('gray-matter');

const imagePlanPath = path.join(process.cwd(), 'content', 'images', 'image-plan.json');
const imagePlan = JSON.parse(fs.readFileSync(imagePlanPath, 'utf8'));
const blogDir = path.join(process.cwd(), 'content', 'blog');
const publicDir = path.join(process.cwd(), 'public');
const sourceDir = path.join(publicDir, 'assets', 'images', 'source');

const categoryMapping = {
  'Sector Intelligence': 'bg-luxury.jpg', // Using luxury as fallback for highway
  'Land Seller Series': 'bg-fields.jpg',
  'Buyer Guide': 'bg-luxury.jpg',
  'Investment Thesis': 'bg-commercial.jpg',
  'Legal Updates': 'bg-legal.jpg',
  'Process & Paperwork': 'bg-legal.jpg',
  'Market Analysis': 'bg-finance.jpg',
  'NRI Investor Series': 'bg-luxury.jpg',
  'AEO Anchor & Authority Builders': 'bg-commercial.jpg',
  'Buyer Protection': 'bg-legal.jpg',
  'Foundation & Master Reference': 'bg-luxury.jpg',
  'Investment Tips': 'bg-finance.jpg',
  'Developer Due Diligence': 'bg-luxury.jpg',
  'default': 'bg-luxury.jpg'
};

const inlineVariations = [
  'bg-construction.jpg', 'bg-township.jpg', 'bg-luxury.jpg', 'bg-interior.jpg', 'bg-commercial.jpg'
];

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

async function generateCover(outPath, title, category) {
  const bgName = categoryMapping[category] || categoryMapping.default;
  const bgPath = path.join(sourceDir, bgName);
  const lines = wrapText(title, 35);
  const escapedTitleLines = lines.map(line => escapeXml(line));
  const escapedCategory = escapeXml(category.toUpperCase());
  const width = 1200;
  const height = 630;

  const svgOverlay = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="black" fill-opacity="0.45" />
      <rect x="40" y="40" width="${width - 80}" height="${height - 80}" fill="none" stroke="#C9A84C" stroke-width="2" stroke-opacity="0.5" />
      <text x="50%" y="120" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#C9A84C" text-anchor="middle" letter-spacing="4">${escapedCategory}</text>
      <g transform="translate(600, 315)">
        ${escapedTitleLines.map((line, i) => `
          <text x="0" y="${(i - (escapedTitleLines.length - 1) / 2) * 70}" font-family="Arial, sans-serif" font-size="56" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle" style="text-shadow: 2px 2px 10px rgba(0,0,0,0.7);">${line}</text>
        `).join('')}
      </g>
      <text x="50%" y="560" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#C9A84C" text-anchor="middle">realtyconsultants.in</text>
    </svg>`;

  const finalPath = path.join(publicDir, outPath.startsWith('/') ? outPath.slice(1) : outPath);
  const dir = path.dirname(finalPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  await sharp(bgPath).resize(width, height).composite([{ input: Buffer.from(svgOverlay), top: 0, left: 0 }]).jpeg({ quality: 90 }).toFile(finalPath);
}

async function generateInline(outPath, category, index) {
  // Select a relevant background but don't add any text
  const variation = inlineVariations[index % inlineVariations.length];
  const bgPath = path.join(sourceDir, variation);
  const finalPath = path.join(publicDir, outPath.startsWith('/') ? outPath.slice(1) : outPath);
  const dir = path.dirname(finalPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  await sharp(bgPath).resize(1200, 630).jpeg({ quality: 85 }).toFile(finalPath);
}

async function run() {
  const blogs = Object.keys(imagePlan);
  console.log(`Processing visual transformation for ${blogs.length} blogs...`);

  for (const id of blogs) {
    const plan = imagePlan[id];
    try {
      const mdxPath = path.join(blogDir, `${plan.slug}.mdx`);
      if (fs.existsSync(mdxPath)) {
        const { data } = matter(fs.readFileSync(mdxPath, 'utf8'));
        const category = data.category || 'Real Estate';
        const title = data.title || 'Untitled';

        // Cover image WITH text heading and domain
        await generateCover(plan.coverImage, title, category);

        // Inline images WITHOUT any text
        for (let i = 0; i < plan.inlineImages.length; i++) {
          await generateInline(plan.inlineImages[i].path, category, i);
        }
        process.stdout.write('.');
      }
    } catch (e) {
      console.error(`\nFailed ${plan.slug}:`, e.message);
    }
  }
  console.log('\nSuccess: Visuals generated as per strict guidelines.');
}

run();
