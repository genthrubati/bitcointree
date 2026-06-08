import type { Metadata, Viewport } from "next";
import { Spectral, Inter } from "next/font/google";
import "./globals.css";

// Editorial serif — narration, headlines, the "documentary lower-third" voice.
const spectral = Spectral({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

// Clean grotesk — interface, numerals, the "tool you can use right now" voice.
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bitcointree.org"),
  title: "BitcoinTree — A Monument to Long-Term Thinking",
  description:
    "Trees grow slowly. Trust grows slowly. Civilizations grow slowly. Wealth grows slowly. BitcoinTree is a public, living monument to the idea that the things worth having cannot be rushed — and an invitation to help grow one, in public, for as long as it takes.",
  keywords: [
    "BitcoinTree",
    "Bitcoin",
    "long-term thinking",
    "sound money",
    "monument",
    "interactive documentary",
  ],
  openGraph: {
    title: "BitcoinTree — A Monument to Long-Term Thinking",
    description:
      "An interactive documentary about patience, trust, and the slow growth of things that matter.",
    url: "https://bitcointree.org",
    siteName: "BitcoinTree",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BitcoinTree — A Monument to Long-Term Thinking",
    description:
      "An interactive documentary about patience, trust, and the slow growth of things that matter.",
  },
};

export const viewport: Viewport = {
  themeColor: "#FAFAF8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spectral.variable} ${inter.variable}`}>
      <body className="bg-paper text-ink font-sans antialiased selection:bg-ember/20 selection:text-ink">
        {children}
      </body>
    </html>
  );
}
