// app/admin/houses/[id]/page.tsx
import { createClient } from "@/lib/supabase";
import HouseForm from "../_components/HouseForm";
import { notFound } from "next/navigation";

export default async function EditHousePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = createClient();
  const { data: house } = await (supabase.from("houses") as any)
    .select("*")
    .eq("id", id)
    .single();

  if (!house) notFound();

  return <HouseForm house={house} />;
}
