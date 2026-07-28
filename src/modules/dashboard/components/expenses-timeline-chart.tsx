import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

import { TimelineChartPoint } from "../types/dashboard";
import { formatChartDate } from "../custom-hooks/format-chart-date";

interface Props {
  data: TimelineChartPoint[];
}

export function ExpensesTimelineChart({ data }: Props) {
  const options: ApexOptions = {
    legend: {
      show: false,
    },

    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "area",
      height: 320,
      toolbar: {
        show: false,
      },
    },

    colors: ["#465FFF"],

    stroke: {
      curve: "smooth",
      width: 3,
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

    markers: {
      size: 0,
      hover: {
        size: 5,
      },
    },

    grid: {
      xaxis: {
        lines: {
          show: false,
        },
      },
    },

    xaxis: {
      categories: data.map((item) => formatChartDate(item.date)),
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },

    yaxis: {
      labels: {
        formatter(value) {
          return `$${value.toFixed(0)}`;
        },
      },
      min: 0
    },

    tooltip: {
      y: {
        formatter(value) {
          return `$${value.toFixed(2)}`;
        },
      },
    },
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          Gastos
        </h3>

        <p className="text-theme-sm text-gray-500">Evolución de gastos</p>
      </div>

      <Chart
        options={options}
        type="area"
        height={320}
        series={[
          {
            name: "Gastos",
            data: data.map((item) => item.total),
          },
        ]}
      />
    </div>
  );
}
