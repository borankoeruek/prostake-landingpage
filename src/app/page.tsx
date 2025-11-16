"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

const stats = [
  { value: "$50K+", label: "daily prize pools" },
  { value: "24/7", label: "live match coverage" },
  { value: "$1 Mio", label: "in Tournaments 2026" },
];

const features = [
  {
    title: "Lowest Fees in the Market",
    body: "Only 5% fees on matches, deposits, and withdrawals - the lowest rates available.",
    icon: "💰",
  },
  {
    title: "Free Entry Tournaments",
    body: "Daily free-to-enter tournaments with real prize pools. No entry costs required.",
    icon: "🏆",
  },
  {
    title: "Stake on Favorite Players",
    body: "Support your favorite esports players and share in their victories with transparent staking.",
    icon: "⭐",
  },
  {
    title: "Free Live Support",
    body: "24/7 live support for all games at no extra cost. Get help whenever you need it.",
    icon: "🎧",
  },
];

function BackgroundLayer() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-background/90" />
      <div className="absolute right-[-6rem] top-16 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute left-[-4rem] bottom-10 h-72 w-72 rounded-full bg-slate-900/10 blur-3xl" />
    </div>
  );
}

function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-outline/40 bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="#" className="text-lg font-semibold tracking-tight">
          <span className="text-primary">Pro</span>Stake
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-foreground/80 sm:flex">
          <Link href="#features" className="hover:text-primary">
            Features
          </Link>
          <Link href="#process" className="hover:text-primary">
            How it works
          </Link>
          <Link href="#cta" className="hover:text-primary">
            Launch
          </Link>
        </nav>
        <Link
          href="https://app.prostake.gg"
          className="rounded-full border border-primary/70 bg-primary px-4 py-2 text-sm font-semibold text-onPrimary hover:bg-primary/90"
        >
          Launch App
        </Link>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-background py-12 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-[1.3fr_minmax(0,1fr)] lg:items-center">
        <div className="space-y-6">
          <h1 className="text-5xl font-extrabold leading-tight text-foreground sm:text-6xl lg:text-7xl mb-4">
            Play Black Ops 7 win cash.
          </h1>
          <p className="text-xl text-foreground/80 mb-8 max-w-2xl">
            Free Entry and Side Bets directly integrated on the App.
          </p>
          <div className="flex gap-3 flex-wrap justify-center sm:justify-start">
            <Link
              href="https://app.prostake.gg"
              className="rounded-xl bg-primary px-6 py-3 text-base font-semibold text-onPrimary hover:bg-primary/90"
            >
              Start Playing
            </Link>
            <Link
              href="https://app.prostake.gg"
              className="rounded-xl border border-outline/60 px-6 py-3 text-base font-semibold text-foreground/80 hover:border-primary hover:text-primary"
            >
              Sign In
            </Link>
          </div>
        </div>
        <div className="rounded-[32px] overflow-hidden">
          <Image
            src="/stake.png"
            alt="ProStake staking interface"
            width={400}
            height={600}
            quality={100}
            className="w-full h-auto rounded-2xl"
            priority
          />
        </div>
      </div>
    </section>
  );
}

