import React, { useRef, useEffect } from 'react';
import { Chart, CategoryScale } from 'chart.js/auto';

Chart.register(CategoryScale);

interface ChartDataItem {
  labels: string[];
  data: number[];
  background: string[];
}

const PieChart: React.FC<ChartDataItem> = ({ labels, data, background }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const myChartRef = chartRef.current?.getContext('2d');

    if (myChartRef) {
      chartInstance.current = new Chart(myChartRef, {
        type: 'doughnut',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Storage Status',
              data: data,
              backgroundColor: background,
            },
          ],
        },
        options: {
          plugins: {
            legend: {              
              labels: {                                
                font: {
                  weight: 'bold',
                  size: 13,
                },
              },
            },
          },
        },
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="w-48 h-48">
      <canvas ref={chartRef} />
    </div>
  );
};

export default PieChart;
