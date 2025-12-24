import Card from "../components/Card";
import LineChart from "../components/LineChart";
import PieChart from "../components/PieChart";
import { useState, useEffect } from "react";
import axios from 'axios';
import Spinner from "../components/Spinner";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useDashboardContext } from "../context/DashboardContext";



//create context for current user. theme. totalusers
//use context in sidebar. usertable


function Dashboard(){
    const [user, setUser] = useState([]);
   const {visitorData, setVisitorData} = useDashboardContext();
    const [departments, setDepartments] = useState([]);
     const [loading, setLoading] = useState(true); // To indicate loading status
    const [error, setError] = useState(null); // To store any error messages
    


    useEffect(() =>{
        
        const fetchData = async () => {
          try{
          const res = await axios.get("https://dummyjson.com/users?limit=20");
          
          setUser(res.data.users);
          setVisitorData([23, 45, 67, 34, 56, 78, 90, 23, 65, 99, 87, 90]);
          const departments = res.data.users.reduce((acc, user) => 
          {
            const dept = user.company?.department || 'Unknown';
            acc[dept] = (acc[dept] || 0) + 1;
            return acc;
          }, {});
        
        

     
        setDepartments(departments);
          setTimeout(() =>{
       setLoading(false);
    }, 1500);
    
      } catch(err){
        setError("Failed to fetch",err.message);
        setLoading(false);
      } 
        
        }; 
        fetchData();
    }, [setVisitorData]);
    if(error) alert("Error incurred:", error);
    return (
  <div>
    <h2 className="text-xl font-bold">Growth Overview</h2>
    <h4>Take a look at the updated site overview.</h4> 
    {loading? (
        <Spinner/>
    ) : ( 
     
     <div className="flex flex-wrap gap-16 mt-8 sm:flex justify-center">  
    <div className="flex flex-col gap-16 w-80 ">
     <HoverCard>
        <HoverCardTrigger>
        <HoverCardContent>Total Users</HoverCardContent> <Card title="Total Users" value={user.length}/></HoverCardTrigger> 
        </HoverCard> 
     <Card title="Signups" value="32"/>
      <Card title="Revenue" value="3200"/>
      </div>
   
      <div className="rounded shadow-amber-50 gap-14">
      
      <div className="h-80"> 
          <h2 className="font-semibold text-lg">Site Visitors</h2>
          {visitorData && visitorData.length > 0 ? (
             
    <LineChart labels={['January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December']} dataPoints={visitorData}/>
   ):(
   <p>Loading data</p>
   )}
   
    </div>
    

    <div className="h-80 mt-16">
      <h2 className="font-semibold text-lg">Department Distribution</h2>
    
   
    
    <PieChart labels={Object.keys(departments)} dataPoints={Object.values(departments)}/>
      
   
    </div>
    </div>
        </div>)} 
        
        </div>
)}
export default Dashboard;