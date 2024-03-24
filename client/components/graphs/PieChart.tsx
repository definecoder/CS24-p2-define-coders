"use client";
import React, { useRef, useEffect } from 'react';
import { Chart, CategoryScale } from 'chart.js/auto'; // Import necessary scales

Chart.register(CategoryScale); // Register the scales

interface ChartDataItem {
  labels: string[];
  data: number[];
  background: string[];
}

// interface DoughnutChartProps {
//   chartData: ChartDataItem[];
// }

const PieChart: React.FC<ChartDataItem> = ({ labels, data, background  }) => {
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
          labels: labels, //['Red', 'Blue', 'Yellow'],
          datasets: [
            {
              label: 'My First Dataset',
              data: [300, 50, 100],
              backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
            },
          ],
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
    <div>
      <canvas ref={chartRef} className='w-[300px] h-[300px]' />
    </div>
  );
};

export default PieChart;
