import { useState } from "react"
import { addCategory } from "../../API";




export default function AddCategory({reloadCategories}) {
  const [category, setCategory] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const token = localStorage.getItem('token');
      await addCategory(category, token);
      alert('Category added!');
      setCategory('');
      reloadCategories();
    }catch(err) {
      console.error('Failed to add category', err);
      setError('Failed to add category.');
    }
  };

  return(
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          New Category:
        </label>
          <input 
            type="text"
            name="name"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        {error && <p>{error}</p>}
        <button type="submit">Add</button>
      </form>
    </div>
  )
}