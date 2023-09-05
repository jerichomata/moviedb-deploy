import '../css/form.css';

import React, { useState } from "react";
import { useCookies } from "react-cookie";
// import { useNavigate } from "react-router-dom";

const Register = () => {
  // const navigation = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [cookie, setCookie] = useCookies(["token"]);
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
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    // Sending registration request
    const response = await fetch("/api/auth/register", {
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
      localStorage.setItem("token", response.token);
      const data = await response.json();
      setCookie("token", data.token, { path: "/" }); // Set the token cookie
      window.location.replace("/");
    } else {
      // Handle errors for specific status codes
      if (response.status === 500) {
        setErrorMessage("Password must be at least 8 characters long");
      } else {
        const errorData = await response.json();
        setErrors(errorData);
      }
    }
  };

  return (
    <div className="form-container">
      <h2 style={{ fontSize: 40, marginBottom: 30, textAlign: "center" }}>Register</h2>
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
        </div>
        <div className="the-form">
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            placeholder='Re enter your password'
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword && (
            <span className="error"
            style={{ textAlign: "center", display: "block", marginTop: "5px" }}>
            {errors.confirmPassword}</span>
          )}
          {errorMessage && (
          <span
            className="error"
            style={{ textAlign: "center", display: "block", marginTop: "5px" }}
          >
            {errorMessage}
          </span>
        )}
        <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
