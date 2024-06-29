import type { Metadata } from "next";
import { Pixelify_Sans } from "next/font/google";
import type { Viewport } from "next";
import { Analytics } from "@vercel/analytics/react"

import "./globals.css";

const pixelify = Pixelify_Sans({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#8d5ebe",
};
export const metadata: Metadata = {
  metadataBase: new URL("https://smp.arens.live"),
  title: "ArensLiveSMP",
  description: "Your favorite SMP, now live!",
  icons: [{ rel: "icon", url: "/assets/icons/favicon.png" }],
  twitter: {
    site: "@arens_live",
    card: "summary_large_image",
    images: [{ url: "/assets/icons/og.png", width: 1200, height: 630 }],
  },
  openGraph: {
    
  locale: 'en_US',
    title: "ArensLiveSMP",
    description: "Your favorite SMP, now live!",
    images: [{ url: "/assets/icons/og.png", width: 1200, height: 630 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={pixelify.className}>{children}<Analytics /></body>
    </html>
  );
}
