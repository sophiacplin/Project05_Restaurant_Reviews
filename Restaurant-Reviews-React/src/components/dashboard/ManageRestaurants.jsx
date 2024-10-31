import { useEffect, useState } from "react";
import DashboardSidebar from "../navigation/DashboardSidebar";
import { getRestaurants } from "../../API";
import { useNavigate } from "react-router-dom";
import './css/manageRestaurants.css'



export default function ManageRestaurants(){
  const [restaurants, setRestaurants]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    getRestaurants(setRestaurants, setLoading, setError)
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
    <div id="manage-restaurants-page" >
      <h2>Manage Restaurants</h2>
      <button>Add a Restaurant</button>
      <div id="manage-restaurants-container" >
        {Array.isArray(restaurants) && restaurants.length > 0 ? (
          restaurants.map((restaurant) => (
            <div key={restaurant.id} id="manage-restaurant-card" >
              <img src={restaurant.image} alt={`Image of ${restaurant.name}`} />
              <p>{restaurant.name}</p>
              <p>ID: {restaurant.id}</p>
              <p>Owner ID: {restaurant.owner_id}</p>
              <button onClick={() => nav(`/form/assign-owner/restaurant/${restaurant.id}`)}>Assign Owner</button>
              <button onClick={() => nav(`/form/restaurant/${restaurant.id}/edit`)} >Edit</button>
              <button>Delete</button>
            </div>
          ))
        ) : (
          <p>No restaurants available</p>
        )}
      </div>
    </div>
    </>
  )
}