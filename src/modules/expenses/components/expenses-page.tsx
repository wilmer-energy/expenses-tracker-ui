import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PageMeta from "@/components/common/PageMeta";
import Button from "@/components/ui/button/Button";

import { ExpensesTable } from "./expenses-table";
import { ExpenseDrawer } from "./expense-drawer";
import { DeleteExpenseDialog } from "./delete-expense-dialog";

import { useExpenses } from "../custom-hooks/use-expenses";

export default function ExpensesPage() {
  const expenses = useExpenses();

  return (
    <>
      <PageMeta
        title="Gastos"
        description="Administración de gastos"
      />

      <PageBreadcrumb pageTitle="Gastos" />

      <div className="space-y-6">

        <div className="flex justify-end">

          <Button onClick={expenses.openCreateDrawer}>
            Nuevo gasto
          </Button>

        </div>

        <ExpensesTable
          expenses={expenses.items}
          loading={expenses.loading}
          onEdit={expenses.openEditDrawer}
          onDelete={expenses.openDeleteDialog}
        />

      </div>

      <ExpenseDrawer
        open={expenses.drawerOpen}
        expense={expenses.selectedExpense}
        onClose={expenses.closeDrawer}
      />

      <DeleteExpenseDialog
        open={expenses.deleteDialogOpen}
        expense={expenses.selectedExpense}
        onClose={expenses.closeDeleteDialog}
        onConfirm={expenses.deleteExpense}
        loading={expenses.deleting}
      />
    </>
  );
}