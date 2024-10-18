import { Link } from "react-router-dom";
import './navigation.css'
import { useNavigate } from "react-router-dom";



export default function Navbar() {
  const nav = useNavigate()
  const handleNavToHome = () => {
    nav('/');
  }
  const handleNavToProfile = () => {
    nav('/dashboard/users/:id');
  }
  return(
    <div id="navbar">
      <h2 onClick={handleNavToHome} >RetRev</h2>
      <input id="searchbar" />
      <Link to='/search-restaurant-to-review'>Write a Review</Link>
      <Link to='/form/request-to-add-restaurant' >Add a Restaurant</Link>
      <button onClick={handleNavToProfile} >User</button>
    </div>
  )
}