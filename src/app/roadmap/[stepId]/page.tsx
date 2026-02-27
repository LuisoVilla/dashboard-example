import type { Metadata } from "next";
import Link from "next/link";
import { AppHeaderServer } from "@/components/AppHeaderServer";
import { dashboardMock } from "@/lib/mock/dashboard";

export async function generateMetadata({
  params,
}: {
  params: { stepId: string };
}): Promise<Metadata> {
  const stepNumber = Number(params.stepId);
  const step = dashboardMock.roadmap.find((s) => s.step === stepNumber);
  const title = step ? `Roadmap — Step ${step.step} — Wealthup` : "Roadmap — Wealthup";

  return {
    title,
    description: step
      ? `${step.title} — roadmap step details.`
      : "Roadmap step details.",
  };
}

export default async function RoadmapStepPage({
  params,
}: {
  params: Promise<{ stepId: string }>;
}) {
  const { stepId } = await params;
  const stepNumber = Number(stepId);
  const step = dashboardMock.roadmap.find((s) => s.step === stepNumber);

  return (
    <div className="min-h-dvh bg-linear-to-b from-sky-50 via-slate-50 to-slate-100 text-slate-900 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 dark:text-slate-100">
      <AppHeaderServer />

      <main className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6">
        {step ? (
          <div className="pt-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="text-xs font-semibold text-rose-500">
                Step {step.step}
                {step.severity ? ` : ${step.severity}` : ""}
              </div>
              <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                {step.title}
              </h1>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                {step.description}
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  disabled={step.locked}
                  className={`inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold ${
                    step.locked
                      ? "cursor-not-allowed bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                      : "bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
                  }`}
                >
                  {step.cta}
                  <span className="ml-2 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
                    +{step.ctaPoints} pts
                  </span>
                </button>

                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  Back
                </Link>
              </div>

              {step.locked ? (
                <div className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                  This step is locked. Complete Step 1 to unlock.
                </div>
              ) : null}
            </div>
          </div>
        ) : (
          <div className="pt-10">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Step not found
              </div>
              <div className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                We couldn’t find this roadmap step.
              </div>
              <Link
                href="/"
                className="mt-6 inline-flex rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Back to dashboard
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
