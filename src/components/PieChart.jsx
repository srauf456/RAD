import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, plugins } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);
function PieChart({labels, dataPoints}){
    const data = {
  labels: labels,
  datasets: [
    {
      label: 'Department Distribution',
      data: dataPoints,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(200, 149, 155, 0.2)',
        'rgba(55, 149, 34, 0.2)',
        'rgba(245, 99, 64, 0.2)',
        'rgba(75, 89, 164, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(200, 149, 155, 1)',
         'rgba(55, 149, 34, 1)',
        'rgba(245, 99, 64, 1)',
        'rgba(75, 89, 164, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "right",
        },
    },
};
return <Pie data={data} options={options} height={380}/>
}

export default PieChart;