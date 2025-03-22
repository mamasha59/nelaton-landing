/* eslint-disable @next/next/next-script-for-ga */
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer/Footer";
import Head from "next/head";
import Script from "next/script";

const dmSans = DM_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Use Nelaton Easily – Smart App for Self-Catheterization (ISC)",
  description: "Nelaton App: Your Smart Assistant for Self-Catheterization. Track catheterization intervals, manage supplies, and log with ease. Get started today!",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {

  return (
    <html lang="en">
      {/* Google Tag Manager */}
      <Script id="gtm-script" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-T49SQQ9L');
        `}
      </Script>
       {/* Google Analytics */}
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-B6Z9MJ4EBF" strategy="afterInteractive"/>
      <Script id="cookieyes" strategy="afterInteractive" src="https://cdn-cookieyes.com/client_data/72ee03861749bd377718059e/script.js"/>
      <Head>
        <script id="google-analytics" dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-B6Z9MJ4EBF');
          `,
        }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify('/nelaton-structured.json') }}
        />
      </Head>
      <body className={`${dmSans.className} antialiased`}>
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-T49SQQ9L" height="0" width="0" className="hidden invisible"></iframe></noscript>
        {children}
        <Footer/>
      </body>
    </html>
  );
}