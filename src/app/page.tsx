import type { Metadata } from "next";
import { cookies } from "next/headers";
import { ShieldCheckIcon } from "@/components/Icons";
import { AppHeaderServer } from "@/components/AppHeaderServer";
import { RoadmapSection } from "@/components/dashboard/RoadmapSection";
import { ScoreBreakdownItem } from "@/components/dashboard/ScoreBreakdownItem";
import { DashboardGreeting } from "@/components/dashboard/DashboardGreeting";
import { WealthupScoreGaugeCard } from "@/components/dashboard/WealthupScoreGaugeCard";
import { dashboardMock } from "@/lib/mock/dashboard";

export const metadata: Metadata = {
  title: "Dashboard — Wealthup",
  description: "Wealthup dashboard overview with score breakdown and roadmap.",
};

export default async function DashboardPage() {
  const data = dashboardMock;
  const cookieStore = await cookies();
  const userName = cookieStore.get("wealthup_name")?.value ?? "";
  const pointsToGood = Math.max(0, 70 - data.wealthupScore);

  return (
    <div className="min-h-dvh bg-linear-to-b from-sky-50 via-slate-50 to-slate-100 text-slate-900 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 dark:text-slate-100">
      <AppHeaderServer />

      <main className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6">
        <div className="pt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <DashboardGreeting userName={userName} />
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                At{" "}
                <span className="font-semibold text-slate-700 dark:text-slate-200">
                  {data.userAge}
                </span>
                ,
                your income is strong, but your wealth efficiency is lagging.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-xs font-medium text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
              <ShieldCheckIcon className="h-4 w-4" />
              Verified Analysis
            </div>
          </div>

          <section className="mt-6 rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/50 sm:p-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[420px_1fr]">
              <WealthupScoreGaugeCard
                score={data.wealthupScore}
                betterThanPercent={data.betterThanPercent}
                pointsToTarget={pointsToGood}
                targetScore={70}
              />

              <div className="rounded-3xl bg-white p-1 dark:bg-slate-950/30">
                <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950/30">
                  <div className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    Financial independence age
                  </div>

                  <div className="relative mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/30">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-xl bg-white p-4 dark:bg-slate-900/50">
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">
                          Current Trajectory
                        </div>
                        <div className="mt-1 text-3xl font-semibold text-slate-800 dark:text-slate-100">
                          {data.financialIndependence.currentTrajectoryAge}
                        </div>
                        <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                          Based on current savings
                          <br />
                          you have
                        </div>
                      </div>

                      <div className="rounded-xl bg-white p-4 dark:bg-slate-900/50">
                        <div className="text-right text-[11px] text-sky-700 dark:text-sky-400">
                          Your Potential
                        </div>
                        <div className="mt-1 text-right text-3xl font-semibold text-sky-700 dark:text-sky-400">
                          {data.financialIndependence.potentialAge}
                        </div>
                        <div className="mt-1 text-right text-[11px] text-slate-500 dark:text-slate-400">
                          By following our
                          <br />
                          personalized roadmap
                        </div>
                      </div>
                    </div>

                    <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-600 px-3 py-1 text-[10px] font-semibold text-white shadow-sm">
                      {data.financialIndependence.yearsSooner} years sooner!
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="text-xs font-medium text-slate-600 dark:text-slate-300">
                      Your score breakdown
                    </div>
                    <div className="mt-3 grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2">
                      {data.breakdown.map((item) => (
                        <ScoreBreakdownItem
                          key={item.label}
                          label={item.label}
                          points={item.points}
                          maxPoints={item.maxPoints}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <RoadmapSection
            userName={userName || "You"}
            steps={data.roadmap.map((s) => ({
              step: s.step,
              critical: s.severity === "Critical",
              title: s.title,
              description: s.description,
              cta: s.cta,
              ctaPoints: s.ctaPoints,
              locked: s.locked,
                href: `/roadmap/${s.step}`,
            }))}
          />
        </div>
      </main>
    </div>
  );
}

