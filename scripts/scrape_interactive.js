import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const flats = [
  { "title": "TDI Wellington Heights | 2-4 BHK in Sector 117, Mohali" },
  { "title": "Jubilee Twinto | 1 BHK in Sector 112, Mohali" },
  { "title": "ATS Casa Espana | 3 & 4 BHK in Sector 121, Mohali" },
  { "title": "Jubilee City Gardens Mohali | Plots & 3BHK, Sector 116" },
  { "title": "Jubilee Vallum | 3 & 4 BHK in Sector 91, Mohali" },
  { "title": "Homeland Regalia Mohali | Luxury 3/4/5 BHK on Airport Road" },
  { "title": "Noble Callista Mohali | 3.5/4.5/5.5 BHK, Sector 66B IT City" },
  { "title": "Noble Magnollia | 3-5 BHK in Sector 88, Mohali" },
  { "title": "Homeland Heights | 3 BHK in Sector 70, Mohali" },
  { "title": "KLV Signature Towers | 4 & 5 BHK in Sector 66A, Mohali" },
  { "title": "GMADA Purab Premium Apartments | 3 BHK in Sector 88, Mohali" },
  { "title": "Horizon Belmond Mohali | 3+1/4+1 BHK, Sector 88 Mohali" },
  { "title": "Ambika La Parisian Mohali | 2/3/4 BHK Sector 66B IT City" },
  { "title": "Evoq Antalia Mohali | Ultra-Luxury 3/4/5 BHK Sector 66" },
  { "title": "Beverly Golf Avenue | 3 & 4 BHK in Sector 91, Mohali" },
  { "title": "Hero Homes Mohali | 2/3/4 BHK by Hero Group, Sector 88" },
  { "title": "United Cooperative Society Sector 68 Mohali | 3 BHK Flats" },
  { "title": "Jal Vayu Vihar Sector 67 Mohali | 2 & 3 BHK Resale Flats" },
  { "title": "MECO Society | 2 & 3 BHK in Sector 68, Mohali" },
  { "title": "Marbella Twin Towers | 5 BHK in New Chandigarh" },
  { "title": "Ivory Towers by ICL Sector 70 Mohali | Premium 2 & 3 BHK" },
  { "title": "The Medallion | 3 & 4 BHK in Sector 82A, Mohali" },
  { "title": "Gillco Parkhills | 2-4 BHK in Sector 126, Mohali" },
  { "title": "Guru Teg Bahadur Society | 3 BHK in Sector 70, Mohali" },
  { "title": "Mundi Cooperative Complex Sector 70 Mohali | 3 BHK Flats" },
  { "title": "SCL Society Mohali | 3 BHK Flats in Sector 70 | SCL Cooperative Housing" },
  { "title": "Marbella Royce Mohali | 4/5 BHK Tallest Tower, Sector 83A" },
  { "title": "Ananda Crown Mohali | Luxury 3/4 BHK Apartments, Sector 78" },
  { "title": "JLPL Sky Garden | 2 BHK in Sector 66A, Mohali" },
  { "title": "Guru Har Rai Sahib Society | 3 BHK in Sector 67, Mohali" },
  { "title": "Marbella Grand Mohali | 3+1/4+1 BHK IT City Sector 82A" },
  { "title": "JLPL Falcon View Sector 66A Mohali | 3 & 4 BHK Luxury Apartments" },
  { "title": "Bestech Park View | 2 & 3 BHK in Sector 66, Mohali" },
  { "title": "Joy Grand Mohali | 3+1/4+1 BHK High-Rise, Sector 88 Mohali" },
  { "title": "The Medallion Nova | 3 BHK in Sector 66, Mohali" },
  { "title": "Affinity Belgravia | 3 & 4 BHK in Aerocity, Mohali" },
  { "title": "JLPL Galaxy Heights Mohali — 2 BHK from ₹0.95 Cr | Verified Advisory" }
];

(async () => {
  const browser = await puppeteer.launch({ headless: false, defaultViewport: null });
  
  const screenshotsDir = path.join(process.cwd(), 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir);
  }

  let results = [];
  const CONCURRENCY = 8; 

  for (let i = 0; i < flats.length; i += CONCURRENCY) {
    const chunk = flats.slice(i, i + CONCURRENCY);
    
    const promises = chunk.map(async (flat) => {
      const page = await browser.newPage();
      let screenshotPath = "Not Found";
      let link = "Not Found";

      try {
        console.log(`Searching for: ${flat.title}`);
        const query = encodeURIComponent(`site:99acres.com ${flat.title} mohali`);
        // Using duckduckgo html to avoid google captchas
        await page.goto(`https://html.duckduckgo.com/html/?q=${query}`);
        
        await page.waitForSelector('.result__url', { timeout: 8000 });
        const firstLinkUrl = await page.evaluate(() => {
          const a = document.querySelector('.result__url');
          return a ? a.href : null;
        });

        if (firstLinkUrl) {
          link = firstLinkUrl;
          console.log(`Found link: ${firstLinkUrl}`);
          await page.goto(firstLinkUrl, { waitUntil: 'domcontentloaded' });
          
          await new Promise(r => setTimeout(r, 4000));
          
          const filename = flat.title.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 30) + '.png';
          const absolutePath = path.join(screenshotsDir, filename);
          
          await page.screenshot({ path: absolutePath, fullPage: false });
          screenshotPath = `[Screenshot](./screenshots/${filename})`;
          console.log(`Saved screenshot for ${flat.title}`);
        }
      } catch (err) {
        console.log(`Failed for ${flat.title}: ${err.message}`);
      } finally {
        await page.close();
      }
      return `| ${flat.title} | [Link](${link}) | ${screenshotPath} |`;
    });

    const chunkResults = await Promise.all(promises);
    results.push(...chunkResults);
  }

  let markdownTable = "| Flat Name | 99acres Link | Screenshot Path |\n| --- | --- | --- |\n";
  markdownTable += results.join('\n') + '\n';
  
  fs.writeFileSync('99acres_ratings.md', markdownTable);
  console.log('Finished! Results saved to 99acres_ratings.md');

  await browser.close();
})();
