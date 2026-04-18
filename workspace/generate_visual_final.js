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
    'Sector Intelligence': 'bg-highway.jpg',
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

const inlineMapping = [
    'bg-construction.jpg', 'bg-interior.jpg', 'bg-office.jpg', 'bg-township.jpg', 'bg-luxury.jpg'
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
    const lines = wrapText(title, 32);
    const escapedTitleLines = lines.map(line => escapeXml(line));
    const width = 1200;
    const height = 630;

    const svgOverlay = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="black" fill-opacity="0.45" />
        <rect x="30" y="30" width="${width-60}" height="${height-60}" fill="none" stroke="#C9A84C" stroke-width="2" stroke-opacity="0.4" />
        <text x="50%" y="100" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#C9A84C" text-anchor="middle" letter-spacing="4">${escapeXml(category.toUpperCase())}</text>
        <g transform="translate(600, 315)">
            ${escapedTitleLines.map((line, i) => `
                <text x="0" y="${(i - (escapedTitleLines.length - 1) / 2) * 75}" font-family="Arial, sans-serif" font-size="60" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle" style="text-shadow: 2px 2px 8px rgba(0,0,0,0.8);">${line}</text>
            `).join('')}
        </g>
        <text x="50%" y="570" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#C9A84C" text-anchor="middle">realtyconsultants.in</text>
    </svg>`;

    const finalPath = path.join(publicDir, outPath.startsWith('/') ? outPath.slice(1) : outPath);
    const dir = path.dirname(finalPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    await sharp(bgPath).resize(width, height).composite([{ input: Buffer.from(svgOverlay), top: 0, left: 0 }]).jpeg({ quality: 85 }).toFile(finalPath);
}

async function generateInline(outPath, index) {
    const bgName = inlineMapping[index % inlineMapping.length];
    const bgPath = path.join(sourceDir, bgName);
    const finalPath = path.join(publicDir, outPath.startsWith('/') ? outPath.slice(1) : outPath);
    const dir = path.dirname(finalPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    await sharp(bgPath).resize(1200, 630).jpeg({ quality: 80 }).toFile(finalPath);
}

async function run() {
    const blogs = Object.keys(imagePlan);
    console.log(`Generating visual assets for ${blogs.length} blogs...`);

    for (const id of blogs) {
        const plan = imagePlan[id];
        try {
            const mdxPath = path.join(blogDir, `${plan.slug}.mdx`);
            if (fs.existsSync(mdxPath)) {
                const { data } = matter(fs.readFileSync(mdxPath, 'utf8'));
                await generateCover(plan.coverImage, data.title || 'Untitled', data.category || 'Real Estate');
                for (let i = 0; i < plan.inlineImages.length; i++) {
                    await generateInline(plan.inlineImages[i].path, i);
                }
                process.stdout.write('.');
            }
        } catch (e) {
            console.error(`\nFailed ${plan.slug}:`, e.message);
        }
    }
    console.log('\nSuccess: Visuals generated.');
}

run();
