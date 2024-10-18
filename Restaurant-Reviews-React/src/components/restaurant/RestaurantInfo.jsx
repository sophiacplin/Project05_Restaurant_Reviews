import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchSingleRestaurant } from "../../API";
import './restaurant.css';


export default function RestaurantInfo() {
  const [restaurant, setRestaurant] = useState(null);
  const {id} = useParams();

  useEffect(() => {
    const getRestaurant = async () => {
      try{
        const restaurantData = await fetchSingleRestaurant(id);
        setRestaurant(restaurantData);
      }catch(err){
      console.error('Error fetching restaurant', err);
      }
    };
    if(id){
      getRestaurant();
    }
  }, [id]);

  if(!restaurant){
    return <p>Loading restaurant data...</p>;
  }

  const backgroundImageStyle = {
    backgroundImage: `url(${restaurant.image})`,
    backgroundRepeat: 'repeat-x',
    backgroundSize: 'auto 100%',
    backgroundPosition:'top',
    width: '100%',
    height: '300px'
  };

  return(
    <div className="restaurant-main-section">
      <div style={backgroundImageStyle}></div>
      <h2>{restaurant.name}</h2>
      <p>{restaurant.category}</p>
      <p>Phone: {restaurant.phone}</p>
      <p>Address: {restaurant.address}</p>
      <p>Hours: {restaurant.open_time}:00-{restaurant.closing_time}:00</p>
    </div>
  )
}