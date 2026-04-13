import type { Metadata } from "next";
import BookingClient from "./BookingClient";

export const metadata: Metadata = {
  title: "Book a Consultation | Amritpal Singh Advisory",
  description: "Book a free 15-minute property consultation with Amritpal Singh. A direct answer on any property decision. No sales pitch. No pressure.",
};

export default function BookingPage() {
  return <BookingClient />;
}
