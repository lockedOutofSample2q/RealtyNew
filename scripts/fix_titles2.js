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

  // We find the block of generateMetadata and replace its return statement entirely.
  content = content.replace(/export async function generateMetadata.*?return \{[\s\S]*?\};\n\}/g, (match) => {
    return match.replace(/return \{[\s\S]*?\};\n\}/, `return {
    title: \`\${p.title} | Realty Holding and Management Consultants\`,
    description: p.description?.slice(0, 160),
    openGraph: { images: p.images?.[0] ? [{ url: p.images[0] }] : [] },
    twitter: { card: 'summary_large_image', images: p.images?.[0] ? [p.images[0]] : [] },
    icons: { icon: p.images?.[0] || '/favicon.ico', apple: p.images?.[0] || '/favicon.ico' },
  };
}`);
  });

  fs.writeFileSync(file, content);
  console.log('Fixed', file);
});
