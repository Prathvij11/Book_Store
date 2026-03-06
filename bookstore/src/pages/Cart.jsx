import React, { useState } from "react";
 // make sure this is correct path
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Trash2, ShoppingBag } from "lucide-react";

import { useCart } from "../context/CartContext";
const Cart = () => {

  const { cart, removeFromCart, increaseQty, decreaseQty, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  // Calculate total price 
  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.qty,
    0
  );

  // Handle Payment
  const handlePayment = async () => {
    if (cart.length === 0) return;

    setIsProcessing(true);

    try {
      // Simulate delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      await axios.post("http://localhost:5000/payments", {
        paymentId: "pay_" + Math.random().toString(36).substr(2, 9),
        amount: total,
        status: "success",
        date: new Date(),
      });

      await clearCart();   // ✅ properly clears cart

      toast.success("Payment Successful! 🎉");
      navigate("/order");
    } catch (error) {
      toast.error("Payment Failed ❌");
      console.log(error);
    } finally {
      setIsProcessing(false);
    }
  };

  // Empty Cart UI
  if (cart.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-[70vh] text-center">
        <ShoppingBag size={60} className="text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800">
          Your cart is empty
        </h2>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-full"
        >
          Shop Now
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 pt-28">
      <h2 className="text-3xl font-bold mb-8">Shopping Cart</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* CART ITEMS */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div
              key={item._id}   // ✅ MongoDB key
              className="flex items-center gap-6 bg-white p-5 rounded-2xl shadow-sm border"
            >
              <img
                src={item.cover_image}
                className="w-20 h-28 object-cover rounded-lg"
                alt={item.title}
              />

              <div className="flex-1">
                <h3 className="font-bold text-lg">{item.title}</h3>
                <p className="text-blue-600 font-bold">₹{item.price}</p>

                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center border rounded-lg">
                    <button
                      onClick={() => decreaseQty(item._id)}
                      className="p-1 px-3"
                    >
                      -
                    </button>

                    <span className="px-2 font-bold">
                      {item.qty}
                    </span>

                    <button
                      onClick={() => increaseQty(item._id)}
                      className="p-1 px-3"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-500 text-sm"
                  >
                    <Trash2 size={14} /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* SUMMARY */}
        <div className="bg-gray-50 p-8 rounded-3xl h-fit border">
          <h3 className="text-xl font-bold mb-4">Summary</h3>

          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>₹{total}</span>
          </div>

          <div className="flex justify-between mb-6 text-green-600 font-bold">
            <span>Delivery</span>
            <span>FREE</span>
          </div>

          <div className="border-t pt-4 flex justify-between text-xl font-bold mb-6">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition"
          >
            {isProcessing ? "Processing..." : "Checkout Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;