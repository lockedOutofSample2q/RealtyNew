// app/api/subscribe/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const email = formData.get("email")?.toString();

    if (!email || !email.includes("@")) {
      return NextResponse.redirect(new URL("/?subscribed=error", req.url));
    }

    const supabase = createAdminClient();
    await supabase.from("subscribers").upsert({ email } as any, { onConflict: "email" });

    return NextResponse.redirect(new URL("/?subscribed=true", req.url));
  } catch (err) {
    console.error("Subscribe error:", err);
    return NextResponse.redirect(new URL("/?subscribed=error", req.url));
  }
}
