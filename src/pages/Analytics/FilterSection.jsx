import React from "react";

const FilterSection = ({ talukas, setFilteredTaluka }) => {
  return (
    <div className="mb-6">
      <label className="mr-2 font-medium">Filter by Taluka:</label>
      <select
        onChange={(e) => setFilteredTaluka(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">All</option>
        {talukas.map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>
    </div>
  );
};

export default FilterSection;
