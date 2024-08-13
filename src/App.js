import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProductListingPage from "./pages/ProductListingPage";
import CartPage from "./pages/CartPage";
import { AuthContext } from "./contexts/AuthContext";

function App() {
  const [authToken, setAuthToken] = useState(
    localStorage.getItem("authToken") || null
  );

  useEffect(() => {
    if (authToken) {
      localStorage.setItem("authToken", authToken);
    } else {
      localStorage.removeItem("authToken");
    }
  }, [authToken]);

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken }}>
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              authToken ? (
                <ProductListingPage />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/cart"
            element={
              authToken ? <CartPage /> : <Navigate to="/login" replace />
            }
          />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
