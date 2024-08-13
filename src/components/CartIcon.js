import React from "react";
import { Link } from "react-router-dom";

const CartIcon = ({ cartCount }) => {
  return (
    <Link
      to="/cart"
      className="absolute top-4 right-4 flex items-center space-x-2"
    >
      <div className="relative">
        <svg
          className="w-8 h-8 text-gray-800 hover:text-gray-600 transition duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 3h2l.8 4h13.6l.8-4h2m-2 9v-5H5v5m2-5h2m8 0h2m4 5v-4h-2v4m0 0h-2v-6H5v6H3v4m0 2h18a2 2 0 002-2v-8H1v8a2 2 0 002 2z"
          />
        </svg>
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            {cartCount}
          </span>
        )}
      </div>
    </Link>
  );
};

export default CartIcon;
