import { RoadmapStepCard, type RoadmapStepCardModel } from "@/components/dashboard/RoadmapStepCard";
import { RoadmapStep1Extras } from "@/components/dashboard/RoadmapStep1Extras";

export function RoadmapSection({
  userName,
  steps,
}: {
  userName: string;
  steps: RoadmapStepCardModel[];
}) {
  return (
    <section className="mt-6 rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/50 sm:p-6">
      <div className="text-base font-semibold text-slate-800 dark:text-slate-100">
        Your personalized roadmap to 70+{" "}
        <span className="text-sky-700 dark:text-sky-400">WealthUp</span> score
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
        {steps.map((s) => (
          <RoadmapStepCard
            key={s.step}
            model={{ ...s, href: s.href ?? `/roadmap/${s.step}` }}
            footer={
              s.step === 1 ? (
                <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="text-slate-600 dark:text-slate-300">⚡</span>
                  Express setup: Complete in under 3 minutes
                </div>
              ) : null
            }
          >
            {s.step === 1 ? <RoadmapStep1Extras userName={userName} /> : null}
          </RoadmapStepCard>
        ))}
      </div>
    </section>
  );
}
