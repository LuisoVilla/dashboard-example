import { describe, expect, it } from "vitest";
import { dashboardParamsSlice, setMonthlySaving } from "./dashboardParamsSlice";

describe("dashboardParamsSlice", () => {
  it("returns initial state", () => {
    const state = dashboardParamsSlice.reducer(undefined, { type: "@@INIT" });
    expect(state.monthlySaving).toBe(500);
  });

  it("sets monthlySaving", () => {
    const state = dashboardParamsSlice.reducer(undefined, setMonthlySaving(8000));
    expect(state.monthlySaving).toBe(8000);
  });
});
