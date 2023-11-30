// Import the correct hook from React
"use client"
import React, { useState, useEffect } from 'react';
import { getMenuCategoryAction } from '@/actions/Action';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import RestaurentNavigator from './_components/RestaurentNavigator';
import MenuCard from '../_complonents/MenuCard/MenuCard';
const Categories = () => {
  // Use 'useState' instead of 'useState'
  const [items, setItems] = useState([]);

  const searchParams = useSearchParams();
  const id = searchParams.get('category_id');

  useEffect(() => {
    // Correct the function definition
    const fetchData = async () => {
      try {
        const data = await getMenuCategoryAction(id);
        console.log(data.menus);
        // Update state correctly
        setItems(data.menus);
        return data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]); // Remove 'setCategories' from the dependencies array

  return (
    <div className='grid   grid-rows-3 grid-cols-3 p-12 gap-8 px-20 align-center justify-center bg-white text-white'>
     
      {/* Render your categories here */}
      {items.map((category) => (
        <div key={category.id} className='bg-black w-80 flex-col gap-3 rounded-md overflow-hidden' >
          <RestaurentNavigator id={category.restaurantId} />
        <MenuCard category={category}/>
        </div>
      ))}
    </div>
  );
};

export default Categories;
