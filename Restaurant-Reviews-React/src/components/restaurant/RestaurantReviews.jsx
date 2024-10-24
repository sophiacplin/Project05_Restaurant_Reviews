import { useState, useEffect, useCallback, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom";
import { getRestaurantReviews, getReviewComments } from "../../API";
import ReviewComments from "./ReviewComments";
import AddReviewComment from "../forms/AddReviewComment";
import UserContext from "../login/UserContext";




export default function RestaurantReviews() {
  const { user } = useContext(UserContext);
  const [restaurantReviews, setRestaurantReviews] = useState([]);
  const [commentsMap, setCommentsMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editError, setEditError] = useState("");
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

  const handleEditClick = (review) => {
    if(review.user_id !== user?.id) {
      setEditError("You are not the owner of this review");
    }else {
      nav(`/restaurant/${id}/review/${review.id}/edit`);
    }
  }


  if(loading) {
    return <p>Loading reviews...</p>;
  }
  if(error){
    return <p>{error}</p>;
  }

  return(
    <div className="restaurant-main-section">
      <h2>Reviews</h2>
      {editError && <p className="error-message">{editError}</p>}
      {restaurantReviews.length > 0 ? (
        restaurantReviews.map((review) => (
          <div key={review.id} className="review-card">
            <p>ID: {review.id}</p>
            <p>User ID: {review.user_id}</p>
            <p>Rating: {review.rating}</p>
            <p>{review.text}</p>
            <button onClick={() => handleEditClick(review)} >Edit Review</button>

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