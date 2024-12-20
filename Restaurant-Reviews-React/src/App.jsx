
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/navigation/Navbar'
import AllRestaurants from './components/home/AllRestaurants'
import RequestToAddRestaurant from './components/forms/RequestToAddRestaurant';
import SearchRestaurantToReview from './components/home/SearchRestaurantToReview';
import UserReviews from './components/dashboard/UserReviews';
import Profile from './components/dashboard/Profile';
import OwnerRestaurants from './components/dashboard/OwnerRestaurants';
import ManageUsers from './components/dashboard/ManageUsers';
import ManageRestaurants from './components/dashboard/ManageRestaurants';
import ManageCategory from './components/dashboard/ManageCategory';
import DashboardHome from './components/dashboard/DashboardHome';
import Login from './components/login/Login';
import Register from './components/login/Register';
import RestaurantPage from './components/restaurant/RestaurantPage';
import AddRestaurantReview from './components/forms/AddRestaurantReview';
import UpdateReview from './components/restaurant/UpdateReview';
import AssignOwner from './components/forms/AssignOwner';
import EditRestaurant from './components/forms/EditRestaurant';




function App() {


  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<AllRestaurants/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/restaurant/:id' element = {<RestaurantPage/>} />
        <Route path='/restaurant/:id/review/form' element={<AddRestaurantReview/>} />
        <Route path='/restaurant/:restaurantId/review/:reviewId/edit' element={<UpdateReview/>} />
        <Route path='/form/request-to-add-restaurant' element={<RequestToAddRestaurant/>} />
        <Route path='/form/assign-owner/restaurant/:id' element = {<AssignOwner/>} />
        <Route path='form/restaurant/:id/edit' element = {<EditRestaurant/>} />
        <Route path='/search-restaurant-to-review' element={<SearchRestaurantToReview/>} />
        <Route path='/dashboard' element={<DashboardHome/>} />
        <Route path='/dashboard/users/:id' element={<Profile/>} />
        <Route path='/dashboard/reviews/users/:id' element={<UserReviews/>} />
        <Route path='/dashboard/restaurants/users/:id' element={<OwnerRestaurants/>} />
        <Route path='/dashboard/admin/restaurants' element={<ManageRestaurants/>} />
        <Route path='/dashboard/admin/users' element={<ManageUsers/>} />
        <Route path='/dashboard/admin/category' element={<ManageCategory/>} />
      </Routes>
    </>
  )
}

export default App
