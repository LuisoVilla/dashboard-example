import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type DashboardParamsState = {
  monthlySaving: number;
};

const initialState: DashboardParamsState = {
  monthlySaving: 500,
};

export const dashboardParamsSlice = createSlice({
  name: "dashboardParams",
  initialState,
  reducers: {
    setMonthlySaving(state, action: PayloadAction<number>) {
      state.monthlySaving = action.payload;
    },
  },
});

export const { setMonthlySaving } = dashboardParamsSlice.actions;
