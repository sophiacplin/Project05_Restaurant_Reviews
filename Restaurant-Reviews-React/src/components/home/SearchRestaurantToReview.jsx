import { useState, useEffect } from "react";
import { getRestaurants } from "../../API";
import { useNavigate } from "react-router-dom";
import './searchRestaurantToReview.css'




export default function SearchRestaurantToReview() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const[filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const [searchTriggered, setSearchTriggered] = useState(false);
  const nav = useNavigate();

  //fetch restaurants
  useEffect(() => {
    getRestaurants(setRestaurants, setLoading, setError);
  }, []);

  //function to handle search when the "Search" button is clicked
  const handleSearch = () => {
    if(searchQuery === ""){
      setFilteredRestaurants(restaurants);
    }else {
      const filtered = restaurants.filter((restaurant) => 
      restaurant.name.toLowerCase().includes(searchQuery.toLocaleLowerCase())
      );
      setFilteredRestaurants(filtered);
    }
    setSearchTriggered(true);
  }

  if(loading){
    return <p>Loading...</p>;
  }
  if(error){
    return <p>{error}</p>;
  }

  return(
    <div className="main-section">
      <h2>Search Restaurant to Review</h2>
      
      {/* Search Bar */}
      <input 
        className="search-bar"
        type="text"
        placeholder="Search restaurants..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch} className="search-button" >
          Search 
        </button>

      {/* Display filtered restaurants after search */}
      {searchTriggered && (
        <div id="search-result-container">
          {filteredRestaurants.length > 0 ? (
            filteredRestaurants.map((restaurant) => (
              <div key={restaurant.id} className="search-restaurant-card">
                <img src= {restaurant.image} alt={`image of ${restaurant.name}`} />
                <h3>{restaurant.name}</h3>
                <button onClick={() => nav(`/restaurant/${restaurant.id}/review/form`)} >
                  Review this Restaurant
                </button>
              </div>
            ))
          ) : (
            <p>No restaurants match your search.</p>
          )}
      </div>
      )}
    </div>
  );
}