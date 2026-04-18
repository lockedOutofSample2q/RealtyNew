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

const logoMapping = {
    'Legal Updates': 'rera.png',
    'Buyer Protection': 'rera.png',
    'Sector Intelligence': 'gmada.png',
    'Process & Paperwork': 'gmada.png'
};

function escapeXml(unsafe) {
    return unsafe.replace(/[<>&"']/g, (c) => {
        switch (c) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case '"': return '&quot;';
            case "'": return '&apos;';
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

async function generateComposite(outPath, title, category, isCover = true) {
    const bgName = categoryMapping[category] || categoryMapping.default;
    const bgPath = path.join(sourceDir, bgName);
    const logoName = logoMapping[category];
    
    const lines = wrapText(title, isCover ? 30 : 40);
    const escapedTitleLines = lines.map(line => escapeXml(line));
    const escapedCategory = escapeXml(category.toUpperCase());

    const width = 1200;
    const height = 630;

    // SVG Overlay (Text + Dimming)
    const svgOverlay = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <!-- Semi-transparent overlay for readability -->
        <rect width="100%" height="100%" fill="black" fill-opacity="0.5" />
        
        <!-- Subtle gradient border -->
        <rect x="20" y="20" width="${width-40}" height="${height-40}" fill="none" stroke="#C9A84C" stroke-width="2" stroke-opacity="0.4" />

        <!-- Category -->
        <text x="50%" y="100" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#C9A84C" text-anchor="middle" letter-spacing="4">${escapedCategory}</text>
        
        <!-- Title -->
        <g transform="translate(600, 315)">
            ${escapedTitleLines.map((line, i) => `
                <text x="0" y="${(i - (escapedTitleLines.length - 1) / 2) * (isCover ? 70 : 55)}" 
                      font-family="Arial, sans-serif" 
                      font-size="${isCover ? 56 : 42}" 
                      font-weight="bold" 
                      fill="white" 
                      text-anchor="middle" 
                      dominant-baseline="middle"
                      style="text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">${line}</text>
            `).join('')}
        </g>

        <!-- Website URL Overlay -->
        <text x="50%" y="560" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#C9A84C" text-anchor="middle">realtyconsultants.in</text>
        <text x="50%" y="590" font-family="Arial, sans-serif" font-size="14" fill="white" fill-opacity="0.7" text-anchor="middle">Sector 82A, Mohali | Independent Property Advisory</text>
    </svg>`;

    const finalPath = path.join(publicDir, outPath.startsWith('/') ? outPath.slice(1) : outPath);
    const dir = path.dirname(finalPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    try {
        let composites = [
            { input: Buffer.from(svgOverlay), top: 0, left: 0 }
        ];

        // Add logo if relevant
        if (logoName) {
            const logoPath = path.join(sourceDir, logoName);
            if (fs.existsSync(logoPath)) {
                const logoBuffer = await sharp(logoPath).resize(120).toBuffer();
                composites.push({ input: logoBuffer, top: 40, left: width - 160 });
            }
        }

        await sharp(bgPath)
            .resize(width, height)
            .composite(composites)
            .jpeg({ quality: 85 })
            .toFile(finalPath);
            
    } catch (err) {
        console.error(`Error processing ${outPath}:`, err.message);
    }
}

async function run() {
    const blogs = Object.keys(imagePlan);
    console.log(`Generating visual composites for ${blogs.length} blogs...`);

    for (const id of blogs) {
        const plan = imagePlan[id];
        try {
            const mdxPath = path.join(blogDir, `${plan.slug}.mdx`);
            if (fs.existsSync(mdxPath)) {
                const { data } = matter(fs.readFileSync(mdxPath, 'utf8'));
                const category = data.category || 'Real Estate';
                const title = data.title || 'Untitled';

                await generateComposite(plan.coverImage, title, category, true);
                for (const img of plan.inlineImages) {
                    await generateComposite(img.path, img.title, category, false);
                }
                process.stdout.write('.');
            }
        } catch (e) {
            console.error(`\nFailed blog ${plan.slug}:`, e.message);
        }
    }
    console.log('\nSuccess: All visual composites generated.');
}

run();
