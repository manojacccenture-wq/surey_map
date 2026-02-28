import React from "react";

const Table = ({
  columns = [],
  data = [],
  loading = false,
  actions = null, // function(row, rowIndex)
  onRowClick,
  emptyMessage = "No data available",
  className = "",
}) => {
  if (!columns.length) return null;

  return (
    <div
      className={`w-full bg-white border border-[var(--color-neutral-20)] rounded-2xl overflow-hidden ${className}`}
    >
      <table className="w-full border-collapse">
        {/* ================= HEADER ================= */}
        <thead>
          <tr className="border-b-2 border-[var(--color-neutral-20)]">
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-5 py-6 text-left font-semibold text-base text-[var(--color-text-title)] border-r border-[var(--color-neutral-20)] last:border-r-0"
              >
                {column.label}
              </th>
            ))}

            {actions && (
              <th className="px-5 py-6 text-left font-semibold text-base text-[var(--color-text-title)]">
                Action
              </th>
            )}
          </tr>
        </thead>

        {/* ================= BODY ================= */}
        <tbody>
          {loading ? (
            <tr>
              <td
                colSpan={columns.length + (actions ? 1 : 0)}
                className="px-5 py-10 text-center text-[var(--color-neutral-40)]"
              >
                Loading...
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (actions ? 1 : 0)}
                className="px-5 py-10 text-center text-[var(--color-neutral-40)]"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={row.id || rowIndex}
                onClick={() => onRowClick && onRowClick(row, rowIndex)}
                className={`border-b border-[var(--color-neutral-20)] 
                  hover:bg-[var(--color-neutral-10)] 
                  transition-colors duration-150 
                  last:border-b-0 
                  ${onRowClick ? "cursor-pointer" : ""}`}
              >
                {columns.map((column) => (
                  <td
                    key={`${rowIndex}-${column.key}`}
                    className="px-5 py-6 text-base text-[var(--color-text-paragraph)] border-r border-[var(--color-neutral-20)] last:border-r-0"
                  >
                    {column.render
                      ? column.render(row[column.key], row, rowIndex)
                      : row[column.key]}
                  </td>
                ))}

                {actions && (
                  <td className="px-5 py-6">
                    {actions(row, rowIndex)}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
