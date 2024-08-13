// import React, { useEffect, useState, useContext } from 'react';
// import axios from 'axios';
// import { AuthContext } from '../contexts/AuthContext';

// const CartPage = () => {
//     const [cart, setCart] = useState(null);
//     const [discount, setDiscount] = useState(0);
//     const [discountCode, setDiscountCode] = useState('');
//     const { authToken } = useContext(AuthContext);

//     useEffect(() => {
//         const fetchCart = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5000/api/cart', {
//                     headers: { Authorization: `Bearer ${authToken}` },
//                 });
//                 setCart(response.data);
//             } catch (error) {
//                 console.error('Error fetching cart:', error);
//             }
//         };

//         fetchCart();
//     }, [authToken]);

//     const handleRemoveItem = async (productId) => {
//         try {
//             await axios.post(
//                 'http://localhost:5000/api/cart/remove',
//                 { productId },
//                 {
//                     headers: { Authorization: `Bearer ${authToken}` },
//                 }
//             );

//             const response = await axios.get('http://localhost:5000/api/cart', {
//                 headers: { Authorization: `Bearer ${authToken}` },
//             });
//             setCart(response.data);
//         } catch (error) {
//             console.error('Error removing item:', error);
//         }
//     };

//     const handleQuantityChange = (productId, value) => {
//         const newValue = Number(value);

//         if (newValue < 1) {
//             alert('Quantity cannot be zero or negative.');
//             return;
//         }

//         setCart({
//             ...cart,
//             products: cart.products.map((p) =>
//                 p.product._id === productId
//                     ? { ...p, quantity: newValue }
//                     : p
//             ),
//         });
//     };

//     const handleApplyDiscount = () => {
//         let newDiscount = 0;
//         if (discountCode === 'FIXED10') {
//             newDiscount = 10;
//         } else if (discountCode === 'PERCENT10') {
//             newDiscount = (subtotal * 0.10);
//         } else {
//             alert('Invalid discount code');
//             return;
//         }
//         setDiscount(newDiscount);
//     };

//     if (!cart) return <div className="text-center text-gray-700">Loading...</div>;

//     const products = Array.isArray(cart.products) ? cart.products : [];

//     const subtotal = products.reduce(
//         (acc, item) => acc + (item.product?.price || 0) * (item.quantity || 1),
//         0
//     );

//     const total = subtotal - discount;

//     return (
//         <div className="container mx-auto p-8">
//             <h1 className="text-4xl font-bold mb-8 text-gray-900">Your Cart</h1>
//             <div className="bg-white shadow-lg rounded-lg p-6">
//                 {products.length === 0 ? (
//                     <p className="text-lg text-gray-700">Your cart is empty.</p>
//                 ) : (
//                     products.map((item) => (
//                         <div
//                             key={item.product?._id}
//                             className="flex items-center justify-between mb-6 p-4 border-b border-gray-200"
//                         >
//                             <div className="flex items-center">
//                                 <img
//                                     src={item.product?.image}
//                                     alt={item.product?.name}
//                                     className="h-24 w-24 object-cover rounded-lg shadow-sm"
//                                 />
//                                 <div className="ml-6">
//                                     <h3 className="text-lg font-semibold text-gray-800">{item.product?.name}</h3>
//                                     <p className="text-gray-600">${(item.product?.price || 0).toFixed(2)}</p>
//                                 </div>
//                             </div>
//                             <div className="flex items-center">
//                                 <input
//                                     type="number"
//                                     min="1"
//                                     value={item.quantity}
//                                     onChange={(e) =>
//                                         handleQuantityChange(item.product?._id, e.target.value)
//                                     }
//                                     className="w-20 p-2 text-center border rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500 transition duration-300"
//                                 />
//                                 <button
//                                     onClick={() => handleRemoveItem(item.product?._id)}
//                                     className="ml-4 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-300"
//                                 >
//                                     Remove
//                                 </button>
//                             </div>
//                         </div>
//                     ))
//                 )}
//                 <div className="mt-8">
//                     {/* Discount Section */}
//                     <div className="bg-gray-50 p-4 rounded-lg shadow-sm flex items-center space-x-4 mb-6">
//                         <div className="flex-grow">
//                             <input
//                                 type="text"
//                                 value={discountCode}
//                                 onChange={(e) => setDiscountCode(e.target.value)}
//                                 placeholder="Discount Code"
//                                 className="border p-3 rounded-md w-full border-gray-300 focus:ring-2 focus:ring-blue-500 transition duration-300"
//                             />
//                         </div>
//                         <button
//                             onClick={handleApplyDiscount}
//                             className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
//                         >
//                             Apply
//                         </button>
//                     </div>

