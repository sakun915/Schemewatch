import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartImprovementSuggestions = ({ data }) => {
  // Calculate counts and percentages
  const suggestionCounts = {
    yes: 0,
    no: 0,
  };

  data.forEach((item) => {
    const suggestion = item.improvementSuggestions?.toLowerCase().trim();
    if (suggestion === 'yes') suggestionCounts.yes++;
    else if (suggestion === 'no') suggestionCounts.no++;
  });

  const totalResponses = suggestionCounts.yes + suggestionCounts.no;
  const yesPercentage = totalResponses > 0 ? Math.round((suggestionCounts.yes / totalResponses) * 100) : 0;
  const noPercentage = totalResponses > 0 ? Math.round((suggestionCounts.no / totalResponses) * 100) : 0;

  const chartData = {
    labels: [
      `Yes (${suggestionCounts.yes})`, 
      `No (${suggestionCounts.no})`
    ],
    datasets: [
      {
        data: [suggestionCounts.yes, suggestionCounts.no],
        backgroundColor: ['#4CAF50', '#F44336'],
        hoverBackgroundColor: ['#66BB6A', '#EF5350'],
        borderColor: '#ffffff',
        borderWidth: 3,
        hoverOffset: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          font: {
            size: 14,
            family: "'Inter', sans-serif",
            weight: 500,
          },
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        titleFont: {
          size: 16,
          weight: 'bold',
        },
        bodyFont: {
          size: 14,
        },
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.raw || 0;
            const percentage = context.dataset.data[context.dataIndex] === suggestionCounts.yes 
              ? yesPercentage 
              : noPercentage;
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
      title: {
        display: true,
        text: 'Feedback on Scheme Improvement',
        font: {
          size: 18,
          weight: 'bold',
        },
        padding: {
          top: 10,
          bottom: 30,
        },
      },
    },
    cutout: '60%',
    animation: {
      animateScale: true,
      animateRotate: true,
    },
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl mx-auto">
      <div className="flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 h-64 md:h-80">
          <Pie data={chartData} options={options} />
        </div>
        
        <div className="w-full md:w-1/2 mt-6 md:mt-0 md:pl-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Scheme Improvement Feedback Analysis</h2>
          
          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">Positive Feedback (Yes)</span>
                <span className="font-bold text-green-600">{yesPercentage}%</span>
              </div>
              <p className="text-gray-500 mt-1 text-sm">
                {suggestionCounts.yes} out of {totalResponses} respondents believe the scheme can be improved.
              </p>
            </div>
            
            <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">Negative Feedback (No)</span>
                <span className="font-bold text-red-600">{noPercentage}%</span>
              </div>
              <p className="text-gray-500 mt-1 text-sm">
                {suggestionCounts.no} out of {totalResponses} respondents don't see room for improvement.
              </p>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">Total Responses</span>
                <span className="font-bold text-blue-600">{totalResponses}</span>
              </div>
              <p className="text-gray-500 mt-1 text-sm">
                Based on collected feedback from scheme participants.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PieChartImprovementSuggestions;