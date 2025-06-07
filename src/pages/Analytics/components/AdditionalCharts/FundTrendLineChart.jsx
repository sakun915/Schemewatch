import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import useGrantTrendLineData from "../../../../hooks/analyticsCharts/useGrantTrendLineData";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const FundTrendLineChart = () => {
  const data = useGrantTrendLineData();

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Fund Trend Over Years",
      },
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ marginBottom: "2rem" }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default FundTrendLineChart;
