// lib/supabase.ts
// ============================================================
// SUPABASE CLIENT
// ─────────────────────────────────────────────────────────────
// Two clients:
//  - createClient()        → browser (anon key)
//  - createServiceClient() → server-side only (service role key)
//
// ENV VARS needed in .env.local and Vercel dashboard:
//   NEXT_PUBLIC_SUPABASE_URL
//   NEXT_PUBLIC_SUPABASE_ANON_KEY
//   SUPABASE_SERVICE_ROLE_KEY  (never expose client-side)
// ============================================================

import { createBrowserClient } from "@supabase/ssr";
import { createClient as createServerClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

// ── Browser client (use in components) ───────────────────────
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

  if (!url || !anonKey) {
    console.warn("Supabase credentials missing. Returning a dummy client for build/SSR.");
    // Return a dummy client or handle appropriately to avoid crashing during build
    return {
      from: () => ({
        select: async () => ({ data: [] }),
        insert: async () => ({ data: [] }),
        update: async () => ({ data: [] }),
        delete: async () => ({ data: [] }),
      }),
      auth: {
        getUser: async () => ({ data: { user: null } }),
        getSession: async () => ({ data: { session: null } }),
        signInWithPassword: async () => {
          throw new Error("Supabase credentials missing. Check your .env file.");
        }
      }
    } as any;
  }
  return createBrowserClient<Database>(url, anonKey);
}

// —— Service role client (use in API routes / server actions ONLY)
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  if (!url || !serviceKey) {
    console.warn("Supabase Admin credentials missing. Returning a dummy client for build/SSR.");
    return {
      from: () => ({
        select: () => ({
          eq: () => ({
            maybeSingle: async () => ({ data: null, error: null }),
            select: async () => ({ data: null, error: null }),
            range: async () => ({ data: null, error: null }),
            order: async () => ({ data: null, error: null }),
            limit: async () => ({ data: null, error: null }),
            in: async () => ({ data: null, error: null })
          }),
          select: async () => ({ data: null, error: null }),
          order: async () => ({
            range: async () => ({ data: null, error: null }),
            order: async () => ({ data: null, error: null }),
            limit: async () => ({ data: null, error: null }),
          })
        }),
        insert: async () => ({ data: null, error: null }),
        update: () => ({
          eq: async () => ({ data: null, error: null })
        }),
        delete: async () => ({ data: null, error: null }),
      }),
      auth: {
        admin: {
          createUser: async () => ({ data: null }),
        }
      }
    } as any;
  }
  return createServerClient<Database>(
    url,
    serviceKey,
    { auth: { persistSession: false } }
  );
}
