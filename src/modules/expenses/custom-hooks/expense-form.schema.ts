import { z } from "zod";
import { ExpenseCategory } from "../api/dtos/expense-category";

export const expenseFormSchema = z.object({
  amount: z.number().positive("El valor debe ser mayor que cero"),

  note: z.string().optional(),

  category: z.nativeEnum(ExpenseCategory, {
    message: "Seleccione una categoría",
  }),

  made_at: z.string().min(1, "Seleccione una fecha"),
});

export type ExpenseFormValues = z.infer<typeof expenseFormSchema>;
