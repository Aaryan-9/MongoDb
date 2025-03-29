import { useRef, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  tomorrow,
  prism,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { useTheme } from "../context/ThemeContext";
import "../styles/editor.css";

export default function Editor({
  value,
  onChange,
  onExecute,
  onSave,
  isLoading,
  predefinedQueries,
  onSelectPredefinedQuery,
}) {
  const editorRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    // Focusing editor on mount
    if (editorRef.current) {
      editorRef.current.focus();
    }
  }, []);

  const handleKeyDown = (e) => {
    // Handling tab key for indentation
    if (e.key === "Tab") {
      e.preventDefault();
      const newValue = value + "  ";
      onChange(newValue);
    }

    // Executing query with Ctrl+Enter
    if (e.ctrlKey && e.key === "Enter") {
      e.preventDefault();
      onExecute();
    }
  };

  const handleInput = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="editor-container">
      <div className="editor-header">
        <h3>SQL Query Editor</h3>
        <div className="predefined-queries">
          <label htmlFor="predefined-queries">Predefined Queries:</label>
          <select
            id="predefined-queries"
            onChange={(e) => onSelectPredefinedQuery(Number(e.target.value))}
            className="query-select"
          >
            <option value="">-- Select a query --</option>
            {predefinedQueries.map((query, index) => (
              <option key={index} value={index}>
                {query.name}
              </option>
            ))}
          </select>
        </div>
        <div className="editor-actions">
          <button className="save-button" onClick={onSave} title="Save Query">
            <span className="button-icon">💾</span>
            Save
          </button>
          <button
            className="execute-button"
            onClick={onExecute}
            disabled={isLoading}
            title="Execute Query (Ctrl+Enter)"
          >
            <span className="button-icon">▶️</span>
            {isLoading ? "Running..." : "Run Query"}
          </button>
        </div>
      </div>

      <div className="editor-wrapper">
        <textarea
          ref={editorRef}
          className="editor-textarea"
          value={value}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          placeholder="Enter your SQL query here..."
        />

        <SyntaxHighlighter
          language="sql"
          style={theme === "dark" ? tomorrow : prism}
          className="syntax-highlighter"
          customStyle={{
            margin: 0,
            padding: "1rem",
            background: "transparent",
            fontSize: "0.875rem",
            lineHeight: 1.5,
          }}
        >
          {value}
        </SyntaxHighlighter>
      </div>

      <div className="editor-footer">
        <div className="editor-tooltip">
          <span className="tooltip-icon">💡</span> Pro tip: Use Ctrl+Enter to
          execute query quickly
        </div>
      </div>
    </div>
  );
}
