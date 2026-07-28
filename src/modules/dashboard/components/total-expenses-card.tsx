interface Props {
  total: number;
}

export function TotalExpensesCard({ total }: Props) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="mb-2">
        <p className="text-theme-sm text-gray-500">Total de gastos</p>
      </div>

      <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
        {`$${total.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`}
      </h2>
    </div>
  );
}
