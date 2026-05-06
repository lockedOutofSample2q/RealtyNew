import { redirect } from "next/navigation";

export default async function PropertiesPage({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
  const params = await searchParams;
  const initialTab = params?.tab;

  if (initialTab === "houses") redirect("/properties/houses");
  if (initialTab === "lands") redirect("/properties/lands");

  // Default fallback for /properties or ?tab=flats
  redirect("/properties/flats");
}
