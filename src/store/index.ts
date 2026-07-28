import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "@/modules/auth/api";
import { expensesApi } from "@/modules/expenses/api";
import { dashboardApi } from "@/modules/dashboard/api";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [expensesApi.reducerPath]: expensesApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      expensesApi.middleware,
      dashboardApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
