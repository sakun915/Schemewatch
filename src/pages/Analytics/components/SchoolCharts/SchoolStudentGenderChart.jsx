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

const SchoolStudentGenderChart = ({ school }) => {
  if (!school) return null;

  const data = {
    labels: ["Boys", "Girls"],
    datasets: [
      {
        label: "Number of Students",
        data: [parseInt(school.totalBoys || 0), parseInt(school.totalGirls || 0)],
        backgroundColor: ["#60a5fa", "#f472b6"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Student Gender Distribution",
      },
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-4">
      <Bar data={data} options={options} />
    </div>
  );
};

export default SchoolStudentGenderChart;
