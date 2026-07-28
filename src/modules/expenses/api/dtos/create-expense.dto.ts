import { ExpenseCategory } from "./expense-category";

export interface CreateExpenseDto {
  note?: string | null;
  amount: number;
  made_at: string;
  category: ExpenseCategory;
}