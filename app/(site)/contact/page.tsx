import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with our expert team.",
};

export default function ContactPage() {
  return <ContactClient />;
}
