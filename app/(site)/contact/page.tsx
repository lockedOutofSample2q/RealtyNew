import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us | Amritpal Singh Advisory",
  description: "Speak directly with Amritpal Singh, property advisor, Sector 82A Mohali. No gatekeeping. No pitch. A direct answer to your property question.",
};

export default function ContactPage() {
  return <ContactClient />;
}
