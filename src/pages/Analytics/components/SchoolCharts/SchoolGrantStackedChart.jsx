import React from "react";
import { Bar } from "react-chartjs-2";
import useSchoolGrantDataByUdise from "../../../../hooks/analyticsCharts/useSchoolGrantDataByUdise";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SchoolGrantStackedChart = ({ udiseNo }) => {
  const grantData = useSchoolGrantDataByUdise(udiseNo);

  if (!grantData) return null;

  const years = Object.keys(grantData);

  const data = {
    labels: years,
    datasets: [
      {
        label: "Expenditure",
        data: years.map(year => grantData[year].spent),
        backgroundColor: "#4caf50"
      },
      {
        label: "Remaining (Balance)",
        data: years.map(year => grantData[year].balance),
        backgroundColor: "#f44336"
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom"
      },
      title: {
        display: true,
        text: "School Fund Usage Per Year (Stacked)"
      }
    },
    scales: {
      x: { stacked: true },
      y: { stacked: true }
    }
  };

  return (
    <div className="bg-white shadow-md rounded p-4 mb-6">
      <Bar data={data} options={options} />
    </div>
  );
};

export default SchoolGrantStackedChart;
