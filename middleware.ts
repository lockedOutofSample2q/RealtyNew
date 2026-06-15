// middleware.ts
// ============================================================
// ROUTE PROTECTION
// /admin-realty-8x2d9/* routes require a valid Supabase session
// Unauthenticated users → redirected to /admin-realty-8x2d9/login
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import * as OTPAuth from "otpauth";

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Protect the login page with a rotating TOTP key
  if (pathname === "/admin-realty-8x2d9/login") {
    const totpSecret = process.env.ADMIN_TOTP_SECRET;
    
    // If TOTP is configured, enforce it
    if (totpSecret) {
      const key = searchParams.get("key");
      
      if (!key) {
        // Obscure the login page completely if no key is provided
        return NextResponse.redirect(new URL("/", request.url));
      }

      try {
        let totp = new OTPAuth.TOTP({
          issuer: "RealtyConsultants",
          label: "Admin",
          algorithm: "SHA1",
          digits: 6,
          period: 30,
          secret: OTPAuth.Secret.fromBase32(totpSecret.replace(/\s+/g, '')),
        });

        // Allow a window of 1 (30 seconds before or after) to account for slight clock skew
        const delta = totp.validate({ token: key, window: 1 });
        
        if (delta === null) {
          // Invalid TOTP token -> redirect to home
          return NextResponse.redirect(new URL("/", request.url));
        }
      } catch (err) {
        console.error("TOTP validation error:", err);
        return NextResponse.redirect(new URL("/", request.url));
      }
    }
  }

  // Only protect /admin-realty-8x2d9 routes (except login)
  if (!pathname.startsWith("/admin-realty-8x2d9") || pathname === "/admin-realty-8x2d9/login") {
    return NextResponse.next();
  }

  const response = NextResponse.next({
    request: { headers: request.headers },
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    const loginUrl = new URL("/admin-realty-8x2d9/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        get(name: string) { return request.cookies.get(name)?.value; },
        set(name: string, value: string, options: CookieOptions) {
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          response.cookies.set({ name, value: "", ...options });
        },
      },
    }
  );

  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    const loginUrl = new URL("/admin-realty-8x2d9/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: ["/admin-realty-8x2d9", "/admin-realty-8x2d9/:path*"],
};

