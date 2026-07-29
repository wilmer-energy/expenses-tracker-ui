import { useEffect } from "react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { useCreateExpenseMutation, useUpdateExpenseMutation } from "../api";

import { ExpenseDto } from "../api/dtos/expense.dto";

import { ExpenseFormValues, expenseFormSchema } from "./expense-form.schema";
import { ExpenseCategory } from "../api/dtos/expense-category";

const defaultValues = {
  amount: 0,
  note: "",
  category: ExpenseCategory.VARIABLE,
  made_at: "",
};

export function useExpenseForm(
  expense: ExpenseDto | undefined,
  onSuccess: () => void,
) {
  const [createExpense, createState] = useCreateExpenseMutation();

  const [updateExpense, updateState] = useUpdateExpenseMutation();

  const form = useForm<ExpenseFormValues>({
    resolver: zodResolver(expenseFormSchema),
    mode: "onChange",
    defaultValues,
  });

  useEffect(() => {
    const newValue = expense
      ? {
          amount: expense.amount ?? 0,
          note: expense.note ?? "",
          category: expense.category ?? undefined,
          made_at: expense.made_at ? expense.made_at.substring(0, 10) : "",
        }
      : defaultValues;
    form.reset(newValue);
  }, [expense, form]);

  async function submit(values: ExpenseFormValues) {
    const body = {
      ...values,
      made_at: new Date(values.made_at).toISOString(),
    };

    if (expense) {
      await updateExpense({
        id: expense.id,
        body,
      }).unwrap();
    } else {
      await createExpense(body).unwrap();

      form.reset({
        amount: undefined,
        note: "",
        category: undefined,
        made_at: "",
      });
    }

    onSuccess();
  }

  return {
    form,

    submit,

    loading: createState.isLoading || updateState.isLoading,
  };
}
