type Props = {
  label: string;
  points: number;
  maxPoints: number;
};

function clampPercent(value: number) {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(100, Math.round(value)));
}

export function ScoreBreakdownItem({ label, points, maxPoints }: Props) {
  const ratio = maxPoints > 0 ? points / maxPoints : 0;
  const widthPercent = clampPercent(ratio * 100);

  return (
    <div>
      <div className="flex items-center justify-between text-xs">
        <div className="font-medium text-slate-700 dark:text-slate-200">{label}</div>
        <div className="text-slate-500 dark:text-slate-400">
          {points} / {maxPoints}
        </div>
      </div>

      <div className="mt-2">
        <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800">
          <div
            className="h-2 rounded-full bg-linear-to-r from-rose-400 via-amber-300 to-emerald-400"
            style={{ width: `${widthPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
