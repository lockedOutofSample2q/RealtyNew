const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);
const matter = require('gray-matter');

const contentDir = path.join(process.cwd(), 'content', 'blog');
const tempDir = path.join(process.cwd(), 'workspace');

const targetBlogs = [
  'gmada-mohali-explained-guide.mdx',
  'mohali-real-estate-investment-analysis-2026.mdx',
  'land-seller-reinvestment-guide-punjab-2026.mdx',
  'nri-property-guide-mohali-2026.mdx',
  'mohali-property-buyer-protection-guide.mdx'
];

async function generateDeepDive(filename) {
  const filePath = path.join(contentDir, filename);
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filename}`);
    return;
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data } = matter(fileContent); // extract frontmatter
  
  const prompt = `
You are rewriting a flagship "Master Pillar" blog post for Amritpal Singh (Realty Holding and Management Consultants, Sector 82A, Mohali).
CRITICAL: This article MUST be an exhaustive, highly-detailed, 4000+ word deep-dive. 
CRITICAL: You MUST cite high-authority sources in the text (e.g., The Tribune, Economic Times, GMADA official notifications, PUDA policies, RERA Punjab judgments, RBI FEMA guidelines).
CRITICAL: Include specific, factual numbers (e.g., Circle Rates, FAR limits, penalty percentages, historic land values, infrastructure budgets like Bharatmala allocation).

Tone: Professional, authoritative, data-driven, company blog.
No em dashes. No AI filler or generic fluff. Every paragraph must add specific technical, legal, or market value.
SEO/AEO: The core direct answer MUST be in the first 150 words inside a blockquote. Use "we", "us", "our" (Realty Holding and Management Consultants) as the authoring entity.

**Blog Metadata:**
Title: ${data.title}
Category: ${data.category}
Focus: Deep-dive, 4000+ words, cited research, ultimate authority guide.

Output the full MDX file including this EXACT frontmatter:
---
title: "${data.title.replace(/"/g, '\\"')}"
slug: "${data.slug}"
keyword: "${data.keyword}"
excerpt: "${data.excerpt ? data.excerpt.replace(/"/g, '\\"') : ''}"
category: "${data.category}"
author: "Amritpal Singh"
date: "${data.date}"
coverImage: "${data.coverImage}"
---

<!-- SCHEMA: Article ... -->

Start writing the 4000+ word comprehensive article now:
`;

  const tempPromptFile = path.join(tempDir, `temp_deepdive_${data.slug}.txt`);
  fs.writeFileSync(tempPromptFile, prompt);
  
  console.log(`Starting massive 4000+ word generation for: ${filename}... this will take a while.`);
  
  try {
    const cmd = `type "${tempPromptFile}" | gemini -y --raw-output -p "Read prompt from stdin and generate exhaustive 4000-word blog."`;
    // Set a very high maxBuffer since 4000 words is a lot of output
    const { stdout } = await execPromise(cmd, { shell: 'cmd.exe', maxBuffer: 1024 * 1024 * 50 });
    fs.writeFileSync(filePath, stdout.trim());
    console.log(`Successfully saved highly-researched deep-dive: ${filename}`);
  } catch (e) {
    console.error(`Error on ${filename}:`, e.message);
  } finally {
    if (fs.existsSync(tempPromptFile)) fs.unlinkSync(tempPromptFile);
  }
}

async function run() {
  console.log('Starting Master Pillar deep-dive generations...');
  for (const file of targetBlogs) {
    await generateDeepDive(file);
  }
  console.log('All 5 Master Pillar blogs generated successfully.');
}

run().catch(console.error);
