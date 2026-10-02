import {
  PROSTAKE_IOS_APP_STORE_URL,
  getSupabaseFunctionsBaseUrl,
} from "../constants/appStore";

export type AdsBeaconStage = "ads_page_view" | "ads_app_store_redirect";

const ADS_SOURCE = "prostake.gg/ads";

/** Always https — avoids itms-appss:// handler errors on desktop. */
export function getIosAppStoreHttpsUrl(): string {
  const raw = PROSTAKE_IOS_APP_STORE_URL.trim();
  if (raw.startsWith("https://")) return raw;
  if (raw.startsWith("http://")) return `https://${raw.slice("http://".length)}`;
  return raw;
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

/** Log, then open the App Store via normal https navigation (not itms-appss). */
export function goToIosAppStore(stage: AdsBeaconStage): void {
  logAdsBeacon(stage);
  window.location.assign(getIosAppStoreHttpsUrl());
}
