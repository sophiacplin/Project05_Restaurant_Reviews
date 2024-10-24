import { useState, useEffect } from "react";
import { getReviewComments } from "../../API";



export default function ReviewComments ({ reviewId, comments, fetchComments }) {

  useEffect(() => {
    if(comments.length === 0){
    fetchComments();
  }
  }, [reviewId]);



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