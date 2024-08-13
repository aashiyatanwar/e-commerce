// // src/pages/ProductListingPage.js
// import React, { useEffect, useState, useContext } from 'react';
// import axios from 'axios';
// import ProductCard from '../components/ProductCard';
// import { AuthContext } from '../contexts/AuthContext';
// import CartIcon from '../components/CartIcon'; // A new component for displaying the cart icon and count

// const ProductListingPage = () => {
//     const [products, setProducts] = useState([]);
//     const [cartCount, setCartCount] = useState(0); // State to track number of items in the cart
//     const { authToken } = useContext(AuthContext);

//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5000/api/products');
//                 setProducts(response.data);
//             } catch (error) {
//                 console.error('Error fetching products:', error);
//             }
//         };

//         fetchProducts();
//     }, []);

//     useEffect(() => {
//         const fetchCartCount = async () => {
//             if (authToken) {
//                 try {
//                     const response = await axios.get('http://localhost:5000/api/cart', {
//                         headers: { Authorization: `Bearer ${authToken}` },
//                     });
//                     setCartCount(response.data.products.length);
//                 } catch (error) {
//                     console.error('Error fetching cart count:', error);
//                 }
//             }
//         };

//         fetchCartCount();
//     }, [authToken]);

//     const handleAddToCart = async (productId) => {
//         try {
//             if (!authToken) {
//                 console.error('User not logged in');
//                 return;
//             }

//             await axios.post(
//                 'http://localhost:5000/api/cart/add',
//                 { productId, quantity: 1 },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${authToken}`,
//                     },
//                 }
//             );

//             setCartCount(prevCount => prevCount + 1); // Update cart count
//             alert('Product added to cart!');
//         } catch (error) {
//             console.error('Error adding to cart:', error);
//         }
//     };

//     return (
//         <div className="relative container mx-auto p-8">
//             <CartIcon cartCount={cartCount} /> {/* Display cart icon with count */}
//             <h1 className="text-3xl font-bold mb-6">Products</h1>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {products.map((product) => (
//                     <ProductCard key={product._id} product={product} onAddToCart={handleAddToCart} />
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default ProductListingPage;

import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { AuthContext } from "../contexts/AuthContext";
import CartIcon from "../components/CartIcon"; // A new component for displaying the cart icon and count

const ProductListingPage = () => {
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0); // State to track number of items in the cart
  const { authToken } = useContext(AuthContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchCartCount = async () => {
      if (authToken) {
        try {
          const response = await axios.get("http://localhost:5000/api/cart", {
            headers: { Authorization: `Bearer ${authToken}` },
          });
          // Calculate the total count based on the quantity of each product in the cart
          const totalCount = response.data.products.reduce(
            (acc, item) => acc + item.quantity,
            0
          );
          setCartCount(totalCount);
        } catch (error) {
          console.error("Error fetching cart count:", error);
        }
      }
    };

    fetchCartCount();
  }, [authToken]);

  const handleAddToCart = async (productId) => {
    try {
      if (!authToken) {
        console.error("User not logged in");
        return;
      }

      await axios.post(
        "http://localhost:5000/api/cart/add",
        { productId, quantity: 1 },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      setCartCount((prevCount) => prevCount + 1); // Update cart count based on added quantity
      alert("Product added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div className="relative container mx-auto p-8">
      <CartIcon cartCount={cartCount} /> {/* Display cart icon with count */}
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductListingPage;
