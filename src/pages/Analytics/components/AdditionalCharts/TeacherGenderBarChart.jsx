import React from "react";
import { Bar } from "react-chartjs-2";
import useTeacherGenderCount from "../../../../hooks/analyticsCharts/useTeacherGenderCount";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const TeacherGenderBarChart = () => {
  const { male, female } = useTeacherGenderCount();
  const totalTeachers = male + female;
  const malePercentage = totalTeachers > 0 ? Math.round((male / totalTeachers) * 100) : 0;
  const femalePercentage = totalTeachers > 0 ? Math.round((female / totalTeachers) * 100) : 0;

  const data = {
    labels: ["Male Teachers", "Female Teachers"],
    datasets: [
      {
        label: "Number of Teachers",
        data: [male, female],
        backgroundColor: [
          'rgba(63, 81, 181, 0.8)',  // Professional indigo blue
          'rgba(255, 167, 38, 0.8)'  // Professional amber
        ],
        borderColor: [
          'rgba(63, 81, 181, 1)',
          'rgba(255, 167, 38, 1)'
        ],
        borderWidth: 1,
        borderRadius: 8,
        hoverBackgroundColor: [
          'rgba(63, 81, 181, 1)',
          'rgba(255, 167, 38, 1)'
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
        display: false, // Using subtitle instead for cleaner look
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || '';
            const value = context.raw.toLocaleString();
            const percentage = context.raw === male ? malePercentage : femalePercentage;
            return `${label}: ${value} (${percentage}%)`;
          },
          footer: (tooltipItems) => {
            const total = tooltipItems.reduce((sum, item) => sum + item.raw, 0);
            return `Total Teachers: ${total.toLocaleString()}`;
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
        text: 'Teacher Gender Distribution',
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
        text: `♂ ${male.toLocaleString()} Male (${malePercentage}%) | ♀ ${female.toLocaleString()} Female (${femalePercentage}%)`,
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
          text: 'Number of Teachers',
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
        <p>Comparison of male and female teaching staff across all schools</p>
        {totalTeachers > 0 && (
          <p>Gender ratio: {malePercentage}:{femalePercentage}</p>
        )}
      </div>
    </div>
  );
};

export default TeacherGenderBarChart;