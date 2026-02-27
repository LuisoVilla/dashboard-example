"use client";

import { setMonthlySaving } from "@/lib/redux/dashboardParamsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";

export function RoadmapStep1Extras({ userName }: { userName: string }) {
  const dispatch = useAppDispatch();
  const monthlySaving = useAppSelector((s) => s.dashboardParams.monthlySaving);
  const formatCurrency = (value: number) =>
    `₹${new Intl.NumberFormat("en-IN").format(value)}`;

  const options = [500, 1000, 5000, 8000];

  return (
    <>
      <div>
        <div className="text-xs font-medium text-slate-700 dark:text-slate-200">
          I can commit to saving
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
            {formatCurrency(monthlySaving)}
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">monthly</span>
        </div>

        <div className="mt-2 grid grid-cols-5 gap-2">
          {options.map((v) => {
            const isSelected = v === monthlySaving;
            return (
              <button
                key={v}
                type="button"
                onClick={() => dispatch(setMonthlySaving(v))}
                className={
                  "col-span-1 rounded-lg border px-2 py-1 text-[11px] font-semibold " +
                  (isSelected
                    ? "border-slate-300 bg-slate-900 text-white dark:border-slate-700 dark:bg-slate-100 dark:text-slate-900"
                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800")
                }
              >
                {formatCurrency(v)}
              </button>
            );
          })}
          <span className="col-span-1 rounded-lg border border-slate-200 bg-white px-2 py-1 text-[11px] font-medium text-slate-400 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-500">
            Enter amount
          </span>
        </div>

        <div className="mt-2 text-[11px] text-slate-500 dark:text-slate-400">
          {userName}, set a realistic monthly amount.
        </div>
      </div>

      <div className="mt-4">
        <div className="text-xs font-medium text-slate-700 dark:text-slate-200">
          Recommended Funds (Top performers)
        </div>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-2 dark:border-slate-800 dark:bg-slate-900">
            <div className="h-8 w-8 rounded-lg bg-slate-100 dark:bg-slate-800" />
            <div className="min-w-0">
              <div className="truncate text-[11px] font-semibold text-slate-700 dark:text-slate-200">
                HDFC Mid-Cap Fund
              </div>
              <div className="text-[10px] text-emerald-700 dark:text-emerald-300">
                +24.6% (3Y)
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-2 dark:border-slate-800 dark:bg-slate-900">
            <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800" />
            <div className="min-w-0">
              <div className="truncate text-[11px] font-semibold text-slate-700 dark:text-slate-200">
                Bandhan Small Cap
              </div>
              <div className="text-[10px] text-emerald-700 dark:text-emerald-300">
                +28.3% (3Y)
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
