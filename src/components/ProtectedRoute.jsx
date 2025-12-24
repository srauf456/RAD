import { Navigate } from "react-router-dom";
import { useDashboardContext } from "../context/DashboardContext";
import Spinner from "./Spinner";


function ProtectedRoute({children}) {
    const {isLoggedIn} = useDashboardContext();
    

    if(!isLoggedIn){
        return <Navigate to="/login" />;
    }
   

    return children;
}

export default ProtectedRoute;