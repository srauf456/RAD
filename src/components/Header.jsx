import { useDashboardContext } from "../context/DashboardContext";
import { MdMenu } from "react-icons/md";
import { NavLink } from "react-router-dom";

function Header(){
   
       const {theme, toggleTheme, isLoggedIn, userInfo, loginUser, logoutUser, language, changeLanguage, isSidebarOpen, setSidebarOpen} = useDashboardContext();
//console.log(userInfo);
const toggleSidebar = () =>{
    if(window.innerWidth<768){
        setSidebarOpen(!isSidebarOpen);
    }
};
   
    return(
       
        <div className={`fixed top-0 left-0 right-0 h-16 shadow-md py-4 px-8 flex items-center justify-between ${theme === "dark"? "bg-gray-600 text-white" : "bg-white"}`}>
           <button onClick={toggleSidebar} className="md:hidden"><MdMenu/></button>
           {language === "en"? 
            <NavLink to="/dashboard"><p className="lg:text-3xl">DashboardApp</p></NavLink>
            : <p className="lg:text-4xl">لوحة التحكم</p>}
                    {isLoggedIn && (
               
            <div className="flex items-center">
                   <p>{language === "en" ? "Welcome" : "مرحبا"}, {userInfo?.name}</p>
            </div>
)}
        </div>
    )
}


export default Header;
