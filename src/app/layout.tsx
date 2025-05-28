import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer/Footer";
import { GoogleAnalytics } from '@next/third-parties/google';
import Script from "next/script";
import {generateSchema} from '@/utils/generateSchema';

const dmSans = DM_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Use Nelaton Easily – Smart App for Self-Catheterization (ISC)",
  description: "Nelaton App: Your Smart Assistant for Self-Catheterization. Track catheterization intervals, manage supplies, and log with ease. Get started today!",
};

export default async function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  const schema = await generateSchema();

  return (
    <html lang="en">
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
      <Script id="cookieyes" strategy="afterInteractive" src="https://cdn-cookieyes.com/client_data/72ee03861749bd377718059e/script.js"/>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />
      <body className={`${dmSans.className} antialiased`}>
        {children}
        <Footer/>
      </body>
      <GoogleAnalytics gaId="G-B6Z9MJ4EBF"/>
    </html>
  );
}