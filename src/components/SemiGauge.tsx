"use client";

import { useMemo } from "react";

function clamp01(n: number) {
  if (n < 0) return 0;
  if (n > 1) return 1;
  return n;
}

export function SemiGauge({
  value,
  max = 100,
}: {
  value: number;
  max?: number;
}) {
  const pct = useMemo(() => clamp01(max ? value / max : 0), [max, value]);

  const progressColorClass = useMemo(() => {
    if (pct < 0.5) return "text-rose-400";
    if (pct < 0.8) return "text-amber-400";
    return "text-emerald-400";
  }, [pct]);

  const size = 320;
  const strokeWidth = 16;
  const r = (size - strokeWidth) / 2;
  const cx = size / 2;
  const cy = size / 2;

  const startX = cx - r;
  const startY = cy;
  const endX = cx + r;
  const endY = cy;

  const d = `M ${startX} ${startY} A ${r} ${r} 0 0 1 ${endX} ${endY}`;
  const arcLength = Math.PI * r;
  const dashOffset = arcLength * (1 - pct);

  // Needle angle from 180deg(left) -> 0deg(right)
  const angle = 180 * (1 - pct);

  return (
    <div className="relative mx-auto w-full max-w-[320px]">
      <svg
        viewBox={`0 0 ${size} ${size / 2 + 40}`}
        className="h-auto w-full"
        role="img"
        aria-label="WealthUp score gauge"
      >
        <path
          d={d}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          className="text-slate-100"
        />
        <path
          d={d}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${arcLength} ${arcLength}`}
          strokeDashoffset={dashOffset}
          className={progressColorClass}
        />

        <g transform={`translate(${cx} ${cy}) rotate(${-angle})`} className="text-slate-700">
          <line
            x1={0}
            y1={0}
            x2={r - 18}
            y2={0}
            stroke="currentColor"
            strokeWidth={4}
            strokeLinecap="round"
          />
        </g>
        <circle cx={cx} cy={cy} r={7} fill="currentColor" className="text-slate-700" />
      </svg>

      <div className="pointer-events-none absolute inset-x-0 top-[46%] -translate-y-1/2 text-center">
        <div className="text-6xl font-semibold tracking-tight text-rose-400">
          {value}
        </div>
        <div className="mt-2 text-sm font-medium text-slate-600 dark:text-slate-300">
          Current WealthUp Score
        </div>
      </div>
    </div>
  );
}
