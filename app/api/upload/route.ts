// app/api/upload/route.ts
// ============================================================
// Supabase Storage upload proxy
//
// Uploads images to the "property-images" bucket in Supabase.
// Create the bucket once in Supabase Dashboard → Storage:
//   1. Click "New bucket"
//   2. Name: property-images
//   3. Public bucket: ON
//
// Required env vars (already in .env.local):
//   NEXT_PUBLIC_SUPABASE_URL
//   SUPABASE_SERVICE_ROLE_KEY
//
// Usage: POST /api/upload  (multipart/form-data, field name = "file")
// Returns: { url: "https://<project>.supabase.co/storage/v1/object/public/property-images/<filename>" }
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const BUCKET = "property-images";

export async function POST(req: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // ── Parse incoming file ─────────────────────────────────────
  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const file = formData.get("file") as File | null;
  if (!file) {
    return NextResponse.json({ error: "No file provided (field name must be 'file')" }, { status: 400 });
  }

  // ── Build a unique filename ─────────────────────────────────
  const ext = file.name.split(".").pop() ?? "jpg";
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  // ── Upload to Supabase Storage ──────────────────────────────
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(filename, file, {
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // ── Return public URL ────────────────────────────────────────
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(filename);

  return NextResponse.json({ url: data.publicUrl });
}
