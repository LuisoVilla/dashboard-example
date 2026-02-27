import Link from "next/link";
import type { ReactNode } from "react";
import { LockIcon } from "@/components/Icons";

export type RoadmapStepCardModel = {
  step: number;
  critical?: boolean;
  title: string;
  description: string;
  cta: string;
  ctaPoints: number;
  locked?: boolean;
  href?: string;
};

function PointsPill({ value }: { value: number }) {
  return (
    <span className="ml-2 inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
      +{value} pts
    </span>
  );
}

export function RoadmapStepCard({
  model,
  children,
  footer,
}: {
  model: RoadmapStepCardModel;
  children?: ReactNode;
  footer?: ReactNode;
}) {
  const label = model.critical ? `Step ${model.step} : Critical` : `Step ${model.step}`;
  const labelClass = model.critical
    ? "text-rose-500 dark:text-rose-400"
    : "text-slate-400 dark:text-slate-500";
  const actionHref = model.locked ? undefined : model.href;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950/30">
      <div className={`text-[11px] font-semibold ${labelClass}`}>{label}</div>
      <div className="mt-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
        {model.title}
      </div>
      <div className="mt-2 text-xs leading-5 text-slate-600 dark:text-slate-300">
        {model.description}
      </div>

      {children ? <div className="mt-4">{children}</div> : null}

      {actionHref ? (
        <Link
          href={actionHref}
          className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-slate-800 px-4 py-3 text-xs font-semibold text-white hover:bg-slate-900 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
        >
          {model.cta}
          <PointsPill value={model.ctaPoints} />
        </Link>
      ) : (
        <div className="mt-16 inline-flex w-full items-center justify-center rounded-full bg-slate-200 px-4 py-3 text-xs font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-300">
          {model.cta}
          <PointsPill value={model.ctaPoints} />
        </div>
      )}

      {model.locked ? (
        <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
          <LockIcon className="h-4 w-4" />
          Complete step 1 (critical) to unlock
        </div>
      ) : footer ? (
        <div className="mt-4">{footer}</div>
      ) : null}
    </div>
  );
}
