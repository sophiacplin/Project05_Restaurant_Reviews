import { useNavigate } from 'react-router-dom';
import { getUserReviews } from '../../API';
import UserContext from '../login/UserContext';
import DashboardSidebar from '../navigation/DashboardSidebar'
import './css/dashboardMainSection.css';
import { useState, useEffect, useContext } from 'react';



export default function UserReviews() {
  const { user } = useContext(UserContext);
  const [userReviews, setUserReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    if(user?.id){
      getUserReviews(user.id, setUserReviews, setLoading, setError);
    }
  }, [user]);

  if(!user) {
    return <p>Loading user data...</p>;
  }

  if(loading){
    return <p>Loading reviews...</p>;
  }

  if(error) {
    return <p>Error loading reviews: {error}</p>;
  }

  const handleEditClick = (review) => {
    nav(`/restaurant/${review.restaurant_id}/review/${review.id}/edit`);
  };

  return(
    <>
      <DashboardSidebar />
      <div className="dashboard-main-section">
        <h2>Reviews by {user.name || 'User'}</h2>
        {userReviews.length > 0 ? (
          userReviews.map((review) => (
            <div key={review.id} className='user-review-card' >
              <p>Restaurant ID: {review.restaurant_id}</p>
              <p>Review ID: {review.id}</p>
              <p>Rating: {review.rating}</p>
              <p>{review.text}</p>
              <button onClick={() => handleEditClick(review)} >Edit Review</button>
            </div>
          ))
        ) : (
          <p>You have not review any restaurant yet.</p>
        )}
      </div>
    </>
  );
}