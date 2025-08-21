import React, { useState, useEffect, useRef } from "react";
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
import UserLists from "./components/UserLists";
import useParentFormData from "../../hooks/analyticsCharts/useParentFormData";
import PieChartImprovementSuggestions from "./components/AdditionalCharts/PieChartImprovementSuggestions";
import InfoBoardHistogram from "./components/AdditionalCharts/InfoBoardHistogram";
import StudentGenderBarChart from "./components/AdditionalCharts/StudentGenderBarChart";
import TeacherGenderBarChart from "./components/AdditionalCharts/TeacherGenderBarChart";
import WashFacilitiesBarChart from "./components/AdditionalCharts/WashFacilitiesBarChart";
import BasicFacilitiesDonutChart from "./components/AdditionalCharts/BasicFacilitiesDonutChart";
import SchoolAnalyticsCharts from "./components/SchoolAnalyticsCharts";
import { db } from "../../firebase/firebase-config";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

const AnalyticsPage = () => {
  const { loading, error: firebaseError } = useFirebaseSchools();
  const [schoolData, setSchoolData] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedTaluka, setSelectedTaluka] = useState("");
  const [localError, setLocalError] = useState(null);
  const rolesCount = useUserRoles();
  const { active, inactive } = useUserActivityStatus();
  const formCounts = useFormCounts();
  const parentData = useParentFormData();
  const [selectedUdiseNo, setSelectedUdiseNo] = useState(null);
  const analyticsRef = useRef(null);
  const [generatingPDF, setGeneratingPDF] = useState(false);

  useEffect(() => {
    const fetchSchoolData = async () => {
      try {
        const overallDocRef = doc(db, "OverallSchoolsData", "singleDocument");
        const overallDocSnap = await getDoc(overallDocRef);
        if (!overallDocSnap.exists()) {
          setLocalError("No data found in OverallSchoolsData");
          return;
        }
        const overallData = overallDocSnap.data();

        const schoolFormSnapshot = await getDocs(collection(db, "School_Form"));
        const schoolForms = schoolFormSnapshot.docs.map((doc) => ({
          id: doc.id,
          udiseNumber: doc.data().udiseNumber?.toString(),
          ...doc.data(),
        }));

        const schools = [];
        for (const districtCode in overallData.districts) {
          const district = overallData.districts[districtCode];
          for (const blockCode in district.blocks) {
            const block = district.blocks[blockCode];
            for (const clusterName in block.clusters) {
              const cluster = block.clusters[clusterName];
              for (const udiseNo in cluster.schools) {
                const school = cluster.schools[udiseNo];
                schools.push({
                  districtName: district.districtName,
                  districtCode,
                  blockName: block.blockName,
                  blockCode,
                  clusterName,
                  udiseNo,
                  name: school.schoolName || "-",
                });
              }
            }
          }
        }

        const visitedUdises = new Set(schoolForms.map((s) => s.udiseNumber));
        const processedSchools = schools.map((school) => ({
          ...school,
          visited: visitedUdises.has(school.udiseNo),
        }));

        setSchoolData(processedSchools);
      } catch (e) {
        setLocalError("Failed to fetch school data: " + e.message);
        console.error("Data fetch error:", e);
      }
    };

    fetchSchoolData();
  }, []);

  const handleDownloadPDF = async () => {
    setGeneratingPDF(true);
    
    try {
      // Dynamically import html2pdf only when needed
      const html2pdf = (await import('html2pdf.js')).default;
      
      const element = analyticsRef.current;
      const opt = {
        margin: 0.5,
        filename: 'scheme-watch-analytics.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2, 
          useCORS: true, 
          logging: true,
          backgroundColor: '#FFFFFF',
          onclone: function(clonedDoc) {
            // Hide interactive elements in the cloned document
            const buttons = clonedDoc.querySelectorAll('button');
            buttons.forEach(btn => btn.style.display = 'none');
            
            // Ensure all content is visible
            const allElements = clonedDoc.querySelectorAll('*');
            allElements.forEach(el => {
              el.style.overflow = 'visible';
              el.style.boxShadow = 'none';
            });
            
            // Add print-specific styles - REMOVED page-break-inside: avoid
            const style = clonedDoc.createElement('style');
            style.innerHTML = `
              body {
                font-family: Arial, sans-serif;
                background: white !important;
                color: black !important;
                padding: 20px;
              }
              .pdf-section {
                margin-bottom: 20px;
              }
              canvas {
                max-width: 100% !important;
                height: auto !important;
              }
              @page {
                size: landscape;
                margin: 0.5in;
              }
            `;
            clonedDoc.head.appendChild(style);
          }
        },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' }
      };

      // Generate and download PDF directly
      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error("PDF generation failed:", error);
      // Fallback to print dialog if html2pdf fails
      window.print();
    } finally {
      setGeneratingPDF(false);
    }
  };

  if (loading) return <div className="text-center text-gray-600">Loading Firebase data...</div>;
  if (firebaseError) return <div className="text-center text-red-600">Error loading Firebase data: {firebaseError}</div>;
  if (localError) return <div className="text-center text-red-600">Error loading school data: {localError}</div>;
  if (!schoolData.length) return <div className="text-center text-gray-600">No school data available</div>;

  const allDistricts = [
    ...new Set(schoolData.map((school) => school.districtName).filter(Boolean)),
  ];

  const allTalukas = selectedDistrict
    ? [
        ...new Set(
          schoolData
            .filter((school) => school.districtName === selectedDistrict)
            .map((school) => school.blockName)
            .filter(Boolean)
        ),
      ]
    : [];

  let filteredSchools = schoolData;
  if (selectedDistrict) {
    filteredSchools = filteredSchools.filter(
      (school) => school.districtName === selectedDistrict
    );
  }
  if (selectedTaluka) {
    filteredSchools = filteredSchools.filter(
      (school) => school.blockName === selectedTaluka
    );
  }

  const visitedSchools = filteredSchools.filter((s) => s.visited);
  const nonVisitedSchools = filteredSchools.filter((s) => !s.visited);

  return (
    <div className="p-6 space-y-8 bg-gray-100 min-h-screen font-sans">
     
      <div className="flex justify-end mb-4">
        <button
          onClick={handleDownloadPDF}
          disabled={generatingPDF}
          className={`px-4 py-2 bg-green-600 text-white rounded-lg transition-colors duration-200 ${
            generatingPDF ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'
          }`}
        >
          {generatingPDF ? 'Generating PDF...' : 'Download Analytics as PDF'}
        </button>
      </div>

      <div ref={analyticsRef} className="space-y-8">
        <div>
          <FilterSection
            districts={allDistricts}
            selectedDistrict={selectedDistrict}
            setSelectedDistrict={(district) => {
              setSelectedDistrict(district);
              setSelectedTaluka("");
            }}
            talukas={allTalukas}
            selectedTaluka={selectedTaluka}
            setSelectedTaluka={setSelectedTaluka}
          />
        </div>

        <div>
          <SummaryCards
            total={filteredSchools.length}
            visited={visitedSchools.length}
            nonVisited={nonVisitedSchools.length}
          />
        </div>

        <div>
          <AnalyticsChart
            visitedCount={visitedSchools.length}
            nonVisitedCount={nonVisitedSchools.length}
          />
        </div>

        <div>
          <SchoolLists
            visited={visitedSchools}
            nonVisited={nonVisitedSchools}
            selectedUdiseNo={selectedUdiseNo}
            setSelectedUdiseNo={setSelectedUdiseNo}
          />
        </div>

        {selectedUdiseNo && (
          <div>
            <SchoolAnalyticsCharts udiseNo={selectedUdiseNo} />
          </div>
        )}

        <div className="border-t pt-6 mt-6 space-y-6">
          <h2 className="text-2xl font-bold text-green-600 mb-2">
            Overall Analytics
          </h2>

          <UserRoleChart rolesData={rolesCount} />
          <UserActivityPieChart activeCount={active} inactiveCount={inactive} />
          <UserLists />
          <FormSubmissionChart formCounts={formCounts} />
          <PieChartImprovementSuggestions data={parentData} />
          <InfoBoardHistogram />
          <StudentGenderBarChart />
          <TeacherGenderBarChart />
          <WashFacilitiesBarChart />
          <BasicFacilitiesDonutChart />
        </div>
      </div>

      {/* Add print styles - REMOVED page-break-inside: avoid */}
      <style>
        {`
          @media print {
            @page {
              size: landscape;
              margin: 0.5in;
            }
            
            body {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
              background: white !important;
              color: black !important;
            }
            
            button {
              display: none !important;
            }
            
            canvas {
              max-width: 100% !important;
              height: auto !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default AnalyticsPage;
