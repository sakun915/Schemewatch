import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const SchoolBasicFacilitiesDonutChart = ({ school }) => {
  if (!school || !school.basicFacilities) return null;

  const facilities = school.basicFacilities;
  
  // Process facility data with better labeling
  const facilityDetails = Object.entries(facilities).map(([key, value]) => ({
    name: key.replace("has", "").replace(/([A-Z])/g, " $1").trim(),
    available: value === 1 || value === "1" || value === true,
    key
  }));

  const availableCount = facilityDetails.filter(f => f.available).length;
  const notAvailableCount = facilityDetails.length - availableCount;
  const percentageAvailable = Math.round((availableCount / facilityDetails.length) * 100);

  const data = {
    labels: ["Available", "Not Available"],
    datasets: [
      {
        data: [availableCount, notAvailableCount],
        backgroundColor: ["#10b981", "#ef4444"],
        hoverBackgroundColor: ["#34d399", "#f87171"],
        borderColor: "#ffffff",
        borderWidth: 3,
        hoverOffset: 15,
        spacing: 5,
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%",
    plugins: {
      legend: {
        position: "right",
        align: "center",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          padding: 16,
          font: {
            size: 13,
            family: "'Inter', sans-serif",
            weight: "500",
          },
          color: "#4b5563",
        },
        onHover: (e) => (e.native.target.style.cursor = "pointer"),
        onLeave: (e) => (e.native.target.style.cursor = "default"),
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.raw;
            const percentage = Math.round((value / facilityDetails.length) * 100);
            return `${context.label}: ${value} facility${value !== 1 ? 's' : ''} (${percentage}%)`;
          },
        },
        displayColors: true,
        usePointStyle: true,
        padding: 12,
        backgroundColor: "rgba(15, 23, 42, 0.95)",
        titleFont: {
          size: 14,
          weight: "bold",
          family: "'Inter', sans-serif",
        },
        bodyFont: {
          size: 13,
          family: "'Inter', sans-serif",
        },
        footerFont: {
          size: 12,
          style: "italic"
        },
        cornerRadius: 8,
        boxPadding: 6,
      },
      title: {
        display: true,
        text: "Basic Facilities Availability",
        font: {
          size: 18,
          weight: "600",
          family: "'Inter', sans-serif",
        },
        padding: {
          top: 0,
          bottom: 15,
        },
        color: "#1f2937",
      },
    },
    animation: {
      animateScale: true,
      animateRotate: true,
      duration: 1000,
    },
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
      <div className="p-6">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 h-80">
            <Doughnut data={data} options={options} />
          </div>
          
          <div className="w-full md:w-1/2 mt-6 md:mt-0 md:pl-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Facility Breakdown
            </h3>
            
            <div className="space-y-3">
              <div className="bg-emerald-50 p-3 rounded-lg border-l-4 border-emerald-500">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">Available Facilities</span>
                  <span className="font-bold text-emerald-600">
                    {availableCount} ({percentageAvailable}%)
                  </span>
                </div>
              </div>
              
              <div className="bg-red-50 p-3 rounded-lg border-l-4 border-red-500">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">Missing Facilities</span>
                  <span className="font-bold text-red-600">
                    {notAvailableCount} ({100 - percentageAvailable}%)
                  </span>
                </div>
              </div>
              
              <div className="border-t border-gray-100 pt-3 mt-3">
                <h4 className="text-sm font-medium text-gray-500 mb-2">
                  Available Facilities:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {facilityDetails
                    .filter(f => f.available)
                    .map(f => (
                      <span 
                        key={f.key}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800"
                      >
                        {f.name}
                      </span>
                    ))}
                </div>
              </div>
              
              <div className="border-t border-gray-100 pt-3">
                <h4 className="text-sm font-medium text-gray-500 mb-2">
                  Missing Facilities:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {facilityDetails
                    .filter(f => !f.available)
                    .map(f => (
                      <span 
                        key={f.key}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"
                      >
                        {f.name}
                      </span>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
        <p className="text-sm text-gray-600">
          <span className="font-medium">Note:</span> Data reflects the current status of basic facilities at {school.schoolName || "this school"}.
          {percentageAvailable < 50 && (
            <span className="text-red-500 font-medium"> This school has less than half of the basic facilities available.</span>
          )}
        </p>
      </div>
    </div>
  );
};

export default SchoolBasicFacilitiesDonutChart;