import { useState, useMemo } from "react";
import "../styles/results-table.css";

export default function ResultsTable({ results, isLoading }) {
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filters, setFilters] = useState({});

  // Applying sorting
  const sortedRows = useMemo(() => {
    if (!sortConfig.key || !results.rows.length) return results.rows;

    return [...results.rows].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  }, [results.rows, sortConfig]);

  // Applying filtering
  const filteredRows = useMemo(() => {
    return sortedRows.filter((row) => {
      return Object.keys(filters).every((column) => {
        if (!filters[column]) return true;
        const value = String(row[column]).toLowerCase();
        return value.includes(filters[column].toLowerCase());
      });
    });
  }, [sortedRows, filters]);

  // Applying pagination
  const paginatedRows = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return filteredRows.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredRows, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const handleFilterChange = (column, value) => {
    setFilters((prev) => ({
      ...prev,
      [column]: value,
    }));
    setCurrentPage(1); // Reseting to first page when filtering
  };

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reseting to first page when changing rows per page
  };

  if (isLoading) {
    return (
      <div className="results-loading">
        <div className="loading-spinner"></div>
        <div>Executing query...</div>
      </div>
    );
  }

  return (
    <div className="results-container">
      <div className="results-header">
        <h3>Query Results</h3>
        <div className="results-meta">
          {filteredRows.length} rows{" "}
          {filteredRows.length !== results.rows.length &&
            `(filtered from ${results.rows.length})`}
        </div>
        <div className="pagination-controls">
          <select
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            className="rows-per-page"
          >
            <option value={10}>10 rows</option>
            <option value={25}>25 rows</option>
            <option value={50}>50 rows</option>
            <option value={100}>100 rows</option>
          </select>
        </div>
      </div>

      {results.columns.length > 0 ? (
        <div className="table-wrapper">
          <table className="results-table">
            <thead>
              <tr>
                {results.columns.map((column, index) => (
                  <th key={index} onClick={() => requestSort(column)}>
                    <div className="th-content">
                      {column}
                      {sortConfig.key === column && (
                        <span className="sort-indicator">
                          {sortConfig.direction === "ascending" ? " ↑" : " ↓"}
                        </span>
                      )}
                    </div>
                    <div className="filter-container">
                      <input
                        type="text"
                        placeholder="Filter..."
                        value={filters[column] || ""}
                        onChange={(e) =>
                          handleFilterChange(column, e.target.value)
                        }
                        onClick={(e) => e.stopPropagation()}
                        className="filter-input"
                      />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedRows.length > 0 ? (
                paginatedRows.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={rowIndex % 2 === 0 ? "row-even" : "row-odd"}
                  >
                    {results.columns.map((column, colIndex) => (
                      <td key={colIndex}>{row[column]}</td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={results.columns.length} className="no-results">
                    No results match your filters
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="no-results">No results to display</div>
      )}

      {filteredRows.length > 0 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className="pagination-button"
          >
            First
          </button>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="pagination-button"
          >
            Previous
          </button>
          <span className="page-info">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="pagination-button"
          >
            Next
          </button>
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className="pagination-button"
          >
            Last
          </button>
        </div>
      )}
    </div>
  );
}
