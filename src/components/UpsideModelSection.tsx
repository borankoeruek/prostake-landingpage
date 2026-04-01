"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useMemo, useRef, useState, type ReactNode } from "react";

type UpsideModelSectionProps = {
  shouldAnimate: boolean;
};

function formatUsd(value: number): string {
  const abs = Math.abs(value);
  const digits = abs >= 100 ? 0 : abs >= 10 ? 1 : 2;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: digits,
  }).format(value);
}

type SliderRowProps = {
  id: string;
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  formatValue: (value: number) => string;
  /** Replaces the top-right value (e.g. streamer win rate “doesn’t matter” block). */
  renderTrailing?: (value: number) => ReactNode;
  /** `aria-valuetext` for the range input; defaults to `formatValue`. */
  rangeAriaValueText?: (value: number) => string;
  hint?: string;
  /** When `"info"`, hint renders as a compact informational note. */
  hintVariant?: "default" | "info";
};

function SliderRow({
  id,
  label,
  min,
  max,
  step,
  value,
  onChange,
  formatValue,
  renderTrailing,
  rangeAriaValueText,
  hint,
  hintVariant = "default",
}: SliderRowProps) {
  const ariaText = rangeAriaValueText
    ? rangeAriaValueText(value)
    : formatValue(value);
  return (
    <div className="space-y-2">
      <div className="flex items-end justify-between gap-3">
        <label
          htmlFor={id}
          className="text-base font-medium leading-relaxed text-foreground sm:text-[1.05rem] sm:leading-[1.65]"
        >
          {label}
        </label>
        <span
          className={`text-right text-base font-semibold sm:text-[1.05rem] ${renderTrailing ? "min-w-0 max-w-[min(100%,15rem)] shrink-0 sm:max-w-[18rem]" : "tabular-nums text-primary"}`}
          aria-live="polite"
        >
          {renderTrailing ? renderTrailing(value) : formatValue(value)}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-valuetext={ariaText}
        className="upside-slider h-2 w-full cursor-pointer"
      />
      {hint ? (
        hintVariant === "info" ? (
          <div
            className="upside-hint-info flex gap-2.5 rounded-lg border border-primary/22 bg-primary/[0.08] px-3 py-2.5 sm:gap-3 sm:px-3.5 sm:py-3"
            role="note"
          >
            <span className="text-primary/90" aria-hidden>
              <svg
                className="mt-0.5 size-4 shrink-0 sm:size-[1.125rem]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4" />
                <path d="M12 8h.01" />
              </svg>
            </span>
            <p className="min-w-0 text-xs font-medium leading-snug text-foreground/78 sm:text-[0.8125rem] sm:leading-relaxed">
              {hint}
            </p>
          </div>
        ) : (
          <p className="text-base leading-relaxed text-foreground/82 sm:text-[1.05rem] sm:leading-[1.65]">
            {hint}
          </p>
        )
      ) : null}
    </div>
  );
}

const STREAMER_WIN_PULSE_MS = 130;

