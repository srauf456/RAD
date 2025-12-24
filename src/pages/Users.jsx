import { useState, useEffect , useReducer } from "react";
import axios from "axios";
import UserTable from "../components/UserTable";
import UserForm from "../components/UserForm";
import Spinner from "../components/Spinner";
import { initialState, userReducer } from "../reducers/userReducer";
import { useDashboardContext } from "../context/DashboardContext";


//component fetches users
//holds state for Users, Edit, form Data
//contains 
function Users(){
    const {role, addActivity, userInfo} = useDashboardContext();
    
    // const [users, setUsers] = useState([]); //no need for useState after useReducer
    //state.users is now an array of 10 user objects
    
    const [state, dispatch] = useReducer(userReducer, initialState );
    
    const [loading, setLoading] = useState(true);
    //states for search, edit and form
    const [activeUser, setActiveUser] = useState(null);
  //search users by name or Email
    const [searchTerm, setSearchTerm] = useState("");
    //filter by role
    const [roleFilter, setRoleFilter] = useState("All");
    const [deptFilter, setDeptFilter] = useState("All");
   

//useEffect to load users
       useEffect(() =>{
        console.log("Users role: ", role);
        const fetchUser = async () => {
        
        const res = await axios.get("https://dummyjson.com/users?limit=20");
        dispatch({type: "SET_USERS", payload: res.data.users});
       // setUsers(res.data.users);
        setLoading(false);
        //check state status
           
        };
        fetchUser(); 
     
    },[role]);
   
    //SEARCH functionality

    const filteredUsers = state.users.filter((user) => {
        const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
        const matchesSearch = fullName.includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = roleFilter === "All" || user.role === roleFilter;
        const matchesFilter = deptFilter === "All" || user.company?.department.toLowerCase() === deptFilter.toLowerCase();
        return matchesSearch && matchesRole && matchesFilter; //return true when both match
        
    });
    return (
        <div> 
            <h1>Users</h1>
                {role==="admin" && !activeUser && (
                    <div className="flex flex-wrap gap-16 mt-8 sm:flex justify-center">
                    <button onClick={() =>
                        setActiveUser({})}
                       // setShowAddForm(true);
                     className="bg-green-300 text-black py-2 rounded m-4 w-fit" >Add New User</button>
            </div>    )}
               
               {role === "admin" && activeUser && (
                
               <UserForm editUser={activeUser && Object.keys(activeUser).length? activeUser : null} onDoneEditUser={() => 
               setActiveUser(null)}
            // setShowAddForm(false);}}
              onAdd={(user) => { 
                dispatch({type: "ADD_USER", payload: user});
                if(role === "admin"){
                addActivity({
                    text: `${userInfo?.name || "Admin"} added a new user: ${user.firstName} ${user.lastName}`
                });
                }
               // setEditUser(null);
            //setShowAddForm(false);
            setActiveUser(null);
            }} 
             onUpdate={(user) => {
                dispatch({ type: "UPDATE_USER", payload: user });
                if(role === "admin"){
                addActivity({
                    text: `${userInfo?.name || "Admin"} updated a user: ${user.firstName} ${user.lastName}`
                });
                }
                setActiveUser(null);
             //   setEditUser(null);
            //setShowAddForm(false);
        }}
                  dispatch={dispatch}/> 

                )}

            {loading? ( 
                <Spinner/> 
                ):( 
                <div className="flex flex-col gap-16 mt-8 items-center justify-center">
                 <div className="flex flex-col gap-4 items-center">   
                    <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search by Name or Email" className="border p-2 rounded"/> <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="border rounded p-2"><option value="All">All</option><option value="admin">Admin</option><option value="moderator">Moderator</option></select>
            <select value={deptFilter} onChange={(e)=> setDeptFilter(e.target.value)} className="border rounded p-2"><option value="All">All</option><option value="engineering">Engineering</option><option value="support">Support</option><option value="hresources">Human Resources</option><option value="pmanagement">Product Management</option><option value="research">Research and Development</option><option value="marketing">Marketing</option></select>
             <button onClick={() => {
                setSearchTerm("");
                setRoleFilter("All");
                setDeptFilter("All"); 
            }}className="bg-green-300 text-black px-4 py-2 rounded m-2 underline w-fit">Clear Filters</button></div>
            <div className="w-full max-w-5xl overflow-x-auto">
             <UserTable users={filteredUsers} 
                setActiveUser={setActiveUser}
              //  setEditUser(user);
              //  setShowAddForm(true);
             dispatch={dispatch}/>
            </div>
            </div>
         )}
         

</div>
        
        );
    }
export default Users;   