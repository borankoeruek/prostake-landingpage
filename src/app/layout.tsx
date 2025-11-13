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
  title: "ProStake — Be Smarter on Every Match",
  description:
    "Create, accept, and stake on matches with transparent pools and instant settlement.",
  metadataBase: new URL("https://prostake.app"),
  keywords: [
    "ProStake",
    "esports betting",
    "staking",
    "match betting",
    "pool betting",
  ],
  openGraph: {
    title: "ProStake — Be Smarter on Every Match",
    description:
      "Create, accept, and stake on matches with transparent pools and instant settlement.",
    type: "website",
    url: "https://prostake.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "ProStake — Be Smarter on Every Match",
    description:
      "Create, accept, and stake on matches with transparent pools and instant settlement.",
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
