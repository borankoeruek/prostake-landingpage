"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { AppStoreButton } from "../components/AppStoreButton";
import { StakingClarityHeadline } from "../components/StakingClarityHeadline";
import { UpsideModelSection } from "../components/UpsideModelSection";

const heroPrimaryBtnClass =
  "btn-hero-primary inline-flex items-center justify-center px-6 py-3 text-base";

function AppPreviewAddressBar() {
  return (
    <div className="app-preview-address-bar" aria-hidden>
      <div className="app-preview-address-field">
        <svg
          className="app-preview-address-lock"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        <span className="app-preview-address-url">https://app.prostake.gg</span>
      </div>
    </div>
  );
}

/** Framing aligned with common esports-staking education copy: staking backs competitors / entries—not sportsbook-style betting. */
function StakingVsBettingNote({ shouldAnimate }: { shouldAnimate: boolean }) {
  const cardInner = (
    <div className="staking-spotlight-inner px-6 py-7 sm:px-9 sm:py-8">
      <div className="flex flex-col gap-6 sm:gap-7 lg:flex-row lg:items-center lg:gap-0">
        <div className="shrink-0 pl-2 sm:pl-4">
          <StakingClarityHeadline shouldAnimate={shouldAnimate} />
        </div>
        <div className="hidden min-w-[1.5rem] flex-[1_1_0%] items-stretch justify-center self-stretch lg:flex">
          <div
            className="pointer-events-none min-h-[5rem] w-px shrink-0 self-stretch bg-gradient-to-b from-transparent via-primary/25 to-transparent lg:min-h-full"
            aria-hidden
          />
        </div>
        <div className="min-w-0 flex-[2_1_0%] lg:pl-1">
          <p className="text-base leading-relaxed text-foreground/82 sm:text-[1.05rem] sm:leading-[1.65]">
            ProStake is{" "}
            <span className="font-semibold text-tertiary">
              not a gambling platform
            </span>
            . Staking means you{" "}
            <span className="font-medium text-foreground">back players</span> in{" "}
            <span className="font-medium text-foreground">
              live, skill-based matches -
            </span>{" "}
            supporting their competition and{" "}
            <span className="font-medium text-foreground">
              sharing in the outcome
            </span>{" "}
            when they win.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <section
      className="relative mx-auto max-w-6xl px-5 py-8 sm:px-6 sm:py-14"
      aria-labelledby="staking-clarity-heading"
    >
      <div className="pointer-events-none absolute -left-20 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 top-0 h-32 w-32 rounded-full bg-tertiary/10 blur-3xl" />
      {shouldAnimate ? (
        <motion.div
          className="staking-spotlight mx-auto w-full max-w-3xl overflow-hidden lg:max-w-4xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.45,
          }}
        >
          {cardInner}
        </motion.div>
      ) : (
        <div className="staking-spotlight mx-auto w-full max-w-3xl overflow-hidden lg:max-w-4xl">
          {cardInner}
        </div>
      )}
    </section>
  );
}

function BackgroundLayer({ shouldAnimate }: { shouldAnimate: boolean }) {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="landing-noise" aria-hidden />
      <div className="landing-grid-pattern" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/25 via-background/95 to-background" />
      <div
        className="absolute -left-[20%] top-0 h-[min(80vh,720px)] w-[70%] rounded-full opacity-50 blur-[100px]"
        style={{
          background:
            "radial-gradient(ellipse at center, color-mix(in oklab, var(--primary), transparent 72%) 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute -right-[15%] bottom-0 h-[min(70vh,600px)] w-[55%] rounded-full opacity-35 blur-[90px]"
        style={{
          background:
            "radial-gradient(ellipse at center, color-mix(in oklab, var(--tertiary), transparent 78%) 0%, transparent 62%)",
        }}
      />
      {shouldAnimate && (
        <>
          <motion.div
            className="absolute right-[-6rem] top-16 h-72 w-72 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, color-mix(in oklab, var(--primary), transparent 55%) 0%, transparent 70%)",
            }}
            animate={{
              x: [-16, 24, -12],
              y: [0, 16, -8],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute left-[-4rem] bottom-10 h-80 w-80 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, color-mix(in oklab, var(--secondary), transparent 60%) 0%, transparent 72%)",
            }}
            animate={{
              x: [12, -20, 16],
              y: [4, -12, 8],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 5,
            }}
          />
        </>
      )}
    </div>
  );
}

