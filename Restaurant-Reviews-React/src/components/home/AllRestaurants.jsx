import { useEffect, useState } from "react"
import { getRestaurants } from "../../API";
import { useNavigate } from "react-router-dom";
import "./home.css";



export default function AllRestaurants() {
  const [restaurants, setRestaurants] =useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    getRestaurants(setRestaurants, setLoading, setError);
  }, []);
  
  if(loading) {
    return <p>Loading...</p>;
  }
  if(error){
    return <p>{error}</p>;
  }

  return(
    <div>
      <div className="restaurant-container">
        {Array.isArray(restaurants) && restaurants.length > 0 ? (  // Ensure it's an array
          restaurants.map((restaurant) => (
            <div key={restaurant.id} className="restaurant-card">
              <img src={restaurant.image} alt={`Image of ${restaurant.name}`} />
              <div id="info-section">
                <h2>{restaurant.name}</h2>
                <p>{restaurant.address}</p>
                <p>{restaurant.phone}</p>
              </div>
              <button onClick={() => nav(`/restaurant/${restaurant.id}`)} >View Restaurant</button>
            </div>
          ))
        ) : (
          <p>No restaurants available</p>  // Display a message if the array is empty
        )}
      </div>
    </div>
  )
}