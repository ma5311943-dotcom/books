// ===== Imports =====
import { createContext, useContext, useEffect, useReducer } from "react";
import { useAuth } from "../context/AuthContext";
import { BACKEND_URL } from "../assets/config";

// ===== Context =====
const CartContext = createContext();

// ===== Reducer =====
const cartReducer = (state, action) => {
  switch (action.type) {
    case "SET_CART": {
      return { ...state, items: action.payload || [] };
    }
    case "CLEAR_CART": {
      return { ...state, items: [] };
    }
    default:
      return state;
  }
};

// ===== Provider =====
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  const { user, token } = useAuth();
  const backendUrl = `${BACKEND_URL}/api/cart`;

  // Fetch cart from backend on login
  useEffect(() => {
    const fetchCart = async () => {
      if (user?._id) {
        try {
          const response = await fetch(`${backendUrl}/${user._id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          const data = await response.json();
          if (data.success) {
            dispatch({ type: "SET_CART", payload: data.cart?.items || [] });
          }
        } catch (error) {
          console.error("Error fetching cart:", error);
        }
      } else {
        // Clear cart context if logged out
        dispatch({ type: "CLEAR_CART" });
      }
    };
    fetchCart();
  }, [user, token]);

  // Add to cart
  const addToCart = async (bookId, quantity = 1) => {
    if (!user) {
      alert("Please login to add items to cart");
      return;
    }
    try {
      const response = await fetch(`${backendUrl}/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ userId: user._id, bookId, quantity }),
      });
      const data = await response.json();
      if (data.success) {
        dispatch({ type: "SET_CART", payload: data.cart.items });
        return true;
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
    return false;
  };

  // Remove from cart
  const removeFromCart = async (bookId) => {
    if (!user) return;
    try {
      const response = await fetch(`${backendUrl}/remove`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ userId: user._id, bookId }),
      });
      const data = await response.json();
      if (data.success) {
        dispatch({ type: "SET_CART", payload: data.cart.items });
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  // Update quantity
  const updateQuantity = async (bookId, quantity) => {
    if (!user) return;
    try {
      const response = await fetch(`${backendUrl}/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ userId: user._id, bookId, quantity }),
      });
      const data = await response.json();
      if (data.success) {
        dispatch({ type: "SET_CART", payload: data.cart.items });
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  // Clear cart
  const clearCart = async () => {
    if (!user) return;
    try {
      const response = await fetch(`${backendUrl}/clear`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ userId: user._id }),
      });
      const data = await response.json();
      if (data.success) {
        dispatch({ type: "CLEAR_CART" });
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  return (
    <CartContext.Provider value={{
      cart: state,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

// ===== Hook =====
export const useCart = () => useContext(CartContext);
