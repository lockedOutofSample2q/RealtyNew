const puppeteer = require('puppeteer');

const properties = [
  "ATS Casa Espana Sector 121 Mohali",
  "Jubilee City Gardens Mohali Sector 116",
  "Jubilee Vallum Sector 91 Mohali",
  "Noble Magnollia Sector 88 Mohali",
  "JLPL Falcon View Sector 66A Mohali",
  "The Medallion Nova Sector 66 Mohali"
];

async function delay(time) {
  return new Promise(function(resolve) { 
      setTimeout(resolve, time)
  });
}

async function scrapeReview(browser, property) {
  const page = await browser.newPage();
  try {
    console.log(`Searching for: ${property}`);
    // Search google
    const query = encodeURIComponent(`${property} site:99acres.com`);
    await page.goto(`https://www.google.com/search?q=${query}`, { waitUntil: 'domcontentloaded' });
    
    // Find first 99acres link
    await page.waitForSelector('a[href*="99acres.com"]', { timeout: 5000 });
    const link = await page.$eval('a[href*="99acres.com"]', a => a.href);
    console.log(`[${property}] Found link: ${link}`);
    
    await page.goto(link, { waitUntil: 'domcontentloaded' });
    
    // Try to extract rating from 99acres
    await delay(3000); // let the page load
    
    const data = await page.evaluate(() => {
      // 99acres has multiple possible selectors for ratings
      const ratingEl = document.querySelector('.Reviews__RatingVal, .rating__ratingValue, .ratingVal, [data-label="RATING"]');
      const countEl = document.querySelector('.Reviews__Count, .rating__ratingCount, .reviewCount, [data-label="REVIEW_COUNT"]');
      
      return {
        rating: ratingEl ? ratingEl.innerText.trim() : null,
        count: countEl ? countEl.innerText.trim().replace(/[^0-9]/g, '') : null
      };
    });
    
    console.log(`[${property}] Rating: ${data.rating}, Reviews: ${data.count}`);
    return { property, link, rating: data.rating, count: data.count };
  } catch (err) {
    console.log(`[${property}] Error: ${err.message}`);
    return { property, error: err.message };
  } finally {
    await page.close();
  }
}

async function main() {
  console.log("Launching browser...");
  // Launch headless: false so the user sees the windows as requested
  const browser = await puppeteer.launch({ headless: false, defaultViewport: null });
  
  const promises = properties.map(p => scrapeReview(browser, p));
  const results = await Promise.all(promises);
  
  console.log("\n--- Final Results ---");
  console.log(JSON.stringify(results, null, 2));
  
  await browser.close();
}

main();
