"use client";
import { motion } from "framer-motion";
import Link from "next/link";

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
      {[...Array(15)].map((_, i) => {
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
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-40 w-full"
    >
      <div className="backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-outline/40">
        <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
          <Link href="/" className="font-semibold tracking-tight text-lg">
            <span className="text-primary">Pro</span>Stake
          </Link>
          <div className="hidden sm:flex items-center gap-4 text-sm">
            <Link
              href="https://app.prostake.gg"
              className="opacity-80 hover:opacity-100 transition-opacity"
            >
              Get Started
            </Link>
            <Link
              href="/contact"
              className="opacity-80 hover:opacity-100 transition-opacity"
            >
              Contact
            </Link>
          </div>
          <span className="btn-launch-fancy-groove">
            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => (window.location.href = "https://app.prostake.gg")}
              className="btn-launch-fancy"
            >
              Launch App
            </motion.button>
          </span>
        </div>
      </div>
    </motion.div>
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
            <Link href="/" className="font-bold tracking-tight text-xl">
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
                href="https://app.prostake.gg"
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
              <Link
                href="/contact"
                className="block opacity-80 hover:opacity-100 transition-opacity"
              >
                Tournaments
              </Link>
              <Link
                href="/contact"
                className="block opacity-80 hover:opacity-100 transition-opacity"
              >
                Leaderboard
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
                href="/contact"
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

export default function Contact() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <AnimatedBackground />
      <Navbar />

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="py-24">
          <div className="mx-auto max-w-6xl px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mx-auto max-w-2xl text-center"
            >
              <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
                Contact <span className="text-primary">Us</span>
              </h1>
              <p className="text-lg opacity-80">
                Questions about ProStake? Reach us by email.
              </p>
              <p className="mt-4">
                <a
                  href="mailto:borankrk@prostake.gg"
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  borankrk@prostake.gg
                </a>
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
