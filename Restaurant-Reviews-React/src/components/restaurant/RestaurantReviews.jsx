import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom";
import { getRestaurantReviews } from "../../API";
import AddRestaurantReview from "../forms/AddRestaurantReview";
import ReviewComments from "./ReviewComments";



export default function RestaurantReviews() {
  const [restaurantReviews, setRestaurantReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {id} = useParams();
  const nav = useNavigate();

  useEffect(() => {
    if(id){
    getRestaurantReviews(id, setRestaurantReviews, setLoading, setError);
    }
  }, [id]);

  if(loading) {
    return <p>Loading reviews...</p>;
  }
  if(error){
    return <p>{error}</p>;
  }

  return(
    <div className="restaurant-main-section">
      <h2>Reviews</h2>
      {restaurantReviews.length > 0 ? (
        restaurantReviews.map((review) => (
          <div key={review.id} className="review-card">
            <p>ID: {review.id}</p>
            <p>User ID: {review.user_id}</p>
            <p>Rating: {review.rating}</p>
            <p>{review.text}</p>
            <ReviewComments reviewId={review.id}/>
          </div>
        )
      )
      ):(
          <p>No reviews available for this restaurant.</p>
      )} 
    </div>
  );
}