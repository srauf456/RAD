export function exportToCSV<T extends Record<string, any>>(
    data: T[],
    filename: string = "export.csv") {
  if (!data || !data.length) return;

  const headers = Object.keys(data[0]);

  const csvRows = [
    headers.join(","), // header row
    ...data.map(row =>
      headers.map(field => `"${row[field] ?? ""}"`).join(",")
    ),
  ];

  const csvContent = csvRows.join("\n");

  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();

  URL.revokeObjectURL(url);
}