import { FormProvider } from "react-hook-form";

import Button from "@/components/ui/button/Button";

import { BasicInput } from "@/modules/shared/components/inputs/basic-input";

import { useExpenseForm } from "../custom-hooks/use-expense-form";
import { ExpenseDto } from "../api/dtos/expense.dto";
import { ExpenseCategory } from "../api/dtos/expense-category";
import { SelectInput } from "@/modules/shared/components/inputs/select-input";
import { DateInput } from "@/modules/shared/components/inputs/date-input";
import { TextAreaInput } from "@/modules/shared/components/inputs/textarea-input";

interface Props {
  expense?: ExpenseDto;
  onSuccess(): void;
}

const expenseCategoryOptions = [
  {
    value: ExpenseCategory.FIXED,
    label: "Gasto fijo",
  },
  {
    value: ExpenseCategory.VARIABLE,
    label: "Gasto variable",
  },
  {
    value: ExpenseCategory.SAVINGS_INVESTMENTS,
    label: "Ahorro / Inversión",
  },
];

export function ExpenseForm({ expense, onSuccess }: Props) {
  const { form, submit, loading } = useExpenseForm(expense, onSuccess);

  const {
    formState: { isValid },
  } = form;

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(submit)} className="space-y-5">
        <BasicInput name="amount" label="Valor" type="number" />

        <SelectInput
          name="category"
          label="Categoría"
          placeholder="Seleccione una categoría"
          options={expenseCategoryOptions}
        />

        <DateInput name="made_at" label="Fecha" />

        <TextAreaInput
          name="note"
          label="Nota"
          rows={4}
          placeholder="Ingrese una nota (opcional)"
        />

        <Button type="submit" className="w-full" disabled={!isValid || loading}>
          {loading ? "Guardando..." : "Guardar"}
        </Button>
      </form>
    </FormProvider>
  );
}
