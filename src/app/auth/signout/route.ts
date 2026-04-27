import { createServerClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

/**
 * API endpoint для выхода из системы
 */
export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const supabase = await createServerClient();

  await supabase.auth.signOut();

  // Получаем locale из referer или используем en по умолчанию
  const referer = request.headers.get("referer");
  let locale = "en";

  if (referer) {
    const refererUrl = new URL(referer);
    const pathParts = refererUrl.pathname.split("/");
    if (pathParts.length > 1 && pathParts[1]) {
      locale = pathParts[1];
    }
  }

  return NextResponse.redirect(`${requestUrl.origin}/${locale}/admin-login`, {
    status: 301,
  });
}