function Navbar() {
  return (
    <header className="sticky top-0 z-30 px-4 pb-3 pt-4">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-3.5 nav-glass">
        <Link
          href="#"
          className="inline-flex items-center text-2xl font-extrabold tracking-tight transition-opacity hover:opacity-90 sm:text-3xl"
        >
          <span className="text-primary">Pro</span>Stake
        </Link>
        <span className="btn-launch-fancy-groove shrink-0">
          <Link href="https://app.prostake.gg" className="btn-launch-fancy">
            Launch App
          </Link>
        </span>
      </div>
    </header>
  );
}

function HeroTagline() {
  return (
    <span className="block text-balance">
      <span className="hero-tagline-lead block text-foreground/78">
        Back players in{" "}
        <span className="font-semibold text-foreground/95">skill-based</span>{" "}
        matches and
      </span>
      <span className="hero-tagline-crescendo mt-1.5 block text-2xl font-bold leading-tight tracking-tight sm:mt-2 sm:text-3xl sm:leading-none">
        win when they win.
      </span>
    </span>
  );
}

function Hero({ shouldAnimate }: { shouldAnimate: boolean }) {
  if (shouldAnimate) {
    return (
      <motion.section
        className="relative overflow-hidden bg-transparent pt-2 pb-16 sm:pb-24 sm:pt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="pointer-events-none absolute left-1/2 top-0 h-px w-[min(90%,48rem)] -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/35 to-transparent" />
        <div className="mx-auto grid max-w-6xl gap-12 px-4 lg:grid-cols-[1.3fr_minmax(0,1fr)] lg:items-center lg:gap-14">
          <div className="space-y-7 text-center sm:text-left">
            <motion.div
              className="mx-auto inline-flex h-1 w-14 rounded-full bg-gradient-to-r from-primary/20 via-primary to-tertiary/80 sm:mx-0"
              initial={{ opacity: 0, scaleX: 0.3 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              aria-hidden
            />
            <motion.h1
              className="hero-title-gradient text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Play Black Ops 7 win cash.
            </motion.h1>
            <motion.p
              className="hero-sub-glow max-w-2xl text-xl leading-relaxed text-foreground/80 mx-auto sm:mx-0 sm:text-[1.35rem] sm:leading-snug"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <HeroTagline />
            </motion.p>
            <motion.div
              className="flex gap-4 flex-wrap justify-center sm:justify-start pt-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link
                href="https://app.prostake.gg"
                className={heroPrimaryBtnClass}
              >
                Start Playing
              </Link>
              <AppStoreButton />
            </motion.div>
          </div>
          <motion.div
            className="hero-image-ring relative"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.25 }}
          >
            <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-primary/25 via-transparent to-tertiary/20 blur-2xl" />
            <div className="hero-image-ring-inner">
              <Image
                src="/stake.png"
                alt="ProStake staking interface"
                width={400}
                height={600}
                quality={100}
                className="w-full h-auto"
                priority
              />
            </div>
          </motion.div>
        </div>
      </motion.section>
    );
  }

  // Static version for mobile/no animations
  return (
    <section className="relative overflow-hidden bg-transparent pt-8 pb-16 sm:pb-24 sm:pt-10">
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-[min(90%,48rem)] -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/35 to-transparent" />
      <div className="mx-auto grid max-w-6xl gap-12 px-4 lg:grid-cols-[1.3fr_minmax(0,1fr)] lg:items-center lg:gap-14">
        <div className="space-y-7 text-center sm:text-left">
          <div
            className="mx-auto inline-flex h-1 w-14 rounded-full bg-gradient-to-r from-primary/20 via-primary to-tertiary/80 sm:mx-0"
            aria-hidden
          />
          <h1 className="hero-title-gradient text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Play Black Ops 7 win cash.
          </h1>
          <p className="hero-sub-glow max-w-2xl text-xl leading-relaxed text-foreground/80 mx-auto sm:mx-0 sm:text-[1.35rem] sm:leading-snug">
            <HeroTagline />
          </p>
          <div className="flex gap-4 flex-wrap justify-center sm:justify-start pt-1">
            <Link
              href="https://app.prostake.gg"
              className={heroPrimaryBtnClass}
            >
              Start Playing
            </Link>
            <AppStoreButton />
          </div>
        </div>
        <div className="hero-image-ring relative">
          <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-primary/25 via-transparent to-tertiary/20 blur-2xl" />
          <div className="hero-image-ring-inner">
            <Image
              src="/stake.png"
              alt="ProStake staking interface"
              width={400}
              height={600}
              quality={100}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function AppScreenshot({ shouldAnimate }: { shouldAnimate: boolean }) {
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

  if (shouldAnimate) {
    return (
      <motion.section
        className="relative border-y border-outline/25 bg-gradient-to-b from-background via-surface/30 to-background py-16 sm:py-28"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, color-mix(in oklab, var(--foreground), transparent 50%) 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="relative mx-auto w-full max-w-[min(100%,96rem)] px-3 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-10 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-sm font-medium uppercase tracking-[0.35em] text-primary/80 mb-4">
              App Preview
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl mb-4">
              Experience ProStake in action
            </h2>
          </motion.div>
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <div className="relative w-full">
              <motion.div
                className="app-preview-frame"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.35 }}
              >
                <div className="app-preview-frame-inner">
                  <AppPreviewAddressBar />
                  <Image
                    src={imageSrc}
                    alt="ProStake App Screenshot"
                    width={400}
                    height={700}
                    className="w-full h-auto"
                    priority
                    loading="eager"
                    fetchPriority="high"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 92vw, min(92rem, 100vw)"
                    quality={100}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+IRjWjBqO6O2mhP//Z"
                  />
                </div>
              </motion.div>
              <motion.div
                className="absolute -left-8 -top-8 h-24 w-24 rounded-full bg-primary/25 blur-2xl"
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.4, 0.65, 0.4],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute -bottom-10 -right-10 h-28 w-28 rounded-full bg-tertiary/20 blur-2xl"
                animate={{
                  scale: [1, 1.08, 1],
                  opacity: [0.35, 0.55, 0.35],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2,
                }}
              />
            </div>
          </motion.div>
        </div>
      </motion.section>
    );
  }

  // Static version for mobile/no animations
  return (
    <section className="relative border-y border-outline/25 bg-gradient-to-b from-background via-surface/30 to-background py-16 sm:py-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, color-mix(in oklab, var(--foreground), transparent 50%) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="relative mx-auto w-full max-w-[min(100%,96rem)] px-3 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <p className="text-sm font-medium uppercase tracking-[0.35em] text-primary/80 mb-4">
            App Preview
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl mb-4">
            Experience ProStake in action
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto px-4 text-lg leading-relaxed">
            See how our streamlined interface makes staking on your favorite
            players intuitive and powerful.
          </p>
        </div>
        <div className="flex justify-center">
          <div className="relative w-full">
            <div className="app-preview-frame">
              <div className="app-preview-frame-inner">
                <AppPreviewAddressBar />
                <Image
                  src={imageSrc}
                  alt="ProStake App Screenshot"
                  width={400}
                  height={700}
                  className="w-full h-auto"
                  priority
                  loading="eager"
                  fetchPriority="high"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 92vw, min(92rem, 100vw)"
                  quality={100}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+IRjWjBqO6O2mhP//Z"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-background via-card/40 to-background pb-10 pt-14">
      <div className="footer-edge" />
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-md">
          <Link
            href="#"
            className="text-lg font-bold tracking-tight transition-opacity hover:opacity-90"
          >
            <span className="text-primary">Pro</span>Stake
          </Link>
          <p className="mt-3 text-sm leading-relaxed text-foreground/70">
            Competitive esports staking—back players, not the house.
          </p>
        </div>
        <nav
          className="flex flex-wrap gap-x-8 gap-y-3 text-sm font-medium text-foreground/65"
          aria-label="Footer"
        >
          <Link href="/privacy" className="footer-link hover:text-primary">
            Privacy
          </Link>
          <Link href="/contact" className="footer-link hover:text-primary">
            Contact
          </Link>
          <Link href="/faq" className="footer-link hover:text-primary">
            FAQ
          </Link>
        </nav>
      </div>
      <div className="mx-auto mt-12 max-w-6xl border-t border-outline/25 px-4 pt-8 text-center text-xs uppercase tracking-[0.28em] text-foreground/45">
        © {new Date().getFullYear()} ProStake Inc. All rights reserved.
      </div>
    </footer>
  );
}

export default function Home() {
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        window.innerWidth < 768 ||
          /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent,
          ),
      );
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Animation levels: full for desktop, none on mobile, none when user prefers reduced motion
  const shouldAnimate = !prefersReducedMotion && !isMobile;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ProStake",
    description:
      "Esports staking platform: back players in skill-based competitive matches - not traditional sportsbook betting.",
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
      <div className="landing-page-shell relative overflow-x-hidden bg-background">
        <BackgroundLayer shouldAnimate={shouldAnimate} />
        <Navbar />
        <Hero shouldAnimate={shouldAnimate} />
        <StakingVsBettingNote shouldAnimate={shouldAnimate} />
        <AppScreenshot shouldAnimate={shouldAnimate} />
        <UpsideModelSection shouldAnimate={shouldAnimate} />
        <Footer />
      </div>
    </>
  );
}
