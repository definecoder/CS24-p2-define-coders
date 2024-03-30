"use client";
import React, { useRef, useEffect } from 'react';
import { Chart, CategoryScale } from 'chart.js/auto';
Chart.register(CategoryScale); 

interface ChartDataItem {
  labels: string[];
  data: number[];
  backgroundColor: string[];
  borderColor: string[];
  label: string;
}

const BarChart: React.FC<ChartDataItem> = ({ labels, data, backgroundColor, borderColor, label  }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const myChartRef = chartRef.current?.getContext('2d');

    if (myChartRef) {
     
      chartInstance.current = new Chart(myChartRef, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: label,
              data: data,
              backgroundColor: backgroundColor,
              borderColor: borderColor,
              borderWidth: 1,
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
  }, []); // Removed [labels, data] dependency array

  return (
    <div>
      <canvas ref={chartRef} />
    </div>
  );
};

export default BarChart;
