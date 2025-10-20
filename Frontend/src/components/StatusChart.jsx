import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

// Register Chart.js components
Chart.register(...registerables);

const StatusChart = ({ data = [] }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Destroy previous chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    
    // Default data if no data is provided
    const chartData = data.length > 0 ? data : [
      { status: 'Pending', count: 0 },
      { status: 'In Progress', count: 0 },
      { status: 'Completed', count: 0 },
      { status: 'Cancelled', count: 0 },
    ];

    const statusLabels = chartData.map(item => item.status);
    const statusCounts = chartData.map(item => item.count);

    // Define colors based on status
    const backgroundColors = chartData.map(item => {
      switch(item.status.toLowerCase()) {
        case 'pending': return 'rgba(245, 158, 11, 0.7)';
        case 'in progress': return 'rgba(59, 130, 246, 0.7)';
        case 'completed': return 'rgba(16, 185, 129, 0.7)';
        case 'cancelled': return 'rgba(239, 68, 68, 0.7)';
        default: return 'rgba(156, 163, 175, 0.7)';
      }
    });

    const borderColors = backgroundColors.map(color => color.replace('0.7', '1'));

    chartInstance.current = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: statusLabels,
        datasets: [
          {
            data: statusCounts,
            backgroundColor: backgroundColors,
            borderColor: borderColors,
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            labels: {
              padding: 20,
              font: {
                size: 12,
              },
            },
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const label = context.label || '';
                const value = context.raw || 0;
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const percentage = Math.round((value / total) * 100);
                return `${label}: ${value} (${percentage}%)`;
              },
            },
          },
        },
        cutout: '70%',
        animation: {
          animateScale: true,
          animateRotate: true,
        },
      },
    });

    // Cleanup function to destroy chart on unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return (
    <div className="relative h-full w-full">
      <canvas ref={chartRef} />
      {data.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
          No data available
        </div>
      )}
    </div>
  );
};

export default React.memo(StatusChart);
