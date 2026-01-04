// ===== Imports =====
import { createContext, useContext, useEffect, useReducer } from "react";

// ===== Context =====
const CartContext = createContext();

// ===== Load Initial State =====
const loadInitialState = () => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("cart");
    try {
      const parsed = saved ? JSON.parse(saved) : null;
      if (parsed && Array.isArray(parsed.items)) return parsed;
      return { items: [] };
    } catch {
      return { items: [] };
    }
  }
  return { items: [] };
};

// ===== Reducer =====
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM": {
      const itemsToAdd = {
        ...action.payload,
        quantity: action.payload.quantity || 1,
      };

      const exists = state.items.find(
        (i) =>
          i.id === itemsToAdd.id &&
          (i.source === itemsToAdd.source || (!i.source && !itemsToAdd.source))
      );

      if (exists) {
        const updatedItems = state.items.map((i) =>
          i.id === itemsToAdd.id &&
          (i.source === itemsToAdd.source || (!i.source && !itemsToAdd.source))
            ? { ...i, quantity: i.quantity + itemsToAdd.quantity }
            : i
        );

        return { ...state, items: updatedItems };
      } else {
        return { ...state, items: [...state.items, itemsToAdd] };
      }
    }

    case "INCREMENT": {
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.payload.id &&
          (i.source === action.payload.source ||
            (!i.source && !action.payload.source))
            ? { ...i, quantity: i.quantity + 1 }
            : i
        ),
      };
    }

    case "DECREMENT": {
      return {
        ...state,
        items: state.items
          .map((i) =>
            i.id === action.payload.id &&
            (i.source === action.payload.source ||
              (!i.source && !action.payload.source))
              ? { ...i, quantity: i.quantity - 1 }
              : i
          )
          .filter((i) => i.quantity > 0),
      };
    }

    case "REMOVE_ITEM": {
      return {
        ...state,
        items: state.items.filter(
          (i) =>
            !(
              i.id === action.payload.id &&
              (i.source === action.payload.source ||
                (!i.source && !action.payload.source))
            )
        ),
      };
    }

    default:
      return state;
  }
};

// ===== Provider =====
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {}, loadInitialState);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state));
  }, [state]);

  return (
    <CartContext.Provider value={{ cart: state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// ===== Hook =====
export const useCart = () => useContext(CartContext);
