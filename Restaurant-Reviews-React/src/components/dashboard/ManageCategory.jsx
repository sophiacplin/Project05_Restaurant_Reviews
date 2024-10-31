import DashboardSidebar from "../navigation/DashboardSidebar";
import { useState, useEffect } from "react";
import { fetchCategories, getCategories } from "../../API";
import './css/ManageCategory.css';
import AddCategory from "../forms/AddCategory";


export default function ManageCategory() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadCategories = async () => {
    setLoading(true);
    try{
      const data = await fetchCategories();
      setCategories(data);
      setError(null);
    }catch(err) {
      console.error("Failed to load categories", err);
      setError('Failed to load categories');
    }finally {
      setLoading(false);
    }
  };

  useEffect(() => {
   loadCategories();
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
      <AddCategory
        reloadCategories={loadCategories}
      />
      </div>
    <div id="manage-category-container">
      {Array.isArray(categories) && categories.length > 0 ? (
        categories.map((category) => (
          <div key={category.id} id="category-card">
            <h3>{category.name}</h3>
            <button>x</button>
          </div>
        ))
      ) : (
        <p>No categories available.</p>
      )}
    </div>
    </>
  )
}