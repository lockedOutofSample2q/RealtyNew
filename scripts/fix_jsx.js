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

  // Fix the bad injected meta tag inside faqSchema condition
  content = content.replace(/<meta name="thumbnail" content=\{property\.images\?\.\[0\] \|\| "\/favicon\.ico"\} \/>/g, '');
  
  // Re-inject it right before <main ...> instead
  content = content.replace(/<main className=/g, '<meta name="thumbnail" content={property.images?.[0] || "/favicon.ico"} />\n    <main className=');

  fs.writeFileSync(file, content);
  console.log('Fixed JSX in', file);
});
