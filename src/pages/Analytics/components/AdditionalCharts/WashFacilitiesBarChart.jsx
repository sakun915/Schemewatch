import React from "react";
import { Bar } from "react-chartjs-2";
import useWashFacilitiesData from "../../../../hooks/analyticsCharts/useWashFacilitiesData";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

const WashFacilitiesBarChart = () => {
  const { withSoap, withoutSoap } = useWashFacilitiesData();

  const total = withSoap + withoutSoap;
  const withSoapPercent = total ? ((withSoap / total) * 100).toFixed(1) : 0;
  const withoutSoapPercent = total ? ((withoutSoap / total) * 100).toFixed(1) : 0;

  const data = {
    labels: ["Availability of Handwash Soap in Schools"],
    datasets: [
      {
        label: `Available (${withSoap} schools, ${withSoapPercent}%)`,
        data: [withSoap],
        backgroundColor: "#4CAF50",
        stack: "stack1",
      },
      {
        label: `Not Available (${withoutSoap} schools, ${withoutSoapPercent}%)`,
        data: [withoutSoap],
        backgroundColor: "#F44336",
        stack: "stack1",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "WASH Facilities: Handwash Soap Availability Across Schools",
        font: {
          size: 18,
        },
        padding: { top: 10, bottom: 20 },
      },
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const count = context.raw;
            const percentage = total ? ((count / total) * 100).toFixed(1) : 0;
            return `${context.dataset.label}: ${count} schools (${percentage}%)`;
          },
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        ticks: {
          font: { size: 14 },
        },
      },
      y: {
        stacked: true,
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Schools",
          font: { size: 14 },
        },
      },
    },
  };

  return (
    <div className="chart-card" style={{ marginBottom: "2rem", background: "#fff", padding: "1.5rem", borderRadius: "10px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
      <h3 style={{ marginBottom: "1rem", color: "#333" }}>WASH Facilities – Handwash Soap Availability</h3>
      <Bar data={data} options={options} />
      <p style={{ marginTop: "1rem", fontSize: "0.95rem", color: "#555" }}>
        This chart shows the availability of handwash soap under the WASH (Water, Sanitation, and Hygiene) facilities across all schools surveyed. Schools marked as "Available" have confirmed soap facilities, while "Not Available" indicates the absence of such provision.
      </p>
    </div>
  );
};

export default WashFacilitiesBarChart;
