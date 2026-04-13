import { Metadata } from "next";
import FeaturedClient from "./FeaturedClient";

export const metadata: Metadata = {
  title: "Featured Property Placements | Admin Dashboard",
};

export default function FeaturedPage() {
  return <FeaturedClient />;
}