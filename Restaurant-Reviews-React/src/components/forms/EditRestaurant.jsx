import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCategories, fetchSingleRestaurant, updateRestaurant } from "../../API";
import './css/editRestaurantForm.css';


export default function EditRestaurant() {
  const {id: restaurantId} = useParams();
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [openTime, setOpenTime] = useState("");
  const [closingTime, setClosingTime] = useState("");
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    const loadCategories = async () => {
      try{
        const data = await fetchCategories();
        console.log('Fetched Categories:', data);
        if(Array.isArray(data)) {
          setCategories(data);
        }else {
          throw new Error('Expected an array of categories.');
        }
      }catch (err){
        setError("Failed to load categories");
        console.error(err);
      }
    };
    loadCategories();
  }, []);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try{
        const restaurant = await fetchSingleRestaurant(restaurantId);
        setImage(restaurant.image || "");
        setName(restaurant.name || "");
        setCategory(restaurant.category || "");
        setPhone(restaurant.phone || "");
        setAddress(restaurant.address || "");
        setOpenTime(String(restaurant.open_time) || "");
        setClosingTime(String((restaurant.closing_time)) || "");
      }catch (err) {
        console.error("Failed to load restaurant", err);
        setError("Failed to load restaurant");
      }
    };
    fetchRestaurant();
  }, [restaurantId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try{
      const restaurantInfo = {image, name, category, phone, address, openTime, closingTime};
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token is missing or expired. Please log in again.');
        setError('Authorization token missing.');
        return;
      }
      await updateRestaurant(restaurantId, restaurantInfo, token);
      alert('Restaurant updated successfully!');
      nav('/dashboard/admin/restaurants');
    }catch (err) {
      console.error('Failed to update this restauran info.', err);
      setError('Failed to update this restaurant info.');
    }
  }

  return(
    <div>
      <form id="edit-restaurant-form" onSubmit={handleUpdate}>
        <h3>Update {name} Restaurant Info</h3>
        <label>
          Image URL:
          <input 
            type="text"
            name="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </label>
        <label>
          Name:
          <input 
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>Categories</label>
        <select
          id="category-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="" disabled >
            --Select Category--
          </option>
          {categories?.map((cat) => (
            <option key={cat.id} value={cat.name} >
              {cat.name}
            </option>
          ))}
        </select>
        <label>
          Phone #:
          <input 
            type="tel"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>
        <label>
          Address:
          <input 
            type="text"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>
        <label>
          Open Hours: <br/>
          From 
          <select 
          value={openTime} 
          onChange={(e) => setOpenTime(e.target.value)}
          >
            <option value="" disabled>
              --
            </option>
            {Array.from({length:6},(_, i) => i +6).map((hour) => (
              <option key={hour} value={hour}>
                {hour}
              </option>
            ))}
          </select> {" "}
          A.M. To 
          <select 
          value={closingTime} 
          onChange={(e) => setClosingTime(e.target.value)}
          >
            <option value="" disabled>
              --
            </option>
            {Array.from({length: 7}, (_, i) => i + 5).map((hour) => (
              <option key={hour} value={hour} >
                {hour}
              </option>
            ))}
          </select> {" "}
          P.M.
        </label>
        {error && <p>{error}</p>}
        <button type="submit" >Submit</button>
      </form>
    </div>
  )
}