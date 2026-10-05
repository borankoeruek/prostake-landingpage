import type { ReactNode } from "react";

/** Dark ProStake shell — overrides the main site backdrop. */
export default function AdsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="iosgate-root relative z-20 min-h-dvh antialiased">
      {children}
    </div>
  );
}
