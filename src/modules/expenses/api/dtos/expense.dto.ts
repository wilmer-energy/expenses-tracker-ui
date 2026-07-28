import { ExpenseCategory } from "./expense-category";

export interface ExpenseDto {
  id: number;
  note: string | null;
  amount: number;
  made_at: string;
  category: ExpenseCategory;

  created_at: string;
  updated_at: string;
}