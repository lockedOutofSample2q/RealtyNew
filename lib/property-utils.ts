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
  const metadataMatch = cleanDescription.match(/\[METADATA\]([\s\S]*?)\[\/METADATA\]/);
  if (metadataMatch) {
    try {
      metadata = JSON.parse(metadataMatch[1]);
    } catch (e) {}
    cleanDescription = cleanDescription.replace(/\[METADATA\][\s\S]*?\[\/METADATA\]/g, '').trim();
  }

  // 3. Handle embedded FAQs
  const faqMatch = cleanDescription.match(/\[FAQS\]([\s\S]*?)\[\/FAQS\]/);
  if (faqMatch) {
    try {
      const parsed = JSON.parse(faqMatch[1].trim());
      if (Array.isArray(parsed) && parsed.length > 0) {
        faqs = parsed;
      }
    } catch (e) {
      console.error("Failed to parse embedded FAQs", e);
    }
    cleanDescription = cleanDescription.replace(/\[FAQS\][\s\S]*?\[\/FAQS\]/g, '').trim();
  }

  // 4. Handle embedded landmarks
  let landmarks = property.nearby_landmarks || [];
  const landmarkMatch = cleanDescription.match(/\[LANDMARKS\]([\s\S]*?)\[\/LANDMARKS\]/);
  if (landmarkMatch) {
    try {
      const parsed = JSON.parse(landmarkMatch[1].trim());
      if (Array.isArray(parsed) && parsed.length > 0) {
        landmarks = parsed;
      }
    } catch (e) {
      console.error("Failed to parse embedded landmarks", e);
    }
    cleanDescription = cleanDescription.replace(/\[LANDMARKS\][\s\S]*?\[\/LANDMARKS\]/g, '').trim();
  }

  return {
    ...property,
    price_max: property.price_max || metadata.price_max,
    area_sqft_max: property.area_sqft_max || metadata.area_sqft_max,
    bedrooms_max: property.bedrooms_max || metadata.bedrooms_max,
    address: property.address || metadata.address,
    description: cleanDescription,
    faqs: (faqs && faqs.length > 0) ? faqs : property.faqs,
    nearby_landmarks: (landmarks && landmarks.length > 0) ? landmarks : property.nearby_landmarks
  } as Property;
}
