import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ProStake — Skill-Based Wagering Platform",
  description:
    "Experience competitive gaming like never before. Stake on your favorite players, compete for real money, and become part of the next generation of esports.",
  metadataBase: new URL("https://prostake.gg"),
  keywords: [
    "ProStake",
    "skill-based wagering",
    "esports betting",
    "gaming staking",
    "competitive gaming",
    "player staking",
    "esports platform",
  ],
  authors: [{ name: "ProStake Team" }],
  creator: "ProStake",
  publisher: "ProStake Inc.",
  openGraph: {
    title: "ProStake — Skill-Based Wagering Platform",
    description:
      "Experience competitive gaming like never before. Stake on your favorite players, compete for real money, and become part of the next generation of esports.",
    url: "https://prostake.gg",
    siteName: "ProStake",
    images: [
      {
        url: "https://prostake.gg/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ProStake - Skill-Based Wagering Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ProStake — Skill-Based Wagering Platform",
    description:
      "Experience competitive gaming like never before. Stake on your favorite players, compete for real money, and become part of the next generation of esports.",
    images: ["https://prostake.gg/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification-code",
  },
  icons: {
    icon: "/prostakeAppLogo.png",
    shortcut: "/prostakeAppLogo.png",
    apple: "/prostakeAppLogo.png",
  },
  other: {
    "msapplication-TileImage": "/prostakeAppLogo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-dvh`}
        suppressHydrationWarning={true}
      >
        <div className="relative min-h-dvh overflow-x-clip">
          <div className="app-gradient-bg" />
          {children}
        </div>
      </body>
    </html>
  );
}
