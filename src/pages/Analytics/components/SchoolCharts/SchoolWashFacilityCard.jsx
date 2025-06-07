import React from "react";

const SchoolWashFacilityCard = ({ school }) => {
  if (!school) return null;

  const hasSoap = school.hasHandwashSoap === 1 || school.hasHandwashSoap === "1";

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 mb-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        Handwash Facility
      </h3>
      <p className="text-md">
        <span className="font-medium">Soap Available:</span>{" "}
        {hasSoap ? (
          <span className="text-green-600 font-semibold">Yes ✅</span>
        ) : (
          <span className="text-red-600 font-semibold">No ❌</span>
        )}
      </p>
    </div>
  );
};

export default SchoolWashFacilityCard;
