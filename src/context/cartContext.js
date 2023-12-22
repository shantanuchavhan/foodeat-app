"use client";

import { createContext, useContext, useState } from "react";
const cartContext = createContext();

export function CartDetailsProvider({ children }) {
  const [cartDetails, setCartDetails] = useState([]);
  return (
    <cartContext.Provider value={{ cartDetails, setCartDetails }}>
      {children}
    </cartContext.Provider>
  );
}

export function useCartContext() {
  return useContext(cartContext);
}
