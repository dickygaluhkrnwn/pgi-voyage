import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import MetaPixel from "@/components/MetaPixel";
import { Analytics } from "@vercel/analytics/next"; // <-- 1. Impor Vercel Analytics di sini

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pgivoyage.vercel.app"),
  title: "PGI Voyage | Premium Liveaboard",
  description: "Experience the ultimate 4D3N liveaboard expedition from Lombok to Komodo. Book your premium cabin today.",
  openGraph: {
    title: "PGI Voyage | Premium Komodo Liveaboard",
    description: "Experience the ultimate 4D3N liveaboard expedition from Lombok to Komodo. Book your premium cabin today.",
    url: "https://pgivoyage.vercel.app",
    siteName: "PGI Voyage",
    images: [
      {
        url: "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?q=80&w=2070&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "PGI Voyage Premium Liveaboard",
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PGI Voyage | Premium Komodo Liveaboard",
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
        {/* Tracking Scripts (Google & Meta) */}
        <Suspense fallback={null}>
          <GoogleAnalytics GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_ID || "G-XXXXXXXXXX"} />
          <MetaPixel PIXEL_ID={process.env.NEXT_PUBLIC_META_PIXEL_ID || "XXXXXXXXXXXXXXX"} />
        </Suspense>
        
        {/* Render Page Content */}
        {children}

        {/* <-- 2. Render Vercel Analytics di paling bawah body */}
        <Analytics /> 
      </body>
    </html>
  );
}