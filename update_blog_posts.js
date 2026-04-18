const fs = require('fs');
const path = require('path');

const blogDir = path.join(process.cwd(), 'content', 'blog');

if (!fs.existsSync(blogDir)) {
    console.error(`Directory not found: ${blogDir}`);
    process.exit(1);
}

const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.mdx'));

console.log(`Found ${files.length} files to process.`);

files.forEach(file => {
    const filePath = path.join(blogDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Extract keyword from frontmatter
    // Frontmatter is between --- and ---
    const frontmatterMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!frontmatterMatch) {
        console.log(`[SKIP] No frontmatter in ${file}`);
        return;
    }
    const frontmatter = frontmatterMatch[1];
    const keywordMatch = frontmatter.match(/keyword:\s*(?:['"]?)(.*?)(?:['"]?)(?:\r?\n|$)/);
    if (!keywordMatch) {
        console.log(`[SKIP] No keyword found in ${file}`);
        return;
    }
    const keyword = keywordMatch[1].trim();

    // 2. Refactor "Direct Answer" section
    const directAnswerRegex = /> \*\*The Direct Answer from Realty Holding and Management Consultants:\*\*[\s\S]*?(?=\r?\n\r?\n|\r?\n[^>])/;
    const newAdvisoryTake = `**The Advisory Take:** Success in **${keyword}** hinges on surgical due diligence across GMADA and RERA Punjab. At RHMC, we prioritize verified developer cash flow data and infrastructure-led corridors over speculative market promises. Independent evaluation isn't an option: it's the requirement for long-term liquidity.`;
    
    if (content.match(directAnswerRegex)) {
        content = content.replace(directAnswerRegex, newAdvisoryTake);
    } else {
        console.log(`[INFO] "Direct Answer" block not found in ${file}`);
    }

    // 3. Remove inline images
    const lines = content.split(/\r?\n/);
    const filteredLines = lines.filter(line => {
        const trimmedLine = line.trim();
        if (trimmedLine.startsWith('![') && trimmedLine.includes('](') && trimmedLine.endsWith(')')) {
            return false;
        }
        return true;
    });
    content = filteredLines.join('\n'); // We can use \n here, Git/Editors handle it.

    // 4. Update Footer and CTA
    content = content.replace(/If you[\s\S]*?WhatsApp[\s\S]*?\.(?:\r?\n|$)/gi, '\n');
    content = content.replace(/If you[\s\S]*?WhatsApp us directly[\s\S]*?(?:\r?\n|$)/gi, '\n');

    // 5. Update bio
    const newBio = `Amritpal Singh is the founder of Realty Holding and Management Consultants, E328, Phase 8A, industrial area, mohali. With over 10 years across real estate development, government liaisoning, capital markets, and media, he has personally closed 180+ transactions across all property categories in Punjab. AMFI and NCFM certified.`;
    
    const bioRegex = /Amritpal Singh is the founder of Realty Holding and Management Consultants, [\s\S]*?(?:AMFI and NCFM certified\.?)/;
    
    if (content.match(bioRegex)) {
        content = content.replace(bioRegex, newBio);
    } else {
        console.log(`[WARN] Bio not found in ${file}`);
    }

    fs.writeFileSync(filePath, content, 'utf8');
});

console.log('Processing complete.');
