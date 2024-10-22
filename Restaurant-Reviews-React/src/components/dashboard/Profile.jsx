import { useEffect, useState, useContext } from "react";
import DashboardSidebar from "../navigation/DashboardSidebar";
import './css/dashboardMainSection.css';
import { fetchSingleUser } from "../../API";
import UserContext from '../login/UserContext';


export default function Profile() {
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

const { user: loggedInUser } = useContext(UserContext);
const userId = loggedInUser?.id;

useEffect(() => {
  const getSingleUser = async () => {
    try{
      const userData = await fetchSingleUser(userId);
      setUser(userData);
    }catch (err) {
      setError('Failed to fetch user information');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  if(userId) {
    getSingleUser();
  }
}, [userId]);

if(loading) {
  return <p>Loading user data...</p>;
}
if(error) {
  return <p>{error}</p>;
}

  return(
    <>
      <DashboardSidebar />
      <div className="profile-main-section">
        <h2>Profile</h2>
        <img src={user?.image} alt={`Image of ${user?.name}`} />
        <p>Name: {user?.name}</p>
        <p>Role: {user?.role}</p>
        <button>Change Name</button>
      </div>
    </>
  )
}