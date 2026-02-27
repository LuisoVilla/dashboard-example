import { describe, expect, it } from "vitest";
import { greetingFromHour } from "./DashboardGreeting";

describe("greetingFromHour", () => {
  it("returns morning for 0-11", () => {
    expect(greetingFromHour(0)).toBe("Good morning");
    expect(greetingFromHour(11)).toBe("Good morning");
  });

  it("returns afternoon for 12-17", () => {
    expect(greetingFromHour(12)).toBe("Good afternoon");
    expect(greetingFromHour(17)).toBe("Good afternoon");
  });

  it("returns night for 18-23", () => {
    expect(greetingFromHour(18)).toBe("Good night");
    expect(greetingFromHour(23)).toBe("Good night");
  });

  it("normalizes weird hour inputs", () => {
    expect(greetingFromHour(24)).toBe("Good morning");
    expect(greetingFromHour(-1)).toBe("Good night");
    expect(greetingFromHour(Number.NaN)).toBe("Good morning");
  });
});