//                     {/* Summary Section */}
//                     <div className="flex flex-col space-y-4">
//                         <div className="flex justify-between text-lg font-semibold text-gray-900">
//                             <span>Subtotal:</span>
//                             <span>${subtotal.toFixed(2)}</span>
//                         </div>
//                         <div className="flex justify-between text-lg font-semibold text-gray-900">
//                             <span>Discount:</span>
//                             <span className="text-red-600">-${discount.toFixed(2)}</span>
//                         </div>
//                         <div className="flex justify-between text-lg font-bold text-gray-900">
//                             <span>Total:</span>
//                             <span>${total.toFixed(2)}</span>
//                         </div>
//                     </div>

//                     {/* Checkout Button */}
//                     <div className="mt-8">
//                         <button
//                             onClick={() => alert('Proceeding to checkout...')}
//                             className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
//                         >
//                             Checkout
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CartPage;

import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";

const CartPage = () => {
  const [cart, setCart] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [discountCode, setDiscountCode] = useState("");
  const { authToken } = useContext(AuthContext);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/cart", {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setCart(response.data);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, [authToken]);

  const handleRemoveItem = async (productId) => {
    try {
      await axios.post(
        "http://localhost:5000/api/cart/remove",
        { productId },
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );

      // Re-fetch the cart to get the updated list of products
      const response = await axios.get("http://localhost:5000/api/cart", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setCart(response.data);
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const handleQuantityChange = async (productId, value) => {
    const newValue = Number(value);

    console.log(`Changing quantity for product ${productId} to ${newValue}`);

    if (newValue < 1) {
      alert("Quantity cannot be zero or negative.");
      return;
    }

    try {
      // Update the quantity on the server
      await axios.post(
        "http://localhost:5000/api/cart/update",
        { productId, quantity: newValue },
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );

      console.log("Quantity updated successfully on the server.");

      // Fetch the updated cart after changing the quantity
      const response = await axios.get("http://localhost:5000/api/cart", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      console.log("Updated cart fetched:", response.data);
      setCart(response.data); // Update the cart state with the new data
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleApplyDiscount = () => {
    let newDiscount = 0;
    if (discountCode === "FIXED10") {
      newDiscount = 10;
    } else if (discountCode === "PERCENT10") {
      newDiscount = subtotal * 0.1;
    } else {
      alert("Invalid discount code");
      return;
    }
    setDiscount(newDiscount);
  };

  if (!cart) return <div className="text-center text-gray-700">Loading...</div>;

  const products = Array.isArray(cart.products) ? cart.products : [];

  const subtotal = products.reduce(
    (acc, item) => acc + (item.product?.price || 0) * (item.quantity || 1),
    0
  );

  const total = subtotal - discount;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">Your Cart</h1>
      <div className="bg-white shadow-lg rounded-lg p-6">
        {products.length === 0 ? (
          <p className="text-lg text-gray-700">Your cart is empty.</p>
        ) : (
          products.map((item) => (
            <div
              key={item.product?._id}
              className="flex items-center justify-between mb-6 p-4 border-b border-gray-200"
            >
              <div className="flex items-center">
                <img
                  src={item.product?.image}
                  alt={item.product?.name}
                  className="h-24 w-24 object-cover rounded-lg shadow-sm"
                />
                <div className="ml-6">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.product?.name}
                  </h3>
                  <p className="text-gray-600">
                    ${(item.product?.price || 0).toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(item.product?._id, e.target.value)
                  }
                  className="w-20 p-2 text-center border rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500 transition duration-300"
                />
                <button
                  onClick={() => handleRemoveItem(item.product?._id)}
                  className="ml-4 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-300"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
        <div className="mt-8">
          {/* Discount Section */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm flex items-center space-x-4 mb-6">
            <div className="flex-grow">
              <input
                type="text"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                placeholder="Discount Code"
                className="border p-3 rounded-md w-full border-gray-300 focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
            </div>
            <button
              onClick={handleApplyDiscount}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Apply
            </button>
          </div>

          {/* Summary Section */}
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between text-lg font-semibold text-gray-900">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-semibold text-gray-900">
              <span>Discount:</span>
              <span className="text-red-600">-${discount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-gray-900">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Checkout Button */}
          <div className="mt-8">
            <button
              onClick={() => alert("Proceeding to checkout...")}
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
