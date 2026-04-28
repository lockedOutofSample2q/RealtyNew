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

  // Find the exact block
  const start = content.indexOf('export async function generateMetadata');
  if (start === -1) return;
  
  // Find the closing brace of the function
  let end = -1;
  let braceCount = 0;
  let started = false;
  
  for (let i = start; i < content.length; i++) {
    if (content[i] === '{') {
      braceCount++;
      started = true;
    } else if (content[i] === '}') {
      braceCount--;
    }
    
    if (started && braceCount === 0) {
      end = i;
      break;
    }
  }
  
  if (end === -1) return;
  
  const originalBlock = content.substring(start, end + 1);
  
  const newBlock = `export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const p = await getProperty(params.slug);
  if (!p) return {};
  
  // Strip any existing brand names from the DB title so they don't get double-appended
  const cleanTitle = p.title.replace(/\\s*\\|\\s*Monte Real Estate/gi, '').replace(/\\s*\\|\\s*Realty Holding and Management Consultants/gi, '');

  return {
    title: cleanTitle,
    description: p.description?.slice(0, 160),
    openGraph: { images: p.images?.[0] ? [{ url: p.images[0] }] : [] },
    twitter: { card: 'summary_large_image', images: p.images?.[0] ? [p.images[0]] : [] },
    icons: { icon: p.images?.[0] || '/favicon.ico', apple: p.images?.[0] || '/favicon.ico' },
    other: {
      thumbnail: p.images?.[0] || '/favicon.ico'
    }
  };
}`;

  content = content.replace(originalBlock, newBlock);
  fs.writeFileSync(file, content);
  console.log('Fixed', file);
});
