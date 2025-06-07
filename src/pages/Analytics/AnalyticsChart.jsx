import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const AnalyticsChart = ({ visitedCount, nonVisitedCount }) => {
  const data = {
    labels: ["Visited", "Non-Visited"],
    datasets: [
      {
        label: "Number of Schools",
        data: [visitedCount, nonVisitedCount],
        backgroundColor: ["#10b981", "#ef4444"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "School Visit Status Overview",
        font: { size: 18 },
        color: "#111",
        padding: { bottom: 10 }
      },
      legend: {
        display: true,
        position: "bottom",
        labels: {
          color: "#444",
          boxWidth: 20,
          padding: 15
        }
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.label}: ${context.parsed.y} schools`;
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "School Visit Status",
          color: "#333",
          font: { size: 14 }
        }
      },
      y: {
        title: {
          display: true,
          text: "Number of Schools",
          color: "#333",
          font: { size: 14 }
        },
        beginAtZero: true,
        precision: 0
      }
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 mt-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">
        Visited vs Non-Visited Schools
      </h2>
      <p className="text-sm text-gray-600 mb-4">
        This bar chart displays the number of schools that have been visited versus those that have not.
        <br />
        <span className="inline-block mt-2">
          <span className="inline-block w-4 h-4 bg-green-500 mr-1"></span> Green: Visited Schools
        </span>
        <br />
        <span className="inline-block">
          <span className="inline-block w-4 h-4 bg-red-500 mr-1"></span> Red: Non-Visited Schools
        </span>
      </p>
      <Bar data={data} options={options} />
    </div>
  );
};

export default AnalyticsChart;
