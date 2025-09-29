import { Chart as ChartJS, ArcElement, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";
import { Line } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";
import { useDashboardContext } from "../context/DashboardContext";

ChartJS.register(ArcElement, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);
function LineChart(props){
   const {theme} = useDashboardContext();
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

const data = {
    labels: props.labels,
    datasets: [
      {
        label: "Visitors",
        data: props.dataPoints,
        borderColor: "#3b82f6",
        fill: false,
      },
    ],
  };

    return (
    <div className={theme === "dark" ? "bg-gray-50"  : "bg-white text-black"}>
     <Line options={options} data={data} height={300} /> 
     </div>
     )
}



export default LineChart;