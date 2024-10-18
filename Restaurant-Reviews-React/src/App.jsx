
import { Routes, Route } from 'react-router-dom'
import './App.css'

import RestaurantInfo from './components/restaurant/RestaurantInfo';
import Navbar from './components/navigation/Navbar'
import AllRestaurants from './components/Home/AllRestaurants';
import RequestToAddRestaurant from './components/forms/RequestToAddRestaurant';
import SearchRestaurantToReview from './components/home/SearchRestaurantToReview';
import UserReviews from './components/dashboard/UserReviews';
import Profile from './components/Dashboard/Profile';
import OwnerRestaurants from './components/Dashboard/OwnerRestaurants';
import ManageUsers from './components/Dashboard/ManageUsers';
import ManageRestaurants from './components/dashboard/ManageRestaurants';
import ManageCategory from './components/dashboard/ManageCategory';


function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<AllRestaurants/>} />
        <Route path='/restaurant/:id' element = {<RestaurantInfo />} />
        <Route path='/form/request-to-add-restaurant' element={<RequestToAddRestaurant/>} />
        <Route path='/search-restaurant-to-review' element={<SearchRestaurantToReview/>} />
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
