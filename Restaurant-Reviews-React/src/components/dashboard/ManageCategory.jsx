import DashboardSidebar from "../navigation/DashboardSidebar";
import { useState, useEffect } from "react";
import { getCategories } from "../../API";
import './css/ManageCategory.css';

export default function ManageCategory() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

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
    <div id="manage-category-title">
      <h2>Manage Categories</h2>
      <button>Add Category</button>
      </div>
    <div id="manage-category-container">
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
    
    </>
  )
}