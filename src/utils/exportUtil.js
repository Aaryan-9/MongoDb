export function exportData(results, format) {
  if (
    !results ||
    !results.columns ||
    !results.rows ||
    results.rows.length === 0
  ) {
    alert("No data to export");
    return;
  }

  let content;
  let filename;
  let mimeType;

  switch (format) {
    case "csv":
      content = convertToCSV(results);
      filename = "query_results.csv";
      mimeType = "text/csv";
      break;
    case "json":
      content = JSON.stringify(results.rows, null, 2);
      filename = "query_results.json";
      mimeType = "application/json";
      break;
    case "excel":
      // For Excel, we'll use CSV format but with an .xlsx extension
      // In a real app, we would have used a library like xlsx to create actual Excel files, but we'll skip it for now to keep things optimized.
      content = convertToCSV(results);
      filename = "query_results.xlsx";
      mimeType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      break;
    default:
      content = convertToCSV(results);
      filename = "query_results.csv";
      mimeType = "text/csv";
  }

  // Create a blob and download the file
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function convertToCSV(results) {
  const { columns, rows } = results;

  // Create header row
  let csv = columns.join(",") + "\n";

  // Add data rows
  rows.forEach((row) => {
    const values = columns.map((column) => {
      const value = row[column];
      if (
        typeof value === "string" &&
        (value.includes(",") || value.includes('"') || value.includes("\n"))
      ) {
        return `"${value.replace(/"/g, '""')}"`;
      }
      return value;
    });
    csv += values.join(",") + "\n";
  });

  return csv;
}
