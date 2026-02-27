import { SemiGauge } from "@/components/SemiGauge";

type Props = {
  score: number;
  betterThanPercent: number;
  pointsToTarget: number;
  targetScore?: number;
};

export function WealthupScoreGaugeCard({
  score,
  betterThanPercent,
  pointsToTarget,
  targetScore = 70,
}: Props) {
  return (
    <div className="relative rounded-3xl bg-linear-to-b from-rose-50 to-white p-5 dark:from-slate-900 dark:to-slate-950">
      <div className="absolute left-1/2 top-4 -translate-x-1/2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-[11px] text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
        You need <span className="font-semibold text-slate-900">+{pointsToTarget}</span> points to
        reach a <span className="font-semibold text-emerald-700">good</span> score of{" "}
        <span className="font-semibold text-slate-900">{targetScore}</span>
      </div>

      <div className="pt-10">
        <SemiGauge value={score} />
        <div className="mt-2 text-center text-xs text-slate-500">
          Better than <span className="font-semibold">{betterThanPercent}%</span> of peers
        </div>
      </div>
    </div>
  );
}
