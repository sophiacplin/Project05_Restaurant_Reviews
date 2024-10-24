import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchSingleReview, updateUserReview } from "../../API";



export default function UpdateReview () {
  const {restaurantId, reviewId} = useParams();
  const [rating, setRating] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    const fetchReview = async () => {
      try{
        const review = await fetchSingleReview(reviewId);
          setRating(review.rating);
          setText(review.text);

      }catch (err){
        console.error("Failed to load review", err);
        setError("Failed to load review");
      }
    };
    fetchReview();
  }, [reviewId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try{
      const review = {rating, text};
      const token = localStorage.getItem("token");
      await updateUserReview(reviewId, review, token);
      alert("Review updated successfully!");
      nav(`/restaurant/${restaurantId}`, {state: {activeTab: "reviews"}});
    }catch(err) {
      console.error('Failed to update review', err);
      setError("Failed to update review");
    }
  };

  return (
    <form onSubmit={handleUpdate} >
      <h3>Edit Review</h3>
      <label>Rating:</label>
      <div className="rating-options" >
        {[1, 2, 3, 4, 5].map((num) => (
          <label key={num}>
            <input 
            type="radio"
            name="rating"
            value={{num}}
            checked={rating === num}
            onChange={() => setRating(num)}
            required
            />
            {num}
          </label>
        ))}
        </div>
        <textarea 
            placeholder="Write your review here"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
          {error && <p>{error}</p>}
          <button type="submit" >Update Review</button>
    </form>
  );

}