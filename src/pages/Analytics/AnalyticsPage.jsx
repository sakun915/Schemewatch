import React, { useState, useEffect } from "react";
import SummaryCards from "./SummaryCards";
import FilterSection from "./FilterSection";
import SchoolLists from "./SchoolLists";
import AnalyticsChart from "./AnalyticsChart";
import useFirebaseSchools from "../../hooks/useFirebaseSchools";
import useUserRoles from "../../hooks/useUserRoles";
import UserRoleChart from "./components/UserRoleChart";
import useUserActivityStatus from "../../hooks/useUserActivityStatus";
import UserActivityPieChart from "./components/UserActivityPieChart";
import useFormCounts from "../../hooks/useFormCounts";
import FormSubmissionChart from "./components/FormSubmissionChart";
//import useFormCounts from "../../hooks/useUserLists";
import UserLists from "./components/UserLists";
import useParentFormData from '../../hooks/analyticsCharts/useParentFormData';
import PieChartImprovementSuggestions from "./components/AdditionalCharts/PieChartImprovementSuggestions";
import InfoBoardHistogram from './components/AdditionalCharts/InfoBoardHistogram';
import StudentGenderBarChart from "./components/AdditionalCharts/StudentGenderBarChart";
import TeacherGenderBarChart from "./components/AdditionalCharts/TeacherGenderBarChart";
import WashFacilitiesBarChart from "./components/AdditionalCharts/WashFacilitiesBarChart";
import BasicFacilitiesDonutChart from "./components/AdditionalCharts/BasicFacilitiesDonutChart";
import FundUsageStackedColumnChart from "./components/AdditionalCharts/FundUsageStackedColumnChart";
import FundTrendLineChart from "./components/AdditionalCharts/FundTrendLineChart";
import SchoolAnalyticsCharts from "./components/SchoolAnalyticsCharts" 
 





const AnalyticsPage = () => {
  const { schools: firebaseData, loading, error: firebaseError } = useFirebaseSchools();
  const [excelData, setExcelData] = useState([]);
  const [filteredTaluka, setFilteredTaluka] = useState("");
  const [localError, setLocalError] = useState(null);
  const rolesCount = useUserRoles();
  const { active, inactive } = useUserActivityStatus();
  const formCounts = useFormCounts();
  const parentData = useParentFormData();
 const [selectedUdiseNo, setSelectedUdiseNo] = useState(null);


  useEffect(() => {
      try {
        const savedData = localStorage.getItem('excelData');
        if (savedData) {
          const parsedData = JSON.parse(savedData);
          if (Array.isArray(parsedData) && parsedData.length > 0) {
            setExcelData(parsedData);
          } else {
            setLocalError("No valid uploaded data found");
          }
        } else {
          setLocalError("No uploaded data found");
        }
      } catch (e) {
        setLocalError("Failed to load saved data");
        console.error("Data load error:", e);
      }
 }, []);


  if (loading) return <div>Loading Firebase data...</div>;
  if (firebaseError) return <div>Error loading Firebase data: {firebaseError}</div>;
  if (localError) return <div>Error loading local data: {localError}</div>;
  if (!excelData.length) return <div>No school data uploaded yet</div>;

  try {
    const allTalukas = [...new Set(
      excelData.map(school => school["Block Name"] || "").filter(Boolean)
    )];

    const filteredExcel = filteredTaluka
      ? excelData.filter(s => s["Block Name"] === filteredTaluka)
      : excelData;

    // Create Set of visited UDISE numbers from Firebase
    const visitedUdises = new Set(
      firebaseData 
        .map(school => school.udiseNumber?.toString())
        .filter(udise => udise)
    );

    // Match with Excel data's "Udise No" field
    const visited = filteredExcel.filter(school => 
      school["Udise No"] && visitedUdises.has(school["Udise No"].toString())
    );
    
    const nonVisited = filteredExcel.filter(school => 
      !visitedUdises.has(school["Udise No"]?.toString())
    );

     
    

    return (
      <div className="p-6 space-y-8">
      {/* Top Summary Cards */}
      <SummaryCards 
        total={filteredExcel.length} 
        visited={visited.length} 
        nonVisited={nonVisited.length} 
      />
    
      {/* Taluka Filter Dropdown */}
      <FilterSection 
        talukas={allTalukas} 
        setFilteredTaluka={setFilteredTaluka} 
      />
    
      {/* Bar Chart: Visited vs Non-Visited */}
      <AnalyticsChart 
        visitedCount={visited.length} 
        nonVisitedCount={nonVisited.length} 
      />

       {/* Visited / Non-Visited Lists */}
      <SchoolLists
        visited={visited}
        nonVisited={nonVisited}
        onSchoolClick={(udiseNo) => setSelectedUdiseNo(udiseNo)}
      />

      {selectedUdiseNo && (
        <SchoolAnalyticsCharts udiseNo={selectedUdiseNo} />
    )}



     <div className="border-t pt-6 mt-6 space-y-6">
            <h2 className="text-2xl font-bold text-green-600 mb-2">Overall Analytics</h2>
              {/* Role-based User Chart */}
              <UserRoleChart rolesData={rolesCount} />
            
            {/* User Activity Pie Chart */}
            <UserActivityPieChart 
              activeCount={active} 
              inactiveCount={inactive} 
            />

            <UserLists />

          
            {/* Form Submission Type Chart */}
            <FormSubmissionChart formCounts={formCounts} />

            <PieChartImprovementSuggestions data={parentData} />

            <InfoBoardHistogram />

            <StudentGenderBarChart />

            <TeacherGenderBarChart />

            <WashFacilitiesBarChart />

            <BasicFacilitiesDonutChart />

            {/* <FundUsageStackedColumnChart /> 

            <FundTrendLineChart /> */}
    </div>


    
      

    </div>
    
    );
  } catch (error) {
    console.error("Render error:", error);
    return <div>Error displaying data. Please check console.</div>;
  }
};

export default AnalyticsPage;