export type ScoreBreakdownItem = {
  label: string;
  points: number;
  maxPoints: number;
};

export type DashboardMock = {
  userAge: number;
  wealthupScore: number;
  betterThanPercent: number;
  financialIndependence: {
    currentTrajectoryAge: number;
    potentialAge: number;
    yearsSooner: number;
  };
  breakdown: ScoreBreakdownItem[];
  roadmap: Array<{
    step: number;
    severity?: "Critical" | "";
    title: string;
    description: string;
    cta: string;
    ctaPoints: number;
    locked?: boolean;
  }>;
};

export const dashboardMock: DashboardMock = {
  userAge: 28,
  wealthupScore: 43,
  betterThanPercent: 48,
  financialIndependence: {
    currentTrajectoryAge: 65,
    potentialAge: 38,
    yearsSooner: 27,
  },
  breakdown: [
    { label: "Emergency Funds", points: 0, maxPoints: 20 },
    { label: "Health Insurance", points: 20, maxPoints: 20 },
    { label: "Liquidity", points: 11, maxPoints: 20 },
    { label: "Life Insurance", points: 7, maxPoints: 20 },
    { label: "Investments", points: 20, maxPoints: 20 },
    { label: "Savings", points: 16, maxPoints: 20 },
  ],
  roadmap: [
    {
      step: 1,
      severity: "Critical",
      title: "Build your safety net (Emergency fund)",
      description:
        "Build your emergency fund to be risk-free within the next 6 months.",
      cta: "Start Investing Today",
      ctaPoints: 20,
      locked: false,
    },
    {
      step: 2,
      title: "Optimize investments",
      description:
        "Explore diversified mutual funds and asset allocation strategies tailored to your risk profile.",
      cta: "Begin Investing",
      ctaPoints: 12,
      locked: true,
    },
    {
      step: 3,
      title: "Maximize growth",
      description:
        "Review advanced growth options, retirement planning, and tax-efficient investment vehicles.",
      cta: "Analyse your Mutual Funds",
      ctaPoints: 8,
      locked: true,
    },
  ],
};
