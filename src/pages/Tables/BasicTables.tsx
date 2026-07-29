import PageMeta from "@/components/common/PageMeta";
import ExpensesPage from "@/modules/expenses/components/expenses-page";

export default function BasicTables() {
  return (
    <>
      <PageMeta
        title="Tabla de gastos"
        description="Lista de tus gastos"
      />
      <ExpensesPage />
    </>
  );
}