function StreamerWinRateTrailing({
  pulseKey,
  shouldAnimate,
}: {
  pulseKey: number;
  shouldAnimate: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const enableMotion = shouldAnimate && !reduceMotion;
  return (
    <motion.span
      key={pulseKey}
      className="upside-doesnt-matter inline-block text-balance"
      title="Streamer estimate uses viewers and stakes — not your match win rate."
      initial={
        enableMotion && pulseKey > 0
          ? { scale: 0.86, opacity: 0.65, y: 6 }
          : false
      }
      animate={
        enableMotion && pulseKey > 0
          ? {
              scale: [1, 1.1, 1],
              opacity: 1,
              y: 0,
            }
          : { scale: 1, opacity: 1, y: 0 }
      }
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      Doesn&apos;t matter
    </motion.span>
  );
}

type PersonaToggleProps = {
  value: "player" | "streamer";
  onChange: (value: "player" | "streamer") => void;
};

function PersonaToggle({ value, onChange }: PersonaToggleProps) {
  return (
    <div
      role="tablist"
      aria-label="Model as player or streamer"
      className="mx-auto flex max-w-md rounded-full border border-outline/40 bg-surface/50 p-1 backdrop-blur-sm"
    >
      {(
        [
          { id: "player" as const, label: "Player" },
          { id: "streamer" as const, label: "Streamer" },
        ] as const
      ).map(({ id, label }) => {
        const selected = value === id;
        return (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={selected}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(id)}
            className={`relative flex-1 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors sm:px-5 sm:py-3 sm:text-base ${
              selected
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-foreground/75 hover:text-foreground"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

function ProjectionCard({
  label,
  amount,
  sublabel,
}: {
  label: string;
  amount: number;
  sublabel: string;
}) {
  const positive = amount >= 0;
  return (
    <div className="min-w-0 rounded-xl border border-outline/35 bg-surface/40 px-2 py-3 backdrop-blur-sm sm:px-4 sm:py-4">
      <p className="text-xs font-semibold leading-snug text-foreground/82 sm:text-[1.05rem] sm:leading-[1.65]">
        {label}
      </p>
      <p
        className={`mt-1 text-2xl font-extrabold tabular-nums leading-[1.05] tracking-tight sm:text-3xl sm:leading-[1.1] lg:text-4xl ${
          positive ? "text-tertiary" : "text-error/90"
        }`}
      >
        {positive ? "" : "−"}
        {formatUsd(Math.abs(amount))}
      </p>
      <p className="mt-0.5 text-[11px] leading-snug text-foreground/82 sm:mt-1 sm:text-[1.05rem] sm:leading-[1.65]">
        {sublabel}
      </p>
    </div>
  );
}

const STREAMER_AVG_STAKE = 25;
const STREAMER_VIEWER_RATE = 0.05;
const STREAMER_FINAL_SHARE = 0.05;

export function UpsideModelSection({ shouldAnimate }: UpsideModelSectionProps) {
  const [persona, setPersona] = useState<"player" | "streamer">("player");
  const [avgStake, setAvgStake] = useState(25);
  const [winRatePct, setWinRatePct] = useState(55);
  const [gamesPerDay, setGamesPerDay] = useState(5);
  const [avgViewers, setAvgViewers] = useState(500);
  const [streamerGamesPerDay, setStreamerGamesPerDay] = useState(5);
  const [streamerWinPulseKey, setStreamerWinPulseKey] = useState(0);
  const streamerWinPulseGateRef = useRef(0);

  const handleStreamerWinRateChange = useCallback((v: number) => {
    setWinRatePct(v);
    const now = Date.now();
    if (now - streamerWinPulseGateRef.current < STREAMER_WIN_PULSE_MS) {
      return;
    }
    streamerWinPulseGateRef.current = now;
    setStreamerWinPulseKey((k) => k + 1);
  }, []);

  const projections = useMemo(() => {
    if (persona === "streamer") {
      // avg viewers × 5% × $25 avg stake × games/day × 5% (streamer share)
      const daily =
        avgViewers *
        STREAMER_VIEWER_RATE *
        STREAMER_AVG_STAKE *
        streamerGamesPerDay *
        STREAMER_FINAL_SHARE;
      return {
        daily,
        weekly: daily * 7,
        monthly: daily * 30,
      };
    }
    const winRate = winRatePct / 100;
    // Even-money stake S: EV per game = S × (2p − 1) for win probability p.
    const evPerGame = avgStake * (2 * winRate - 1);
    const daily = gamesPerDay * evPerGame;
    return {
      daily,
      weekly: daily * 7,
      monthly: daily * 30,
    };
  }, [
    persona,
    avgStake,
    winRatePct,
    gamesPerDay,
    avgViewers,
    streamerGamesPerDay,
  ]);

  const resultsHeading =
    persona === "streamer"
      ? "Illustrative stream earnings"
      : "Illustrative expected value";

  const inner = (
    <div className="upside-model-card mx-auto w-full max-w-6xl overflow-hidden px-5 py-7 sm:px-9 sm:py-8">
      <div className="mb-6 text-center sm:mb-7">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.35em] text-primary/80">
          Calculator
        </p>
        <h2
          id="upside-model-heading"
          className="hero-title-gradient text-balance text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-4xl"
        >
          Model your upside.
        </h2>
        <div className="mx-auto mt-5 max-w-md sm:mt-6">
          <PersonaToggle value={persona} onChange={setPersona} />
        </div>
      </div>

      <div className="grid gap-6 sm:gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center lg:gap-10">
        <div className="space-y-6 sm:space-y-7">
          {persona === "player" ? (
            <>
              <SliderRow
                id="upside-avg-stake"
                label="Avg. stake"
                min={5}
                max={100}
                step={1}
                value={avgStake}
                onChange={setAvgStake}
                formatValue={(v) => formatUsd(v)}
              />
              <SliderRow
                id="upside-win-rate"
                label="Win rate"
                min={40}
                max={75}
                step={1}
                value={winRatePct}
                onChange={setWinRatePct}
                formatValue={(v) => `${v}%`}
              />
              <SliderRow
                id="upside-games-day"
                label="Games per day"
                min={1}
                max={24}
                step={1}
                value={gamesPerDay}
                onChange={setGamesPerDay}
                formatValue={(v) => `${v}`}
                hint="Expected value assumes roughly even-money stakes before fees."
                hintVariant="info"
              />
            </>
          ) : (
            <>
              <SliderRow
                id="upside-avg-viewers"
                label="Avg. viewers"
                min={50}
                max={3000}
                step={50}
                value={avgViewers}
                onChange={setAvgViewers}
                formatValue={(v) => v.toLocaleString("en-US")}
              />
              <SliderRow
                id="upside-streamer-win-rate"
                label="Win rate"
                min={40}
                max={75}
                step={1}
                value={winRatePct}
                onChange={handleStreamerWinRateChange}
                formatValue={(v) => `${v}%`}
                rangeAriaValueText={(v) =>
                  `${v} percent. Win rate does not change this streamer earnings estimate.`
                }
                renderTrailing={() => (
                  <StreamerWinRateTrailing
                    pulseKey={streamerWinPulseKey}
                    shouldAnimate={shouldAnimate}
                  />
                )}
              />
              <SliderRow
                id="upside-streamer-games-day"
                label="Games per day"
                min={1}
                max={24}
                step={1}
                value={streamerGamesPerDay}
                onChange={setStreamerGamesPerDay}
                formatValue={(v) => `${v}`}
              />
            </>
          )}
        </div>

        <div className="relative space-y-4 lg:pl-2">
          <div
            className="pointer-events-none absolute left-0 top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-primary/25 to-transparent lg:block"
            aria-hidden
          />
          <p className="text-base font-medium leading-relaxed text-foreground/82 sm:text-[1.05rem] sm:leading-[1.65]">
            {resultsHeading}
          </p>
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            <ProjectionCard
              label="Daily"
              amount={projections.daily}
              sublabel="Per day"
            />
            <ProjectionCard
              label="Weekly"
              amount={projections.weekly}
              sublabel="7 days"
            />
            <ProjectionCard
              label="Monthly"
              amount={projections.monthly}
              sublabel="30 days"
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section
      className="relative mx-auto max-w-6xl px-4 py-6 sm:py-10"
      aria-labelledby="upside-model-heading"
    >
      <div className="pointer-events-none absolute left-1/2 top-4 h-24 w-[min(100%,22rem)] -translate-x-1/2 rounded-full bg-primary/12 blur-3xl" />
      {shouldAnimate ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {inner}
        </motion.div>
      ) : (
        inner
      )}
    </section>
  );
}
