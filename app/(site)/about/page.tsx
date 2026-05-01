// app/site/about/page.tsx
// ============================================================
// ABOUT PAGE
// Premium architectural layout matching monterealestate.ae
// ============================================================

import AboutHero from "@/components/sections/AboutHero";
import AboutStats from "@/components/sections/AboutStats";
import AboutText from "@/components/sections/AboutText";
import AboutProcess from "@/components/sections/AboutProcess";
import AboutLeadership from "@/components/sections/AboutLeadership";

export const metadata = {
  title: "About | The Background No Other Advisor in Mohali Can Claim",
  description: "Amritpal Singh brings over 10 years of experience across every side of the real estate transaction in Mohali.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className="bg-black min-h-screen">
      <AboutHero />
      <AboutStats />
      <AboutText />
      <AboutProcess />
      <AboutLeadership />
    </div>
  );
}
