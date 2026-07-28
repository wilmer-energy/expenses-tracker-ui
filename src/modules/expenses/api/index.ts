import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "@/modules/shared/api/base-query";

import { CreateExpenseDto } from "./dtos/create-expense.dto";
import { UpdateExpenseDto } from "./dtos/update-expense.dto";
import { ExpenseDto } from "./dtos/expense.dto";

export const expensesApi = createApi({
  reducerPath: "expensesApi",

  baseQuery: baseQueryWithAuth,

  tagTypes: ["Expenses"],

  endpoints: (builder) => ({
    getExpenses: builder.query<ExpenseDto[], void>({
      query: () => ({
        url: "/expenses/",
      }),

      providesTags: ["Expenses"],
    }),

    createExpense: builder.mutation<void, CreateExpenseDto>({
      query: (body) => ({
        url: "/expenses",

        method: "POST",

        body,
      }),

      invalidatesTags: ["Expenses"],
    }),

    updateExpense: builder.mutation<
      void,
      {
        id: number;
        body: UpdateExpenseDto;
      }
    >({
      query: ({ id, body }) => ({
        url: `/expenses/${id}`,

        method: "PUT",

        body,
      }),

      invalidatesTags: ["Expenses"],
    }),

    deleteExpense: builder.mutation<void, number>({
      query: (id) => ({
        url: `/expenses/${id}`,

        method: "DELETE",
      }),

      invalidatesTags: ["Expenses"],
    }),
  }),
});

export const {
  useGetExpensesQuery,
  useCreateExpenseMutation,
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
} = expensesApi;
