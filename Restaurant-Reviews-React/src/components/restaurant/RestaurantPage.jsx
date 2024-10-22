import { useState } from "react";
import RestaurantInfo from "./RestaurantInfo";
import RestaurantReviews from "./RestaurantReviews";



export default function RestaurantPage (){
  const [activeTab, setActiveTab] = useState("info");

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
      </div>
      <div className="tab-content" >
       {activeTab === "info" ? <RestaurantInfo/> : <RestaurantReviews/> } 
      </div>

    </div>
  )
}