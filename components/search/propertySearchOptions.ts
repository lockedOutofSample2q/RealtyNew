export const LOCATIONS = [
  "All",
  "Downtown Dubai",
  "Dubai Marina",
  "Palm Jumeirah",
  "Business Bay",
  "JVC",
  "DIFC",
  "Dubai Hills",
  "Creek Harbour",
  "Emaar Beachfront",
];

export const PROPERTY_TYPES = [
  "All",
  "Apartment",
  "Villa",
  "Penthouse",
  "Townhouse",
  "Studio",
];

export const BEDROOMS = ["Any", "Studio", "1", "2", "3", "4", "5+"];
export const FURNISHING = ["All furnishings", "Furnished", "Unfurnished", "Partly furnished"];
export const PRICES = ["Any Price", "1,000,000 AED", "5,000,000 AED", "10,000,000 AED"];

export type SearchTab = "buy" | "rent";

export interface PropertySearchFilters {
  location: string;
  type: string;
  bedrooms: string;
  furnishing: string;
  price: string;
  currency: string;
}

export const DEFAULT_PROPERTY_FILTERS: PropertySearchFilters = {
  location: "",
  type: "",
  bedrooms: "",
  furnishing: "",
  price: "",
  currency: "AED",
};
