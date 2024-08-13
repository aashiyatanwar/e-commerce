import React, { useState } from "react";

const ProductCard = ({ product, onAddToCart }) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddClick = () => {
    onAddToCart(product._id);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500); // Reset animation after 1.5 seconds
  };

  return (
    <div className="relative bg-white shadow-lg rounded-xl overflow-hidden p-6 transform hover:scale-105 transition-transform duration-300">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover mb-4 rounded-t-xl"
      />
      <h2 className="text-xl font-semibold mb-2 text-gray-800">
        {product.name}
      </h2>
      <p className="text-lg font-medium text-gray-700 mb-4">
        ${product.price.toFixed(2)}
      </p>
      <button
        onClick={handleAddClick}
        className={`w-full bg-blue-600 text-white py-3 px-5 rounded-lg font-medium shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 ${
          isAdded ? "animate-pulse" : ""
        }`}
      >
        {isAdded ? "Added!" : "Add to Cart"}
      </button>
    </div>
  );
};

export default ProductCard;
