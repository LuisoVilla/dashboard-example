"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const AVATAR_STORAGE_KEY = "wealthup:avatar";
const MAX_AVATAR_BYTES = 350 * 1024;

export function LoginClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [avatarError, setAvatarError] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  const nextPath = useMemo(() => {
    const next = searchParams.get("next");
    return next && next.startsWith("/") ? next : null;
  }, [searchParams]);

  const nextPathname = useMemo(() => {
    if (!nextPath) return null;
    try {
      return new URL(nextPath, "https://local").pathname;
    } catch {
      return null;
    }
  }, [nextPath]);

  const toastMessage = useMemo(() => {
    if (!nextPathname) return null;
    if (nextPathname === "/") {
      return "To view the dashboard, please log in first.";
    }
    if (nextPathname.startsWith("/roadmap")) {
      return "You can’t access the roadmap until you’re logged in.";
    }
    return "You can’t access this page until you’re logged in.";
  }, [nextPathname]);

  useEffect(() => {
    if (!nextPath) return;
    const showId = window.setTimeout(() => setShowToast(true), 0);
    const hideId = window.setTimeout(() => setShowToast(false), 3200);
    return () => {
      window.clearTimeout(showId);
      window.clearTimeout(hideId);
    };
  }, [nextPath]);

  const canSubmit = useMemo(() => name.trim().length >= 2, [name]);

  return (
    <div className="min-h-dvh bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      {showToast && toastMessage ? (
        <div
          className="fixed inset-x-0 top-4 z-50 mx-auto w-full max-w-md px-4 sm:px-6"
          role="status"
          aria-live="polite"
        >
          <div className="flex items-start justify-between gap-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-900 shadow-sm dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-200">
            <div>
              {toastMessage}
              {nextPathname ? (
                <div className="mt-1 text-xs text-rose-800/80 dark:text-rose-200/80">
                  Requested: <span className="font-semibold">{nextPathname}</span>
                </div>
              ) : null}
            </div>
            <button
              type="button"
              className="shrink-0 rounded-md px-2 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-100 hover:text-rose-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2 focus-visible:ring-offset-rose-50 dark:text-rose-200 dark:hover:bg-rose-900/40 dark:hover:text-rose-100 dark:focus-visible:ring-rose-300 dark:focus-visible:ring-offset-rose-950/40"
              aria-label="Close notification"
              onClick={() => setShowToast(false)}
            >
              Close
            </button>
          </div>
        </div>
      ) : null}

      <div className="mx-auto flex min-h-dvh w-full max-w-6xl items-center justify-center px-4 py-10 sm:px-6">
        <div className="w-full max-w-md">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-center">
              <div className="text-base font-semibold tracking-tight text-slate-800 dark:text-slate-100">
                Wealthup
              </div>
            </div>

            <h1 className="mt-6 text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
              Login
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Enter your name and an optional profile photo.
            </p>

            <form
              className="mt-6 space-y-4"
              onSubmit={async (e) => {
                e.preventDefault();
                if (!canSubmit) return;
                setIsSubmitting(true);
                const res = await fetch("/api/session", {
                  method: "POST",
                  headers: { "content-type": "application/json" },
                  body: JSON.stringify({ name: name.trim() }),
                });

                if (!res.ok) {
                  setIsSubmitting(false);
                  return;
                }

                router.replace(nextPath ?? "/");
              }}
            >
              <label className="block">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                  Name
                </span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ankit"
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-300 focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus-visible:ring-sky-400 dark:focus-visible:ring-offset-slate-950"
                  autoComplete="name"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                  Profile photo (optional)
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 file:mr-4 file:rounded-lg file:border-0 file:bg-slate-100 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-slate-700 hover:file:bg-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:file:bg-slate-800 dark:file:text-slate-200 dark:hover:file:bg-slate-700 dark:focus-visible:ring-sky-400 dark:focus-visible:ring-offset-slate-950"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    setAvatarError(null);

                    if (!file) {
                      try {
                        window.localStorage.removeItem(AVATAR_STORAGE_KEY);
                      } catch {
                        // ignore
                      }
                      return;
                    }

                    if (file.size > MAX_AVATAR_BYTES) {
                      setAvatarError("Please choose an image smaller than 350KB.");
                      e.target.value = "";
                      return;
                    }

                    const reader = new FileReader();
                    reader.onerror = () => setAvatarError("Could not read that file.");
                    reader.onload = () => {
                      const result =
                        typeof reader.result === "string" ? reader.result : null;
                      if (!result) {
                        setAvatarError("Could not read that file.");
                        return;
                      }
                      try {
                        window.localStorage.setItem(AVATAR_STORAGE_KEY, result);
                      } catch {
                        setAvatarError("Could not save photo in this browser.");
                      }
                    };
                    reader.readAsDataURL(file);
                  }}
                />

                {avatarError ? (
                  <div className="mt-2 text-xs text-rose-600">{avatarError}</div>
                ) : null}
              </label>

              <button
                type="submit"
                disabled={!canSubmit || isSubmitting}
                className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:bg-slate-300 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white dark:focus-visible:ring-sky-400 dark:focus-visible:ring-offset-slate-950 dark:disabled:bg-slate-700 dark:disabled:text-slate-300"
              >
                Continue
              </button>
            </form>
          </div>

          <p className="mt-4 text-center text-xs text-slate-500 dark:text-slate-400">
            Session is stored in an httpOnly cookie. Photo is stored locally.
          </p>
        </div>
      </div>
    </div>
  );
}
