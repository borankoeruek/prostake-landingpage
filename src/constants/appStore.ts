export const PROSTAKE_IOS_APP_STORE_URL =
  process.env.NEXT_PUBLIC_APP_STORE_URL ??
  "https://apps.apple.com/de/app/prostake-esports-staking/id6753223710";

const DEFAULT_SUPABASE_PROJECT_URL =
  "https://inyjpfzcggavhyyeulsi.supabase.co";

/** Base URL for Supabase Edge Functions (no trailing slash). */
export function getSupabaseFunctionsBaseUrl(): string {
  const projectUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? DEFAULT_SUPABASE_PROJECT_URL;
  return `${projectUrl.replace(/\/$/, "")}/functions/v1`;
}
