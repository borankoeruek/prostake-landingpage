"use client";

import { useEffect, useState } from "react";

const LINE1 = "Staking";
const LINE2 = "not betting";
const MS_PER_CHAR = 52;
/** Pause after line 1 finishes before line 2 begins. */
const PAUSE_AFTER_LINE1_MS = 1020;
/** Align with card entrance (`motion.div` delay ~0.45s). */
const START_DELAY_MS = 520;

type StakingClarityHeadlineProps = {
  shouldAnimate: boolean;
};

export function StakingClarityHeadline({
  shouldAnimate,
}: StakingClarityHeadlineProps) {
  const [line1, setLine1] = useState(() => (shouldAnimate ? "" : LINE1));
  const [line2, setLine2] = useState(() => (shouldAnimate ? "" : LINE2));

  useEffect(() => {
    if (!shouldAnimate) {
      setLine1(LINE1);
      setLine2(LINE2);
      return;
    }

    setLine1("");
    setLine2("");

    let cancelled = false;
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        const id = setTimeout(() => {
          if (!cancelled) resolve();
        }, ms);
        timeouts.push(id);
      });

    const run = async () => {
      await wait(START_DELAY_MS);
      if (cancelled) return;

      for (let i = 1; i <= LINE1.length; i++) {
        if (cancelled) return;
        setLine1(LINE1.slice(0, i));
        await wait(MS_PER_CHAR);
      }

      await wait(PAUSE_AFTER_LINE1_MS);
      if (cancelled) return;

      for (let i = 1; i <= LINE2.length; i++) {
        if (cancelled) return;
        setLine2(LINE2.slice(0, i));
        await wait(MS_PER_CHAR);
      }
    };

    void run();

    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
  }, [shouldAnimate]);

  const line1Done = line1.length === LINE1.length;
  const line2Done = line2.length === LINE2.length;
  const showCursor = shouldAnimate && (!line1Done || (line1Done && !line2Done));

  return (
    <h2 id="staking-clarity-heading" className="space-y-1 text-balance">
      <span className="sr-only">Staking, not betting</span>
      <div className="space-y-1" aria-hidden>
        <span className="hero-title-gradient block text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-4xl">
          {line1}
          {showCursor && !line1Done ? (
            <span
              className="typing-caret ml-0.5 inline-block w-[0.45ch] translate-y-[-0.06em] font-light text-primary/80 animate-pulse align-baseline"
              aria-hidden
            >
              |
            </span>
          ) : null}
        </span>
        <span className="block min-h-[1.15em] text-2xl font-semibold leading-tight tracking-tight text-foreground/40 sm:text-3xl">
          {line1Done ? (
            <>
              {line2}
              {showCursor && line1Done && !line2Done ? (
                <span
                  className="typing-caret ml-0.5 inline-block w-[0.45ch] translate-y-[-0.06em] font-light text-foreground/35 animate-pulse align-baseline"
                  aria-hidden
                >
                  |
                </span>
              ) : null}
            </>
          ) : null}
        </span>
      </div>
    </h2>
  );
}
