import { Property } from "@/types";

export function enrichProperty(property: Property): Property {
  // 1. If we have native columns, ensure they are used (Supabase might return them as null if not set)
  // This is the clean path now that schema is updated.
  
  // 2. Check for legacy metadata block in description as fallback
  if (!property.description) return property;
  let cleanDescription = property.description;
  let faqs = property.faqs;
  let metadata: any = {};

  // 2. Check for legacy metadata block in description as fallback
  const metadataMatch = cleanDescription.match(/\[METADATA\](.*?)\[\/METADATA\]/);
  if (metadataMatch) {
    try {
      metadata = JSON.parse(metadataMatch[1]);
      cleanDescription = cleanDescription.replace(/\[METADATA\].*?\[\/METADATA\]/, '').trim();
    } catch (e) {}
  }

  // 3. Handle embedded FAQs
  const faqMatch = cleanDescription.match(/\[FAQS\](.*?)\[\/FAQS\]/);
  if (faqMatch) {
    try {
      faqs = JSON.parse(faqMatch[1]);
      cleanDescription = cleanDescription.replace(/\[FAQS\].*?\[\/FAQS\]/, '').trim();
    } catch (e) {
      console.error("Failed to parse embedded FAQs", e);
    }
  }

  // 4. Handle embedded landmarks
  let landmarks = property.nearby_landmarks || [];
  const landmarkMatch = cleanDescription.match(/\[LANDMARKS\](.*?)\[\/LANDMARKS\]/);
  if (landmarkMatch) {
    try {
      landmarks = JSON.parse(landmarkMatch[1]);
      cleanDescription = cleanDescription.replace(/\[LANDMARKS\].*?\[\/LANDMARKS\]/, '').trim();
    } catch (e) {
      console.error("Failed to parse embedded landmarks", e);
    }
  }

  return {
    ...property,
    price_max: property.price_max || metadata.price_max,
    area_sqft_max: property.area_sqft_max || metadata.area_sqft_max,
    bedrooms_max: property.bedrooms_max || metadata.bedrooms_max,
    address: property.address || metadata.address,
    description: cleanDescription,
    faqs: faqs,
    nearby_landmarks: landmarks
  } as Property;
}
