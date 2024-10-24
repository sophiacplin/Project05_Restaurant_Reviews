import { useState } from "react";
import { addReviewComment } from "../../API";
import PropTypes from 'prop-types';


export default function AddReviewComment ({reviewId, reloadComments}) {
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

AddReviewComment.propTypes = {
  reviewId: PropTypes.string.isRequired,
  reloadComments:PropTypes.func.isRequired,
};