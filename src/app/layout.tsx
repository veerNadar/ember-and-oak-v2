import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToastProvider from "@/components/ToastProvider";
import NextAuthProvider from "@/components/NextAuthProvider";
import WhatsAppButton from "@/components/WhatsAppButton";

// ── Fonts ─────────────────────────────────────
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

// ── Metadata ──────────────────────────────────
export const metadata: Metadata = {
  title: "Ember & Oak | Modern American Bistro",
  description:
    "Ember & Oak is an upscale Modern American Bistro in Austin, TX. Experience bold, fire-crafted flavours, seasonal ingredients, and an intimate atmosphere. Reserve your table today.",
  keywords: [
    "Ember & Oak",
    "restaurant Austin",
    "fine dining Austin",
    "Modern American Bistro",
    "reservations Austin TX",
  ],
  openGraph: {
    title: "Ember & Oak | Modern American Bistro",
    description:
      "Bold, fire-crafted food rooted in tradition. Reserve your table at Ember & Oak, Austin TX.",
    type: "website",
    locale: "en_US",
  },
};

// ── Root layout ───────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable}`}
    >
      <body className="bg-charcoal text-cream antialiased flex flex-col min-h-screen">
        <NextAuthProvider>
          <Navbar />
          <main className="flex-1 pt-16 md:pt-20 min-h-screen">
            {children}
          </main>
          <Footer />
          <ToastProvider />
          <WhatsAppButton />
        </NextAuthProvider>
      </body>
    </html>
  );
}

