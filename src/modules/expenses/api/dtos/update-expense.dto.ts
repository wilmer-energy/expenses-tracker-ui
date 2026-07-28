import { ExpenseCategory } from "./expense-category";

export interface UpdateExpenseDto {
  note?: string | null;
  amount: number;
  made_at: string;
  category: ExpenseCategory;
}