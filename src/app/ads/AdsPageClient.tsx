"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import {
  goToIosAppStoreDeeplink,
  isLikelyIosDevice,
  logAdsBeacon,
} from "../../lib/logAdsBeacon";

function BulletCheck() {
  return (
    <span className="iosgate-check" aria-hidden>
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

/** Temp kill-switch: set to `true` to re-enable auto + button App Store redirect. */
const ADS_REDIRECT_ENABLED = false;

export default function AdsPageClient() {
  const lastTapAtRef = useRef(0);

  const continueToAppStore = useCallback(() => {
    if (!ADS_REDIRECT_ENABLED) return;
    const now = Date.now();
    // Debounce double-taps / auto+manual overlap; allow a real second attempt
    // if navigation failed or the in-app browser kept the user on this page.
    if (now - lastTapAtRef.current < 800) return;
    lastTapAtRef.current = now;
    goToIosAppStoreDeeplink("ads_app_store_redirect");
  }, []);

  useEffect(() => {
    if (!ADS_REDIRECT_ENABLED) return;

    logAdsBeacon("ads_page_view");

    // Auto-open only via App Store deeplink on iOS. Skip https auto-nav —
    // desktop / non-iOS keep the page and use the button.
    if (!isLikelyIosDevice()) return;

    const timer = window.setTimeout(() => {
      continueToAppStore();
    }, AUTO_REDIRECT_MS);

    return () => {
      window.clearTimeout(timer);
    };
  }, [continueToAppStore]);

  return (
    <main className="iosgate-shell">
      <div className="iosgate-panel iosgate-panel-hero">
        <Image
          src="/prostakeAppLogo.png"
          alt="ProStake"
          width={44}
          height={44}
          className="iosgate-icon"
          priority
        />
        <h1 className="iosgate-headline">
          <span className="iosgate-headline-line">Download the app</span>
          <span className="iosgate-headline-line">for free.</span>
          <span className="iosgate-headline-line iosgate-headline-accent">
            Get started.
          </span>
        </h1>
        <p className="iosgate-sub">Available on the App Store for iPhone.</p>
      </div>

      <div className="iosgate-panel iosgate-panel-list">
        <ul className="iosgate-list">
          {HIGHLIGHTS.map((line) => (
            <li key={line} className="iosgate-list-item">
              <BulletCheck />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        onClick={continueToAppStore}
        className="iosgate-store-btn"
        aria-label="Download on the App Store"
      >
        <AppleMark className="shrink-0" />
        <span className="iosgate-store-btn-label">
          <span className="iosgate-store-btn-kicker">Download on the</span>
          <span className="iosgate-store-btn-title">App Store</span>
        </span>
      </button>

      <p className="iosgate-note">
        On iPhone we open the App Store automatically. Tap the button if
        nothing happens.
      </p>
    </main>
  );
}
