import DashboardSidebar from "../navigation/DashboardSidebar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../../API";


export default function ManageCategory() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    getCategories(setCategories, setLoading, setError);
  }, []);

  if(loading) {
    return <p>Loading...</p>;
  }
  if(error) {
    return <p>{error}</p>;
  }

  return(
    <>
    <DashboardSidebar />
    <div className="dashboard-main-section">
      <h2>Manage Categories</h2>
      <div className="manage-categories-container">
        {Array.isArray(categories) && categories.length > 0 ? (
          categories.map((category) => (
            <div key={category.id} id="category-card">
              <h3>{category.name}</h3>
              <button>Delete</button>
            </div>
          ))
        ) : (
          <p>No categories available.</p>
        )}
      </div>
    </div>
    </>
  )
}