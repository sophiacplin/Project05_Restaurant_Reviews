import { useContext, useState } from "react";
import UserContext from "../login/UserContext";
import { addReviewComment } from "../../API";



export default function AddReviewComment ({reviewId, reloadComments}) {
  const {isAuthenticated, user} = useContext(UserContext);
  const [text, setText] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const token = localStorage.getItem('token');
      await addReviewComment(reviewId, text, token);
      alert('Review submitted successfully!');
      setText("");
      reloadComments();
    }catch(err) {
      console.error('Failed to submit review', err);
      setError('Failed to submit review');
    }
  }

  return(
  <form id="add-comment-section" onSubmit={handleSubmit}>
    <textarea 
    placeholder="Add comment here"
    value={text}
    onChange={(e) => setText(e.target.value)}
    required
    />
    {error && <p>{error}</p>}
    <button type="submit">Post Comment</button>
  </form>
  )
}