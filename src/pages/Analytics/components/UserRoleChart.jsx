import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const UserRoleChart = ({ rolesData }) => {
  // Sort roles by count (descending) for better visual hierarchy
  const sortedEntries = Object.entries(rolesData).sort((a, b) => b[1] - a[1]);
  const labels = sortedEntries.map(([role]) => role);
  const values = sortedEntries.map(([_, count]) => count);

  const data = {
    labels,
    datasets: [
      {
        label: "Number of Users",
        data: values,
        backgroundColor: [
          "rgba(59, 130, 246, 0.8)",  // blue with opacity
          "rgba(16, 185, 129, 0.8)",   // green
          "rgba(245, 158, 11, 0.8)",   // yellow
          "rgba(239, 68, 68, 0.8)",    // red
          "rgba(139, 92, 246, 0.8)",   // purple
          "rgba(20, 184, 166, 0.8)",   // teal
          "rgba(249, 115, 22, 0.8)",   // orange
        ],
        borderColor: [
          "rgba(59, 130, 246, 1)",
          "rgba(16, 185, 129, 1)",
          "rgba(245, 158, 11, 1)",
          "rgba(239, 68, 68, 1)",
          "rgba(139, 92, 246, 1)",
          "rgba(20, 184, 166, 1)",
          "rgba(249, 115, 22, 1)",
        ],
        borderWidth: 1,
        borderRadius: 4,
        barThickness: 'flex',
        maxBarThickness: 48,
        minBarLength: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: false, // We'll handle title outside chart
      },
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: {
          size: 14,
          weight: 'bold',
        },
        bodyFont: {
          size: 13,
        },
        padding: 10,
        cornerRadius: 6,
        callbacks: {
          label: function(context) {
            return ` ${context.parsed.y} user${context.parsed.y !== 1 ? 's' : ''}`;
          },
          labelColor: function(context) {
            return {
              borderColor: 'transparent',
              backgroundColor: context.dataset.backgroundColor[context.dataIndex],
              borderRadius: 2,
            };
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          color: '#4b5563',
          font: {
            size: 12,
            weight: '500',
          },
          padding: 8,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(229, 231, 235, 0.8)',
          drawBorder: false,
        },
        ticks: {
          color: '#4b5563',
          font: {
            size: 12,
          },
          precision: 0,
          padding: 8,
        },
      },
    },
    layout: {
      padding: {
        top: 0,
        right: 16,
        bottom: 8,
        left: 16,
      },
    },
  };

  return (
    <div className="w-full h-full p-4 bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">User Role Distribution</h3>
        <div className="text-sm text-gray-500">
          Total: {Object.values(rolesData).reduce((a, b) => a + b, 0)} users
        </div>
      </div>
      
      <div className="relative h-[300px] w-full">
        <Bar 
          data={data} 
          options={options}
          fallbackContent={<div className="text-gray-500">Loading chart...</div>}
        />
      </div>
      
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {labels.map((label, index) => (
          <div key={label} className="flex items-center">
            <span 
              className="w-3 h-3 rounded-full mr-2" 
              style={{ backgroundColor: data.datasets[0].backgroundColor[index] }}
            ></span>
            <span className="text-xs text-gray-600">
              {label}: {values[index]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserRoleChart;