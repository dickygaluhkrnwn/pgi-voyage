import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import MetaPixel from "@/components/MetaPixel";
import GoogleTagManager from "@/components/GoogleTagManager";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://peacefulgoldenisland.com"),
  title: "PMM Voyage | Premium Liveaboard",
  description: "Experience the ultimate 4D3N liveaboard expedition from Lombok to Komodo. Book your premium cabin today.",
  verification: {
    google: "ev8WW01OD9DIwuithkdSFT40usPCdfpGdAHcjbyogio",
  },
  openGraph: {
    title: "PMM Voyage | Premium Komodo Liveaboard",
    description: "Experience the ultimate 4D3N liveaboard expedition from Lombok to Komodo. Book your premium cabin today.",
    url: "https://peacefulgoldenisland.com",
    siteName: "PMM Voyage",
    images: [
      {
        url: "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?q=80&w=2070&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "PMM Voyage Premium Liveaboard",
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PMM Voyage | Premium Komodo Liveaboard",
    description: "Experience the ultimate 4D3N liveaboard expedition from Lombok to Komodo. Book your premium cabin today.",
    images: ["https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?q=80&w=2070&auto=format&fit=crop"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Tracking Scripts (Google, Meta, & GTM) */}
        <Suspense fallback={null}>
          {/* Fallback diubah langsung ke ID GTM asli agar langsung aktif untuk Google Ads */}
          <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID || "GTM-T3JGT5ZL"} />
          <GoogleAnalytics GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_ID || ""} />
          <MetaPixel PIXEL_ID={process.env.NEXT_PUBLIC_META_PIXEL_ID || ""} />
        </Suspense>
        
        {/* Render Page Content */}
        {children}

        {/* Vercel Analytics */}
        <Analytics /> 
      </body>
    </html>
  );
}