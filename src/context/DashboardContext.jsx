import { createContext, useContext, useState } from "react";
//change manual setting login state to firebase auth state
import {auth} from "../firebase";
import { onAuthStateChanged, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { useEffect } from "react";
import {useNavigate } from "react-router-dom";


const DashboardContext = createContext();

//create custom hook to be used later

export const useDashboardContext = () => useContext(DashboardContext);

//define provider component. defines global state management with Context API + Firebase

export function DashboardProvider({children}){
    //define states for theme, login, language, role
   
    const[theme, setTheme] = useState("light");
    const[isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [role, setRole] = useState(null);
    const navigate =  useNavigate();
    const [visitorData, setVisitorData] = useState([]);
    const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;

    const [language, setLanguage] = useState("en");

    //for later
    const [globalMessage, setGlobalMessage] = useState("");

    //for sidebar toggle
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    //for tracking activities
    const [activities, setActivities] = useState([]);

    //define methods
    const toggleTheme = () =>{
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

    //guest
    const continueAsGuest = () =>{
    localStorage.setItem("guest", "true");
    setIsLoggedIn(true);
    setUserInfo({
    name: "Guest User",
    email: null,
    uid: "guest",
  });

  setRole("user");

  addActivity({
  action: "Guest Access",
  text: "Guest user entered dashboard",
  type: "guest",
});

};
    
  
    //login

    

    useEffect(() =>{
        //listerner for auth changes
        const unsubscribe = onAuthStateChanged(auth, async (user) =>{
            //logged in
            if(user){
                setIsLoggedIn(true);
                setUserInfo({
                    name: user.displayName || user.email,
                    email : user.email,
                    uid: user.uid,
                });
                addActivity({
                    action: "User logged in",
                    text: `${user.displayName || user.email} logged in`,
                    type: "login",
                });
            try{
                if (user.email === ADMIN_EMAIL) {
                setRole("admin");
                } else{
                const res = await fetch("https://dummyjson.com/users?limit=15");
                const apiUsers = await res.json();
                const matchedUser = apiUsers.users.find((u) => u.email === user.email);
                //set admin for testing
                if(matchedUser?.role){
                setRole(matchedUser.role);
            }
            else{
                setRole("user");
            }
        }
    }
            catch(error){
                console.log("Error fetching user role:", error);
            }
            
        } else{
        const isGuest = localStorage.getItem("guest");
        if(isGuest){
            setIsLoggedIn(true);
            setUserInfo({
                name: "Guest user",
                email:null,
                uid: "guest",
            });
            setRole("user");
            
            
        }
        
        else{
            setIsLoggedIn(false);
            setUserInfo(null);
            setRole(null);
        }
        
    }
        
    });
    
        return () => unsubscribe();
    }, []);
    
    const loginUser = (user) => {
            setUserInfo(user);
            setIsLoggedIn(true);
    };

    const logoutUser = () => {
        setUserInfo(null);
        setIsLoggedIn(false);
        navigate("/login");
    };

    const loginWithGoogle = async () =>{
        const provider = new GoogleAuthProvider();
        try{
            const result = await signInWithRedirect(auth, provider);
            console.log("Logged in as:", result.user.displayName);
        } catch(error){
            console.log("Google auth failed:", error);
            alert("Login failed. Try again.");
        }
    };

 
    const changeLanguage = (lang) =>{
        setLanguage(lang);
    };

    //helper function for activites
    const addActivity = (activity) => {
  setActivities((prev) => [
    {
      id: Date.now(),
      time: new Date().toLocaleTimeString(),
     ...activity,
    },
    ...prev,
  ]);
};

    //context values
    const value = {
        theme,
        toggleTheme,
        isLoggedIn,
        loginUser,
        logoutUser,
        userInfo,
        language,
        changeLanguage,
        role,
        globalMessage,
        setGlobalMessage,
        loginWithGoogle,
        isSidebarOpen,
        setSidebarOpen,
        visitorData,
        setVisitorData,
        continueAsGuest,
        activities, 
        addActivity,
    };

    return (
        <DashboardContext.Provider value={value}>
            {children}
            </DashboardContext.Provider>
    )
}