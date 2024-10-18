import { Link } from "react-router-dom";



export default function DashboardSidebar() {

  return(
    <div className="dashboard-sidebar">
      <Link to='/dashboard/users/:id' className='nav-link'>My Profile</Link>
      <Link to='/dashboard/reviews/users/:id' className="nav-link">My Reviews</Link>
      <Link to='/dashboard/restaurants/users/:id' className="nav-link">My Restaurants</Link>
      <Link to='/dashboard/admin/restaurants' className="nav-link">Manage Restaurants</Link>
      <Link to='/dashboard/admin/users' className="nav-link">Manage Users</Link>
      <Link to='/dashboard/admin/category' className="nav-link">Manage Category</Link>
    </div>
  )
}