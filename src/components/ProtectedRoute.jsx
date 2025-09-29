import { Navigate } from "react-router-dom";
import { useDashboardContext } from "../context/DashboardContext";


function ProtectedRoute({children, allowedRoles}) {
    const {isLoggedIn, role} = useDashboardContext();

    if(!isLoggedIn){
        return <Navigate to="/login" />;
    }
    return children;
}

export default ProtectedRoute;