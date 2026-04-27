import { Property } from "@/types";

export function enrichProperty(property: Property): Property {
  // 1. If we have native columns, ensure they are used (Supabase might return them as null if not set)
  // This is the clean path now that schema is updated.
  
  // 2. Check for legacy metadata block in description as fallback
  if (!property.description) return property;
  const metadataMatch = property.description.match(/\[METADATA\](.*?)\[\/METADATA\]/);
  
  if (!metadataMatch) return property;

  try {
    const metadata = JSON.parse(metadataMatch[1]);
    
    // Merge metadata only if native fields are missing
    const enriched = {
      ...property,
      price_max: property.price_max || metadata.price_max,
      area_sqft_max: property.area_sqft_max || metadata.area_sqft_max,
      bedrooms_max: property.bedrooms_max || metadata.bedrooms_max,
      address: property.address || metadata.address,
    // Strip metadata from description
    let cleanDescription = property.description.replace(/\[METADATA\].*?\[\/METADATA\]/, '').trim();
    
    // 3. Handle embedded FAQs
    let faqs = property.faqs;
    const faqMatch = cleanDescription.match(/\[FAQS\](.*?)\[\/FAQS\]/);
    if (faqMatch) {
      try {
        faqs = JSON.parse(faqMatch[1]);
        cleanDescription = cleanDescription.replace(/\[FAQS\].*?\[\/FAQS\]/, '').trim();
      } catch (e) {
        console.error("Failed to parse embedded FAQs", e);
      }
    }

    return {
      ...property,
      price_max: property.price_max || metadata.price_max,
      area_sqft_max: property.area_sqft_max || metadata.area_sqft_max,
      bedrooms_max: property.bedrooms_max || metadata.bedrooms_max,
      address: property.address || metadata.address,
      description: cleanDescription,
      faqs: faqs
    } as Property;
  } catch (e) {
    // Even if JSON parse fails, try to handle FAQs separately
    let cleanDescription = property.description;
    let faqs = property.faqs;
    const faqMatch = cleanDescription.match(/\[FAQS\](.*?)\[\/FAQS\]/);
    if (faqMatch) {
      try {
        faqs = JSON.parse(faqMatch[1]);
        cleanDescription = cleanDescription.replace(/\[FAQS\].*?\[\/FAQS\]/, '').trim();
      } catch (ee) {}
    }
    return { ...property, description: cleanDescription, faqs: faqs } as Property;
  }
}
