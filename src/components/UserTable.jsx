import {useDashboardContext} from "../context/DashboardContext";
function UserTable({users, dispatch, setEditUser}){
   // const [editUser, setEditUser] = useState(null);
   const {role} = useDashboardContext();
return(
    <table className="rounded shadow mt-8 table-auto min-w-full">
        <thead>
            <tr >
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Role</th>
                <th className="p-3 border">Department</th>
                {role === "admin" && <th className="p-3 border">X</th>}
                {role === "admin" && <th className="p-3 border">Edit</th>}
            </tr>
        </thead>
        <tbody>
            {users.map((user) => (
                <tr key={user.id}>
                <td className="p-3 border">{user.firstName+' '}{user.lastName}</td>
                <td className="p-3 border">{user.email}</td>
                <td className="p-3 border">{user.role}</td>
                <td className="p-3 border">{user.company.department}</td>
                {role === "admin" && (
                <td className="p-3 border"> 
              <button
                onClick={() =>
                  dispatch({ type: "DELETE_USER", payload: user.id })
                }
                className="px-3 py-1 bg-red-500 text-red-500 rounded"
              >
                Delete
              </button>
            </td>
                )}

                {role === "admin" && (
               <td className="p-3 border"> 
              <button
                onClick={() => setEditUser(user)}  //editUser now has user object data     
               className="px-3 py-1 bg-red-500 text-red-500 rounded"
              >
                Edit
              </button>
            </td>
                )}
           
                </tr>
            ))}
        </tbody>
    </table>
);
}


export default UserTable;

