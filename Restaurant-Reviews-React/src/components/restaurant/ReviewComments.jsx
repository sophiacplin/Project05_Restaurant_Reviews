import { useState, useEffect, useContext } from "react";
import { getReviewComments, updateReviewComment } from "../../API";
import { useParams, useNavigate } from "react-router-dom";
import UpdateReview from "./UpdateReview";
import UserContext from "../login/UserContext";


export default function ReviewComments ({ comments, fetchComments }) {
  const {user} = useContext(UserContext);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editText, setEditText] = useState("");


  useEffect(() => {
    if(comments.length === 0){
    fetchComments();
  }
  }, [comments.length, fetchComments]);

  const handleEditClick = async (comment) => {
    if(comment.user_id !== user?.id){
      alert("You are not authorized to edit this comment.");
      return;
    }
    setEditingCommentId(comment.id);
    setEditText(comment.text);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditText("");
  }

  const handleSaveEdit = async (commentId) => {
    try {
      const token = localStorage.getItem('token');
      await updateReviewComment(commentId, editText, token);
      fetchComments();
      handleCancelEdit();
    }catch(err) {
      console.error("Failed to update comment", err);
    }
  };

  return(
    <div className="comments-section">
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id} className="comment-card">
            <p>User ID: {comment.user_id}</p>
            {editingCommentId ===comment.id ? (
              <div id="edit-comment-form">
                <textarea 
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={() => handleSaveEdit(comment.id)} >Save</button>
                <button onClick={handleCancelEdit} >Cancel</button>
              </div>
            ) : (
              <>
              <p>{comment.text}</p>
              <button onClick={() => handleEditClick(comment)} >Edit Comment</button>
              </>
            )}
          </div>
        ))
      ) : (
        console.log("No comments for this review")
      )}
    </div>
  );
}