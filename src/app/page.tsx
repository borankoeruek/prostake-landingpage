"use client";
import { motion } from "framer-motion";
import Link from "next/link";

// Animated background component
function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Gradient orbs */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          x: [0, -80, 0],
          y: [0, 80, 0],
          scale: [1, 0.8, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute bottom-1/4 -right-32 w-96 h-96 bg-primary/8 rounded-full blur-3xl"
      />

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => {
        // Generate deterministic positions based on index for SSR consistency
        const seed = i * 0.618033988749895; // Golden ratio for good distribution
        const leftPos = 20 + ((seed * 9301) % 60); // Pseudo-random but deterministic
        const topPos = 20 + ((seed * 49297) % 60);
        const delay = (seed * 5) % 5;
        const duration = 8 + ((seed * 4) % 4);
        const xOffset = ((seed * 100) % 100) - 50;

        return (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            animate={{
              y: [0, -100, 0],
              x: [0, xOffset, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              delay: delay,
              ease: "easeInOut",
            }}
            style={{
              left: `${leftPos}%`,
              top: `${topPos}%`,
            }}
          />
        );
      })}

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_0)] bg-[length:50px_50px] opacity-20" />
    </div>
  );
}

function Navbar() {
  const APP_WEB_URL = "https://app.prostake.gg";
  const IOS_STORE_URL =
    process.env.NEXT_PUBLIC_IOS_APP_URL ||
    "https://apps.apple.com/app/id000000000";
  const ANDROID_STORE_URL =
    process.env.NEXT_PUBLIC_ANDROID_APP_URL ||
    "https://play.google.com/store/apps/details?id=com.prostake.app";

  const handleLaunch = () => {
    if (typeof window === "undefined") return;
    const ua =
      navigator.userAgent ||
      navigator.vendor ||
      (window as Window & { opera?: string }).opera ||
      "";

    const isIOS =
      /iPhone|iPad|iPod/i.test(ua) ||
      (navigator.platform === "MacIntel" &&
        (navigator as Navigator & { maxTouchPoints?: number }).maxTouchPoints >
          1);
    const isAndroid = /Android/i.test(ua);

    if (isIOS) {
      window.location.href = IOS_STORE_URL;
      return;
    }
    if (isAndroid) {
      window.location.href = ANDROID_STORE_URL;
      return;
    }
    window.location.href = APP_WEB_URL;
  };
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-40 w-full"
    >
      <div className="backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-outline/40">
        <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
          <Link href="#" className="font-semibold tracking-tight text-lg">
            <span className="text-primary">Pro</span>Stake
          </Link>
          <div className="hidden sm:flex items-center gap-4 text-sm">
            <Link
              href="#features"
              className="opacity-80 hover:opacity-100 transition-opacity"
            >
              Features
            </Link>
            <Link
              href="/faq"
              className="opacity-80 hover:opacity-100 transition-opacity"
            >
              FAQ
            </Link>
            <Link
              href="/contact"
              className="opacity-80 hover:opacity-100 transition-opacity"
            >
              Contact
            </Link>
            <Link
              href="/privacy"
              className="opacity-80 hover:opacity-100 transition-opacity"
            >
              Privacy
            </Link>
            <Link
              href="#cta"
              className="opacity-80 hover:opacity-100 transition-opacity"
            >
              Get Started
            </Link>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLaunch}
            className="rounded-md bg-primary text-onPrimary px-3 py-1.5 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Launch App
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden min-h-screen flex items-center">
      <div className="mx-auto max-w-6xl px-4 pt-16 pb-10 sm:pt-24 sm:pb-16">
        {/* Main content */}
        <div className="text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6"
            >
              <span className="text-primary">Pro</span>
              <span className="text-foreground">Gaming</span>
              <br />
              <span className="text-primary">Revolutionized</span>
            </motion.h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 max-w-3xl mx-auto text-xl sm:text-2xl opacity-90 leading-relaxed"
          >
            Experience competitive gaming like never before. Stake on your
            favorite players, compete for real money, and become part of the
            next generation of esports.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="#cta"
                className="rounded-xl bg-primary text-onPrimary px-8 py-4 font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
              >
                Start Staking Now
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="#features"
                className="rounded-xl border-2 border-primary/30 text-primary px-8 py-4 font-semibold text-lg hover:bg-primary/10 transition-all"
              >
                Learn More
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8"
          >
            {[
              {
                number: "$50K+",
                label: "Prize Pools",
                description: "Daily tournaments",
              },
              {
                number: "10K+",
                label: "Active Players",
                description: "Growing community",
              },
              {
                number: "24/7",
                label: "Live Matches",
                description: "Non-stop action",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold mb-1">{stat.label}</div>
                <div className="text-sm opacity-70">{stat.description}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Feature highlights */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            {
              title: "Stake & Win Together",
              body: "Back your favorite players with real stakes. When they win, you win too. Share in the prize pool based on your contribution.",
              icon: "💰",
            },
            {
              title: "Competitive Gaming",
              body: "Join tournaments, climb leaderboards, and prove your skills in your favorite games. Real competition, real rewards.",
              icon: "🎮",
            },
            {
              title: "Automatic Settlements",
              body: "Automatic settlements ensure almost instant payouts. No waiting, no disputes - just fast, transparent gaming.",
              icon: "⚡",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-outline/20 hover:border-primary/30 transition-all"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-primary">
                {feature.title}
              </h3>
              <p className="opacity-80 leading-relaxed">{feature.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="relative py-24">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 31 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
            Built for <span className="text-primary">Competitive Gaming</span>
          </h2>
          <p className="text-xl opacity-80 max-w-3xl mx-auto">
            Experience the future of esports with our revolutionary staking
            platform
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Create & Join Matches",
              body: "Set up tournaments in seconds or jump into existing matches. Support for all major competitive titles.",
              icon: "🎯",
              color: "from-blue-500 to-cyan-500",
            },
            {
              title: "Smart Staking System",
              body: "Stake on players with confidence. Dynamic multipliers and transparent pool sharing ensure fair rewards.",
              icon: "💎",
              color: "from-purple-500 to-pink-500",
            },
            {
              title: "Instant Settlements",
              body: "Smart algorithms ensure almost instant payouts and match finalization. Winners get paid instantly - no waiting, no disputes.",
              icon: "⚡",
              color: "from-green-500 to-emerald-500",
            },
            {
              title: "Live Match Tracking",
              body: "Real-time updates and live streaming integration. Follow every moment of the action.",
              icon: "📊",
              color: "from-orange-500 to-red-500",
            },
            {
              title: "Mobile-First Design",
              body: "Seamless experience across all devices. Stake on the go, anywhere, anytime.",
              icon: "📱",
              color: "from-indigo-500 to-purple-500",
            },
            {
              title: "Secure & Transparent",
              body: "Algorithm-powered security with complete transparency. Your stakes are always protected.",
              icon: "🔒",
              color: "from-teal-500 to-blue-500",
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group relative bg-card/30 backdrop-blur-sm rounded-2xl p-6 border border-outline/20 hover:border-primary/30 transition-all duration-300"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}
              />

              <div className="relative z-10">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-primary group-hover:text-primary/90 transition-colors">
                  {feature.title}
                </h3>
                <p className="opacity-80 leading-relaxed group-hover:opacity-90 transition-opacity">
                  {feature.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional features showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20"
        >
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-3xl p-8 border border-primary/20">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-4">How Staking Works</h3>
              <p className="text-lg opacity-80 max-w-2xl mx-auto">
                Our revolutionary staking system makes competitive gaming
                accessible to everyone
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  step: "01",
                  title: "Choose Your Player",
                  description:
                    "Browse active tournaments and select players you believe will dominate",
                },
                {
                  step: "02",
                  title: "Place Your Stake",
                  description:
                    "Invest in their success with transparent multipliers and clear risk/reward ratios",
                },
                {
                  step: "03",
                  title: "Share The Victory",
                  description:
                    "When your backed player wins, you receive your proportional share of the prize pool",
                },
              ].map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="text-center p-6 rounded-2xl bg-background/50"
                >
                  <div className="text-4xl font-bold text-primary mb-4">
                    {step.step}
                  </div>
                  <h4 className="text-lg font-semibold mb-3">{step.title}</h4>
                  <p className="opacity-70">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="cta" className="relative py-24 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
      />

      <div className="mx-auto max-w-6xl px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gradient-to-r from-primary to-primary/80 rounded-3xl p-12 text-onPrimary shadow-2xl border border-primary/20"
          >
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl sm:text-5xl font-bold tracking-tight mb-6"
            >
              Ready to Revolutionize Your Gaming?
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl opacity-90 max-w-2xl mx-auto mb-8 leading-relaxed"
            >
              Join thousands of players already staking and winning. Be part of
              the future of competitive gaming.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a
                  href="#"
                  className="bg-onPrimary text-primary px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                >
                  <span>📱</span>
                  Download for iOS (Beta)
                </a>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a
                  href="#"
                  className="border-2 border-onPrimary/40 text-onPrimary px-8 py-4 rounded-xl font-semibold text-lg hover:bg-onPrimary/10 transition-all flex items-center gap-2"
                >
                  <span>🤖</span>
                  Download for Android (Beta)
                </a>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-8 text-sm opacity-80"
            >
              🚀 Elite access • ⚡ Instant wagering • 💎 Institutional security
              included
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-outline/40 bg-card/30 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
        >
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="#" className="font-bold tracking-tight text-xl">
              <span className="text-primary">Pro</span>Stake
            </Link>
            <p className="mt-3 text-sm opacity-80 max-w-md">
              The next generation of competitive gaming. Stake on your favorite
              players and share in their victories.
            </p>
            <div className="mt-4 flex items-center gap-4">
              <div className="text-xs opacity-60">🎮 Built for gamers</div>
              <div className="text-xs opacity-60">
                💎 Powered by smart algorithms
              </div>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-semibold text-sm mb-3">Platform</h4>
            <div className="space-y-2 text-sm">
              <Link
                href="#features"
                className="block opacity-80 hover:opacity-100 transition-opacity"
              >
                Features
              </Link>
              <Link
                href="#cta"
                className="block opacity-80 hover:opacity-100 transition-opacity"
              >
                Get Started
              </Link>
              <Link
                href="/contact"
                className="block opacity-80 hover:opacity-100 transition-opacity"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-sm mb-3">Support</h4>
            <div className="space-y-2 text-sm">
              <Link
                href="/contact"
                className="block opacity-80 hover:opacity-100 transition-opacity"
              >
                Help Center
              </Link>
              <Link
                href="/privacy"
                className="block opacity-80 hover:opacity-100 transition-opacity"
              >
                Privacy Policy
              </Link>
              <Link
                href="/contact"
                className="block opacity-80 hover:opacity-100 transition-opacity"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 pt-8 border-t border-outline/40 flex flex-col sm:flex-row items-center justify-between text-sm"
        >
          <div className="opacity-80">
            © {new Date().getFullYear()} ProStake Inc. All rights reserved.
          </div>
          <div className="mt-2 sm:mt-0 opacity-80">
            Built for competitive excellence
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <AnimatedBackground />
      <Navbar />
      <Hero />
      <Features />
      <CTA />
      <Footer />
    </div>
  );
}
