import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { GoogleAnalytics } from '@next/third-parties/google';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Redovisningsbyrå Eskilstuna | Bokföring & Skattetjänster - Björnsta",
  description: "Expert på bokföring, redovisning och skattetjänster i Eskilstuna. 5+ års erfarenhet, 60+ nöjda kunder. Professionell redovisningsbyrå med personlig service. Ring 076-060 20 88.",
  keywords: [
    "redovisningsbyrå Eskilstuna",
    "bokföring Eskilstuna",
    "skattetjänster Eskilstuna",
    "Björnsta Consulting",
    "redovisning Eskilstuna",
    "bokföringstjänster",
    "finansiell rådgivning",
    "redovisningskonsult",
    "bokföringsbyrå",
    "momsredovisning",
    "årsredovisning",
    "löneadministration",
    "bokslut Eskilstuna",
    "deklaration Eskilstuna",
  ],
  authors: [{ name: "Björnsta Consulting Group" }],
  creator: "Björnsta Consulting Group",
  publisher: "Björnsta Consulting Group",
  metadataBase: new URL('https://bjornsta.se'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: "website",
    locale: "sv_SE",
    url: "https://bjornsta.se",
    title: "Redovisningsbyrå Eskilstuna | Bokföring & Skattetjänster - Björnsta",
    description: "Expert på bokföring, redovisning och skattetjänster i Eskilstuna. 60+ nöjda kunder. Professionell redovisningsbyrå med personlig service.",
    siteName: "Björnsta Redovisning",
    images: [
      {
        url: "/hero-image.webp",
        width: 1200,
        height: 630,
        alt: "Björnsta Consulting Group",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Redovisningsbyrå Eskilstuna | Bokföring & Skattetjänster - Björnsta",
    description: "Expert på bokföring, redovisning och skattetjänster i Eskilstuna. 60+ nöjda kunder. Professionell redovisningsbyrå med personlig service.",
    images: ["/hero-image.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv" className="scroll-smooth">
      <head>
        <JsonLd />
      </head>
      <body className={`${inter.className} antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX'} />
      </body>
    </html>
  );
}
