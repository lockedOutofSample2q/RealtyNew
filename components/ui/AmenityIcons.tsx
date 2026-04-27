import React from 'react';
import { 
  Waves, Dumbbell, Bell, Flame, Activity, Droplets, Users, 
  Car, Leaf, Building2, Target, Thermometer, Briefcase, 
  Film, Shield, Check, Wind, Coffee, Utensils, Bike, 
  Sparkles, Heart, Trees, Map as MapIcon, Wifi, Tv
} from 'lucide-react';

export const AMENITY_ICON_MAP: Record<string, React.ElementType> = {
  pool: Waves, 
  "swimming pool": Waves, 
  "infinity pool": Waves,
  gym: Dumbbell, 
  fitness: Dumbbell,
  spa: Bell, 
  concierge: Bell,
  "bbq": Flame, 
  "bbq area": Flame,
  jogging: Activity, 
  "jogging track": Activity, 
  "running track": Activity,
  "kids pool": Droplets, 
  "kids' pool": Droplets, 
  "dedicated kids' pool": Droplets,
  "function room": Users,
  "clubhouse": Users,
  parking: Car, 
  "covered parking": Car, 
  "valet parking": Car,
  garden: Leaf, 
  nature: Leaf,
  "beach access": Waves, 
  beach: Waves, 
  "lagoon access": Waves,
  "rooftop": Building2, 
  "rooftop terrace": Building2,
  tennis: Target, 
  "tennis court": Target,
  sauna: Thermometer,
  "business center": Briefcase,
  cinema: Film, 
  "cinema room": Film,
  security: Shield,
  "ac": Wind,
  "central ac": Wind,
  "cafe": Coffee,
  "restaurant": Utensils,
  "cycling track": Bike,
  "luxury lobby": Sparkles,
  "yoga": Heart,
  "park": Trees,
  "landscaped": Trees,
  "wifi": Wifi,
  "satellite": Tv,
};

export function AmenityIcon({ name, size = 16 }: { name: string, size?: number }) {
  const Icon = AMENITY_ICON_MAP[name.toLowerCase()] ?? Check;
  return <Icon size={size} strokeWidth={1.5} className="text-black/50 shrink-0" />;
}
