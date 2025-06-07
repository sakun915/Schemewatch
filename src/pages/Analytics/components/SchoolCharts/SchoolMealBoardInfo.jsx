import React from "react";

const SchoolMealBoardInfo = ({ school }) => {
  if (!school) return null;

  const hasBoard = school.hasMiddayMealBoard === 1 || school.hasMiddayMealBoard === "1";

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 mb-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        Mid-Day Meal Info Board
      </h3>
      <p className="text-md">
        <span className="font-medium">Status:</span>{" "}
        {hasBoard ? (
          <span className="text-green-600 font-semibold">Available ✅</span>
        ) : (
          <span className="text-red-600 font-semibold">Not Available ❌</span>
        )}
      </p>
    </div>
  );
};

export default SchoolMealBoardInfo;
