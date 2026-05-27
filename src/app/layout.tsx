import type { Metadata } from "next";
import { Playfair_Display, IBM_Plex_Mono, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const ibmMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Platform Mas Dika Sanan - Saham Boy",
  description:
    "Real-time stock market news aggregator with threat intelligence-style analysis. Track market movers, earnings, and macro events.",
  keywords: ["stock market", "news", "market intelligence", "trading", "finance"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${playfair.variable} ${ibmMono.variable} ${inter.variable}`}>
      <body className="bg-bg-primary text-text-primary antialiased">{children}</body>
    </html>
  );
}
