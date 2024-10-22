import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../API";
import './css/register.css'



export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const { token, user } = await registerUser(username, password);

      if(token) {
        localStorage.setItem("token", token);
        localStorage.setItem('user', JSON.stringify(user));
        alert("Registration successful!");
        nav("/dashboard");
      } else {
        setError("This username is already taken.");
      }
    } catch(err) {
      console.error("Registration failed", err);
      setError("Registration failed.  Please try again.");
    }
  };

  return(
    <div id="register-page-container">
      <h2>Register</h2>
      <form id="registration-form" onSubmit={handleSubmit}>
        <label>
          Username: 
          <input 
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Password: 
          <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {error && <p>{error}</p>}
        <button type="submit" >Register</button>
      </form>
    </div>
  );
}