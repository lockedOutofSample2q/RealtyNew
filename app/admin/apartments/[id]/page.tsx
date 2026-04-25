// app/admin/apartments/[id]/page.tsx
import { createClient } from "@/lib/supabase";
import ApartmentForm from "../_components/ApartmentForm";
import { notFound } from "next/navigation";

export default async function EditApartmentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = createClient();
  const { data: apartment } = await (supabase.from("apartments") as any)
    .select("*")
    .eq("id", id)
    .single();

  if (!apartment) notFound();

  return <ApartmentForm apartment={apartment} />;
}
