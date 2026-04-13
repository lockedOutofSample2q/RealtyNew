export const CITIES = [
  "All",
  "Mohali",
  "Zirakpur",
  "Kharar",
  "New Chandigarh",
  "Rajpura",
];

export const SECTORS_BY_CITY: Record<string, string[]> = {
  All: ["All"],
  Mohali: ["All", "Sector 82A", "Sector 82", "Sector 66", "Airport Road", "E328 Industrial area phase 8A"],
  Zirakpur: ["All", "Aerocity", "VIP Road", "Peer Muchalla"],
  Kharar: ["All", "Sunny Enclave", "Sector 115", "Sector 125"],
  "New Chandigarh": ["All", "Omaxe", "Eco City 1", "Eco City 2"],
  Rajpura: ["All", "Industrial Zone", "Gagan Vihar"],
};

export const PROPERTY_TYPES = [
  "All",
  "Apartment",
  "Villa",
  "Penthouse",
  "Townhouse",
  "Studio",
];

export const APARTMENT_TYPES = ["All", "Apartment", "Studio", "Penthouse"];
export const HOUSE_TYPES = ["All", "Villa", "Townhouse"];
export const LAND_TYPES = ["All", "Residential", "Commercial", "Agricultural", "Industrial"];

export const BEDROOMS = ["Any", "Studio", "1", "2", "3", "4", "5+"];
export const FURNISHING = ["All furnishings", "Furnished", "Unfurnished", "Partly furnished"];
export const PRICES = ["Any Price", "1,000,000", "5,000,000", "10,000,000", "20,000,000", "50,000,000"];

export type SearchTab = "apartments" | "houses" | "lands";

export interface PropertySearchFilters {
  city: string;
  sector: string;
  type: string;
  bedrooms: string;
  furnishing: string;
  price: string;
  currency: string;
}

export const DEFAULT_PROPERTY_FILTERS: PropertySearchFilters = {
  city: "",
  sector: "",
  type: "",
  bedrooms: "",
  furnishing: "",
  price: "",
  currency: "AED",
};
