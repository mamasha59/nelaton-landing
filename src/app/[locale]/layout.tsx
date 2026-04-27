import AnalyticsRouterEvents from "@/components/AnalyticsRouterEvents/AnalyticsRouterEvents";
import { routing } from "@/i18n/routing";
import { languages } from "@/utils/const";
import { generateSchema } from "@/utils/generateSchema";
import { GoogleAnalytics } from "@next/third-parties/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { DM_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import Script from "next/script";
import { ReactNode } from "react";
import "../globals.css";

type RootLayoutProps = {
  children: ReactNode;
  params: Promise<{
    locale: string;
  }>;
};

const dmSans = DM_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export async function generateMetadata() {
  const baseUrl = "https://nelaton.app";
  const currentPath = "/"; // Для главной страницы, для других страниц подставьте путь

  // Формируем объект языков для alternates.languages
  const languagesObj = Object.fromEntries(
    languages.map((lang) => [
      lang.id,
      lang.id === "en"
        ? `${baseUrl}${currentPath}`
        : `${baseUrl}/${lang.id}${currentPath}`,
    ]),
  );

  return {
    title: "Use Nelaton Easily – Smart App for Self-Catheterization (ISC)",
    description:
      "Nelaton App: Your Smart Assistant for Self-Catheterization. Track catheterization intervals, manage supplies, and log with ease. Get started today!",
    alternates: {
      canonical: `${baseUrl}${currentPath}`,
      languages: {
        ...languagesObj,
        "x-default": `${baseUrl}${currentPath}`,
      },
    },
    manifest: "/manifest.json",
    appleWebApp: {
      capable: true,
      statusBarStyle: "default",
      title: "Nelaton Health-Share",
    },
    formatDetection: {
      telephone: false,
    },
    icons: {
      icon: [
        { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
        { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
      ],
      apple: [
        { url: "/icons/icon-152x152.png", sizes: "152x152", type: "image/png" },
      ],
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const schema = await generateSchema();

  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes"
        />
        <meta name="theme-color" content="#4baa7a" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Nelaton" />
        <link rel="apple-touch-icon" href="/icons/icon-152x152.png" />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/icons/icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/icon-192x192.png"
        />
      </head>
      <body className={`${dmSans.className} antialiased`}>
        {/* Google Analytics */}
        <GoogleAnalytics gaId="G-B6Z9MJ4EBF" />

        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-T49SQQ9L');
            `,
          }}
        />

        {/* CookieYes */}
        <Script
          id="cookieyes"
          strategy="afterInteractive"
          src="https://cdn-cookieyes.com/client_data/72ee03861749bd377718059e/script.js"
        />

        {/* Schema.org FAQ */}
        <Script
          id="faq-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />

        {/* Yandex.Metrika */}
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`
            (function(m,e,t,r,i,k,a){
                m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) {
                  if (document.scripts[j].src === r) { return; }
                }
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,
                a.parentNode.insertBefore(k,a)
            })(window, document,'script','https://mc.yandex.ru/metrika/tag.js', 'ym');

            ym(104150319, 'init', {
                webvisor:true,
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true,
                ecommerce:"dataLayer"
            });
          `}
        </Script>

        {/* Meta Pixel (Facebook Pixel) */}
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');

            fbq('init', '1105723724570272');
            fbq('track', 'PageView');
          `}
        </Script>

        {/* GTM noscript (желательно для корректности и дебага) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-T49SQQ9L"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {/* Трек маршрутов (см. компонент ниже) */}
        <AnalyticsRouterEvents />

        <NextIntlClientProvider>{children}</NextIntlClientProvider>

        {/* noscript для Яндекс.Метрики */}
        <noscript>
          <img
            src="https://mc.yandex.ru/watch/104150319"
            style={{ position: "absolute", left: "-9999px" }}
            alt=""
          />
        </noscript>

        {/* noscript для Meta Pixel */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1105723724570272&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </body>
    </html>
  );
}
