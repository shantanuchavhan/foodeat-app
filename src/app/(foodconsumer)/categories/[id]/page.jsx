// Import the correct hook from React
"use client";
import React, { useState, useEffect } from "react";


import RestaurentNavigator from "./_components/RestaurentNavigator";
import MenuCard from "../../_complonents/MenuCard/MenuCard";

import { useUserDetailsContext } from "@/context/userDetailsContext";

const Categories = ({params}) => {
  // Use 'useState' instead of 'useState'
  const [items, setItems] = useState([]);
  const { userDetails, setUserDetails } = useUserDetailsContext();
  const {id} = params

  useEffect(() => {
    // Correct the function definition
    const fetchData = async () => {
      console.log("fetching started")
      
      try {
        const response = await fetch(`/api/categories/${id}`);
        const data=await response.json();
        console.log(data.menus,"data.menus")
        setItems(data.menus);
        return data;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]); 

  return (
    <div className="grid   grid-rows-3 grid-cols-3 p-12 gap-8 px-20 min-h-screen align-center justify-center bg-white text-white">
      {items?.map((category) => (
        <div
          key={category.id}
          className="bg-black w-80 flex-col gap-3 rounded-md overflow-hidden"
        >
          <RestaurentNavigator id={category.restaurantId} />

          <MenuCard
            category={category}
            setUserDetails={setUserDetails}
            userDetails={userDetails}
          />
        </div>
      ))}
    </div>
  );
};

export default Categories;
