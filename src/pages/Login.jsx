import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useDashboardContext } from "../context/DashboardContext";
import { useNavigate } from "react-router-dom";
function Login(){
    const [isRegister, setIsRegister] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const {isLoggedIn, loginWithGoogle} = useDashboardContext();
 useEffect(()=>{
        if(isLoggedIn) navigate("/dashboard");
    }, [isLoggedIn]);


const handleSubmit = async (e) =>{
    e.preventDefault();
    try{
        if(isRegister){
            await createUserWithEmailAndPassword(auth, email, password);
            alert("Account created sucessfully");
        } else{
            await signInWithEmailAndPassword(auth, email, password);
            alert("Logged in");
        }
        }
    catch(error){
        alert(error.message);
    }
};

  
    return (
        <div className="flex rounded shadow-xl">
            <form onSubmit={handleSubmit} className="m-6 p-2 gap-6 flex justify-center items-center flex-col">
            <h2 className="text-3xl">{isRegister ? "Register" : "Login"}</h2>
            <input className="border p-2" type="email" value={email} placeholder="Email" onChange={(e)=> setEmail(e.target.value)} required/>
            <input className="border p-2" type="password" value={password} placeholder="Password" onChange={(e)=> setPassword(e.target.value)} required/>
            <button type="submit" className="rounded text-xl mt-6 px-3 py-1">{isRegister? "Create Account": "Login"}</button>
            <button onClick={loginWithGoogle} className="rounded hover:bg-green-300">Login with Google</button>
            <p onClick={(e) => setIsRegister(!isRegister)} className="cursor-pointer">{isRegister ? "Already have an account? Login" : "Don't have an account? Register"}</p>
            </form>
        </div>
    );
}
export default Login;