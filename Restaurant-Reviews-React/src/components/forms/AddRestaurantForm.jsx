import { useState } from "react"




export default function AddRestaurantForm(){
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

  return(
    <div id='add-restaurant-container'>
      <h2>Add a Restaurant</h2>
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