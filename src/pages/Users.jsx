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
    // const [users, setUsers] = useState([]); //no need for useState after useReducer
    //state.users is now an array of 10 user objects
    const [state, dispatch] = useReducer(userReducer, initialState );
    
    const [loading, setLoading] = useState(true);
    //states for search, edit and form
    const [editUser, setEditUser] = useState(null);
  //search users by name or Email
    const [searchTerm, setSearchTerm] = useState("");
    //filter by role
    const [roleFilter, setRoleFilter] = useState("All");
    const [deptFilter, setDeptFilter] = useState("All");
    const [showAddForm, setShowAddForm] = useState(false);
    const {role} = useDashboardContext();
   
//useEffect to load users
    useEffect(() =>{
        const timer = setTimeout(() =>{

       
        const fetchUser = async () => {
        const res = await axios.get("https://dummyjson.com/users?limit=10");
        dispatch({type: "SET_USERS", payload: res.data.users});
       // setUsers(res.data.users);
        setLoading(false);
        //check state status
           
        };
        fetchUser(); 
    }, 1000);
    },[]);
    // useEffect(() =>{
    //      console.log(state); 
    // }, [state]);

    //useEffect()
   
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
            <div>
                {role==="admin" &&!editUser && !showAddForm && (
                    <button onClick={() =>{
                        setEditUser(null);
                        setShowAddForm(true);
                    }} className="bg-green-300 text-black px-4 py-2 rounded m-4" >Add New User</button>
                ) }

               {role === "admin" && (editUser || showAddForm) && (
               <UserForm editUser={editUser} onDoneEditUser={() => {
                setEditUser(null);
            setShowAddForm(false);}} onAdd={(user) => { 
                dispatch({type: "ADD_USER", payload: user});
               // setEditUser(null);
            setShowAddForm(false);
            }} 
             onUpdate={(user) => {
                dispatch({ type: "UPDATE_USER", payload: user });
                setEditUser(null);
            setShowAddForm(false);
        }}
                  dispatch={dispatch}>

                </UserForm> 
                )}
               

            {loading? <Spinner/> :<div> <div className="flex flex-col gap-3"><input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search by Name or Email" className="border p-2 rounded"/> <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="border rounded p-2"><option value="All">All</option><option value="admin">Admin</option><option value="moderator">Moderator</option></select>
            <select value={deptFilter} onChange={(e)=> setDeptFilter(e.target.value)} className="border rounded p-2"><option value="All">All</option><option value="engineering">Engineering</option><option value="support">Support</option><option value="hresources">Human Resources</option><option value="pmanagement">Product Management</option><option value="research">Research and Development</option><option value="marketing">Marketing</option></select>
             <button onClick={() => {
                setSearchTerm("");
                setRoleFilter("All");
                setDeptFilter("All"); 
            }}className="bg-green-300 text-black px-4 py-2 rounded m-2 underline">Clear Filters</button></div> <UserTable users={filteredUsers} setEditUser={(user)=>{
                setEditUser(user);
                setShowAddForm(true);
            }} dispatch={dispatch}/></div>}
         


        
            </div>    
        
        </div>
    ); 
}
export default Users;   
{/* <button  className="bg-green-300 text-black px-4 py-2 rounded m-4" onClick={() => {const dummyUser = {id: Date.now(),
                firstName: "Sara", lastName: "R", email: "spajfg@gmail.com", role: "admin",}; dispatch({type: "ADD_USER", payload: dummyUser});
            }}>Add User</button> */}