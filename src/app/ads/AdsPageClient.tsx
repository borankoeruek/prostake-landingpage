"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import { goToIosAppStore, logAdsBeacon } from "../../lib/logAdsBeacon";

function BulletCheck() {
  return (
    <span className="ads-check-box" aria-hidden>
      <svg viewBox="0 0 12 12" width={12} height={12} fill="none">
        <path
          d="M2.5 6.2 4.8 8.5 9.5 3.8"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function AppleMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width={26}
      height={26}
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"
      />
    </svg>
  );
}

const HIGHLIGHTS = [
  "Fast and lightweight",
  "Secure download",
] as const;

/** Brief delay so page_view can log and the UI can paint before navigation. */
const AUTO_REDIRECT_MS = 450;

export default function AdsPageClient() {
  const lastTapAtRef = useRef(0);

  const continueToAppStore = useCallback(() => {
    const now = Date.now();
    // Debounce double-taps / auto+manual overlap; allow a real second attempt
    // if navigation failed or the in-app browser kept the user on this page.
    if (now - lastTapAtRef.current < 800) return;
    lastTapAtRef.current = now;
    goToIosAppStore("ads_app_store_redirect");
  }, []);

  useEffect(() => {
    logAdsBeacon("ads_page_view");

    const timer = window.setTimeout(() => {
      continueToAppStore();
    }, AUTO_REDIRECT_MS);

    return () => {
      window.clearTimeout(timer);
    };
  }, [continueToAppStore]);

  return (
    <main className="ads-shell">
      <div className="ads-card ads-card-hero">
        <Image
          src="/prostakeAppLogo.png"
          alt="ProStake"
          width={44}
          height={44}
          className="ads-card-icon"
          priority
        />
        <h1 className="ads-headline">
          <span className="ads-headline-line">Download the app</span>
          <span className="ads-headline-line">for free.</span>
          <span className="ads-headline-line ads-headline-accent">
            Get started.
          </span>
        </h1>
        <p className="ads-card-sub">
          Available on the App Store for iPhone.
        </p>
      </div>

      <div className="ads-card ads-card-list">
        <ul className="ads-checklist">
          {HIGHLIGHTS.map((line) => (
            <li key={line} className="ads-checklist-item">
              <BulletCheck />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        onClick={continueToAppStore}
        className="ads-cta-app-store"
        aria-label="Download on the App Store"
      >
        <AppleMark className="shrink-0" />
        <span className="ads-cta-app-store-label">
          <span className="ads-cta-app-store-kicker">Download on the</span>
          <span className="ads-cta-app-store-title">App Store</span>
        </span>
      </button>

      <p className="ads-footer-note">
        Redirecting to the App Store… Tap the button if nothing happens.
      </p>
    </main>
  );
}
