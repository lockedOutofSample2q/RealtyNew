// config/about.ts
// ============================================================
// ABOUT PAGE CONTENT — Edit everything here
// Covers: hero panels, leadership, core values, process steps,
//         office location, and supporting section copy.
//
// Changes here propagate to all About page components.
// ============================================================

// ── Hero Panels ──────────────────────────────────────────────
// Four image panels displayed side-by-side at the top of /about
// Only the first panel shows a title + tag overlay.
// image paths are relative to /public
export const aboutHeroPanels = [
  {
    id: 1,
    image: "/assets/images/about/hero-1.png",
    title: "Where Vision\nMeets\nStructure",
    tag: "WHO WE ARE",
  },
  { id: 2, image: "/assets/images/about/hero-2.png", title: "", tag: "" },
  { id: 3, image: "/assets/images/about/hero-3.png", title: "", tag: "" },
  { id: 4, image: "/assets/images/about/hero-4.png", title: "", tag: "" },
];

// ── Leadership ───────────────────────────────────────────────
export const leadership = {
  name: "Armina Crnovrsanin",
  title: "CEO, Monte Real Estate",
  // Path relative to /public
  image: "/assets/images/about/ceo.png",
  // Section eyebrow label (small uppercase text above the name)
  eyebrow: "Leadership",
};

// ── Core Values ──────────────────────────────────────────────
export const aboutValues = {
  // Section heading & subheading
  heading: "Our Core Values",
  subheading: "The principles that guide everything we do",

  items: [
    {
      title: "Excellence",
      text: "Excellence is not just a goal, it's our standard. We strive for the highest quality in every project, ensuring every detail is perfect and every client's dream is realized.",
    },
    {
      title: "Achievement",
      text: "We measure our success by the milestones we reach and the impact we make in Dubai's real estate market. Each completed project is a testament to our team's relentless drive for achievement.",
    },
    {
      title: "Commitment",
      text: "Our commitment to our clients and their visions is unwavering. From the first sketch to the final handover, we are dedicated to bringing your real estate aspirations to life with integrity and professionalism.",
    },
    {
      title: "Innovation",
      text: "We embrace cutting-edge technology and creative solutions to deliver exceptional real estate experiences that set new standards in Dubai's property market.",
    },
    {
      title: "Teamwork",
      text: "Our success is built on collaboration and shared expertise. Working together, we combine diverse skills and perspectives to achieve outstanding results for every client.",
    },
    {
      title: "Growth",
      text: "We continuously evolve and adapt to the dynamic real estate landscape, growing alongside our clients and the communities we serve in Dubai and the UAE.",
    },
  ],
};

// ── Process Steps ────────────────────────────────────────────
export const aboutProcess = {
  // Section heading & subheading
  heading: "Our Process",
  subheading: "A systematic approach ensuring excellence at every step",

  steps: [
    {
      num: "01",
      title: "Insight & Analysis",
      text: "Deep market analysis and understanding of your unique requirements to identify perfect opportunities.",
    },
    {
      num: "02",
      title: "Meticulous Planning",
      text: "Strategic planning tailored to your goals, timeline, and investment objectives.",
    },
    {
      num: "03",
      title: "Tailored Solutions",
      text: "Customized property solutions that align perfectly with your vision and lifestyle.",
    },
    {
      num: "04",
      title: "Quality Execution",
      text: "Seamless execution with attention to every detail, ensuring a smooth transition experience.",
    },
  ],
};

// ── Office Info ──────────────────────────────────────────────
// NOTE: phone and email are intentionally duplicated from config/site.ts
// so this file stays self-contained and readable on its own.
// If you update contact details, update both files.
export const aboutOffice = {
  // Section heading
  heading: "Visit Our Office",

  location: "Prime Tower, Business Bay\nDubai, United Arab Emirates",
  phone: "+971 58 534 7884",
  email: "info@monterealestate.ae",

  // Image displayed beside the contact details (path relative to /public)
  image: "/assets/images/home/about.jpg",

  // CTA button label + destination
  cta: { label: "Contact Us", href: "/contact" },
};
