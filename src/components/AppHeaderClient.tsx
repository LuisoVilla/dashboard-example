"use client";

import { useEffect, useMemo, useState } from "react";
import { MoonIcon, SunIcon } from "./Icons";

const AVATAR_STORAGE_KEY = "wealthup:avatar";
const THEME_STORAGE_KEY = "wealthup:theme";

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    // ignore
  }

  const prefersDark =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0] ?? "U";
  const last = parts.length > 1 ? parts[parts.length - 1]?.[0] : "";
  return (first + last).toUpperCase();
}

export function AppHeaderClient({ name }: { name: string | null }) {
  const [avatarDataUrl] = useState<string | null>(() => {
    try {
      if (typeof window === "undefined") return null;
      return window.localStorage.getItem(AVATAR_STORAGE_KEY) || null;
    } catch {
      return null;
    }
  });

  const [theme, setTheme] = useState<Theme>(() => getInitialTheme());

  useEffect(() => {
    try {
      document.documentElement.classList.toggle("dark", theme === "dark");
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const themeLabel = useMemo(() => {
    return theme === "dark" ? "Switch to light mode" : "Switch to dark mode";
  }, [theme]);

  return (
    <header className="w-full pt-4">
      <div className="mx-auto relative flex w-full max-w-6xl items-center justify-end px-4 sm:px-6">
        <div className="absolute left-1/2 -translate-x-1/2 text-base font-semibold tracking-tight text-sky-600 dark:text-sky-400">
          wealthup
        </div>

        {name ? (
          <div className="flex items-center gap-3">
            <div className="hidden text-sm font-medium text-slate-700 dark:text-slate-200 sm:block">
              {name}
            </div>

            <div className="relative h-9 w-9 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
              {avatarDataUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  alt={name}
                  src={avatarDataUrl}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xs font-semibold text-slate-700 dark:text-slate-100">
                  {initials(name)}
                </div>
              )}
            </div>

            <button
              type="button"
              className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              onClick={async () => {
                await fetch("/api/session", { method: "DELETE" });
                try {
                  window.localStorage.removeItem(AVATAR_STORAGE_KEY);
                } catch {
                  // ignore
                }
                window.location.href = "/login";
              }}
            >
              Logout
            </button>

            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              aria-label={themeLabel}
              title={themeLabel}
              onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
            >
              {theme === "dark" ? (
                <SunIcon className="h-4 w-4" />
              ) : (
                <MoonIcon className="h-4 w-4" />
              )}
            </button>
          </div>
        ) : null}
      </div>
    </header>
  );
}
