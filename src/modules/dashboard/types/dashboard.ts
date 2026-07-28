import { ExpenseCategory } from "@/modules/expenses/api/dtos/expense-category";

export interface TimelineChartPoint {
  date: string;
  total: number;
}

export interface CategoryTotal {
  category: ExpenseCategory;
  total: number;
}

export interface CategoryTimeline {
  category: ExpenseCategory;
  data: TimelineChartPoint[];
}

export interface DashboardData {
  totalExpenses: number;
  timeline: TimelineChartPoint[];
  totalExpensesByCategory: CategoryTotal[];
  categoryTimelines: CategoryTimeline[];
}
