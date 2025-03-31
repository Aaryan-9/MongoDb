import "../styles/query-history.css";

export default function QueryHistory({ history, onSelectQuery }) {
  if (history.length === 0) {
    return (
      <div className="history-container">
        <h3>
          <span className="section-icon">⏱️</span> Query History
        </h3>
        <div className="empty-history">No queries executed yet</div>
      </div>
    );
  }

  return (
    <div className="history-container">
      <h3>
        <span className="section-icon">⏱️</span> Query History
      </h3>
      <div className="history-list">
        {history.map((item) => (
          <div
            key={item.id}
            className="history-item"
            onClick={() => onSelectQuery(item.query)}
          >
            <div className="history-query">{truncateQuery(item.query)}</div>
            <div className="history-timestamp">{item.timestamp}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function truncateQuery(query) {
  return query.length > 30 ? query.substring(0, 30) + "..." : query;
}
