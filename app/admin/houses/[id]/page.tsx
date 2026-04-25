// app/admin/houses/[id]/page.tsx
import { createClient } from "@/lib/supabase";
import HouseForm from "../_components/HouseForm";
import { notFound } from "next/navigation";

export default async function EditHousePage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const supabase = createClient();
  const { data: house } = await (supabase.from("houses") as any)
    .select("*")
    .eq("id", params.id)
    .single();

  if (!house) notFound();

  return <HouseForm house={house} />;
}
