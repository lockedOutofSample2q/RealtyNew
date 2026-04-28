const fs = require('fs');

const files = [
  'c:/Users/Magicbook/Desktop/monter/app/(site)/apartments/[slug]/page.tsx',
  'c:/Users/Magicbook/Desktop/monter/app/(site)/properties/[slug]/page.tsx',
  'c:/Users/Magicbook/Desktop/monter/app/(site)/houses/[slug]/page.tsx',
  'c:/Users/Magicbook/Desktop/monter/app/(site)/lands/[slug]/page.tsx'
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');

  // Change outermost div to <main>
  content = content.replace(/<div className="bg-white min-h-screen pt-\[var\(--nav-height\)\].*?">/, '<main className="bg-white min-h-screen pt-[var(--nav-height)]">');

  // Change <div className="container-site pb-24"> to <article className="container-site pb-24">
  content = content.replace(/<div className="container-site pb-24">/, '<article className="container-site pb-24">');

  // Replace last two closing divs with </article></main>
  content = content.replace(/<\/div>\s*<\/div>\s*\);\s*}\s*$/, '</article>\n    </main>\n    </>\n  );\n}\n');

  // Generate FAQ Schema
  const jsonLdCode = `
  // Generate FAQ Schema
  let faqSchema = null;
  if ((property.faqs?.length ?? 0) > 0) {
    faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": property.faqs!.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };
  }

  return (
    <>
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}`;

  // Find the return statement
  if (!content.includes('faqSchema = null;')) {
    content = content.replace(/return \(\s*<main/, jsonLdCode + '\n    <main');
  }

  fs.writeFileSync(file, content);
  console.log('Updated', file);
});
