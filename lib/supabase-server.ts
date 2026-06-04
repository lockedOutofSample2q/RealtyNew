// lib/supabase-server.ts
// ============================================================
// SUPABASE SERVER-SIDE CLIENT FOR NEXT.JS (API & SERVER COMPONENTS)
// ============================================================
// Resolves cookie storage dynamically. Keep separate from client-side
// database clients to avoid "next/headers" import errors in client code.
// ============================================================

import { cookies } from "next/headers";
import { createServerClient as createSSRClient } from "@supabase/ssr";
import type { Database } from "@/types/supabase";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export async function createServerDbClient() {
  const cookieStore = await cookies();
  return createSSRClient<Database>(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch {
            // Safe to ignore in API routes/Server Components
          }
        },
        remove(name: string, options: any) {
          try {
            cookieStore.set({ name, value: "", ...options });
          } catch {
            // Safe to ignore
          }
        },
      },
    }
  );
}
