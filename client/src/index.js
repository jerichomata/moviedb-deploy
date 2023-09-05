import "./css/index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import store from "./store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <CookiesProvider allCookies={true}>
        <Navbar />

        <App />
        <Footer />
      </CookiesProvider>
    </BrowserRouter>
  </Provider>
);
