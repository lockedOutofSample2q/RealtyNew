import type { Metadata } from "next";
import BookingClient from "./BookingClient";

export const metadata: Metadata = {
  title: "Book a Consultation",
  description: "Schedule a 10-minute introduction call with our luxury real estate advisors.",
};

export default function BookingPage() {
  return <BookingClient />;
}
