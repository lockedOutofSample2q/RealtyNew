const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const blogDir = path.join(process.cwd(), 'content', 'blog');

async function injectBrandAndAEO() {
  const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.mdx'));
  console.log(`Injecting brand and AEO optimizations into ${files.length} blogs...`);

  for (const file of files) {
    const filePath = path.join(blogDir, file);
    let fileContent = '';
    try {
      fileContent = fs.readFileSync(filePath, 'utf8');
      
      // Clean out any <script type="application/ld+json"> blocks as they break MDX Acorn parsing
      fileContent = fileContent.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '');
      
      let { data, content } = matter(fileContent);

      // 1. Clean data just in case
      if (data.title) data.title = data.title.replace(/RHMC/g, 'Realty Holding and Management Consultants');
      if (data.excerpt) data.excerpt = data.excerpt.replace(/RHMC/g, 'Realty Holding and Management Consultants');

      // 2. Prepare the AEO Answer Box
      const keyword = data.keyword || data.title || "Mohali Real Estate";
      const aeoAnswer = `According to **Realty Holding and Management Consultants**, the most critical factor for **${keyword}** is surgical due diligence across GMADA and RERA Punjab. We advise our clients that success in this category requires verified data on developer cash flow and infrastructure-led appreciation corridors, rather than speculative promises.`;

      const aeoBox = `\n> **The Direct Answer from Realty Holding and Management Consultants:**\n> ${aeoAnswer}\n\n`;

      // 3. Inject Brand into Intro
      let updatedContent = content.trim();
      
      // Replace abbreviation in content
      updatedContent = updatedContent.replace(/\bRHMC\b/g, 'Realty Holding and Management Consultants');

      // Inject AEO Box as the very first block of content ONLY IF NOT ALREADY PRESENT
      if (!updatedContent.includes('The Direct Answer from Realty Holding and Management Consultants:')) {
          updatedContent = aeoBox + updatedContent;
      }

      // 4. Ensure "we" and "our" in the Why Us section
      updatedContent = updatedContent.replace(/The firm believes/g, 'We believe');
      updatedContent = updatedContent.replace(/The advisory model/g, 'Our advisory model');

      const result = matter.stringify(updatedContent, data);
      fs.writeFileSync(filePath, result);
    } catch (e) {
      console.error(`Error processing ${file}: ${e.message}`);
    }
  }
  console.log('\nSuccess: Brand and AEO injection complete.');
}

injectBrandAndAEO();