import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useDashboardContext } from "../context/DashboardContext";

ChartJS.register(ArcElement, Tooltip, Legend);

function DoughnutChart({labels, values, title}){
    const {theme} = useDashboardContext();
    var tickColor = theme === "dark" ? "white" : "black";
    const data = {
  labels,
  datasets: [
    {
      label: '# of Devices',
      
      data: values,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
      ],
      borderWidth: 1,
    },
  ],
    plugins: {
    legend: {
      position: 'top',
      labels: { color: tickColor },
      
    },
}
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
      labels: { color: tickColor },
    },
    title: {
      display: true,
      text: 'My Doughnut Chart',
    },
  },
}


  return <div><h2>{title}</h2><Doughnut data={data} options={options} /></div>;
}

export default DoughnutChart;