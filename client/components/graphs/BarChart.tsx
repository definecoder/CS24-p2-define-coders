import React from "react";
import { Bar } from "react-chartjs-2";

interface ChartDataItem {
  id: number;
  year: number;
  userGain: number;
  userLost: number;
}

interface BarChartProps {
  chartData: ChartDataItem[];
}

const BarChart: React.FC<BarChartProps> = ({ chartData }) => {
  const data = {
    labels: chartData.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained",
        data: chartData.map((data) => data.userGain),
        backgroundColor: [
          "rgba(75, 192, 192, 1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  };

  return <Bar data={data} />;
};

export default BarChart;
