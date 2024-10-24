import { useEffect, useState } from "react";
import DashboardSidebar from "../navigation/DashboardSidebar";
import { getRestaurants } from "../../API";





export default function ManageRestaurants(){
  const [restaurants, setRestaurants]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

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
    <div className="manage-restaurants-container" >
      {Array.isArray(restaurants) && restaurants.length > 0 ? (
        restaurants.map((restaurant) => (
          <div key={restaurant.id} className="manage-restaurant-card" >
            <p>{restaurant.name}</p>
            <p>ID: {restaurant.id}</p>
            <p>Owner ID: {restaurant.owner_id}</p>
            <button>Assign Owner</button>
            <button>Edit</button>
            <button>Delete</button>
            
          </div>
        ))
      ) : (
        <p>No restaurants available</p>
      )}
    </div>
    </>
  )
}