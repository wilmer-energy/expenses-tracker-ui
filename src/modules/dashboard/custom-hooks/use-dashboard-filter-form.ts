import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { DashboardFilterFormValues } from "../types/dashboard-filter-form";
import { useLazyGetExpensesQuery } from "../api";

const schema = z
  .object({
    startDate: z.string().min(1, "Seleccione una fecha inicial"),
    endDate: z.string().min(1, "Seleccione una fecha final"),
  })
  .refine((values) => values.startDate <= values.endDate, {
    message: "La fecha inicial debe ser menor o igual a la fecha final",
    path: ["endDate"],
  });

function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

function getCurrentWeek(): DashboardFilterFormValues {
  const today = new Date();

  const day = today.getDay();
  const diff = day === 0 ? -6 : 1 - day;

  const start = new Date(today);
  start.setDate(today.getDate() + diff);

  return {
    startDate: formatDate(start),
    endDate: formatDate(today),
  };
}

function getCurrentMonth(): DashboardFilterFormValues {
  const today = new Date();

  return {
    startDate: formatDate(new Date(today.getFullYear(), today.getMonth(), 1)),
    endDate: formatDate(today),
  };
}

function getCurrentYear(): DashboardFilterFormValues {
  const today = new Date();

  return {
    startDate: formatDate(new Date(today.getFullYear(), 0, 1)),
    endDate: formatDate(today),
  };
}

export function useDashboardFilterForm() {
  const defaultValues = useMemo(() => getCurrentMonth(), []);

  const form = useForm<DashboardFilterFormValues>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onChange",
  });

  function onSelectWeek() {
    form.reset(getCurrentWeek());
  }

  function onSelectMonth() {
    form.reset(getCurrentMonth());
  }

  function onSelectYear() {
    form.reset(getCurrentYear());
  }

  const [getExpenses, query] = useLazyGetExpensesQuery();

  useEffect(() => {
    const fetchData = async () => {
      await getExpenses(defaultValues, false);
    }
    fetchData()
  }, [defaultValues, getExpenses]);

  async function onSubmit(values: DashboardFilterFormValues) {
    await getExpenses(
      {
        startDate: values.startDate,
        endDate: values.endDate,
      },
      false,
    );
  }

  return {
    form,
    isValid: form.formState.isValid,
    onSubmit,
    onSelectWeek,
    onSelectMonth,
    onSelectYear,
    expenses: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error,
  };
}
