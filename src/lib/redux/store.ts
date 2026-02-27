import { configureStore } from "@reduxjs/toolkit";
import { dashboardParamsSlice } from "./dashboardParamsSlice";

export const store = configureStore({
  reducer: {
    dashboardParams: dashboardParamsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
