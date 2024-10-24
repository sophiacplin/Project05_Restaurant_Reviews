import { useEffect, useState } from "react";
import RestaurantInfo from "./RestaurantInfo";
import RestaurantReviews from "./RestaurantReviews";
import { useParams, useNavigate, useLocation } from "react-router-dom";



export default function RestaurantPage (){
  const [activeTab, setActiveTab] = useState("info");
  const {id} = useParams();
  const nav = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if(location.state && location.state.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

  const handleClick = () => {
    nav(`/restaurant/${id}/review/form`)
  }

  
  return (
    <div className="restaurant-page">

      <div className="tab-navigation">
        <button
          className={`tab-button${activeTab === "info" ? "active" : ""}`}
          onClick={() => setActiveTab("info")}
        >
          Info
        </button>
        <button
          className={`tab-button ${activeTab === "reviews" ? "active" : ""}`}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews
        </button>
        <button
          className="add-review-button"
          onClick={() => handleClick() }
        >
          Add Review
        </button>
      </div>
      <div className="tab-content" >
       {activeTab === "info" ? (
        <RestaurantInfo/>
        ) : 
        (<RestaurantReviews/>
        )} 
      </div>
    </div>
  )
}