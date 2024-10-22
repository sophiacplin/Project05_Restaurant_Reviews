import DashboardSidebar from '../navigation/DashboardSidebar'
import './css/dashboardMainSection.css';




export default function UserReviews() {

  return(
    <>
      <DashboardSidebar />
      <div className="dashboard-main-section">
        <h2>This is a page with a list of reviews written by that login user.</h2>
      </div>
    </>
  )
}