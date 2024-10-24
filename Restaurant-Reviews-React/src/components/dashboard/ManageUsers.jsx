import { useState, useEffect } from "react";
import DashboardSidebar from "../navigation/DashboardSidebar";
import { getUsers } from "../../API";
import './css/manageUsers.css'



export default function ManageUsers() {
  const[users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    getUsers(setUsers, setLoading, setError);
  }, []);

  if(loading) {
    return <p>Loading...</p>;
  }
  if(error) {
    return <p>{error}</p>;
  }

  return(
    <>
    <DashboardSidebar />
    <div className="manage-users-container">
      {Array.isArray(users) && users.length > 0 ? (
        users.map((user) => (
          <div key={user.id} className="user-card" >
          <img src={user.image} alt={`Image of ${user.name}`} />
          <h3>{user.name}</h3>
          <p>ID: {user.id}</p>
          <p>Username: {user.username}</p>
          <p>Role: {user.role}</p>
          <button onClick={() => console.log(`Delete ${user.id}`)} >
            Delete User
          </button>
        </div>
        ))
      ) : (
        <p>No users available</p>
      )}
    </div>
    </>
  )
}