import { useDashboardContext } from "../context/DashboardContext";
import { MdMenu } from "react-icons/md";
import { NavLink } from "react-router-dom";

function Header(){
   
   const {theme, isLoggedIn, userInfo, language,  isSidebarOpen, setSidebarOpen} = useDashboardContext();

    const toggleSidebar = () =>{
    setSidebarOpen(!isSidebarOpen);
};
   
    return(
    <header className={`fixed top-0 left-0 right-0 h-16 shadow-md py-4 px-8 flex items-center justify-between z-50 ${theme === "dark"? "bg-gray-600 text-white" : "bg-white"}`}>
        <div className={"h-full md:px-8 flex items-center max-w-6xl mx-auto gap-10 md:gap-36"}>
           <div className="flex items-center gap-2 md:gap-2">
           <button onClick={toggleSidebar} className={`md:hidden ${theme === "dark"? "bg-gray-800 text-black" : "bg-white"}`} ><MdMenu/></button>
         
            <NavLink to="/dashboard" className="flex items-center">
              {language === "en"? (
                <div className="flex gap-4">
                    <span className="md:text-xl">R.A.D</span>
                    <span className="text-xs md:text-lg sm:block hidden"> React Admin Dashboard</span>
                    </div>
              ) : (
              <p className="lg:text-4xl">لوحة التحكم</p>
              )}
                    </NavLink>
                    </div>
            
                    {isLoggedIn && (

              <div className="flex items-center gap-2 md:gap-3">
            <div className="hidden sm:flex gap-2">
              <span className="text-md text-gray-500 dark:text-gray-400">
                {language === "en" ? "Welcome," : "مرحبا"}
              </span>
              <span className="text-sm md:text-base ">
                {userInfo?.name}
              </span>
            </div>
               
            <div className="sm:hidden flex items-center gap-1 text-sm">
                   <span className="hidden">{language === "en" ? "Welcome" : "مرحبا"}</span>
                 <span className="">{userInfo?.name}</span>
            </div>

            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-green-300 to-gray-200 flex items-center justify-center text-black font-semibold text-sm md:text-base flex-shrink-0">
              {userInfo?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
            </div>
)}
</div>
        
        </header>
    )
}


export default Header;
