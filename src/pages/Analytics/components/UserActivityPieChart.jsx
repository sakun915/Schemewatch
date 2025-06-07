// src/components/UserActivityPieChart.jsx
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const UserActivityPieChart = ({ activeCount, inactiveCount }) => {
  const data = {
    labels: ["Active Users", "Inactive Users"],
    datasets: [
      {
        data: [activeCount, inactiveCount],
        backgroundColor: ["#4ade80", "#f87171"],
        borderColor: "#ffffff",
        borderWidth: 2,
        hoverOffset: 12,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          font: {
            size: 14,
            weight: "bold",
          },
        },
      },
      tooltip: {
        backgroundColor: "#1f2937",
        titleColor: "#fff",
        bodyColor: "#fff",
        padding: 10,
        cornerRadius: 8,
      },
    },
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 1000,
    },
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-10 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-2 text-gray-800">
        User Activity Status
      </h2>
      <p className="text-sm text-gray-500 text-center mb-4">
        This chart shows the count of users marked as <span className="text-green-600 font-medium">Active</span> and <span className="text-red-500 font-medium">Inactive</span> in Firebase.
      </p>
      <div className="relative h-[300px] w-full">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default UserActivityPieChart;
