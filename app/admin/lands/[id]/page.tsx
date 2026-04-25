// app/admin/lands/[id]/page.tsx
import { createClient } from "@/lib/supabase";
import LandForm from "../_components/LandForm";
import { notFound } from "next/navigation";

export default async function EditLandsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = createClient();
  const { data: land } = await (supabase.from("lands") as any)
    .select("*")
    .eq("id", id)
    .single();

  if (!land) notFound();

  return <LandForm land={land} />;
}
