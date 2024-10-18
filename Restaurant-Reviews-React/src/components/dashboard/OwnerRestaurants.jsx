import DashboardSidebar from "../navigation/DashboardSidebar";




export default function OwnerRestaurants(){

  return(
    <>
    <DashboardSidebar />
    <div className="dashboard-main-section">
      <h2>This is a dashboard page for owners to see a list of restaurants they own, or admin's Manage Restaurants page to nav to.</h2>
    </div>
    </>
  )
}