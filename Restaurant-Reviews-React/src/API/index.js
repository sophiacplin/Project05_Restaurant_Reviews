import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://project05-restaurant-reviews.onrender.com/api',
  headers: {'Content-Type': 'application/json'},
  withCredentials: true,
});

//users routes
export const fetchUsers = async () => {
  try{
    const response = await apiClient.get('/users/admin');
    return response.data;
  }catch(err) {
    console.error('Error fetching users', err);
    throw err;
  }
};

export const getUsers = async (setUsers, setLoading, setError) => {
  try{
    const data = await fetchUsers();
    if(Array.isArray(data)) {
      setUsers(data);
    }else{
      throw new Error('Expected an array of users.');
    }
    setLoading(false);  
  }catch(err) {
    setError('Failed to load users.');
    setLoading(false);
  }
};

export const fetchSingleUser = async (id) => {
  try{
    const response = await apiClient.get(`/users/${id}`);
    return response.data
  }catch(err) {
    console.error('Error fetching restaurant', err);
    throw err;
  }
};

//register route
export const registerUser = async (username, password) => {
  const response = await apiClient.post('/users', 
    {username, password});
  return response.data;
};


//category routes
export const fetchCategories = async () => {
  try{
    const response = await apiClient.get('/category');
    return response.data;
  }catch(err) {
    console.error('Error fetching categories', err);
    throw err;
  }
};

export const getCategories = async (setCategories, setLoading, setError) => {
  try{
    const data = await fetchCategories();
    if(Array.isArray(data)) {
      setCategories(data);
    }else {
      throw new Error('Expected an array of categories.')
    }
    setLoading(false);
  }catch(err) {
    setError('Failed to load categories.');
    setLoading(false);
  }
}

//restaurants routes
export const fetchAllRestaurants = async () => {
  try{
    const response = await apiClient.get('/restaurants');
    return response.data;
  }catch(err){
    console.err('Error fetching restaurants', err);
    throw err;
  }
};

export const getRestaurants = async (setRestaurants, setLoading, setError) => {
  try {
    const data = await fetchAllRestaurants();
    console.log('Fetched data:', data);
    if (Array.isArray(data)) {
      setRestaurants(data);
    } else {
      throw new Error("Expected an array of restaurants");
    }
    setLoading(false);
  } catch (err) {
    setError("Failed to load restaurants");
    setLoading(false);
  }
};

export const fetchSingleRestaurant = async (id) => {
  try{
    const response = await apiClient.get(`/restaurants/${id}`)
    console.log('from api response', response);
    return response.data
  }catch(err){
    console.error('Error fetching restaurant', err);
    throw err;
  }
};

//Review routes
export const fetchRestaurantReviews = async (id) => {
  try{
    const response = await apiClient.get(`reviews/restaurants/${id}`);
    return response.data;
  }catch(err){
    console.error('Error fetching reviews', err);
    throw err;
  }
};

export const getRestaurantReviews = async (id, setRestaurantReviews, setLoading, setError) => {
  try{
    const data = await fetchRestaurantReviews(id);
    if(Array.isArray(data)) {
      setRestaurantReviews(data);
    }else{
      throw new Error('Expected an array of reviews');
    }
    setLoading(false);
  }catch (err) {
    setError('Failed to load reviews');
    setLoading(false);
  }
};

export const fetchSingleReview = async (id) => {
  try{
    const response = await apiClient.get(`/reviews/${id}`);
    return response.data
  }catch(err) {
    console.error('Error fetching review', err);
    throw err;
  }
};

export const fetchUserReviews = async (userId, token) => {
  try{
    const response = await apiClient.get(`/reviews/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }catch(err) {
    console.error('Error fetching reviews', err);
    throw err;
  }
};

export const getUserReviews = async (userId, setUserReviews, setLoading, setError) => {
  try{
    const token = localStorage.getItem('token');
    const data = await fetchUserReviews(userId, token);
    if(Array.isArray(data)) {
      setUserReviews(data);
    }else {
      throw new Error('Expected an array of reviews');
    }
    setLoading(false);
  }catch (err) {
    setError('Failed to load reviews');
    setLoading(false);
  }
};

export const addRestaurantReview = async (id, review, token) => {
  const response = await apiClient.post(`/reviews/restaurants/${id}`,
    review,
    {
      headers:{
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const updateUserReview = async (reviewId, review, token) => {
  try{
    const response = await apiClient.patch(`/reviews/${reviewId}`, review, {
      headers:{
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  }catch (err) {
    console.error("Error updating review:", err);
    throw err;
  }
};


//Comment routes
export const fetchReviewComments = async (reviewId) => {
  try{
    const response = await apiClient.get(`/comments/reviews/${reviewId}`);
    return response.data;
  }catch (err) {
    console.error('Error fetching comments', err);
    throw err;
  }
};

export const getReviewComments = async(reviewId) => {
  try{
    const data = await fetchReviewComments(reviewId);
    if(Array.isArray(data)) {
      return data;
    }else {
      throw new Error('Expected and array of comments');
    }
  }catch(err) {
    console.error("Error fetching comments", err);
    return [];
  }
};

export const addReviewComment = async (reviewId, text, token) => {
  try{const response = await apiClient.post(`/comments/reviews/${reviewId}`,
    {text},
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log('Comment submitted successfully:', response.data);
  return response.data
  }catch (err){
    console.error('Failed to submit comment:', err);
    throw err;
  }
};

export const updateReviewComment = async(commentId, text, token) => {
  try{
    const response = await apiClient.patch(`/comments/${commentId}`, {text},{
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  }catch (err){
    console.error("Failed to update comment", err);
    throw err;
  }
};
