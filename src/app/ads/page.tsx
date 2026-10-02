import type { Metadata } from "next";
import AdsPageClient from "./AdsPageClient";

export const metadata: Metadata = {
  title: "Get ProStake on iOS",
  description: "Download the ProStake app on iPhone.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdsLandingPage() {
  return <AdsPageClient />;
}
