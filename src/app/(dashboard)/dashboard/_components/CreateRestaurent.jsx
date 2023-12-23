"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { addRestaurentAction } from "@/actions/Action";

const CreateRestaurent = () => {
  const { data } = useSession();
  const useremail = data?.user?.email;

  const [formData, setFormData] = useState({
    restaurantName: "",
    address: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`/api/restaurent/${useremail}`, {
        method: "POST", // Wrap "POST" in quotes
        headers: {
          "Content-Type": "application/json", // Specify the content type as JSON
        },
        body: JSON.stringify(formData), // Convert the formData object to JSON
      });
  
      if (response.ok) {
        const data = await response.json();
        // Handle the response data as needed, e.g., update state or redirect
        console.log("Restaurant created successfully:", data);
      } else {
        console.error("Failed to create restaurant:", response.statusText);
        // Handle the error, e.g., show an error message
      }
    } catch (error) {
      console.error("Error creating restaurant:", error);
      // Handle the error, e.g., show an error message
    }
  };
  
  return (
    <form className="flex items-center justify-center h-screen" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-3">
        <label htmlFor="restaurantName">Restaurant name</label>
        <input
          type="text"
          name="restaurantName"
          value={formData.restaurantName}
          onChange={handleInputChange}
          className="py-1 px-4 rounded-lg"
        />
        <textarea
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          cols="30"
          rows="3"
          placeholder="Enter your address"
          className="p-2 rounded"
        ></textarea>
        <button type="submit" className="bg-yellow-400 rounded py-1 px-4">
          Create Restaurant
        </button>
      </div>
    </form>
  );
};

export default CreateRestaurent;
