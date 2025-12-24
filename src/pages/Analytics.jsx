import AreaChart from "../components/AreaChart"
import { useMemo } from "react";
import { useDashboardContext } from "../context/DashboardContext";
import LineChart from "../components/LineChart";
import DoughnutChart from "../components/DoughnutChart";
import ActivityFeed from "../components/ActivityFeed";
//import {motion} from "framer-motion"

function Analytics(){
    
    const generateDailyVisitors = () => {
  // 30 days of random-ish data
  return Array.from({ length: 30 }, () =>
    Math.floor(50 + Math.random() * 120)
  );
};
const dailyVisitors = useMemo(() => generateDailyVisitors(), []);
    const trafficSources = {
  labels: ["Direct", "Social", "Organic Search", "Referral"],
  values: [120, 80, 150, 40],
};

const deviceData = {
  labels: ["Desktop", "Mobile", "Tablet"],
  values: [180, 140, 40],
};

    const {visitorData} = useDashboardContext();
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
      const currentMonth = new Date().getMonth(); // 0–11
      const previousMonth = currentMonth > 0 ? currentMonth - 1 : 11; // wraps around to Dec
const {currentData, previousData, labels} = useMemo(() =>{
        if (!visitorData ||visitorData.length===0) return{currentData:[], previousData:[], labels:[]};
        const currentValue = visitorData[currentMonth] || 0;
        const previousValue = visitorData[previousMonth] || 0;
        return {
            currentData: [previousValue, currentValue],
            previousData: [previousValue,currentValue],
            labels: [months[previousMonth], months[currentMonth]],
        
        };

     
},[visitorData,currentMonth,previousMonth]);
    

    return (
        <div>
            <h1>Analytics</h1>
            <div className="flex flex-wrap gap-16 mt-8 sm:flex justify-center">
               {visitorData && visitorData.length > 0 ? (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">        

    <AreaChart labels={labels} currentData={currentData} previousData={previousData} height={250}/>
    
    <LineChart labels={[...Array(30).keys()].map(d => `Day ${d + 1}`)} dataPoints={dailyVisitors} title="Daily"/>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-4">
      <DoughnutChart labels={trafficSources.labels} values={trafficSources.values} title="Traffic Sources" className="text-lg font-semibold"/>
      <DoughnutChart labels={deviceData.labels} values={deviceData.values} title="Device Breakdown"/></div>
      <ActivityFeed />
     </div>
   ):(
   <p>Loading data</p>
   )}
        </div>
        </div>
    )
}
export default Analytics;


//traffic sources doughnut
//device breakdown

//right: activity feed