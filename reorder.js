const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'app/(site)/properties/houses/[slug]/page.tsx');
let content = fs.readFileSync(file, 'utf8');

function getChunk(startComment, endComment) {
    const startStr = `{/* ${startComment} */}`;
    const startIdx = content.indexOf(startStr);
    if (startIdx === -1) throw new Error("Missing " + startComment);
    
    let endIdx = content.length;
    if (endComment) {
        const endStr = `{/* ${endComment} */}`;
        endIdx = content.indexOf(endStr);
        if (endIdx === -1) throw new Error("Missing " + endComment);
    }
    return content.slice(startIdx, endIdx);
}

try {
    const description = getChunk('Description', 'Stats');
    const stats = getChunk('Stats', 'Forensics');
    const forensics = getChunk('Forensics', 'Key Highlights');
    const highlights = getChunk('Key Highlights', 'Amenities');
    const amenities = getChunk('Amenities', 'FAQs');
    
    const sidebarStart = content.indexOf('{/* ── RIGHT SIDEBAR ────────────────────────────── */}');
    // If houses doesn't have RIGHT SIDEBAR, we'll just go up to 'Related'
    let endBoundary = content.indexOf('{/* Related */}');
    if (endBoundary === -1) endBoundary = content.indexOf('</article>');
    
    const faqs = content.slice(content.indexOf('{/* FAQs */}'), endBoundary);

    const preamble = content.slice(0, content.indexOf('{/* Description */}'));
    const afterSections = content.slice(endBoundary);

    // New order: Description, Highlights, Amenities, Forensics, FAQs
    const newSections = [
        description,
        stats,
        highlights,
        amenities,
        forensics,
        faqs
    ].join("");

    const newContent = preamble + newSections + afterSections;

    fs.writeFileSync(file, newContent, 'utf8');
    console.log("Reordered sections successfully for houses!");
} catch (e) {
    console.error("Error: ", e.message);
}
