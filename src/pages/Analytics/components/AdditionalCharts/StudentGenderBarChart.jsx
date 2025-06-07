import React from "react";
import { Bar } from "react-chartjs-2";
import useStudentGenderCount from "../../../../hooks/analyticsCharts/useStudentGenderCount";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const StudentGenderBarChart = () => {
  const { boys, girls } = useStudentGenderCount();
  const totalStudents = boys + girls;
  const boysPercentage = totalStudents > 0 ? Math.round((boys / totalStudents) * 100) : 0;
  const girlsPercentage = totalStudents > 0 ? Math.round((girls / totalStudents) * 100) : 0;

  const data = {
    labels: ["Male Students", "Female Students"],
    datasets: [
      {
        label: "Number of Students",
        data: [boys, girls],
        backgroundColor: [
          'rgba(54, 162, 235, 0.8)',  // Blue with transparency
          'rgba(255, 99, 132, 0.8)'    // Pink with transparency
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',     // Solid blue
          'rgba(255, 99, 132, 1)'      // Solid pink
        ],
        borderWidth: 1,
        borderRadius: 8,
        hoverBackgroundColor: [
          'rgba(54, 162, 235, 1)',     // Solid blue on hover
          'rgba(255, 99, 132, 1)'      // Solid pink on hover
        ],
        hoverBorderWidth: 2
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // We'll show custom legend in subtitle
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || '';
            const value = context.raw.toLocaleString();
            const percentage = context.raw === boys ? boysPercentage : girlsPercentage;
            return `${label}: ${value} (${percentage}%)`;
          },
          footer: (tooltipItems) => {
            const total = tooltipItems.reduce((sum, item) => sum + item.raw, 0);
            return `Total Students: ${total.toLocaleString()}`;
          }
        },
        backgroundColor: 'rgba(0,0,0,0.85)',
        titleFont: { size: 14, weight: 'bold' },
        bodyFont: { size: 13 },
        footerFont: { size: 12 },
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        usePointStyle: true
      },
      title: {
        display: true,
        text: 'Student Gender Distribution',
        font: {
          size: 18,
          weight: '600',
          family: "'Segoe UI', Roboto, sans-serif"
        },
        padding: {
          top: 10,
          bottom: 20
        }
      },
      subtitle: {
        display: true,
        text: `♂ ${boys.toLocaleString()} Male (${boysPercentage}%) | ♀ ${girls.toLocaleString()} Female (${girlsPercentage}%)`,
        font: {
          size: 14,
          family: "'Segoe UI', Roboto, sans-serif"
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
          color: 'rgba(0,0,0,0.05)',
          drawBorder: false
        },
        ticks: {
          font: {
            size: 12
          },
          callback: (value) => value.toLocaleString()
        },
        title: {
          display: true,
          text: 'Number of Students',
          font: {
            size: 14,
            weight: 'bold'
          },
          padding: {
            top: 0,
            bottom: 10
          }
        }
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
    <div className="chart-card" style={{
      position: 'relative',
      padding: '20px',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      backgroundColor: '#fff'
    }}>
      <div style={{ position: 'relative', height: '400px' }}>
        <Bar data={data} options={options} />
      </div>
      <div style={{
        marginTop: '15px',
        fontSize: '0.85rem',
        color: '#666',
        textAlign: 'center',
        lineHeight: '1.5'
      }}>
        <p>Comparison of male and female student enrollment across all schools</p>
        {totalStudents > 0 && (
          <p>Gender ratio: {boysPercentage}:{girlsPercentage}</p>
        )}
      </div>
    </div>
  );
};

export default StudentGenderBarChart;