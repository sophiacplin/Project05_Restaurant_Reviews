import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api',
  headers: {'Content-Type': 'application/json'},
});



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
}

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
    setError('Failed to load categories.');
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
