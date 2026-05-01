import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us | Amritpal Singh Advisory",
  description: "Speak directly with Amritpal Singh, property advisor at Phase 8A, E328, Industrial Area, Sector 75, Sahibzada Ajit Singh Nagar, Punjab 160055. No gatekeeping. No pitch. A direct answer to your property question.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
