import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path");
  const tag = request.nextUrl.searchParams.get("tag");
  const secret = request.nextUrl.searchParams.get("secret");

  // Validate secret
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  try {
    if (path) {
      // Revalidate a specific path
      revalidatePath(path);
      return NextResponse.json({ 
        revalidated: true, 
        now: Date.now(),
        message: `Path ${path} revalidated successfully` 
      });
    }

    if (tag) {
      // Revalidate a cache tag
      revalidateTag(tag);
      return NextResponse.json({ 
        revalidated: true, 
        now: Date.now(),
        message: `Tag ${tag} revalidated successfully` 
      });
    }

    return NextResponse.json({ 
      message: "Missing path or tag parameter" 
    }, { status: 400 });

  } catch (err: any) {
    return NextResponse.json({ 
      message: "Error revalidating", 
      error: err.message 
    }, { status: 500 });
  }
}
