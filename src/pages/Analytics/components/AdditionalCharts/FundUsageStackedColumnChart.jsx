import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import useGrantYearWiseData from "../../../../hooks/analyticsCharts/useGrantYearWiseData";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

const FundUsageStackedColumnChart = () => {
  const data = useGrantYearWiseData();

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Fund Usage Per Year (Spent + Remaining = Total)",
        font: {
          size: 18,
        },
        padding: {
          top: 10,
          bottom: 20,
        },
      },
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || '';
            const value = context.raw || 0;
            return `${label}: ₹${value.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: "Financial Year",
          font: {
            size: 14,
          },
        },
        ticks: {
          font: { size: 13 },
        },
      },
      y: {
        stacked: true,
        beginAtZero: true,
        title: {
          display: true,
          text: "Amount in INR",
          font: {
            size: 14,
          },
        },
        ticks: {
          callback: (value) => `₹${value}`,
          font: { size: 13 },
        },
      },
    },
  };

  return (
    <div
      className="chart-card"
      style={{
        marginBottom: "2rem",
        backgroundColor: "#fff",
        padding: "1.5rem",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
      }}
    >
      <h3 style={{ color: "#333", marginBottom: "1rem" }}>
        Annual School Fund Usage Breakdown
      </h3>
      <Bar data={data} options={options} />
      <p style={{ marginTop: "1rem", fontSize: "0.95rem", color: "#555" }}>
        This chart displays the breakdown of school funds over the financial years 2022–23, 2023–24,
        and 2024–25. Each column shows how much of the received fund has been spent and how much remains
        as balance. This helps assess budget utilization and financial efficiency.
      </p>
    </div>
  );
};

export default FundUsageStackedColumnChart;
