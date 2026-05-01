import { PDFDocument, PDFName, PDFString, StandardFonts, rgb } from 'pdf-lib';
import * as fs from 'fs';
import * as path from 'path';
import sharp from 'sharp';

async function createLinkAnnotation(pdfDoc: PDFDocument, rect: [number, number, number, number], url: string) {
  const linkAnnotation = pdfDoc.context.obj({
    Type: 'Annot',
    Subtype: 'Link',
    Rect: rect,
    Border: [0, 0, 0],
    A: {
      Type: 'Action',
      S: 'URI',
      URI: PDFString.of(url),
    },
  });
  return pdfDoc.context.register(linkAnnotation);
}

async function watermarkPdf(inputPath: string, outputPath: string, logoPath: string) {
  console.log(`Watermarking PDF: ${inputPath}`);
  const pdfBytes = fs.readFileSync(inputPath);
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const logoBytes = fs.readFileSync(logoPath);
  const logoImage = await pdfDoc.embedPng(logoBytes);

  const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const pages = pdfDoc.getPages();
  for (const page of pages) {
    const { width, height } = page.getSize();
    
    // Logo scale
    const logoDims = logoImage.scale(0.15); // Adjust scale as needed
    const logoX = width - logoDims.width - 20;
    const logoY = 60; // Above the text

    page.drawImage(logoImage, {
      x: logoX,
      y: logoY,
      width: logoDims.width,
      height: logoDims.height,
    });

    const ctaLine1 = "For any Mohali Real Estate question,";
    const ctaLine2 = "whatsapp us @91-7814613916";
    const ctaLine3 = "realtyconsultants.in";

    const fontSize = 10;
    const margin = 20;
    const lineSpacing = 12;

    // Draw Line 1
    page.drawText(ctaLine1, {
      x: width - font.widthOfTextAtSize(ctaLine1, fontSize) - margin,
      y: margin + lineSpacing * 2,
      size: fontSize,
      font: font,
      color: rgb(0, 0, 0),
    });

    // Draw Line 2 (WhatsApp)
    const line2X = width - font.widthOfTextAtSize(ctaLine2, fontSize) - margin;
    const line2Y = margin + lineSpacing;
    page.drawText(ctaLine2, {
      x: line2X,
      y: line2Y,
      size: fontSize,
      font: font,
      color: rgb(0, 0.4, 0.8), // Blue-ish link color
    });

    // Draw Line 3 (Website)
    const line3X = width - font.widthOfTextAtSize(ctaLine3, fontSize) - margin;
    const line3Y = margin;
    page.drawText(ctaLine3, {
      x: line3X,
      y: line3Y,
      size: fontSize,
      font: font,
      color: rgb(0, 0.4, 0.8),
    });

    // Add Link Annotations
    const line2Width = font.widthOfTextAtSize(ctaLine2, fontSize);
    const line3Width = font.widthOfTextAtSize(ctaLine3, fontSize);

    const waLinkRef = await createLinkAnnotation(
      pdfDoc,
      [line2X, line2Y, line2X + line2Width, line2Y + fontSize],
      'https://wa.me/917814613916'
    );

    const webLinkRef = await createLinkAnnotation(
      pdfDoc,
      [line3X, line3Y, line3X + line3Width, line3Y + fontSize],
      'https://realtyconsultants.in'
    );

    // Get existing annotations or create new array
    let annots = page.node.get(PDFName.of('Annots'));
    if (!annots) {
      page.node.set(PDFName.of('Annots'), pdfDoc.context.obj([waLinkRef, webLinkRef]));
    } else {
      // If it's a reference to an array, get the array
      const annotsArray = pdfDoc.context.lookup(annots) as any;
      annotsArray.push(waLinkRef);
      annotsArray.push(webLinkRef);
    }
  }

  const modifiedPdfBytes = await pdfDoc.save();
  fs.writeFileSync(outputPath, modifiedPdfBytes);
}

async function main() {
  const mapsDir = path.join(process.cwd(), 'maps', 'mohali');
  const docsDir = path.join(process.cwd(), 'public', 'documents', 'maps');
  const logoPath = path.join(process.cwd(), 'public', 'assets', 'logo.png');
  
  if (!fs.existsSync(logoPath)) {
    console.error(`Logo not found at ${logoPath}`);
    return;
  }

  if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir, { recursive: true });
  }

  const files = fs.readdirSync(mapsDir).filter(f => f.endsWith('.pdf'));

  for (const file of files) {
    const inputPath = path.join(mapsDir, file);
    
    // Skip empty files
    if (fs.statSync(inputPath).size === 0) {
      console.warn(`Skipping empty file: ${file}`);
      continue;
    }
    
    // Standardized renaming logic
    let namePart = file.replace('.pdf', '').toLowerCase();
    
    // Normalize delimiters
    namePart = namePart.replace(/[_\s]+/g, '-');
    
    // Handle SectorXX -> sector-XX
    namePart = namePart.replace(/sector(\d+)/g, 'sector-$1');
    
    // Special cases
    namePart = namePart.replace('ecocity1', 'ecocity-1');
    namePart = namePart.replace('ecocity2', 'ecocity-2');
    namePart = namePart.replace('it-city', 'it-city'); // already handled by _ to -
    
    const newFileName = `realty-consultants-mohali-${namePart}.pdf`;
    const outputPath = path.join(docsDir, newFileName);
    
    try {
      await watermarkPdf(inputPath, outputPath, logoPath);
      console.log(`Success: ${file} -> ${newFileName}`);
    } catch (e) {
      console.error(`Failed: ${file}`, e);
    }
  }
}

main();
