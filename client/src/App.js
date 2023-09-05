import "./css/app.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Watchlist from "./pages/Watchlist";
import Register from "./pages/Register";

import Login from "./pages/Login";
import { useEffect } from "react";
import Details from "./pages/Details";
import Searched from "./pages/Searched";

function App() {
  const loggedIn = localStorage.getItem("token");
  useEffect(() => {
    console.log("loggedIn", loggedIn);
  }, []);
  return (
    <Routes>
      <Route
        path="/"
        element={<Home />}
      />
      <Route
        path="/watchlist"
        element={loggedIn ? <Watchlist /> : <Navigate replace to="/login" />}
      />
      <Route
        path="/movie/:id"
        element={loggedIn ? <Details /> : <Navigate replace to="/login" />}
      />
      <Route
        path="/search/:movie"
        element={loggedIn ? <Searched /> : <Navigate replace to="/login" />}
      />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
