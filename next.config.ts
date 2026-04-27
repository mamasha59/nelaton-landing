const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      // ================================================================
      // Глобальные security headers для всех страниц
      // ================================================================
      {
        source: "/:path*",
        headers: [
          // Anti-clickjacking: запрет встраивания в iframe
          {
            key: "Content-Security-Policy",
            value:
              "frame-ancestors 'self' https://www.facebook.com https://web.facebook.com;",
          },
          // Принудительный HTTPS (HSTS) — 1 год, включая поддомены
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          // Запрет MIME-type sniffing (защита от XSS через подмену типа)
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          // Ограничение Referrer — не утекают URL с patient_id
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          // Запрет доступа к аппаратным API (камера, микрофон, геолокация)
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          // Защита от XSS в старых браузерах
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
      // ================================================================
      // Запрет кэширования для страниц с медицинскими данными
      // Кнопка «Назад» не покажет данные пациента после logout
      // ================================================================
      {
        source: "/:locale/dashboard",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, no-cache, must-revalidate, proxy-revalidate",
          },
          {
            key: "Pragma",
            value: "no-cache",
          },
          {
            key: "Expires",
            value: "0",
          },
        ],
      },
      {
        source: "/:locale/view",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, no-cache, must-revalidate, proxy-revalidate",
          },
          {
            key: "Pragma",
            value: "no-cache",
          },
          {
            key: "Expires",
            value: "0",
          },
        ],
      },
    ];
  },
};

module.exports = withNextIntl(nextConfig);
