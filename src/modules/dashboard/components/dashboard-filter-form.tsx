import { FormProvider } from "react-hook-form";

import Button from "@/components/ui/button/Button";
import { DateInput } from "@/modules/shared/components/inputs/date-input";

import { UseFormReturn } from "react-hook-form";

import { DashboardFilterFormValues } from "../types/dashboard-filter-form";

interface Props {
  form: UseFormReturn<DashboardFilterFormValues>;

  onSubmit(values: DashboardFilterFormValues): void | Promise<void>;

  onSelectWeek(): void;
  onSelectMonth(): void;
  onSelectYear(): void;
}

export function DashboardFilterForm({
  form,
  onSubmit,
  onSelectWeek,
  onSelectMonth,
  onSelectYear,
}: Props) {
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]"
      >
        <div className="flex flex-wrap gap-2 mb-5">
          <Button type="button" size="sm" onClick={onSelectWeek}>
            Esta semana
          </Button>

          <Button type="button" size="sm" onClick={onSelectMonth}>
            Este mes
          </Button>

          <Button type="button" size="sm" onClick={onSelectYear}>
            Este año
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <DateInput name="startDate" label="Fecha inicial" />

          <DateInput name="endDate" label="Fecha final" />
        </div>

        <div className="mt-5 flex justify-end">
          <Button type="submit" size="sm">
            Aplicar filtro
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
