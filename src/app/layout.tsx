import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PostHogProvider } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ProStake - Esports Staking Platform",
  description:
    "Back players in skill-based matches—not the house. Staking means supporting competitors and sharing in the outcome; ProStake is built for competitive gaming, not traditional sportsbook betting.",
  metadataBase: new URL("https://prostake.gg"),
  keywords: [
    "ProStake",
    "esports staking",
    "skill-based staking",
    "competitive gaming",
    "player staking",
    "esports platform",
    "stake on players",
    "cmg",
    "checkmate gaming",
    "console kings",
  ],
  authors: [{ name: "ProStake Team" }],
  creator: "ProStake",
  publisher: "ProStake Inc.",
  openGraph: {
    title: "ProStake - Esports Staking Platform",
    description:
      "Back players in skill-based matches—not the house. Staking means supporting competitors and sharing in the outcome; built for competitive gaming, not sportsbook betting.",
    url: "https://prostake.gg",
    siteName: "ProStake",
    images: [
      {
        url: "https://prostake.gg/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ProStake - Esports Staking Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ProStake - Esports Staking Platform",
    description:
      "Back players in skill-based matches—not the house. Staking supports competitors; not traditional sportsbook betting.",
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-dvh`}
        suppressHydrationWarning={true}
      >
        <PostHogProvider>
          <div className="relative min-h-dvh overflow-x-clip">
            <div className="app-gradient-bg" />
            {children}
          </div>
        </PostHogProvider>
      </body>
    </html>
  );
}
