import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { RoadmapStepCard, type RoadmapStepCardModel } from "./RoadmapStepCard";

vi.mock("next/link", () => {
  return {
    default: ({ href, children, ...rest }: any) => (
      <a href={href} {...rest}>
        {children}
      </a>
    ),
  };
});

describe("RoadmapStepCard", () => {
  it("renders a link CTA when unlocked and href is provided", () => {
    const model: RoadmapStepCardModel = {
      step: 1,
      critical: true,
      title: "Title",
      description: "Desc",
      cta: "Go",
      ctaPoints: 10,
      locked: false,
      href: "/roadmap/1",
    };

    render(<RoadmapStepCard model={model} />);

    const link = screen.getByRole("link", { name: /go/i });
    expect(link).toHaveAttribute("href", "/roadmap/1");
  });

  it("renders locked messaging and no link when locked", () => {
    const model: RoadmapStepCardModel = {
      step: 2,
      title: "Title",
      description: "Desc",
      cta: "Locked CTA",
      ctaPoints: 12,
      locked: true,
      href: "/roadmap/2",
    };

    render(<RoadmapStepCard model={model} />);

    expect(screen.queryByRole("link")).toBeNull();
    expect(
      screen.getByText(/complete step 1/i),
    ).toBeInTheDocument();
  });
});
