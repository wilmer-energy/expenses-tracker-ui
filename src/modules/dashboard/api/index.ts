import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "@/modules/shared/api/base-query";
import { ExpenseDto } from "@/modules/expenses/api/dtos/expense.dto";
import { GetExpensesQueryDto } from "./dtos/get-expenses-query.dto";

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",

  baseQuery: baseQueryWithAuth,

  endpoints: (builder) => ({
    getExpenses: builder.query<ExpenseDto[], GetExpensesQueryDto | void>({
      query: (params) => ({
        url: "/expenses/",
        params: {
          start_date: params?.startDate,
          end_date: params?.endDate,
        },
      }),
    }),
  }),
});

export const {
  useGetExpensesQuery,
  useLazyGetExpensesQuery
} = dashboardApi;
