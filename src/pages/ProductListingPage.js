import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { AuthContext } from "../contexts/AuthContext";
import CartIcon from "../components/CartIcon";

const baseURL = process.env.REACT_APP_BACKEND_URL;
const ProductListingPage = () => {
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const { authToken } = useContext(AuthContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${baseURL}api/products`);
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
          const response = await axios.get(`${baseURL}api/cart`, {
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
        `${baseURL}api/cart/add`,
        { productId, quantity: 1 },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      setCartCount((prevCount) => prevCount + 1);
      alert("Product added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div className="relative container mx-auto p-8">
      <CartIcon cartCount={cartCount} />
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
