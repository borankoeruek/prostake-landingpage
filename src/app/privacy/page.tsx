"use client";
import { motion } from "framer-motion";
import Link from "next/link";

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
          <Link href="/" className="font-semibold tracking-tight text-lg">
            <span className="text-primary">Pro</span>Stake
          </Link>
          <div className="hidden sm:flex items-center gap-4 text-sm">
            <Link
              href="/#features"
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
              href="/#cta"
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

function PrivacyContent() {
  return (
    <section className="relative py-16 min-h-screen">
      <div className="mx-auto max-w-4xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            <span className="text-primary">Privacy</span> Policy
          </h1>
          <p className="text-lg opacity-80">
            Last updated: October 15, 2025
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-outline/20"
        >
          <div className="prose prose-lg max-w-none">
            <p className="text-lg opacity-90 mb-8">
              We value your privacy and are committed to protecting your personal information. 
              This Privacy Policy explains how we collect, use, and protect information when you use our application and website.
            </p>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">1. Information We Collect</h2>
                <p className="opacity-90 mb-4">
                  When you sign up or log in to our service, we may collect the following information:
                </p>
                <ul className="list-disc pl-6 space-y-2 opacity-90">
                  <li>Email address</li>
                  <li>Username</li>
                  <li>Password (securely hashed and not stored in plain text)</li>
                  <li>IP address and device information (automatically collected for security and fraud prevention)</li>
                </ul>
                <p className="opacity-90 mt-4">
                  If you sign in through a third-party provider (e.g., Google, Apple), we may also collect basic profile information as provided by that service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">2. How We Use Your Information</h2>
                <p className="opacity-90 mb-4">We use the collected information to:</p>
                <ul className="list-disc pl-6 space-y-2 opacity-90">
                  <li>Create and manage your user account</li>
                  <li>Provide and improve our services</li>
                  <li>Ensure platform security and prevent abuse</li>
                  <li>Communicate with you when necessary (e.g., account updates, support)</li>
                </ul>
                <p className="opacity-90 mt-4 font-medium">
                  We do not sell or rent your personal information to third parties.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">3. Data Storage and Security</h2>
                <p className="opacity-90">
                  Your information is stored securely. We use industry-standard encryption and access control to protect your data. 
                  Passwords are never stored in plain text.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">4. Sharing of Information</h2>
                <p className="opacity-90 mb-4">We may share limited data with:</p>
                <ul className="list-disc pl-6 space-y-2 opacity-90">
                  <li>Authentication providers (if you use external login)</li>
                  <li>Service providers that help us operate the platform (e.g., hosting, database, email services)</li>
                </ul>
                <p className="opacity-90 mt-4">
                  These third parties are only authorized to use your data as necessary to provide their services to us.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">5. Your Rights</h2>
                <p className="opacity-90 mb-4">You have the right to:</p>
                <ul className="list-disc pl-6 space-y-2 opacity-90">
                  <li>Access the personal data we hold about you</li>
                  <li>Request correction or deletion of your data</li>
                  <li>Withdraw consent and close your account</li>
                </ul>
                <p className="opacity-90 mt-4">
                  To make a request, contact us at:{" "}
                  <a 
                    href="mailto:support@prostake.app" 
                    className="text-primary hover:underline"
                  >
                    support@prostake.app
                  </a>
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">6. Children's Privacy</h2>
                <p className="opacity-90">
                  We do not knowingly collect data from children under 13 years old. If you believe a child has registered an account, 
                  please contact us and we will delete the data immediately.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">7. Changes to This Policy</h2>
                <p className="opacity-90">
                  We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "last modified" date.
                </p>
              </section>
            </div>

            <div className="mt-12 pt-8 border-t border-outline/20">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-4">Questions about our Privacy Policy?</h3>
                <p className="opacity-90 mb-6">
                  If you have any questions about this Privacy Policy, please don't hesitate to contact us.
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/contact"
                    className="inline-block bg-primary text-onPrimary px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
                  >
                    Contact Us
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
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
            <Link href="/" className="font-bold tracking-tight text-xl">
              <span className="text-primary">Pro</span>Stake
            </Link>
            <p className="mt-3 text-sm opacity-80 max-w-md">
              The next generation of social gaming. Connect with friends and
              enjoy gaming together.
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
                href="/#features"
                className="block opacity-80 hover:opacity-100 transition-opacity"
              >
                Features
              </Link>
              <Link
                href="/#cta"
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
            Made with ❤️ for the gaming community
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

export default function PrivacyPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Navbar />
      <PrivacyContent />
      <Footer />
    </div>
  );
}
