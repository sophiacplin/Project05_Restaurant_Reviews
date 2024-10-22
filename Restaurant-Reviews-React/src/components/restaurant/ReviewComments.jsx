import { useState, useEffect } from "react";
import { getReviewComments } from "../../API";



export default function ReviewComments ({reviewId}) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try{
        await getReviewComments(reviewId, setComments, setLoading);
      }catch(err) {
        console.error('Error fetching comment: ', err);
      }
    };
    if(reviewId) {
      fetchComments();
    }
  }, [reviewId]);

  if(loading) {
    return <p>Loading comments...</p>;
  }

  return(
    <div className="comments-section">
      {comments.length > 0 ? (comments.map((comment) => (
          <div key={comment.id} className="comment-card">
            <p>User ID: {comment.id}</p>
            <p>{comment.text}</p>
          </div>
        ))
      ) : (
        console.log("No comments for this review")
      )}
    </div>
  );
}