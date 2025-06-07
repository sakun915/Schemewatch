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

const SchoolTeacherGenderChart = ({ school }) => {
  if (!school) return null;

  const data = {
    labels: ["Male Teachers", "Female Teachers"],
    datasets: [
      {
        label: "Number of Teachers",
        data: [parseInt(school.teacherMale || 0), parseInt(school.teacherFemale || 0)],
        backgroundColor: ["#34d399", "#c084fc"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Teacher Gender Distribution",
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

export default SchoolTeacherGenderChart;
