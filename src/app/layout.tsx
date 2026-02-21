import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, Great_Vibes } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nathalies Tortenwelt | Handgemachte Torten mit Liebe",
  description: "Wunderschöne, handgemachte Torten für besondere Anlässe. Jede Torte ein Unikat, mit Liebe gebacken.",
  keywords: ["Torten", "Bäckerei", "handgemacht", "Hochzeitstorte", "Geburtstagstorte", "Nathalies Tortenwelt"],
  authors: [{ name: "Nathalies Tortenwelt" }],
  icons: {
    icon: "/images/logo.png",
  },
  openGraph: {
    title: "Nathalies Tortenwelt",
    description: "Handgemachte Torten mit Liebe",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={`${playfair.variable} ${cormorant.variable} ${greatVibes.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
