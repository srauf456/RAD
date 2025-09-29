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
    }
    );
    }
}, [editUser]);

function handleSubmit(e){
    e.preventDefault();
    if(editUser){
        onUpdate({...formData, id: editUser.id});
        onDoneEditUser(); //setEditUser(null)
      //  console.log(editUser);
    } else{
        onAdd({...formData, id: Date.now()});
    }
    setFormData({
        firstName: "",
        lastName: "",
        email: "",
        role: "",
    });
    console.log("Updating user:", { ...formData, id: editUser?.id });
}

function handleChange(e){
    const {name, value} = e.target;
     setFormData((prev) => ({ ...prev, [name]: value }));
}
    return <div>
        <form onSubmit={handleSubmit}>
        <input className="border p-2 w-full" onChange={handleChange} name="firstName" placeholder="First Name" value={formData.firstName} />
        <input className="border p-2 w-full" onChange={handleChange} name="lastName" placeholder="Last Name" value={formData.lastName}/>
        <input className="border p-2 w-full" onChange={handleChange} name="email" placeholder="Email" value={formData.email}/>
        <input className="border p-2 w-full" onChange={handleChange} name="role" placeholder= "Role" value={formData.role} />
        <Button type="submit" className="bg-green-300 text-black px-4 py-2 rounded">
        {editUser ? "Update User" : "Add User"}
      </Button>
      <button type="button" onClick={onDoneEditUser} className="bg-green-300 text-black px-4 py-2 rounded">Cancel</button>
        </form>
    </div>
}


export default UserForm;