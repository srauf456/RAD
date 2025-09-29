import {Link, NavLink} from "react-router-dom"
import { MdDashboard, MdAnalytics, MdOutlinePerson, MdOutlineSettings, MdSpaceDashboard } from "react-icons/md";
import { useDashboardContext } from "../context/DashboardContext";
import { signOut } from "firebase/auth";
import {auth} from "../firebase";
import { useNavigate } from "react-router-dom";   
import { MdMenu } from "react-icons/md";
function Sidebar(){
    const {theme, toggleTheme, isLoggedIn, userInfo, loginUser, logoutUser, language, changeLanguage, isSidebarOpen, setSidebarOpen} = useDashboardContext();
//    const handleLogin = (e) =>{
// const dummyUser = {
//     name: "Sara",
//     email: "sara@example.com",
// };
// //console.log("Login clicked");
// loginUser(dummyUser);
//    }
const navigate = useNavigate();

const toggleSidebar = () =>{
    setSidebarOpen(!isSidebarOpen);
};
    return(
        <div className={`w-64 h-screen fixed left-0 top-16 md:h-screen bg-gray-700 overflow-y-auto shadow transition-transform duration-300
            ${isSidebarOpen? 'translate-x-0' : '-translate-x-full'}  md:translate-x-0 z-50`}>
        {/* <button onClick={toggleSidebar} className="md:hidden  mt-8 bg-transparent text-black">X</button> */}
                
            <div className="flex gap-10 items-center justify-center">
                 
                 <MdSpaceDashboard className="mt-6 size-18 text-black bg-green-300"/>
                </div> 
                 <button className="gap-4 mt-12 text-black" onClick={toggleTheme}>
                    {theme === "light" ? "Dark Mode" : "Light Mode"}
                </button>
                <div className="flex flex-row justify-center items-center gap-2 mt-6 text-black">
           
          
            <button onClick={() => changeLanguage("en")} >EN</button>
          <button onClick={() => changeLanguage("ar")} >AR</button>
          </div> 
     <nav className="flex flex-col gap-4 p-4 mt-10">
    <NavLink to="/dashboard" className={({isActive}) =>
    `flex gap-2 p-2 items-center hover:bg-gray-600 rounded ${isActive ? "bg-gray-900 text-green-300" : "text-gray-300"}`}><MdDashboard/>Dashboard</NavLink>
    <NavLink to="/analytics" className={({isActive}) =>
    `flex gap-2 p-2 items-center hover:bg-gray-600 rounded ${isActive ? "bg-gray-900 text-green-300" : "text-gray-300"}`}><MdAnalytics/>Analytics</NavLink>
    <NavLink to="/users" className={({isActive}) =>
    `flex gap-2 p-2 items-center hover:bg-gray-600 rounded ${isActive ? "bg-gray-900 text-green-300" : "text-gray-300"}`}><MdOutlinePerson/>Users</NavLink>
    <NavLink to="/settings" className={({isActive}) =>
    `flex gap-2 p-2 items-center hover:bg-gray-600 rounded ${isActive ? "bg-gray-900 text-green-300" : "text-gray-300"}`}><MdOutlineSettings/>Settings</NavLink>
     {/*loginlogout*/}
     {isLoggedIn ? (
        <div>
         
            <button onClick={logoutUser} className="text-xl mt-6 px-3 py-1 rounded text-black">Logout</button>
   
        </div>
     ): (
        <button onClick={() => navigate("/login")} className="text-xl mt-6 px-3 py-1 rounded text-black">Login</button>
   
     )}        
   
    </nav>
    </div>
)
}


export default Sidebar;