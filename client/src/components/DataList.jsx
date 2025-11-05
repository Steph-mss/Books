import React from 'react';

function DataList({ data }) {
  if (!data || data.length === 0) {
    return <p>No data to display.</p>;
  }

  return (
    <div>
      <h2>Data List</h2>
      <ul className="list">
        {data.map((item, index) => (
          <li key={item.id || index} className="list-item">
            <pre>{JSON.stringify(item, null, 2)}</pre>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DataList;
