import { Chart as ChartJS, ArcElement, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, Colors,Ticks } from "chart.js";
import { Chart, Line } from "react-chartjs-2";
import { useDashboardContext } from "../context/DashboardContext";

ChartJS.register(ArcElement, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, Colors);

function LineChart(props){
   const {theme} = useDashboardContext();
    var tickColor = theme === "dark" ? "white" : "black";
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
      labels: { color: tickColor },
      
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
      
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

const data = {
    labels: props.labels,
    datasets: [
      {
        label: "Visitors",
        data: props.dataPoints,
        borderColor: "#7bf1a8",
        fill: false,
        tension: 0.1,
        backgroundColor: 'rgba(0,0,0,1)'
      },
    ],
  };

    return (
    <div className={theme === "dark" ? "bg-gray-800 text-white"  : "bg-white text-black"}>
     <Line options={options} data={data} height={300} /> 
     </div>
     )
}



export default LineChart;