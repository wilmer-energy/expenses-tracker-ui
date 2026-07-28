import { useMemo } from "react";
import { ApexOptions } from "apexcharts";

import { CategoryTotal } from "../types/dashboard";

interface UseCategoryDonutChartProps {
  data: CategoryTotal[];
}

export function useCategoryDonutChart({ data }: UseCategoryDonutChartProps) {
  return useMemo(() => {
    const series = data.map((item) => item.total);

    const labels = data.map((item) => item.category);

    const options: ApexOptions = {
      chart: {
        type: "donut",
      },
      labels,
      legend: {
        position: "bottom",
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
    };

    return {
      series,
      options,
    };
  }, [data]);
}
