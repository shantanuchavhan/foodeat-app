"use client";

import { createContext, useContext, useState } from "react";
const RestaurantDetailsContext = createContext();

export function RestaurantDetails({ children }) {
  const [restaurantDetails, setRestaurantDetails] = useState({});
  console.log(restaurantDetails);
  return (
    <RestaurantDetailsContext.Provider
      value={{ restaurantDetails, setRestaurantDetails }}
    >
      {children}
    </RestaurantDetailsContext.Provider>
  );
}

export function useRestaurentDetailsContext() {
  return useContext(RestaurantDetailsContext);
}
