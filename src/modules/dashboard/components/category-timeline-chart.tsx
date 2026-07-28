import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

import { ExpenseCategory } from "@/modules/expenses/api/dtos/expense-category";

import { TimelineChartPoint } from "../types/dashboard";
import { formatChartDate } from "../custom-hooks/format-chart-date";
import { getCategoryLabel } from "../custom-hooks/get-category-label";

interface Props {
  category: ExpenseCategory;
  data: TimelineChartPoint[];
}

export function CategoryTimelineChart({ category, data }: Props) {
  const options: ApexOptions = {
    legend: {
      show: false,
    },

    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "area",
      sparkline: {
        enabled: true,
      },
      toolbar: {
        show: false,
      },
    },

    colors: ["#465FFF"],

    stroke: {
      curve: "smooth",
      width: 2,
    },

    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.45,
        opacityTo: 0,
      },
    },

    dataLabels: {
      enabled: false,
    },

    tooltip: {
      y: {
        formatter(value) {
          return `$${value.toFixed(2)}`;
        },
      },
    },

    xaxis: {
      categories: data.map((item) => formatChartDate(item.date)),
    },
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="mb-4">
        <h4 className="font-semibold text-gray-800 dark:text-white">
          {getCategoryLabel(category)}
        </h4>
      </div>

      <Chart
        options={options}
        type="area"
        height={120}
        series={[
          {
            name: category,
            data: data.map((item) => item.total),
          },
        ]}
      />
    </div>
  );
}
