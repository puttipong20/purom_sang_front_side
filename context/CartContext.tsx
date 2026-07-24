"use client";

import { Food_type } from "@/types/food_type";
import { createContext, useContext, useState, ReactNode } from "react";

interface CartContextType {
  token: string | null;
  setToken: (token: string) => void;
}
interface CartItem {
  food: Food_type;
  quantity: number;
}
interface CartContextType {
  token: string | null;
  setToken: (token: string) => void;
  cartItems: CartItem[];
  addToCart: (food: Food_type) => void;
  removeFromCart: (foodId: string) => void;
  decreaseQuantity: (foodId: string) => void;
  clearCart: () => void;
  totalPrice: number;
  totalCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  // ✅ ใช้ Lazy Initializer ดึงค่าจาก localStorage ตรงๆ ตอนสร้าง state
  const [token, setTokenState] = useState<string | null>(() => {
    // เช็ค typeof window เพื่อป้องกัน error เรื่อง SSR ฝั่ง Server ของ Next.js
    if (typeof window !== "undefined") {
      return localStorage.getItem("qr_token");
    }
    return null;
  });
  const [cartItems, setCartItem] = useState<CartItem[]>([]);
  // ฟังก์ชันสำหรับอัปเดต Token และเซฟลง localStorage
  const setToken = (newToken: string) => {
    setTokenState(newToken);
    if (typeof window !== "undefined") {
      localStorage.setItem("qr_token", newToken);
    }
  };

  const addToCart = (food: Food_type) => {
    setCartItem((prev_items) => {
      const exist_item = prev_items.find((item) => item.food.id === food.id);
      if (exist_item) {
        return prev_items.map((item) =>
          item.food.id === food.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev_items, { food, quantity: 1 }];
    });
  };
  const removeFromCart = (foodId: string) => {
    setCartItem((prev_item) =>
      prev_item.filter((item) => item.food.id !== foodId),
    );
  };
  const decreaseQuantity = (foodId: string) => {
    setCartItem((prev_item) => {
      const exist_item = prev_item.find((item) => item.food.id === foodId);
      if (!exist_item) {
        return prev_item;
      }
      if (exist_item?.quantity === 1) {
        return prev_item.filter((item) => item.food.id !== foodId);
      }
      return prev_item.map((item) =>
        item.food.id === foodId
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      );
    });
  };
  const clearCart = () => setCartItem([]);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.food.food_price * item.quantity,
    0,
  );
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        token,
        setToken,
        cartItems,
        addToCart,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        totalPrice,
        totalCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
