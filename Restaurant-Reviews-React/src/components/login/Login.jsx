import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import './css/login.css'

export default function Login () {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const nav = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try{
      const response = await axios.post('https://project05-restaurant-reviews.onrender.com/api/users/login', {
        username,
        password,
      });

      const {token, user} = response.data;
      console.log("Response data:", response.data);

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      console.log('Login successful! User info saved in localStorage.');

      nav('/dashboard');
    }catch (err) {
      console.error('Login failed: ', err);
      setErrorMessage('Invalid username or password');
    }
  };

  const handleNavToRegister = () => {
    nav('/register');
  }

  return(
    <div id="login-main-section">
      <h2>Login</h2>
      <form id="login-form" onSubmit={handleLogin}>
        <label htmlFor='username'>
          Username:
        </label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        
        <label htmlFor='password'>
          Password:
        </label>
          <input 
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        
        {errorMessage && <p className="error-message" >{errorMessage}</p>}
        <button type="submit">Login</button>
        <button onClick={handleNavToRegister}>Sign Up</button>
      </form>
    </div>
  )

}
