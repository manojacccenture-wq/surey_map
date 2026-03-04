export const downloadAsCSV = (data, filename = 'data.csv', columns = []) => {
  if (!data.length) return;

  const headers = columns.map(col => col.label);
  const rows = data.map(row =>
    columns.map(col => {
      const value = row[col.key] || '';
      return typeof value === 'string' && value.includes(',')
        ? `"${value}"`
        : value;
    }).join(',')
  );

  const csv = [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
};

export const downloadAsJSON = (data, filename = 'data.json') => {
  if (!data.length) return;

  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
};

export const filterByRole = (data, role) => {
  if (!role || role === 'all') return data;
  return data.filter(item => item.role?.toLowerCase() === role.toLowerCase());
};

export const searchInData = (data, searchTerm, searchableFields = []) => {
  if (!searchTerm.trim()) return data;

  const term = searchTerm.toLowerCase();
  return data.filter(item =>
    searchableFields.some(field =>
      String(item[field] || '').toLowerCase().includes(term)
    )
  );
};

export const sortData = (data, sortKey, sortOrder = 'asc') => {
  if (!sortKey) return data;

  return [...data].sort((a, b) => {
    const aVal = a[sortKey];
    const bVal = b[sortKey];

    if (typeof aVal === 'string') {
      return sortOrder === 'asc'
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }

    return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
  });
};
