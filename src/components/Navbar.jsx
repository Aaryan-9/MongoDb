import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import "../styles/navbar.css";

export default function Navbar({ onExport, exportFormat, setExportFormat }) {
  const [showExportOptions, setShowExportOptions] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <div className="logo">
          <span className="logo-icon">📊</span>
        </div>
        <h1>SQL Query Editor</h1>
      </div>

      <div className="navbar-actions">
        <div className="export-dropdown">
          <button
            className="export-button"
            onClick={() => setShowExportOptions(!showExportOptions)}
          >
            <span className="button-icon">📤</span>
            Export
          </button>

          {showExportOptions && (
            <div className="export-options">
              <div className="export-format">
                <label>
                  <input
                    type="radio"
                    name="format"
                    value="csv"
                    checked={exportFormat === "csv"}
                    onChange={() => setExportFormat("csv")}
                  />
                  <span className="format-icon">📄</span> CSV
                </label>
                <label>
                  <input
                    type="radio"
                    name="format"
                    value="json"
                    checked={exportFormat === "json"}
                    onChange={() => setExportFormat("json")}
                  />
                  <span className="format-icon">🔄</span> JSON
                </label>
                <label>
                  <input
                    type="radio"
                    name="format"
                    value="excel"
                    checked={exportFormat === "excel"}
                    onChange={() => setExportFormat("excel")}
                  />
                  <span className="format-icon">📊</span> Excel
                </label>
              </div>
              <button
                className="export-confirm"
                onClick={() => {
                  onExport();
                  setShowExportOptions(false);
                }}
              >
                Export as {exportFormat.toUpperCase()}
              </button>
            </div>
          )}
        </div>

        <button
          className="theme-toggle"
          onClick={toggleTheme}
          title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </div>
    </nav>
  );
}
