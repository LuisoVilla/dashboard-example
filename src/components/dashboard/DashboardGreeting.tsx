"use client";

import { useEffect, useState } from "react";

function computeGreeting(hour: number) {
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good night";
}

export function greetingFromHour(hour: number) {
  const safeHour = Number.isFinite(hour) ? hour : 0;
  const normalizedHour = ((Math.floor(safeHour) % 24) + 24) % 24;
  return computeGreeting(normalizedHour);
}

export function DashboardGreeting({ userName }: { userName: string }) {
  const [greeting, setGreeting] = useState("Hello");

  useEffect(() => {
    const id = window.setTimeout(() => {
      setGreeting(greetingFromHour(new Date().getHours()));
    }, 0);

    return () => {
      window.clearTimeout(id);
    };
  }, []);

  return (
    <h1 className="text-3xl font-semibold tracking-tight text-slate-800 dark:text-slate-100">
      {greeting},
      <span className="text-sky-700 dark:text-sky-400"> {userName}!</span>
    </h1>
  );
}
