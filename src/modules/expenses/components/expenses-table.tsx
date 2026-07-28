import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/table";

import Badge from "@/components/ui/badge/Badge";

import { PencilIcon, TrashBinIcon } from "@/icons";

import { ExpenseDto } from "../api/dtos/expense.dto";
import { ExpenseCategory } from "../api/dtos/expense-category";

interface Props {
  expenses: ExpenseDto[];
  loading: boolean;

  onEdit(expense: ExpenseDto): void;
  onDelete(expense: ExpenseDto): void;
}

const formatterUSD = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const formatterDate = new Intl.DateTimeFormat("es-CO", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

function getCategoryLabel(category: ExpenseCategory) {
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

export function ExpensesTable({ expenses, loading, onEdit, onDelete }: Props) {
  if (loading) {
    return (
      <div className="py-10 text-center text-gray-500 dark:text-gray-400">
        Cargando...
      </div>
    );
  }

  if (!expenses.length) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-10 text-center dark:border-white/[0.05] dark:bg-white/[0.03]">
        <p className="text-gray-500 dark:text-gray-400">
          No hay gastos registrados.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop */}
      <div className="hidden md:block overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 text-start font-medium text-theme-xs text-gray-500 dark:text-gray-400"
                >
                  Fecha
                </TableCell>

                <TableCell
                  isHeader
                  className="px-5 py-3 text-start font-medium text-theme-xs text-gray-500 dark:text-gray-400"
                >
                  Categoría
                </TableCell>

                <TableCell
                  isHeader
                  className="px-5 py-3 text-start font-medium text-theme-xs text-gray-500 dark:text-gray-400"
                >
                  Valor
                </TableCell>

                <TableCell
                  isHeader
                  className="px-5 py-3 text-start font-medium text-theme-xs text-gray-500 dark:text-gray-400"
                >
                  Nota
                </TableCell>

                <TableCell
                  isHeader
                  className="px-5 py-3 text-center font-medium text-theme-xs text-gray-500 dark:text-gray-400"
                >
                  Acciones
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {expenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell className="px-5 py-4 text-start text-theme-sm text-gray-700 dark:text-gray-300">
                    {formatterDate.format(new Date(expense.made_at))}
                  </TableCell>

                  <TableCell className="px-5 py-4 text-start">
                    <Badge color="info">
                      {getCategoryLabel(expense.category)}
                    </Badge>
                  </TableCell>

                  <TableCell className="px-5 py-4 text-start font-medium text-gray-800 dark:text-white/90">
                    {formatterUSD.format(expense.amount)}
                  </TableCell>

                  <TableCell className="px-5 py-4 text-start text-gray-700 dark:text-gray-300">
                    {expense.note || "-"}
                  </TableCell>

                  <TableCell className="px-5 py-4">
                    <div className="flex items-center justify-center gap-4">
                      <button
                        onClick={() => onEdit(expense)}
                        className="text-brand-500 transition-colors hover:text-brand-700"
                        title="Editar"
                      >
                        <PencilIcon className="size-5" />
                      </button>

                      <button
                        onClick={() => onDelete(expense)}
                        className="text-error-500 transition-colors hover:text-error-700"
                        title="Eliminar"
                      >
                        <TrashBinIcon className="size-5" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Mobile */}
      <div className="space-y-4 md:hidden">
        {expenses.map((expense) => (
          <div
            key={expense.id}
            className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-white/[0.05] dark:bg-white/[0.03]"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {formatterUSD.format(expense.amount)}
                </h3>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {formatterDate.format(new Date(expense.made_at))}
                </p>
              </div>

              <Badge color="info">{getCategoryLabel(expense.category)}</Badge>
            </div>

            <div className="mt-4">
              <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Nota
              </p>

              <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                {expense.note || "-"}
              </p>
            </div>

            <div className="mt-5 flex justify-end gap-5">
              <button
                onClick={() => onEdit(expense)}
                className="text-brand-500 transition-colors hover:text-brand-700"
                title="Editar"
              >
                <PencilIcon className="size-6" />
              </button>

              <button
                onClick={() => onDelete(expense)}
                className="text-error-500 transition-colors hover:text-error-700"
                title="Eliminar"
              >
                <TrashBinIcon className="size-6" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
