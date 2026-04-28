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

  // Fix title
  content = content.replace(/title:\s*`\$\{p\.title\}\s*\|\s*[^`]+`,/g, 'title: `${p.title} | Realty Holding and Management Consultants`,');

  // Enhance openGraph and add twitter card
  // Search for the return block inside generateMetadata
  const regex = /return \{\s*title:\s*`\$\{p\.title\} \| Realty Holding and Management Consultants`,\s*description:.*?,(\s*)openGraph:\s*\{([^}]*)\},?\s*\};/g;

  content = content.replace(regex, (match, spacing, ogInner) => {
    return `return {
    title: \`\${p.title} | Realty Holding and Management Consultants\`,
    description: p.description?.slice(0, 160),
    openGraph: { images: p.images?.[0] ? [{ url: p.images[0] }] : [] },
    twitter: { card: 'summary_large_image', images: p.images?.[0] ? [p.images[0]] : [] },
    icons: { icon: p.images?.[0] || '/favicon.ico', apple: p.images?.[0] || '/favicon.ico' },
  };`;
  });

  // Also add thumbnail meta tag to the JSX
  if (!content.includes('name="thumbnail"')) {
    content = content.replace(/<script\s*type="application\/ld\+json"/i, '<meta name="thumbnail" content={property.images?.[0] || "/favicon.ico"} />\n        <script type="application/ld+json"');
  }

  fs.writeFileSync(file, content);
  console.log('Updated metadata for', file);
});