function AppScreenshot() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const imageSrc = isMobile
    ? "/screenshotprostake mobile.png"
    : "/screenshotapp.png";

  return (
    <section className="bg-background py-12 sm:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center mb-8 sm:mb-16">
          <p className="text-sm uppercase tracking-[0.4em] text-primary/70 mb-4">
            App Preview
          </p>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl mb-4">
            Experience ProStake in action
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto px-4">
            See how our streamlined interface makes staking on your favorite
            players intuitive and powerful.
          </p>
        </div>
        <div className="flex justify-center">
          <div className="relative max-w-6xl w-full">
            <div className="rounded-2xl sm:rounded-3xl overflow-hidden">
              <div className="relative w-full">
                <Image
                  src={imageSrc}
                  alt="ProStake App Screenshot"
                  width={400}
                  height={700}
                  className="w-full h-auto rounded-xl sm:rounded-2xl"
                  priority
                  loading="eager"
                  fetchPriority="high"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  quality={100}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+IRjWjBqO6O2mhP//Z"
                />
              </div>
            </div>
            {/* Decorative elements - hidden on mobile, visible on larger screens */}
            <div className="hidden sm:block absolute -top-6 -left-6 h-12 w-12 rounded-full bg-primary/20 blur-xl" />
            <div className="hidden sm:block absolute -bottom-6 -right-6 h-16 w-16 rounded-full bg-primary/10 blur-xl" />
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsGrid() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-6 rounded-[28px] border border-outline/30 bg-card/60 p-6 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="space-y-2 text-center">
            <p className="text-3xl font-bold text-primary">{stat.value}</p>
            <p className="text-sm uppercase tracking-[0.3em] text-foreground/60">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section id="features" className="bg-background py-20">
      <div className="mx-auto max-w-6xl px-4 space-y-10">
        <div className="space-y-3 text-center">
          <p className="text-sm uppercase tracking-[0.4em] text-primary/70">
            Why Choose ProStake
          </p>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            Competitive advantages that set us apart.
          </h2>
          <p className="text-foreground/70">
            Experience the lowest fees, free tournaments, and premium support
            that make ProStake the ultimate choice for serious players.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="rounded-2xl border border-outline/30 bg-card/50 p-6 hover:border-primary/60"
            >
              <div className="text-3xl">{feature.icon}</div>
              <h3 className="mt-4 text-xl font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-foreground/70">{feature.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section
      id="cta"
      className="relative bg-gradient-to-r from-primary to-primary/70 py-12 text-onPrimary"
    >
      <div className="mx-auto max-w-5xl px-4 text-center">
        <p className="text-sm uppercase tracking-[0.3em] opacity-70">
          Get Started
        </p>
        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
          Ready to guard your stake and win?
        </h2>
        <p className="mt-3 text-lg opacity-80">
          Launch the ProStake dashboard, browse your favorite esports, and stake
          with confidence.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="https://app.prostake.gg"
            className="rounded-full bg-background/10 px-8 py-3 text-base font-semibold hover:bg-background/20"
          >
            Launch Web App
          </Link>
          <Link
            href="https://app.prostake.gg"
            className="rounded-full border border-onPrimary/40 px-8 py-3 text-base font-semibold hover:border-onPrimary"
          >
            Join Beta
          </Link>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-outline/40 bg-card/60 py-6">
      <div className="mx-auto max-w-6xl px-4 sm:flex sm:items-center sm:justify-between">
        <div>
          <Link href="#" className="text-lg font-semibold">
            <span className="text-primary">Pro</span>Stake
          </Link>
          <p className="mt-2 text-sm text-foreground/70">
            Built for competitive excellence with transparent staking rails.
          </p>
        </div>
        <div className="mt-6 flex flex-wrap gap-4 text-sm text-foreground/60 sm:mt-0">
          <Link href="/privacy" className="hover:text-primary">
            Privacy
          </Link>
          <Link href="/contact" className="hover:text-primary">
            Contact
          </Link>
          <Link href="/faq" className="hover:text-primary">
            FAQ
          </Link>
        </div>
      </div>
      <div className="mt-8 border-t border-outline/30 pt-4 text-center text-xs uppercase tracking-[0.3em] text-foreground/50">
        © {new Date().getFullYear()} ProStake Inc. All rights reserved.
      </div>
    </footer>
  );
}

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ProStake",
    description: "Skill-based wagering platform for competitive gaming",
    url: "https://prostake.gg",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://prostake.gg/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
    publisher: {
      "@type": "Organization",
      name: "ProStake Inc.",
      url: "https://prostake.gg",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="relative overflow-x-hidden bg-background">
        <BackgroundLayer />
        <Navbar />
        <Hero />
        <AppScreenshot />
        <StatsGrid />
        <FeaturesSection />
        <CTA />
        <Footer />
      </div>
    </>
  );
}
