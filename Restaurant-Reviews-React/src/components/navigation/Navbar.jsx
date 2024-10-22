import { Link } from "react-router-dom";
import './navigation.css'
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../login/UserContext";


export default function Navbar() {
  const nav = useNavigate();
  const { isAuthenticated, logout, user} = useContext(UserContext);

  const handleLogout = () => {
    logout();
    nav('/');
  };

  const handleNavToHome = () => {
    nav('/');
  };
  
  return(
    <>
      {isAuthenticated ? (
        <div id="logged-in-navbar">
          <h2 onClick={handleNavToHome} >RetRev</h2>
          <input id="searchbar" placeholder="Search Restaurants..." />
          <Link to='/search-restaurant-to-review' className="nav-link">Write Review</Link>
          <Link to='/form/request-to-add-restaurant' className="nav-link" >Add Restaurant</Link>
          <button onClick={handleLogout} className="nav-link" >
            Logout
          </button>
          <Link to='/dashboard' className="nav-link">
            <span className="material-symbols-outlined">manage_accounts</span>
          </Link>
        </div>
      ):(
        <div id="logged-out-navbar">
          <h2 onClick={handleNavToHome} >RetRev</h2>
          <input id="searchbar" placeholder="Search Restaurants..." />
          <Link to='/search-restaurant-to-review' className="nav-link">Write Review</Link>
          <Link to='/form/request-to-add-restaurant' className="nav-link" >Add Restaurant</Link>
          <Link to='/login' className="nav-link">Login</Link>
          <Link to='/register' className="nav-link" >Register</Link>
        </div>
        )}
    </>
  );
}