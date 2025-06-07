// src/pages/Analytics/components/SchoolAnalyticsCharts.jsx
import React from "react";
import useSchoolFormDataByUdise from "../../../hooks/analyticsCharts/useSchoolFormDataByUdise";
import SchoolMealBoardInfo from "./SchoolCharts/SchoolMealBoardInfo";
import SchoolStudentGenderChart from "./SchoolCharts/SchoolStudentGenderChart";
import SchoolTeacherGenderChart from "./SchoolCharts/SchoolTeacherGenderChart";
import SchoolWashFacilityCard from "./SchoolCharts/SchoolWashFacilityCard";
import SchoolBasicFacilitiesDonutChart from "./SchoolCharts/SchoolBasicFacilitiesDonutChart";
import SchoolGrantStackedChart from "./SchoolCharts/SchoolGrantStackedChart";
import SchoolGrantLineChart from "./SchoolCharts/SchoolGrantLineChart";


const SchoolAnalyticsCharts = ({ udiseNo }) => {
  const { schoolData, loading } = useSchoolFormDataByUdise(udiseNo);

  if (!udiseNo) return null; 
  if (loading) return <div className="text-gray-600">Loading school data...</div>;
  if (!schoolData) return <div className="text-red-600">No school data found for UDISE {udiseNo}</div>;

  return (
    <div className="mt-8 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">School-wise Analytics</h2>

      <SchoolMealBoardInfo school={schoolData} />
      <SchoolWashFacilityCard school={schoolData} />
      <SchoolStudentGenderChart school={schoolData} />
      <SchoolTeacherGenderChart school={schoolData} />
      <SchoolBasicFacilitiesDonutChart school={schoolData} />
       <SchoolGrantStackedChart udiseNo={udiseNo} />
      <SchoolGrantLineChart udiseNo={udiseNo} />
      
    </div>
  );
};

export default SchoolAnalyticsCharts;
