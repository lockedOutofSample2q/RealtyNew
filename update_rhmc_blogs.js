const fs = require('fs');
const path = require('path');

const files = [
  'mohali-real-estate-guide-2026.mdx',
  'mohali-real-estate-investment-analysis-2026.mdx',
  'mohali-real-estate-market-update-2026.mdx',
  'mohali-real-estate-outlook-2026-honest-assessment.mdx',
  'mohali-sco-investment-due-diligence-commercial.mdx',
  'mohali-sector-property-guide-2026.mdx',
  'mohali-vs-chandigarh-property-2026.mdx'
];

const blogDir = path.join(process.cwd(), 'content/blog');

const ADVISORY_REGEX = /\*\*The Advisory Take:\*\* Success in \*\*(.*?)\*\* hinges on surgical due diligence across GMADA and RERA Punjab\. At RHMC, we prioritize verified developer cash flow data and infrastructure-led corridors over speculative market promises\. Independent evaluation isn't an option: it's the requirement for long-term liquidity\./g;

const NEW_BIO_BOLD = "**Amritpal Singh** is the founder of Realty Holding & Management Consultants, Sector 82A, Mohali. With over 10 years across real estate development, government liaisoning, capital markets, and media, he has personally closed 180+ transactions across all property categories in Punjab. AMFI and NCFM certified.";
const NEW_BIO_PLAIN = "Amritpal Singh is the founder of Realty Holding & Management Consultants, Sector 82A, Mohali. With over 10 years across real estate development, government liaisoning, capital markets, and media, he has personally closed 180+ transactions across all property categories in Punjab. AMFI and NCFM certified.";

const CTA = `If you are evaluating a specific project in Mohali and want an independent read before you commit, [book a 15-minute consultation](/booking). No pitch. No pressure. Just the answer.`;

files.forEach(fileName => {
  const filePath = path.join(blogDir, fileName);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Cleanup previous mess
  content = content.replace(/^---[\s\S]*?---/, (match) => {
      return match.replace(/This (post|guide) is a companion to our master.*?\)/g, '')
                  .replace(/^\. /m, '');
  });
  content = content.replace(/<Callout type="advisory">[\s\S]*?This (post|guide) is a companion to our master.*?\)/g, (match) => {
      return match.replace(/This (post|guide) is a companion to our master.*?\)/g, '');
  });

  // 2. Advisory Callout (ensure format)
  if (!content.includes('<Callout type="advisory">')) {
      content = content.replace(ADVISORY_REGEX, (match, keyword) => {
        return `<Callout type="advisory">
Success in **${keyword}** hinges on surgical due diligence across GMADA and RERA Punjab. At RHMC, we prioritize verified developer cash flow data and infrastructure-led corridors over speculative market promises. Independent evaluation isn't an option: it's the requirement for long-term liquidity.
</Callout>`;
      });
  }

  // 3. Inject Guide Link in first body paragraph (AFTER Callout and SCHEMA)
  const companionLink = fileName === 'mohali-real-estate-guide-2026.mdx' 
    ? 'This guide is a companion to our [Mohali Real Estate Glossary](/blog/mohali-real-estate-glossary-terms). '
    : 'This post is a companion to our master [Mohali Real Estate Guide 2026](/blog/mohali-real-estate-guide-2026). ';

  if (!content.includes('companion to our')) {
      // Find the first paragraph that isn't a callout, schema, frontmatter, or heading
      let lines = content.split('\n');
      let inFrontmatter = false;
      let frontmatterCount = 0;
      let firstParaIndex = -1;

      for (let i = 0; i < lines.length; i++) {
          const line = lines[i].trim();
          if (line === '---') {
              frontmatterCount++;
              continue;
          }
          if (frontmatterCount < 2) continue;
          
          if (line && !line.startsWith('<') && !line.startsWith('{/*') && !line.startsWith('@') && !line.startsWith('headline') && !line.startsWith('author') && !line.startsWith('date') && !line.startsWith('*/}') && !line.startsWith('>') && !line.startsWith('#')) {
              firstParaIndex = i;
              break;
          }
      }

      if (firstParaIndex !== -1) {
          lines[firstParaIndex] = companionLink + lines[firstParaIndex];
          content = lines.join('\n');
      }
  }

  // 4. Bio and CTA
  const ANY_BIO_REGEX = /(?:\*\*|)Amritpal Singh(?:\*\*|) is the founder of Realty Holding (?:and|&) Management Consultants, .*?\. With over 10 years across real estate development, government liaisoning, capital markets, and media, he has personally closed 180\+ transactions across all property categories in Punjab\. AMFI and NCFM certified\./g;

  let ctaAdded = content.includes('/booking');
  content = content.replace(ANY_BIO_REGEX, (match) => {
    if (!ctaAdded) {
        ctaAdded = true;
        return CTA + "\n\n" + (match.startsWith('**') ? NEW_BIO_BOLD : NEW_BIO_PLAIN);
    } else {
        return match.startsWith('**') ? NEW_BIO_BOLD : NEW_BIO_PLAIN;
    }
  });

  // 5. Remove images
  content = content.replace(/!\[.*?\]\(.*?\)/g, '');
  content = content.replace(/<Image.*?\/>/g, '');
  content = content.replace(/<img.*?>/g, '');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Processed ${fileName}`);
});
