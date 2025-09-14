import { routing } from '@/i18n/routing';
import { languages } from "@/utils/const";
import { generateSchema } from '@/utils/generateSchema';
import { GoogleAnalytics } from '@next/third-parties/google';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { DM_Sans } from "next/font/google";
import { notFound } from 'next/navigation';
import Script from "next/script";
import "../globals.css";

const dmSans = DM_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
});

export async function generateMetadata() {
  const baseUrl = 'https://nelaton.app';
  const currentPath = '/'; // Для главной страницы, для других страниц подставьте путь

  // Формируем объект языков для alternates.languages
  const languagesObj = Object.fromEntries(
    languages.map(lang => [
      lang.id,
      lang.id === 'en'
        ? `${baseUrl}${currentPath}`
        : `${baseUrl}/${lang.id}${currentPath}`
    ])
  );

  return {
    title: "Use Nelaton Easily – Smart App for Self-Catheterization (ISC)",
    description: "Nelaton App: Your Smart Assistant for Self-Catheterization. Track catheterization intervals, manage supplies, and log with ease. Get started today!",
    alternates: {
      canonical: `${baseUrl}${currentPath}`,
      languages: languagesObj,
      'x-default': `${baseUrl}${currentPath}`
    }
  };
}

export default async function RootLayout({children, params}: Readonly<{children: React.ReactNode, params: Promise<{locale: string}>}>) {
  const schema = await generateSchema();

  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
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
      <Script id="cookieyes" strategy="afterInteractive" src="https://cdn-cookieyes.com/client_data/72ee03861749bd377718059e/script.js"/>
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
      <body className={`${dmSans.className} antialiased`}>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
        <noscript>
          <div>
            <img
              src="https://mc.yandex.ru/watch/104150319"
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>
      </body>
      {/* Google Analytics */}
      <GoogleAnalytics gaId="G-B6Z9MJ4EBF"/>
    </html>
  );
}