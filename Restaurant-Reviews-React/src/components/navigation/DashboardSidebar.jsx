import { Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../login/UserContext";



export default function DashboardSidebar() {
  const { user } = useContext(UserContext);
  const role = user?.role;


  return(
    <>
      {role === 'user' && (
        <div className="dashboard-sidebar">
          <Link to='/dashboard/users/:id' className='nav-link'>My Profile</Link>
          <Link to='/dashboard/reviews/users/:id' className="nav-link">My Reviews</Link>
        </div>
      )}
      {role === 'owner' && (
        <div className="dashboard-sidebar">
          <Link to='/dashboard/users/:id' className='nav-link'>My Profile</Link>
          <Link to='/dashboard/reviews/users/:id' className="nav-link">My Reviews</Link>
          <Link to='/dashboard/restaurants/users/:id' className="nav-link">My Restaurants</Link>
        </div>
      )}
      {role === 'admin' && (
        <div className="dashboard-sidebar">
          <Link to='/dashboard/users/:id' className='nav-link'>My Profile</Link>
          <Link to='/dashboard/reviews/users/:id' className="nav-link">My Reviews</Link>
          <Link to='/dashboard/restaurants/users/:id' className="nav-link">My Restaurants</Link>
          <Link to='/dashboard/admin/restaurants' className="nav-link">Manage Restaurants</Link>
          <Link to='/dashboard/admin/users' className="nav-link">Manage Users</Link>
          <Link to='/dashboard/admin/category' className="nav-link">Manage Category</Link>
        </div>
      )}
    </>
  )
}