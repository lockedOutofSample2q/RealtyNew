// config/contact.ts
// ============================================================
// CONTACT FORM OPTIONS — Edit everything here
// Covers: project type dropdown, contact method pills,
//         preferred time pills, and section copy.
//
// Icons are assigned in the component; only labels live here.
// ============================================================

// ── Section Copy ─────────────────────────────────────────────
export const contactContent = {
  heading: "Let's create\nsomething exceptional\ntogether.",
  subheading:
    "Ready to take the next step? We respond within 24 hours. Every project matters to us.",
  responseNote: "Response within 24h",
  submitLabel: "Send Message",
  submittingLabel: "Sending...",
};

// ── Project Type Dropdown ────────────────────────────────────
// EDIT: Add or remove items in the project-type select.
export const projectTypes = [
  "Residential",
  "Commercial",
  "Off-Plan",
  "Ready Property",
  "Secondary Market",
  "Rentals",
];

// ── Contact Method Pills ─────────────────────────────────────
// EDIT: Add or remove preferred-contact options.
// icon is a key that maps to a Lucide icon in the component.
export const contactMethods = [
  { label: "Email",     icon: "mail" },
  { label: "Phone",     icon: "phone" },
  { label: "WhatsApp",  icon: "message-circle" },
];

// ── Preferred Time Pills ─────────────────────────────────────
// EDIT: Add or remove time-of-day preferences.
export const contactTimes = [
  { label: "Morning",   icon: "sun" },
  { label: "Afternoon", icon: "sun" },
  { label: "Evening",   icon: "moon" },
  { label: "Anytime",   icon: "clock" },
];
