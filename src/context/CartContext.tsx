import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { CartItem, MenuItem } from "@/types";

interface CartContextValue {
  items: CartItem[];
  addItem: (item: MenuItem) => void;
  removeItem: (itemId: string) => void;
  decreaseItem: (itemId: string) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  getItemQuantity: (itemId: string) => number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((item: MenuItem) => {
    setItems((prev) => {
      const existing = prev.find((c) => c.item.id === item.id);
      if (existing) {
        return prev.map((c) =>
          c.item.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
  }, []);

  const decreaseItem = useCallback((itemId: string) => {
    setItems((prev) => {
      const existing = prev.find((c) => c.item.id === itemId);
      if (!existing) return prev;
      if (existing.quantity === 1) {
        return prev.filter((c) => c.item.id !== itemId);
      }
      return prev.map((c) =>
        c.item.id === itemId ? { ...c, quantity: c.quantity - 1 } : c
      );
    });
  }, []);

  const removeItem = useCallback((itemId: string) => {
    setItems((prev) => prev.filter((c) => c.item.id !== itemId));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const getItemQuantity = useCallback(
    (itemId: string) => items.find((c) => c.item.id === itemId)?.quantity ?? 0,
    [items]
  );

  const totalItems = items.reduce((sum, c) => sum + c.quantity, 0);
  const subtotal = items.reduce((sum, c) => sum + c.item.price * c.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        decreaseItem,
        clearCart,
        totalItems,
        subtotal,
        getItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
