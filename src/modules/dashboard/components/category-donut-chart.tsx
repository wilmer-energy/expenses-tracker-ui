import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

import { CategoryTotal } from "../types/dashboard";
import { getCategoryLabel } from "../custom-hooks/get-category-label";

interface Props {
  data: CategoryTotal[];
}

const CATEGORY_COLORS: Record<string, string> = {
  fixed: "#465FFF",
  variable: "#22C55E",
  savings_investments: "#eff31bd3",
};

export function CategoryDonutChart({ data }: Props) {
  const series = data.map((item) => Number(item.total));

  const labels = data.map((item) => getCategoryLabel(item.category));

  const colors = data.map(
    (item) => CATEGORY_COLORS[item.category] ?? "#6B7280",
  );

  const options: ApexOptions = {
    chart: {
      type: "donut",
      fontFamily: "Outfit, sans-serif",
      toolbar: {
        show: false,
      },
    },

    labels,

    colors,

    legend: {
      position: "bottom",
      fontSize: "14px",
      labels: {
        colors: undefined,
      },
    },

    dataLabels: {
      enabled: false,
    },

    stroke: {
      show: false,
    },

    plotOptions: {
      pie: {
        donut: {
          size: "65%",
        },
      },
    },

    tooltip: {
      theme: "light",

      y: {
        formatter(value) {
          return `$${value.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`;
        },
      },
    },
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          Gastos por categoría
        </h3>

        <p className="text-theme-sm text-gray-500">
          Distribución total de gastos
        </p>
      </div>

      <Chart
        type="donut"
        height={320}
        width="100%"
        options={options}
        series={series}
      />
    </div>
  );
}
