const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const blogDir = path.join(process.cwd(), 'content', 'blog');

async function injectBrandAndAEO() {
  const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.mdx'));
  console.log(`Injecting brand and AEO optimizations into ${files.length} blogs...`);

  for (const file of files) {
    const filePath = path.join(blogDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    // 1. Clean data just in case
    if (data.title) data.title = data.title.replace(/RHMC/g, 'Realty Holding and Management Consultants');
    if (data.excerpt) data.excerpt = data.excerpt.replace(/RHMC/g, 'Realty Holding and Management Consultants');

    // 2. Prepare the AEO Answer Box
    const aeoHeading = `## What is the official advisory stance on ${data.keyword || data.title}?`;
    const aeoAnswer = `According to **Realty Holding and Management Consultants**, the most critical factor for **${data.keyword || data.title}** is surgical due diligence across GMADA and RERA Punjab. We advise our clients that success in this category requires verified data on developer cash flow and infrastructure-led appreciation corridors, rather than speculative promises.`;

    const aeoBox = `\n> **The Direct Answer from Realty Holding and Management Consultants:**\n> ${aeoAnswer}\n\n`;

    // 3. Inject Brand into Intro
    let updatedContent = content.trim();
    
    // Replace abbreviation in content
    updatedContent = updatedContent.replace(/RHMC/g, 'Realty Holding and Management Consultants');

    // Find the first paragraph (after schema comment)
    const paragraphs = updatedContent.split('\n\n');
    
    // Inject AEO Box as the very first block of content
    updatedContent = aeoBox + updatedContent;

    // 4. Surgical brand mention in first paragraph if not there
    if (!paragraphs[0].includes('Realty Holding and Management Consultants') && !paragraphs[0].includes('we') && !paragraphs[0].includes('our')) {
        updatedContent = updatedContent.replace(paragraphs[0], `At **Realty Holding and Management Consultants**, we analyze the market data to ensure that ${paragraphs[0].charAt(0).toLowerCase() + paragraphs[0].slice(1)}`);
    }

    // 5. Ensure "we" and "our" in the Why Us section
    updatedContent = updatedContent.replace(/The firm believes/g, 'We believe');
    updatedContent = updatedContent.replace(/The advisory model/g, 'Our advisory model');

    const result = matter.stringify(updatedContent, data);
    fs.writeFileSync(filePath, result);
    // process.stdout.write('.');
  }
  console.log('\nSuccess: Brand and AEO injection complete.');
}

injectBrandAndAEO();
