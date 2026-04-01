// app/site/about/page.tsx
// ============================================================
// ABOUT PAGE
// Premium architectural layout matching monterealestate.ae
// ============================================================

import AboutHero from "@/components/sections/AboutHero";
import AboutStats from "@/components/sections/AboutStats";
import AboutText from "@/components/sections/AboutText";
import AboutLeadership from "@/components/sections/AboutLeadership";
import AboutValues from "@/components/sections/AboutValues";
import AboutProcess from "@/components/sections/AboutProcess";
import AboutOffice from "@/components/sections/AboutOffice";

export const metadata = {
  title: "About Monte Real Estate | Dubai's Trusted Property Experts",
  description: "Learn about the vision, leadership, and methodical approach of Monte Real Estate. Crafting architectural excellence in Dubai since 2014.",
};

export default function AboutPage() {
  return (
    <div className="bg-black min-h-screen">
      <AboutHero />
      <AboutStats />
      <AboutText />
      <AboutLeadership />
      <AboutValues />
      <AboutProcess />
      <AboutOffice />
    </div>
  );
}
