import React from "react";
import { Doughnut } from "react-chartjs-2";
import useBasicFacilitiesData from "../../../../hooks/analyticsCharts/useBasicFacilitiesData";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const BasicFacilitiesDonutChart = () => {
  const facilityCounts = useBasicFacilitiesData();
  const totalSchools = Math.max(...Object.values(facilityCounts)) || 1; // Fallback to 1 to avoid division by zero

  // Format labels and calculate percentages
  const labels = Object.keys(facilityCounts).map(key => {
    const formatted = key.replace("has", "").replace(/([A-Z])/g, " $1").trim();
    const count = facilityCounts[key];
    const percentage = Math.round((count / totalSchools) * 100);
    return `${formatted} (${percentage}%)`;
  });

  // Color palette designed for accessibility
  const backgroundColors = [
    '#4e79a7', // muted blue
    '#f28e2b', // orange
    '#e15759', // red
    '#76b7b2', // teal
    '#59a14f', // green
    '#edc948', // yellow
    '#b07aa1', // purple
    '#ff9da7', // pink
    '#9c755f', // brown
    '#bab0ac'  // gray
  ];

  const data = {
    labels: Object.keys(facilityCounts).map(key => 
      key.replace("has", "").replace(/([A-Z])/g, " $1").trim()
    ),
    datasets: [
      {
        label: "Number of Schools",
        data: Object.values(facilityCounts),
        backgroundColor: backgroundColors,
        borderColor: '#ffffff',
        borderWidth: 2,
        hoverBackgroundColor: backgroundColors.map(color => 
          color.replace(/,\s*\d+\.?\d*\)$/, ', 0.8)')
        ),
        hoverOffset: 10,
        spacing: 3,
        borderRadius: 6
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '65%',
    plugins: {
      legend: {
        position: 'right',
        align: 'center',
        labels: {
          padding: 20,
          font: {
            size: 12,
            family: "'Segoe UI', Roboto, sans-serif",
            weight: '500'
          },
          usePointStyle: true,
          pointStyle: 'circle',
          generateLabels: (chart) => {
            const datasets = chart.data.datasets;
            return chart.data.labels.map((label, i) => {
              const value = datasets[0].data[i];
              const percentage = Math.round((value / totalSchools) * 100);
              return {
                text: `${label}: ${value} (${percentage}%)`,
                fillStyle: datasets[0].backgroundColor[i],
                strokeStyle: datasets[0].borderColor,
                lineWidth: datasets[0].borderWidth,
                hidden: isNaN(datasets[0].data[i]) || chart.getDatasetMeta(0).data[i].hidden,
                index: i
              };
            });
          }
        },
        onClick: (e, legendItem, legend) => {
          const index = legendItem.index;
          const chart = legend.chart;
          const meta = chart.getDatasetMeta(0);

          // Toggle visibility
          meta.data[index].hidden = !meta.data[index].hidden;

          chart.update();
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.raw;
            const percentage = Math.round((value / totalSchools) * 100);
            return `${label}: ${value} schools (${percentage}% of total)`;
          },
          footer: (tooltipItems) => {
            const sum = tooltipItems.reduce((a, b) => a + b.raw, 0);
            return `Total: ${sum} schools`;
          }
        },
        displayColors: true,
        usePointStyle: true,
        padding: 12,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        titleFont: {
          size: 14,
          weight: 'bold'
        },
        bodyFont: {
          size: 12
        },
        footerFont: {
          size: 11,
          style: 'italic'
        }
      },
      title: {
        display: true,
        text: 'Basic Facilities Availability',
        font: {
          size: 18,
          weight: '600'
        },
        padding: {
          top: 10,
          bottom: 20
        }
      },
      subtitle: {
        display: true,
        text: `Across ${totalSchools} schools surveyed`,
        font: {
          size: 14
        },
        padding: {
          bottom: 20
        }
      }
    },
    animation: {
      animateScale: true,
      animateRotate: true
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
      <div style={{ position: 'relative', height: '450px' }}>
        <Doughnut data={data} options={options} />
      </div>
      <div style={{
        marginTop: '15px',
        fontSize: '0.85rem',
        color: '#666',
        textAlign: 'center',
        lineHeight: '1.5'
      }}>
        <p>Shows the availability percentage of various basic facilities across surveyed schools.</p>
        <p>Click on legend items to toggle visibility of specific facilities.</p>
      </div>
    </div>
  );
};

export default BasicFacilitiesDonutChart;