import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, Filler } from "chart.js";
import { Line } from "react-chartjs-2";
import { useDashboardContext } from "../context/DashboardContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  Legend
);
function AreaChart({labels, currentData, previousData, height = 250}) {
    const {theme} = useDashboardContext();
    var tickColor = theme === "dark" ? "white" : "black";
 const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: 'Current Month Visitors',
      data: currentData,
      borderColor: '#7bq2b9',
      backgroundColor: '#7bf1a8',
    },
     {
      fill: true,
      label: 'Previous Month Visitors',
      data: previousData,
      borderColor: '#FFFFFF',
      backgroundColor: '#7bf1a8',
    },
  ],
};

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: { color: theme === "dark" ? "white" : "black" },
      },
      title: {
        display: true,
        text: "Site Visitors Comparison",
        color: theme === "dark" ? "white" : "black",
      },
    },
    scales: {
      x: {
        ticks: { color: tickColor  },
      },
      y: {
        ticks: { color: theme === "dark" ? "white" : "black" },
      },
    },
  };


  return (
     <div className={theme === "dark" ? "bg-gray-350"  : "bg-white text-black"}>
      <div height={height}>
  <Line data={data} options={options} height={300}/>
  </div>
  </div>
  )
}
export default AreaChart;