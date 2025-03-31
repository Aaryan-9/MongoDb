import "../styles/saved-queries.css";

export default function SavedQueries({ queries, onSelectQuery }) {
  if (queries.length === 0) {
    return (
      <div className="saved-queries-container">
        <h3>
          <span className="section-icon">📌</span> Saved Queries
        </h3>
        <div className="empty-saved">No saved queries yet</div>
      </div>
    );
  }

  return (
    <div className="saved-queries-container">
      <h3>
        <span className="section-icon">📌</span> Saved Queries
      </h3>
      <div className="saved-list">
        {queries.map((item) => (
          <div
            key={item.id}
            className="saved-item"
            onClick={() => onSelectQuery(item.query)}
          >
            <div className="saved-name">{item.name}</div>
            <div className="saved-query">{truncateQuery(item.query)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function truncateQuery(query) {
  return query.length > 30 ? query.substring(0, 30) + "..." : query;
}
