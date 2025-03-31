import { useState, useEffect } from "react";
import Editor from "./components/Editor";
import ResultsTable from "./components/ResultsTable";
import QueryHistory from "./components/QueryHistory";
import Navbar from "./components/Navbar";
import SavedQueries from "./components/SavedQueries";
import { predefinedQueries } from "./data/predefinedQueries";
import { executeQuery } from "./utils/queryExecutor";
import { exportData } from "./utils/exportUtil";
import { ThemeProvider } from "./context/ThemeContext";
import "./styles/globals.css";

export default function SQLQueryApp() {
  const [currentQuery, setCurrentQuery] = useState("");
  const [results, setResults] = useState({ columns: [], rows: [] });
  const [queryHistory, setQueryHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPredefinedQuery, setSelectedPredefinedQuery] = useState(0);
  const [savedQueries, setSavedQueries] = useState([]);
  const [exportFormat, setExportFormat] = useState("csv");
  const [isMobile, setIsMobile] = useState(false);

  // Checking if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const handleQueryChange = (newQuery) => {
    setCurrentQuery(newQuery);
  };

  const handleQueryExecution = () => {
    if (!currentQuery.trim()) return;

    setIsLoading(true);

    const historyItem = {
      id: Date.now(),
      query: currentQuery,
      timestamp: new Date().toLocaleString(),
    };
    setQueryHistory([historyItem, ...queryHistory]);

    setTimeout(() => {
      const result = executeQuery(currentQuery);
      setResults(result);
      setIsLoading(false);

      if (isMobile) {
        setTimeout(() => {
          document
            .querySelector(".results-container")
            ?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }, 500);
  };

  const handlePredefinedQuerySelect = (index) => {
    setSelectedPredefinedQuery(index);
    setCurrentQuery(predefinedQueries[index].query);
  };

  const handleSaveQuery = () => {
    if (!currentQuery.trim()) return;
    const queryName = prompt("Enter a name for this query:");
    if (queryName) {
      const newSavedQuery = {
        id: Date.now(),
        name: queryName,
        query: currentQuery,
      };
      setSavedQueries([...savedQueries, newSavedQuery]);
    }
  };

  const handleLoadQuery = (query) => {
    setCurrentQuery(query);
  };

  const handleExport = () => {
    exportData(results, exportFormat);
  };

  return (
    <ThemeProvider>
      <div className="sql-app">
        <Navbar
          onExport={handleExport}
          exportFormat={exportFormat}
          setExportFormat={setExportFormat}
        />

        <div className="main-content">
          <div className="sidebar">
            <QueryHistory
              history={queryHistory}
              onSelectQuery={handleLoadQuery}
            />
            <SavedQueries
              queries={savedQueries}
              onSelectQuery={handleLoadQuery}
            />
          </div>

          <div className="editor-results">
            <Editor
              value={currentQuery}
              onChange={handleQueryChange}
              onExecute={handleQueryExecution}
              onSave={handleSaveQuery}
              isLoading={isLoading}
              predefinedQueries={predefinedQueries}
              onSelectPredefinedQuery={handlePredefinedQuerySelect}
              disabled={!currentQuery.trim()}
            />

            <ResultsTable results={results} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
