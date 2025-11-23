import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Björnsta Consulting Group | Redovisning & Skattetjänster i Stockholm",
  description: "Björnsta Consulting Group erbjuder professionell bokföring, redovisning och skattetjänster i Stockholm. Med 5+ års erfarenhet och 60+ nöjda kunder är vi din betrodda finansiella partner.",
  keywords: [
    "redovisningsbyrå Stockholm",
    "bokföring Sverige",
    "skattetjänster",
    "Björnsta Consulting",
    "finansiell rådgivning",
    "redovisningskonsult",
    "bokföringsbyrå",
    "momsredovisning",
    "årsredovisning",
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
    title: "Björnsta Consulting Group | Redovisning & Skattetjänster",
    description: "Professionell bokföring, redovisning och skattetjänster i Stockholm. 5+ års erfarenhet med 60+ nöjda kunder.",
    siteName: "Björnsta Consulting Group",
    images: [
      {
        url: "/hero-image.jpg",
        width: 1200,
        height: 630,
        alt: "Björnsta Consulting Group",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Björnsta Consulting Group | Redovisning & Skattetjänster",
    description: "Professionell bokföring, redovisning och skattetjänster i Stockholm.",
    images: ["/hero-image.jpg"],
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
      </body>
    </html>
  );
}
