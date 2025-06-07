import React from 'react';

const SummaryCards = ({ total, visited, nonVisited }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Total Schools Card */}
      <div className="bg-white shadow-lg shadow-blue-200 p-6 rounded-2xl text-center transition-transform hover:scale-105">
        <h3 className="text-xl font-bold text-gray-800">Total Schools</h3>
        <p className="text-3xl text-blue-600 font-semibold mt-2">{total}</p>
      </div>

      {/* Visited Schools Card */}
      <div className="bg-white shadow-lg shadow-green-200 p-6 rounded-2xl text-center transition-transform hover:scale-105">
        <h3 className="text-xl font-bold text-gray-800">Visited Schools</h3>
        <p className="text-3xl text-green-600 font-semibold mt-2">{visited}</p>
        {total > 0 && (
          <p className="text-sm text-gray-500 mt-1">
            ({((visited / total) * 100).toFixed(1)}% Coverage)
          </p>
        )}
      </div>

      {/* Non-Visited Schools Card */}
      <div className="bg-white shadow-lg shadow-red-200 p-6 rounded-2xl text-center transition-transform hover:scale-105">
        <h3 className="text-xl font-bold text-gray-800">Non-Visited Schools</h3>
        <p className="text-3xl text-red-600 font-semibold mt-2">{nonVisited}</p>
        {total > 0 && (
          <p className="text-sm text-gray-500 mt-1">
           ({((nonVisited / total) * 100).toFixed(1)}% Remaining)
          </p>
        )}
      </div>
    </div>
  );
};

export default SummaryCards;
