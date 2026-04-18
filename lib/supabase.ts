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

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// ── Browser client (use in components) ───────────────────────
export function createClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
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
  return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);
}

// —— Service role client (use in API routes / server actions ONLY)
export function createAdminClient() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  if (!supabaseUrl || !serviceKey) {
    console.warn("Supabase Admin credentials missing. Returning a dummy client for build/SSR.");
    return {
      from: () => ({
        select: async () => ({ data: [] }),
        insert: async () => ({ data: [] }),
        update: async () => ({ data: [] }),
        delete: async () => ({ data: [] }),
      }),
      auth: {
        admin: {
          createUser: async () => ({ data: null }),
        }
      }
    } as any;
  }
  return createServerClient<Database>(
    supabaseUrl,
    serviceKey,
    { auth: { persistSession: false } }
  );
}
