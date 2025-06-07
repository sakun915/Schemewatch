import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const FormSubmissionChart = ({ formCounts }) => {
  const totalForms = Object.values(formCounts).reduce((sum, count) => sum + count, 0);

  const data = {
    labels: ["Observation Form", "Parent Form", "School Form"],
    datasets: [
      {
        data: [
          formCounts.Observation_Form,
          formCounts.Parent_Form,
          formCounts.School_Form,
        ],
        backgroundColor: [
          "rgba(59, 130, 246, 0.9)",  // Blue
          "rgba(245, 158, 11, 0.9)",   // Amber
          "rgba(16, 185, 129, 0.9)"    // Emerald
        ],
        borderColor: "rgba(255, 255, 255, 0.8)",
        borderWidth: 3,
        hoverBackgroundColor: [
          "rgba(59, 130, 246, 1)",
          "rgba(245, 158, 11, 1)",
          "rgba(16, 185, 129, 1)"
        ],
        hoverBorderColor: "#fff",
        hoverOffset: 15,
        spacing: 2,
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
          font: {
            size: 13,
            family: "'Inter', sans-serif",
            weight: 500
          },
          padding: 20,
          usePointStyle: true,
          pointStyle: "circle",
          color: "#4b5563"
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.85)",
        titleFont: {
          size: 14,
          weight: "bold"
        },
        bodyFont: {
          size: 13
        },
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.raw || 0;
            const percentage = Math.round((value / totalForms) * 100);
            return ` ${label}: ${value} (${percentage}%)`;
          }
        }
      },
    },
    animation: {
      animateScale: true,
      animateRotate: true
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 w-full h-full mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <div className="mb-4 md:mb-0">
          <h2 className="text-xl font-semibold text-gray-800">
            Form Submission Statistics
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Distribution of submitted forms across categories
          </p>
        </div>
        <div className="bg-blue-50 px-4 py-2 rounded-lg">
          <p className="text-sm text-blue-800 font-medium">
            Total Submissions: <span className="text-blue-600">{totalForms}</span>
          </p>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row items-center">
        <div className="h-64 w-full md:w-1/2">
          <Doughnut 
            data={data} 
            options={options}
            aria-label="Form submission distribution chart"
          />
        </div>
        
        <div className="w-full md:w-1/2 mt-6 md:mt-0 md:pl-6">
          <div className="space-y-4">
            {data.labels.map((label, index) => {
              const count = data.datasets[0].data[index];
              const percentage = totalForms > 0 
                ? Math.round((count / totalForms) * 100) 
                : 0;
              
              return (
                <div key={label} className="flex items-center">
                  <div 
                    className="w-4 h-4 rounded-full mr-3"
                    style={{ backgroundColor: data.datasets[0].backgroundColor[index] }}
                  ></div>
                  <div className="flex-1">
                    <div className="flex justify-between text-sm font-medium text-gray-700">
                      <span>{label}</span>
                      <span>{count}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2 mt-1">
                      <div 
                        className="h-2 rounded-full"
                        style={{ 
                          width: `${percentage}%`,
                          backgroundColor: data.datasets[0].backgroundColor[index]
                        }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 text-right">
                      {percentage}% of total
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormSubmissionChart;