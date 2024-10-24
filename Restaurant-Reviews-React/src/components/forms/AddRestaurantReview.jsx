import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserContext from "../login/UserContext";
import { addRestaurantReview } from "../../API";
import './css/addRestaurantReview.css';





export default function AddRestaurantReview () {
  const { id } = useParams();
  const { isAuthenticated } = useContext(UserContext);
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
      nav(`/restaurant/${id}`, {state: {activeTab: "reviews"}});
    }catch(err) {
      console.error('Failed to submit review', err);
      setError('Failed to submit review');
    }
  };

  const handleCancelClick = () => {
    nav(`/restaurant/${id}`, {state: {activeTab: "reviews"}});
  }


  return(
    <>
      {isAuthenticated ? (
        <div id="add-review-container" >
          <form id="add-review-form" onSubmit={handleSubmit}>
          <h3>Add a Review</h3>
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
          {error && <p>{error}</p>}
          <button type="submit" >Post</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </form>
      </div>
      ) : (
        <>
          <h2>Add a Review</h2>
          <p className="login-request-message">You need to log in to perform this action.</p>
        </>
      )}
    </>
  );
}