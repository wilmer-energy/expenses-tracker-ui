import { ExpenseCategory } from "@/modules/expenses/api/dtos/expense-category";

export function getCategoryLabel(category: ExpenseCategory) {
  switch (category) {
    case ExpenseCategory.FIXED:
      return "Gasto fijo";

    case ExpenseCategory.VARIABLE:
      return "Gasto variable";

    case ExpenseCategory.SAVINGS_INVESTMENTS:
      return "Ahorro / Inversión";

    default:
      return category;
  }
}