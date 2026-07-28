import { DashboardFilterForm } from "./dashboard-filter-form";
import { ExpensesTimelineChart } from "./expenses-timeline-chart";
import { CategoryTimelineChart } from "./category-timeline-chart";

import { useDashboard } from "../custom-hooks/use-dashboard";
import { useDashboardFilterForm } from "../custom-hooks/use-dashboard-filter-form";
import { CategoryDonutChart } from "./category-donut-chart";
import { TotalExpensesCard } from "./total-expenses-card";

export function DashboardContent() {
  const {
    form,
    onSubmit,
    onSelectWeek,
    onSelectMonth,
    onSelectYear,
    expenses,
    //isLoading,
  } = useDashboardFilterForm();

  const dashboard = useDashboard(expenses);

  return (
    <div className="space-y-6">
      <DashboardFilterForm
        form={form}
        onSubmit={onSubmit}
        onSelectWeek={onSelectWeek}
        onSelectMonth={onSelectMonth}
        onSelectYear={onSelectYear}
      />
      <TotalExpensesCard total={dashboard.totalExpenses} />
      <ExpensesTimelineChart data={dashboard.timeline} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {dashboard.categoryTimelines.map((item) => (
          <CategoryTimelineChart
            key={item.category}
            category={item.category}
            data={item.data}
          />
        ))}
      </div>

      <CategoryDonutChart data={dashboard.totalExpensesByCategory} />
    </div>
  );
}
