// src/components/Navbar.js
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  const { authToken, setAuthToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuthToken(null); // Clear the auth token
    localStorage.removeItem("authToken"); // Optional: Remove the token from localStorage
    navigate("/login"); // Redirect to the login page
  };

  return (
    <nav className="bg-gray-900 shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link
          to="/"
          className="text-white text-3xl font-extrabold hover:text-gray-300 transition duration-300"
        >
          MyShop
        </Link>

        <div className="flex items-center space-x-4">
          {authToken ? (
            <>
              <button
                onClick={handleLogout}
                className="relative flex items-center justify-center w-10 h-10 rounded-full text-white hover:bg-red-700 transition duration-300 focus:outline-none"
                aria-label="Logout"
              >
                <ArrowRightOnRectangleIcon className="h-6 w-6" />
                <span className="absolute inset-0 rounded-full  opacity-20 transition-opacity duration-300 group-hover:opacity-30"></span>
              </button>
            </>
          ) : (
            <div className="flex space-x-4">
              <Link
                to="/login"
                className="text-white text-lg px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-300"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-white text-lg px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-300"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
