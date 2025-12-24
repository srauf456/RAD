//receives edit user to fill form with useeffect
//formData to show data of editing user
import { useState, useEffect } from "react";
import {Button} from "@/components/ui/button";
//
function UserForm({editUser, onAdd, onUpdate, onDoneEditUser}){
  const [formData, setFormData] = useState({
        firstName : "",
        lastName : "",
        email: "", 
        role: "",
         company: {
            department:""
        }
    }
    );
//fill form the details

useEffect(()=>{
    if(editUser){
        setFormData(editUser);
    } else{
        setFormData({
        firstName : "",
        lastName : "",
        email: "", 
        role: "",
        company: {
            department:""
        }
    }
    );
    }
}, [editUser]);

function handleSubmit(e){
    e.preventDefault();
    if(editUser){
        onUpdate({...formData, id: editUser.id});
        onDoneEditUser(); 
    } else{
        onAdd({...formData, id: Date.now()});
    }
    setFormData({
        firstName: "",
        lastName: "",
        email: "",
        role: "",
         company: {
            department:""
        }
    });
    console.log("Updating user:", { ...formData, id: editUser?.id });
}

function handleChange(e){
    const {name, value} = e.target;
     setFormData((prev) => ({ ...prev, [name]: value }));
}
    return <div>
        <form onSubmit={handleSubmit} className="flex flex-col md:w-2xl">
        <input className="border p-2" onChange={handleChange} name="firstName" placeholder="First Name" value={formData.firstName} />
        <input className="border p-2" onChange={handleChange} name="lastName" placeholder="Last Name" value={formData.lastName}/>
        <input className="border p-2" onChange={handleChange} name="email" placeholder="Email" value={formData.email}/>
        <input className="border p-2" onChange={handleChange} name="role" placeholder= "Role" value={formData.role} />
        <input className="border p-2" onChange={handleChange} name="department" placeholder="Department" value={formData.company.department}/>
        <div className="flex gap-3 items-center justify-center py-6">
        <button type="submit" className=" text-black px-6 py-2 rounded">
        {editUser ? "Update User" : "Add User"}
      </button>
      <button type="button" onClick={onDoneEditUser} className=" text-black px-6 py-2 rounded hover:bg-gray-600">Cancel</button>
        </div>
        </form>
    </div>
}


export default UserForm;