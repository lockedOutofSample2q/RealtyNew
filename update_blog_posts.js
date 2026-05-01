const fs = require('fs');
const path = require('path');
const glob = require('glob');

const blogDir = path.join(process.cwd(), 'content/blog');
const files = glob.sync('*.mdx', { cwd: blogDir });

const ADVISORY_REGEX = /\*\*The Advisory Take:\*\* Success in \*\*(.*?)\*\* hinges on surgical due diligence across GMADA and RERA Punjab\. At RHMC, we prioritize verified developer cash flow data and infrastructure-led corridors over speculative market promises\. Independent evaluation isn't an option: it's the requirement for long-term liquidity\./g;

const BIO_START = "Amritpal Singh is the MD of Realty Holding and Management Consultants";
const BIO_REGEX = /Amritpal Singh is the (?:founder|MD) of Realty Holding and Management Consultants, (.*?)\. With over 10 years across real estate development, government liaisoning, capital markets, and media, he has personally closed 180\+ transactions across all property categories in Punjab\. AMFI and NCFM certified\./g;

const CTA = `If you are evaluating a specific project in Mohali and want an independent read before you commit, [book a 15-minute consultation](/booking). No pitch. No pressure. Just the answer.`;
const NEW_ADDRESS = "E328, Phase 8A, industrial area, mohali";

files.forEach(file => {
  const filePath = path.join(blogDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // 1. Replace Advisory Take
  content = content.replace(ADVISORY_REGEX, (match, keyword) => {
    return `<Callout type="advisory">
Success in **${keyword}** hinges on surgical due diligence across GMADA and RERA Punjab. At RHMC, we prioritize verified developer cash flow data and infrastructure-led corridors over speculative market promises. Independent evaluation isn't an option: it's the requirement for long-term liquidity.
</Callout>`;
  });

  // 2. Standardize Address in Bio
  content = content.replace(BIO_REGEX, (match, oldAddress) => {
    return `Amritpal Singh is the MD of Realty Holding and Management Consultants, ${NEW_ADDRESS}. With over 10 years across real estate development, government liaisoning, capital markets, and media, he has personally closed 180+ transactions across all property categories in Punjab. AMFI and NCFM certified.`;
  });

  // 3. Add Consultation CTA before the first bio
  if (!content.includes(CTA)) {
    const bioIndex = content.indexOf(BIO_START);
    if (bioIndex !== -1) {
      content = content.slice(0, bioIndex) + CTA + "\n\n" + content.slice(bioIndex);
    }
  }

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
