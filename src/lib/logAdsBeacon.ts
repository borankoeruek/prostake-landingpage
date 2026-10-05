import {
  PROSTAKE_IOS_APP_STORE_URL,
  getSupabaseFunctionsBaseUrl,
} from "../constants/appStore";

export type AdsBeaconStage = "ads_page_view" | "ads_app_store_redirect";

const ADS_SOURCE = "prostake.gg/ads";

/** Always https — safe on desktop and as a manual fallback. */
export function getIosAppStoreHttpsUrl(): string {
  const raw = PROSTAKE_IOS_APP_STORE_URL.trim();
  if (raw.startsWith("itms-apps://") || raw.startsWith("itms-appss://")) {
    const idMatch = raw.match(/id(\d+)/i);
    if (idMatch) {
      return `https://apps.apple.com/app/id${idMatch[1]}`;
    }
  }
  if (raw.startsWith("https://")) return raw;
  if (raw.startsWith("http://")) return `https://${raw.slice("http://".length)}`;
  return raw;
}

/**
 * App Store custom-scheme deeplink (`itms-apps://…`).
 * Returns null if the app id cannot be derived.
 */
export function getIosAppStoreDeeplinkUrl(): string | null {
  const raw = PROSTAKE_IOS_APP_STORE_URL.trim();
  if (raw.startsWith("itms-apps://") || raw.startsWith("itms-appss://")) {
    return raw;
  }

  const https = getIosAppStoreHttpsUrl();
  const idMatch = https.match(/\/id(\d+)/i) ?? https.match(/id(\d+)/i);
  if (!idMatch) return null;
  return `itms-apps://apps.apple.com/app/id${idMatch[1]}`;
}

export function isLikelyIosDevice(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  if (/iPad|iPhone|iPod/i.test(ua)) return true;
  // iPadOS reports as MacIntel but is touch-capable.
  return navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
}

function buildLogUrl(stage: AdsBeaconStage): string {
  const params = new URLSearchParams({
    beacon: "1",
    stage,
    source: ADS_SOURCE,
  });

  if (typeof window !== "undefined") {
    params.set("landing_href", window.location.href);
    const query = window.location.search;
    if (query.startsWith("?")) {
      params.set("landing_query", query.slice(1));
    } else if (query.length > 0) {
      params.set("landing_query", query);
    }
  }

  return `${getSupabaseFunctionsBaseUrl()}/ad-redirect-log?${params.toString()}`;
}

/**
 * Log-only (`beacon=1`, no `to`). Does not follow redirects — so a legacy 302
 * to the App Store / itms-appss:// cannot break desktop dev tools.
 */
export function logAdsBeacon(stage: AdsBeaconStage): void {
  const url = buildLogUrl(stage);
  void fetch(url, {
    method: "GET",
    mode: "cors",
    redirect: "manual",
    keepalive: true,
    credentials: "omit",
  }).catch(() => {
    /* logging must not block UX */
  });
}

/** Log, then open the App Store via https (button / desktop-safe). */
export function goToIosAppStore(stage: AdsBeaconStage): void {
  logAdsBeacon(stage);
  window.location.assign(getIosAppStoreHttpsUrl());
}

/**
 * Log, then open via `itms-apps://` deeplink when available.
 * Returns false if no deeplink could be built (caller should fall back).
 */
export function goToIosAppStoreDeeplink(stage: AdsBeaconStage): boolean {
  const deeplink = getIosAppStoreDeeplinkUrl();
  if (!deeplink) return false;
  logAdsBeacon(stage);
  window.location.assign(deeplink);
  return true;
}
