import DashboardSidebar from "../navigation/DashboardSidebar";
import './css/dashboardHomeMS.css';
import { useContext } from "react";
import UserContext from "../login/UserContext";


export default function DashboardHome () {

  return(
    <>
      <DashboardSidebar/>
      <div className="dashboard-home-main-section" >
        <h2> This is the dashboard home page.</h2>
      </div>
    </>
  )
}