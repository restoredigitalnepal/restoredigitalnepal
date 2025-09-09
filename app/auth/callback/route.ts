import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const origin = requestUrl.origin;

  if (code) {
    await supabase.auth.exchangeCodeForSession(code);
  }

  // Redirect to home page after authentication
  return NextResponse.redirect(`${origin}/`);
  //Redirected
}
