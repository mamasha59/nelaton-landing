import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer/Footer";

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
      <body className={`${dmSans.className} antialiased`}>
          {children}
        <Footer/>
      </body>
    </html>
  );
}