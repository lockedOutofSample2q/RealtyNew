// app/api/upload/route.ts
// ============================================================
// Local File Upload
//
// Saves files to public/assets/images/uploaded/
// Usage: POST /api/upload  (multipart/form-data, field name = "file")
// Returns: { url: "/assets/images/uploaded/{filename}" }
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "node:fs/promises";
import { join } from "node:path";

export async function POST(req: NextRequest) {
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

  // ── Validation: Size and Type ───────────────────────────────
  const MAX_SIZE = 10 * 1024 * 1024; // 10MB
  const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];

  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "File too large (max 10MB)" }, { status: 400 });
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json(
      { error: `Invalid file type: ${file.type}. Allowed: JPG, PNG, WEBP, AVIF` },
      { status: 400 }
    );
  }

  // ── Save to Local File System ───────────────────────────────
  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize filename: remove special chars, add timestamp
    const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const filename = `${Date.now()}-${cleanName}`;
    
    // Path relative to project root for writing
    const path = join(process.cwd(), "public", "assets", "images", "uploaded", filename);
    
    await writeFile(path, buffer);
    
    // Path for public access
    const url = `/assets/images/uploaded/${filename}`;

    console.log(`File uploaded to: ${path}`);
    return NextResponse.json({ url, filename });
  } catch (err: any) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Failed to save file", detail: err.message }, { status: 500 });
  }
}
