import React, { useState, useEffect } from "react";

const SchoolLists = ({ visited, nonVisited, onSchoolClick }) => {
  const [showAllVisited, setShowAllVisited] = useState(false);
  const [showAllNonVisited, setShowAllNonVisited] = useState(false);
  const [selectedUdise, setSelectedUdise] = useState(null);

  const displayedVisited = showAllVisited ? visited : visited.slice(0, 10);
  const displayedNonVisited = showAllNonVisited ? nonVisited : nonVisited.slice(0, 10);

  // ✅ Check if the selected school still exists
  useEffect(() => {
    const stillExists = visited.some(school => school["Udise No"] === selectedUdise);
    if (!stillExists && selectedUdise) {
      setSelectedUdise(null);
      onSchoolClick(null); // Clear parent data
    }
  }, [visited, selectedUdise, onSchoolClick]);

  const handleSchoolClick = (udise) => {
    // ✅ Deselect if clicked again
    if (selectedUdise === udise) {
      setSelectedUdise(null);
      onSchoolClick(null);
    } else {
      // ✅ Only allow selecting from visited list
      const exists = visited.some(school => school["Udise No"] === udise);
      if (exists) {
        setSelectedUdise(udise);
        onSchoolClick(udise);
      } else {
        // Optional safety: deselect if non-visited clicked (not required in current UI)
        setSelectedUdise(null);
        onSchoolClick(null);
      }
    }
  };

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">School Lists</h2>
        <p className="text-sm text-gray-600 mb-4">
          📌 <strong>Tip:</strong> Click on any <span className="text-green-700 font-semibold">visited school</span> row to view its detailed analytics below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Visited Schools */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-green-50">
            <h3 className="text-lg font-semibold text-green-700">
              ✅ Visited Schools ({visited.length})
            </h3>
            {visited.length > 10 && (
              <button
                onClick={() => setShowAllVisited(!showAllVisited)}
                className="text-sm text-blue-600 hover:underline"
              >
                {showAllVisited ? "Show Less" : "Show More"}
              </button>
            )}
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    School Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    UDISE Code
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {displayedVisited.map((school, index) => {
                  const udise = school["Udise No"];
                  const isSelected = udise === selectedUdise;
                  return (
                    <tr
                      key={index}
                      onClick={() => handleSchoolClick(udise)}
                      className={`cursor-pointer transition-colors ${
                        isSelected ? "bg-blue-100 hover:bg-blue-200" : "hover:bg-blue-50"
                      }`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                        {school["School Name"] || "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {udise || "-"}
                      </td>
                    </tr>
                  );
                })}
                {visited.length === 0 && (
                  <tr>
                    <td colSpan="2" className="px-6 py-4 text-center text-sm text-gray-500">
                      No visited schools found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Non-Visited Schools */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-red-50">
            <h3 className="text-lg font-semibold text-red-700">
              ❌ Non-Visited Schools ({nonVisited.length})
            </h3>
            {nonVisited.length > 10 && (
              <button
                onClick={() => setShowAllNonVisited(!showAllNonVisited)}
                className="text-sm text-blue-600 hover:underline"
              >
                {showAllNonVisited ? "Show Less" : "Show More"}
              </button>
            )}
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    School Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    UDISE Code
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {displayedNonVisited.map((school, index) => (
                  <tr key={index} className="hover:bg-red-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                      {school["School Name"] || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {school["Udise No"] || "-"}
                    </td>
                  </tr>
                ))}
                {nonVisited.length === 0 && (
                  <tr>
                    <td colSpan="2" className="px-6 py-4 text-center text-sm text-gray-500">
                      No non-visited schools found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolLists;
