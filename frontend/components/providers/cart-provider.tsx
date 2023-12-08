"use client";
import { Product } from "@/types/Product";
import { ReactNode, createContext, useEffect, useState } from "react";

export interface CartItem {
  item: Product;
  quantity: number;
}

export interface CartContextType {
  cartItems: CartItem[];
  incrementCart: (item: Product) => void;
  decrementCart: (item: Product) => void;
  removeItem: (item: Product) => void;
  clearCart: () => void;
  getCartTotalPrice: () => number;
  getCartTotalQuantity: () => number;
}

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  // Dummy functions
  incrementCart: () => {},
  decrementCart: () => {},
  removeItem: () => {},
  clearCart: () => {},
  getCartTotalPrice: () => 0,
  getCartTotalQuantity: () => 0,
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      const storedCartItems = localStorage.getItem("cartItems");
      return storedCartItems ? (JSON.parse(storedCartItems) as CartItem[]) : [];
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  useEffect(() => {
    const cartItems = localStorage.getItem("cartItems");
    if (cartItems) {
      setCartItems(JSON.parse(cartItems));
    }
  }, []);

  const incrementCart = (item: Product) => {
    console.log("Adding product to cart: " + item.name);
    const isProductInCart = cartItems.find((cartItem) => cartItem.item._id === item._id); // check if the item is already in the cart

    if (isProductInCart) {
      // if the item is already in the cart, increase the quantity of the item
      setCartItems(
        cartItems.map((cartItem) => (cartItem.item._id === item._id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem)),
      );
    } else {
      // if the item is not in the cart, add the item to the cart
      setCartItems([...cartItems, { item, quantity: 1 }]);
    }
  };

  const decrementCart = (item: Product) => {
    const isItemInCart = cartItems.find((cartItem) => cartItem.item._id === item._id);

    if (isItemInCart === undefined) {
      // product not found
      return;
    }
    if (isItemInCart?.quantity === 1) {
      // if quantity is 1, fiter out the item
      setCartItems(cartItems.filter((cartItem) => cartItem.item._id !== item._id));
    } else {
      // otherwise, decrement it by one
      setCartItems(
        cartItems.map((cartItem) => (cartItem.item._id === item._id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem)),
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };
  const removeItem = (item: Product) => {
    setCartItems(cartItems.filter((cartItem) => cartItem.item._id !== item._id));
  };

  const getCartTotalPrice = () => {
    return cartItems.reduce((total, cartItem) => total + cartItem.item.price * cartItem.quantity, 0);
  };

  const getCartTotalQuantity = () => {
    return cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
  };

  const value = { cartItems, incrementCart, decrementCart, clearCart, getCartTotalPrice, getCartTotalQuantity, removeItem };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
