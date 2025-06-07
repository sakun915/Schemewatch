import React from "react";
import { Bar } from "react-chartjs-2";
import useMiddayMealBoardData from "../../../../hooks/analyticsCharts/useMiddayMealBoardData";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const InfoBoardHistogram = () => {
  const { yes, no, total } = useMiddayMealBoardData();
  const complianceRate = total > 0 ? Math.round((yes / total) * 100) : 0;

  const data = {
    labels: ["Board Present", "Board Absent"],
    datasets: [
      {
        label: "Number of Schools",
        data: [yes, no],
        backgroundColor: [
          'rgba(56, 142, 60, 0.8)',  // Darker green with transparency
          'rgba(229, 57, 53, 0.8)'   // Darker red with transparency
        ],
        borderColor: [
          'rgba(56, 142, 60, 1)',
          'rgba(229, 57, 53, 1)'
        ],
        borderWidth: 1,
        borderRadius: 8,
        hoverBackgroundColor: [
          'rgba(56, 142, 60, 1)',
          'rgba(229, 57, 53, 1)'
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { 
        position: "top",
        labels: {
          font: {
            size: 14,
            weight: 'bold'
          },
          padding: 20
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || '';
            const value = context.raw;
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${value} (${percentage}%)`;
          },
        },
        backgroundColor: 'rgba(0,0,0,0.8)',
        titleFont: { size: 16 },
        bodyFont: { size: 14 },
        padding: 12,
        cornerRadius: 8
      },
      subtitle: {
        display: true,
        text: `Total Schools: ${total} | Compliance Rate: ${complianceRate}%`,
        font: {
          size: 14
        },
        padding: {
          bottom: 20
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0,0,0,0.05)'
        },
        ticks: { 
          stepSize: Math.ceil(total/10) || 1,
          font: {
            size: 12
          }
        },
        title: { 
          display: true, 
          text: "Number of Schools", 
          font: {
            size: 14,
            weight: 'bold'
          },
          padding: 10
        },
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 13,
            weight: 'bold'
          }
        }
      }
    },
    animation: {
      duration: 1500,
      easing: 'easeOutQuart'
    }
  };

  return (
    <div className="chart-card" style={{ position: 'relative', height: '400px' }}>
      <h3 style={{ 
        textAlign: 'center', 
        marginBottom: '20px',
        color: '#2c3e50',
        fontSize: '1.4rem',
        fontWeight: '600'
      }}>
        Midday Meal Information Board Compliance
      </h3>
      <div style={{ position: 'relative', height: '320px' }}>
        <Bar data={data} options={options} />
      </div>
      <div style={{
        marginTop: '15px',
        fontSize: '0.9rem',
        color: '#7f8c8d',
        textAlign: 'center',
        fontStyle: 'italic'
      }}>
        Displays the availability of mandatory information boards in schools regarding the midday meal program
      </div>
    </div>
  );
};

export default InfoBoardHistogram;