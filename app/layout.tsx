import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { GoogleAnalytics } from '@next/third-parties/google';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Redovisningsbyrå Sverige | Bokföring & Skattetjänster - Björnsta Eskilstuna",
  description: "Redovisningsbyrå i Eskilstuna med 110+ kunder i hela Sverige. Bokföring, skattetjänster och löneadministration på svenska, engelska & arabiska. Ring 076-060 20 88.",
  keywords: [
    "redovisningsbyrå Eskilstuna",
    "redovisningsbyrå Sverige",
    "bokföring Eskilstuna",
    "bokföring Sverige",
    "skattetjänster Sverige",
    "redovisning Sverige",
    "Björnsta Consulting",
    "redovisning Eskilstuna",
    "löneadministration",
    "bokföringstjänster",
    "finansiell rådgivning",
    "redovisningskonsult",
    "bokföringsbyrå",
    "momsredovisning",
    "årsredovisning",
    "bokslut Eskilstuna",
    "deklaration Eskilstuna",
    "accountant Sweden",
    "accounting firm Sweden",
    "bookkeeping Sweden",
    "tax services Sweden",
    "محاسب في السويد",
    "شركة محاسبة في السويد",
    "خدمات محاسبة",
    "mo7aseb",
  ],
  authors: [{ name: "Björnsta Consulting Group" }],
  creator: "Björnsta Consulting Group",
  publisher: "Björnsta Consulting Group",
  metadataBase: new URL('https://bjornsta.se'),
  alternates: {
    canonical: '/',
    languages: {
      'sv': '/',
      'en': '/en',
      'ar': '/ar',
    },
  },
  openGraph: {
    type: "website",
    locale: "sv_SE",
    url: "https://bjornsta.se",
    title: "Redovisningsbyrå Sverige | Bokföring & Skattetjänster - Björnsta Eskilstuna",
    description: "Redovisningsbyrå i Eskilstuna med 110+ kunder i hela Sverige. Bokföring, skattetjänster och löneadministration. Service på svenska, engelska & arabiska.",
    siteName: "Björnsta Redovisning",
    images: [
      {
        url: "/hero-image.webp",
        width: 1200,
        height: 630,
        alt: "Björnsta Consulting Group – redovisningsbyrå med kunder i hela Sverige",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Redovisningsbyrå Sverige | Bokföring & Skattetjänster - Björnsta Eskilstuna",
    description: "Redovisningsbyrå i Eskilstuna med 110+ kunder i hela Sverige. Bokföring, skattetjänster och löneadministration. Service på svenska, engelska & arabiska.",
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
