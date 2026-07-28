import { useMemo } from "react";

import { ExpenseDto } from "@/modules/expenses/api/dtos/expense.dto";
import { ExpenseCategory } from "@/modules/expenses/api/dtos/expense-category";

import {
  CategoryTimeline,
  CategoryTotal,
  DashboardData,
  TimelineChartPoint,
} from "../types/dashboard";

export function useDashboard(expenses: ExpenseDto[]): DashboardData {
  return useMemo(() => {
    let totalExpenses = 0;

    const timelineMap = new Map<string, number>();

    const totalsByCategory = new Map<ExpenseCategory, number>();

    const timelinesByCategory = new Map<ExpenseCategory, Map<string, number>>();

    for (const expense of expenses) {
      const amount = Number(expense.amount);

      totalExpenses += amount;

      const currentDay = timelineMap.get(expense.made_at) ?? 0;

      timelineMap.set(expense.made_at, currentDay + amount);

      const currentCategory = totalsByCategory.get(expense.category) ?? 0;

      totalsByCategory.set(expense.category, currentCategory + amount);

      if (!timelinesByCategory.has(expense.category)) {
        timelinesByCategory.set(expense.category, new Map<string, number>());
      }

      const categoryTimeline = timelinesByCategory.get(expense.category)!;

      const currentCategoryDay = categoryTimeline.get(expense.made_at) ?? 0;

      categoryTimeline.set(expense.made_at, currentCategoryDay + amount);
    }

    const timeline: TimelineChartPoint[] = [...timelineMap.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, total]) => ({
        date,
        total,
      }));

    const totalExpensesByCategory: CategoryTotal[] = [
      ...totalsByCategory.entries(),
    ].map(([category, total]) => ({
      category,
      total,
    }));

    const categoryTimelines: CategoryTimeline[] = [
      ...timelinesByCategory.entries(),
    ].map(([category, values]) => ({
      category,
      data: [...values.entries()]
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([date, total]) => ({
          date,
          total,
        })),
    }));

    return {
      totalExpenses,
      timeline,
      totalExpensesByCategory,
      categoryTimelines,
    };
  }, [expenses]);
}
