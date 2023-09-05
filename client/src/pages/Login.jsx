import '../css/form.css';

import React, { useState } from "react";
// import { useCookies } from "react-cookie";
// import { useNavigate } from "react-router-dom";

const Login = () => {
  // const navigation = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState(""); // Added error message state

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation logic
    const newErrors = {};
    if (!email) {
      newErrors.email = "Email is required";
    }
    if (!password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return; // Don't proceed if there are validation errors
    }

    // Sending login request
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token);
      window.location.replace("/"); // Redirect to the home page

      // Define the setNewCookie function
      const setNewCookie = (cookieValue) => {
        // Implement
      };

      setNewCookie(data.token); // Call the cookie function
    } else {
      // Handle incorrect email or password errors
      const errorData = await response.json();
      const errorMessages = {
        email: errorData.email, // Not Working
        password: errorData.password,
      };
      setErrors(errorMessages);
      
      if (response.status === 404) {
        setErrorMessage("User not found. Please check your credentials.");
      }
    }
  };

  return (
    <div className="form-container">
      <h2 style={{ fontSize: 40, marginBottom: 30, textAlign: "center" }}>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="the-form">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter your email'
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="the-form">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter your password'
          />
          {errors.password && <span className="error">{errors.password}</span>}
        <button type="submit">Login</button>
        </div>
        {errorMessage && (
          <span
            className="error"
            style={{ textAlign: "center", display: "block", marginTop: "13px", marginBottom: "-10px" }}
          >
            {errorMessage}
          </span>
        )}
        <div className="form-footer">
          <div>
            <span>Don't have an account?</span> <a href="/register">Sign Up</a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
