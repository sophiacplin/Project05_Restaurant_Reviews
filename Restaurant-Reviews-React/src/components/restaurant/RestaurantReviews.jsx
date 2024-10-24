import { useState, useEffect, useCallback } from "react"
import { useParams, useNavigate } from "react-router-dom";
import { getRestaurantReviews, getReviewComments } from "../../API";
import ReviewComments from "./ReviewComments";
import AddReviewComment from "../forms/AddReviewComment";




export default function RestaurantReviews() {
  const [restaurantReviews, setRestaurantReviews] = useState([]);
  const [commentsMap, setCommentsMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {id} = useParams();
  const nav = useNavigate();

  useEffect(() => {
    if(id){
    getRestaurantReviews(id, setRestaurantReviews, setLoading, setError);
    }
  }, [id]);
  
  const fetchComments = useCallback (async (reviewId) => {
    try{
      const comments = await getReviewComments(reviewId);
      setCommentsMap((prev) => ({
        ...prev,
        [reviewId]: comments,
      }));
    }catch(err) {
      console.error("Error fetching comments", err);
    }
  }, []);


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
            <button onClick={() => nav(`/restaurant/review/${id}/edit`)} >Edit Review</button>

            <ReviewComments 
            reviewId={review.id} 
            comments={commentsMap[review.id] || []}
            fetchComments={() => fetchComments(review.id)}
            />
            <AddReviewComment 
            reviewId={review.id}
            reloadComments={() => fetchComments(review.id)}/>
          </div>
        ))
      ):(
          <p>No reviews available for this restaurant.</p>
      )} 
    </div>
  );
}