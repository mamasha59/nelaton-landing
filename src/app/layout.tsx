import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer/Footer";

const dmSans = DM_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Use Nelaton Easily",
  description: "Smart Assistant for Self - Catheterization!",
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