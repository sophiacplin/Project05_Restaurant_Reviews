import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserContext from "../login/UserContext";
import { addRestaurantReview } from "../../API";





export default function AddRestaurantReview () {
  const { id } = useParams();
  const { isAuthenticated, logout, user } = useContext(UserContext);
  const [text, setText] = useState("");
  const [rating, setRating] = useState("");
  const [error, setError] = useState(null);
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const review = {rating, text};
      const token = localStorage.getItem('token');
      await addRestaurantReview(id, review, token);
      alert('Review submitted successfully!');
    }catch(err) {
      console.error('Failed to submit review', err);
      setError('Failed to submit review');
    }
  };

  return(
    <>
      {isAuthenticated ? (<form onSubmit={handleSubmit}>
        <h3>Add a review</h3>
        <label>Rating: </label>
        <label>
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
          
        </label>
        <textarea 
          placeholder="Write your review here"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <button type="submit" >Post</button>
        {error && <p>{error}</p>}
      </form>
      ) : (
        <>
          <h2>Add a Review</h2>
          <p className="login-request-message">You need to log in to perform this action.</p>
        </>
      )}
    </>
  );
}