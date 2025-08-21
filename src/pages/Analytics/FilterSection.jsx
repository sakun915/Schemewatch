import React from "react";

const FilterSection = ({
  districts,
  selectedDistrict,
  setSelectedDistrict,
  talukas,
  selectedTaluka,
  setSelectedTaluka,
}) => {
  return (
    <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
      {/* District Filter */}
      <div className="flex flex-col">
        <label className="mb-2 text-sm font-bold text-gray-700">
          Filter by District
        </label>
        <select
          value={selectedDistrict}
          onChange={(e) => setSelectedDistrict(e.target.value)}
          className="border border-gray-300 p-2 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="">All Districts</option>
          {districts.map((district) => (
            <option key={district} value={district}>
              {district}
            </option>
          ))}
        </select>
      </div>

      {/* Block/Taluka Filter */}
      <div className="flex flex-col">
        <label className="mb-2 text-sm font-bold text-gray-700">
          Filter by Taluka
        </label>
        <select
          value={selectedTaluka}
          onChange={(e) => setSelectedTaluka(e.target.value)}
          className="border border-gray-300 p-2 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-100"
          disabled={!selectedDistrict}
        >
          <option value="">All Talukas</option>
          {talukas.map((taluka) => (
            <option key={taluka} value={taluka}>
              {taluka}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterSection;
