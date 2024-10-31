import { useContext, useEffect, useState } from "react";
import DashboardSidebar from "../navigation/DashboardSidebar";
import UserContext from "../login/UserContext";
import { getOwnerRestaurants } from "../../API";
import { useNavigate } from "react-router-dom";




export default function OwnerRestaurants(){
  const { user } = useContext(UserContext);
  const [ownerRestaurants, setOwnerRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    if(user?.id) {
      getOwnerRestaurants(user.id, setOwnerRestaurants, setLoading, setError)
    }
  }, [user]);

  if(!user) {
    return <p> Loading user data...</p>;
  }

  if(loading) {
    return <p> Loading restaurants...</p>
  }

  if(error) {
    return <p>Error loading restaurants: {error}</p>;
  }


  return(
    <>
    <DashboardSidebar />
    <div id="owner-restaurants-container">
      <h2>Restaurants owned by {user.name || 'you'}</h2>
      {ownerRestaurants.length > 0 ? (
        ownerRestaurants.map((restaurant) => (
          <div key={restaurant.id} id="owner-restaurant-card">
            <img src={restaurant.image} alt={`Image of ${restaurant.name}`} />
            <p>{restaurant.name}</p>
            <p>ID: {restaurant.id}</p>
            <button onClick={() => nav(`/form/restaurant/${restaurant.id}/edit`)} >Edit</button>
            <button>Delete</button>
          </div>
        ))
      ) : (
        <p>You do not own any restaurants.</p>
      )}
    </div>
    </>
  )
}