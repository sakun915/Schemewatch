import React from 'react';

const DataTable = ({ data, setData }) => {
  const tableHeaders = [
    { key: 'Sr.No', label: 'Sr.No', width: 'w-16' },
    { key: 'District Name', label: 'District', width: 'w-32' },
    { key: 'Block Name', label: 'Block', width: 'w-32' },
    { key: 'Cluster Name', label: 'Cluster', width: 'w-32' },
    { key: 'School Name', label: 'School Name', width: 'min-w-[200px] max-w-[280px]' },
    { key: 'Udise No', label: 'UDISE', width: 'w-28' },
    { key: 'Head Master Name', label: 'Head Master', width: 'w-40' },
    { key: 'Mobile No', label: 'Mobile', width: 'w-32' },
  ];

  const handleEdit = (index, field, value) => {
    const updated = [...data];
    updated[index][field] = value;
    setData(updated);
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
      <table className="w-full table-fixed text-sm">
        <thead className="bg-gray-50">
          <tr>
            {tableHeaders.map((header) => (
              <th 
                key={header.key}
                className={`px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${header.width}`}
              >
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {data.length === 0 ? (
            <tr>
              <td colSpan={tableHeaders.length} className="px-4 py-6 text-center text-sm text-gray-500">
                No data uploaded yet
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                {tableHeaders.map((header) => {
                  const value = row[header.key] || '-';
                  const isEditable = header.key === 'Head Master Name' || header.key === 'Mobile No';
                  
                  return (
                    <td 
                      key={`${index}-${header.key}`} 
                      className={`px-4 py-3 text-sm ${header.width} ${
                        header.key === 'School Name' ? 'truncate' : ''
                      }`}
                      title={header.key === 'School Name' ? row[header.key] : undefined}
                    >
                      {isEditable ? (
                        <input
                          className="w-full border rounded px-2 py-1 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                          value={value === '-' ? '' : value}
                          onChange={(e) => handleEdit(index, header.key, e.target.value)}
                        />
                      ) : (
                        <span className="inline-block truncate">{value}</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;