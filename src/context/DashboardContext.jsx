import { createContext, useContext, useState } from "react";
//change manual setting login state to firebase auth state
import {auth} from "../firebase";
import { onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
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
    

    const [language, setLanguage] = useState("en");

    //for later
    const [globalMessage, setGlobalMessage] = useState("");

    //for sidebar toggle
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    //define methods
    const toggleTheme = () =>{
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

    //login

    useEffect(() =>{
        //listerner for auth changes
        const unsubscribe = onAuthStateChanged(auth, async (user) =>{
            if(user){
                setIsLoggedIn(true);
                setUserInfo({
                    name: user.displayName || user.email,
                    email : user.email,
                    uid: user.uid,
                });
            

            try{
                const res = await fetch("https://dummyjson.com/users?limit=10");
                const apiUsers = await res.json();
                const matchedUser = apiUsers.users.find((u) => u.email === user.email);
                //set admin for testing
                if(user.email === "srauf456@gmail.com"){
                    setRole("admin");
                } else{
                    setRole(matchedUser?.role || "user");
                }
            }
            catch(error){
                console.log("Error fetching user role:", error);
                setRole("user");
            }
        } else {
            setIsLoggedIn(false);
            setUserInfo(null);
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
            const result = await signInWithPopup(auth, provider);
            console.log("Logged in as:", result.user.displayName);
        } catch(error){
            console.log("Google auth failed:", error);
            alert("Login failed. Try again.");
        }
    };

 
    const changeLanguage = (lang) =>{
        setLanguage(lang);
       // console.log(lang);
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
        setSidebarOpen
    };

    return (
        <DashboardContext.Provider value={value}>
            {children}
            </DashboardContext.Provider>
    )
}