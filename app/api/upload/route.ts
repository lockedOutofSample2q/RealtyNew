// app/api/upload/route.ts
// ============================================================
// Cloudflare Images upload proxy
//
// Required env vars (add to .env.local + Vercel):
//   CLOUDFLARE_ACCOUNT_ID      — found in Cloudflare Dashboard → Overview
//   CLOUDFLARE_IMAGES_TOKEN    — Cloudflare Dashboard → My Profile → API Tokens
//                                (create with "Cloudflare Images: Edit" permission)
//   CLOUDFLARE_IMAGES_HASH     — e.g. "abc123def" from your delivery URL
//                                imagedelivery.net/{HASH}/image_id/public
//
// Usage: POST /api/upload  (multipart/form-data, field name = "file")
// Returns: { url: "https://imagedelivery.net/{hash}/{id}/public" }
// ============================================================

import { NextRequest, NextResponse } from "next/server";

const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const API_TOKEN  = process.env.CLOUDFLARE_IMAGES_TOKEN;
const HASH       = process.env.CLOUDFLARE_IMAGES_HASH;

export async function POST(req: NextRequest) {
  // ── Guard: credentials missing ──────────────────────────────
  if (!ACCOUNT_ID || !API_TOKEN || !HASH) {
    return NextResponse.json(
      {
        error: "Cloudflare Images not configured",
        hint: "Add CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_IMAGES_TOKEN, and CLOUDFLARE_IMAGES_HASH to your environment variables.",
      },
      { status: 503 }
    );
  }

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

  // ── Forward to Cloudflare Images ────────────────────────────
  const cfForm = new FormData();
  cfForm.append("file", file);

  let cfRes: Response;
  try {
    cfRes = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/images/v1`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${API_TOKEN}` },
        body: cfForm,
      }
    );
  } catch (err: any) {
    return NextResponse.json({ error: "Upload to Cloudflare failed", detail: err.message }, { status: 502 });
  }

  const json = await cfRes.json() as any;

  if (!cfRes.ok || !json.success) {
    return NextResponse.json(
      { error: "Cloudflare rejected the upload", detail: json.errors ?? json },
      { status: cfRes.status }
    );
  }

  // ── Return public URL ────────────────────────────────────────
  const imageId = json.result.id as string;
  const url = `https://imagedelivery.net/${HASH}/${imageId}/public`;

  return NextResponse.json({ url, id: imageId });
}
