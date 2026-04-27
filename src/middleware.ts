import { createServerClient } from "@/utils/supabase/middleware";
import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { routing } from "./i18n/routing";

// Создаем базовый middleware для интернационализации
const intlMiddleware = createMiddleware(routing);

// Защищенные роуты (требуют авторизации)
const PROTECTED_ROUTES = ["/dashboard", "/view"];

// Публичные роуты (только для незалогиненных - редирект если залогинен)
const AUTH_ROUTES = ["/admin-login"];

export async function middleware(req: NextRequest) {
  // Сначала применяем next-intl middleware
  const intlResponse = intlMiddleware(req);

  const res =
    intlResponse ||
    NextResponse.next({
      request: {
        headers: req.headers,
      },
    });

  // Создаем Supabase клиент для SSR
  const supabase = createServerClient(req, res);

  // Используем getUser() для серверной валидации сессии.
  // getSession() читает JWT локально и может быть ненадёжна
  // при race condition сразу после логина (cookie ещё не синхронизирована).
  // getUser() обращается к серверу Supabase и верифицирует токен.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = req.nextUrl;

  // Извлекаем locale из pathname (ru, en, etc.)
  const pathSegments = pathname.split("/").filter(Boolean);
  const locale = pathSegments[0] || "en";
  const pathWithoutLocale = "/" + pathSegments.slice(1).join("/") || "/";

  // ============================================================================
  // Защита приватных роутов
  // ============================================================================
  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathWithoutLocale.startsWith(route),
  );

  if (isProtectedRoute && !user) {
    // Не залогинен - редирект на admin-login
    const redirectUrl = new URL(`/${locale}/admin-login`, req.url);
    return NextResponse.redirect(redirectUrl);
  }

  // ============================================================================
  // Редирект залогиненных с auth страниц
  // ============================================================================
  const isAuthRoute = AUTH_ROUTES.some((route) =>
    pathWithoutLocale.startsWith(route),
  );

  if (isAuthRoute && user) {
    // Уже залогинен - редирект на dashboard
    return NextResponse.redirect(new URL(`/${locale}/dashboard`, req.url));
  }

  // ============================================================================
  // Cache-Control для страниц с медицинскими данными (runtime-уровень)
  // Гарантирует что браузер не кэширует страницы с данными пациентов,
  // даже если static headers не применились (ISR, динамические роуты)
  // ============================================================================
  if (isProtectedRoute && user) {
    res.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate",
    );
    res.headers.set("Pragma", "no-cache");
    res.headers.set("Expires", "0");
  }

  return res;
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
