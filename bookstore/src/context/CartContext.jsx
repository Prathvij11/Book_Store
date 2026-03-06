import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

const BASE_URL = "http://localhost:5000/cart";

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    try {
      const res = await axios.get(BASE_URL);
      setCart(res.data);
    } catch (error) {
      console.error("Failed to fetch cart", error);
    }
  };

  const addToCart = async (book, qty = 1) => {
    try {
      const bookId = book._id || book.id;
      const existing = cart.find((item) => item._id === bookId);

      if (existing) {
        await axios.patch(`${BASE_URL}/${bookId}`, {
          qty: existing.qty + qty,
        });
      } else {
        await axios.post(BASE_URL, {
          id: bookId,
          title: book.title,
          price: book.price,
          cover_image: book.cover_image,
          qty,
        });
      }
      fetchCart();
    } catch (error) {
      console.error("Add to cart failed", error);
    }
  };

  const removeFromCart = async (_id) => {
    try {
      await axios.delete(`${BASE_URL}/${_id}`);
      setCart(cart.filter((item) => item._id !== _id));
    } catch (error) {
      console.error("Remove failed", error);
    }
  };

  const increaseQty = async (_id) => {
    const item = cart.find((i) => i._id === _id);
    if (!item) return;
    await axios.patch(`${BASE_URL}/${_id}`, { qty: item.qty + 1 });
    fetchCart();
  };

  const decreaseQty = async (id) => {
    const item = cart.find((i) => i._id === id);
    if (!item || item.qty === 1) return;
    await axios.patch(`${BASE_URL}/${id}`, { qty: item.qty - 1 });
    fetchCart();
  };

  const clearCart = async () => {
  try {
    // Delete each item
    await Promise.all(
      cart.map((item) =>
        axios.delete(`${BASE_URL}/${item._id}`)
      )
    );

    setCart([]);  // Clear state
  } catch (error) {
    console.error("Clear cart failed", error);
  }
};

  useEffect(() => {
    const loadCart = async () => {
      try {
        const res = await axios.get(BASE_URL);
        setCart(res.data);
      } catch (error) {
        console.error("Failed to fetch cart", error);
      }
    };

    loadCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);

export default CartProvider;   