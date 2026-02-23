import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HospitalLogin = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  
  const navigate = useNavigate(); // Use navigate to redirect

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(credentials);
    try {
      const res = await axios.post("https://blood-bank-1-7t8o.onrender.com/api/auth/login", credentials);
      if (res.data.success) {
        
         // You can perform other login actions here if needed
        console.log("Login successful!"); // You can perform other login actions here if needed
        navigate("/hospital/dashboard"); // Redirect to hospital dashboard
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("Something went wrong");
    }
  };

  return (
    <div className="hospital-login">
      <h2>Hospital Login</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="username" 
          placeholder="Email" 
          onChange={handleChange} 
          required 
          autoComplete="username" // Added autocomplete for username
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          onChange={handleChange} 
          required 
          autoComplete="current-password" // Added autocomplete for password
        />
        <button type="submit">Login</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default HospitalLogin;
