import React from "react";
import { Line } from "react-chartjs-2";
import useSchoolGrantDataByUdise from "../../../../hooks/analyticsCharts/useSchoolGrantDataByUdise";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const SchoolGrantLineChart = ({ udiseNo }) => {
  const grantData = useSchoolGrantDataByUdise(udiseNo);

  if (!grantData) return null;

  const years = Object.keys(grantData);

  const data = {
    labels: years,
    datasets: [
      {
        label: "Grant Received",
        data: years.map(year => grantData[year].received),
        borderColor: "#42a5f5",
        backgroundColor: "rgba(66,165,245,0.3)",
        tension: 0.3,
        fill: true
      },
      {
        label: "Expenditure",
        data: years.map(year => grantData[year].spent),
        borderColor: "#66bb6a",
        backgroundColor: "rgba(102,187,106,0.3)",
        tension: 0.3,
        fill: true
      },
      {
        label: "Balance",
        data: years.map(year => grantData[year].balance),
        borderColor: "#ef5350",
        backgroundColor: "rgba(239,83,80,0.3)",
        tension: 0.3,
        fill: true
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "School Fund Trend Over Years"
      },
      legend: {
        position: "bottom"
      }
    }
  };

  return (
    <div className="bg-white shadow-md rounded p-4 mb-6">
      <Line data={data} options={options} />
    </div>
  );
};

export default SchoolGrantLineChart;
