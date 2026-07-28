export function formatChartDate(date: string): string {
  const parsedDate = new Date(date);

  return parsedDate.toLocaleDateString("es-CO", {
    month: "short",
    day: "numeric",
  });
}