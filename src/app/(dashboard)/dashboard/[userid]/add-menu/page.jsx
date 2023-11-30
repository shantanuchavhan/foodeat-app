
"use client"
// Import necessary dependencies and styles
import React, { useState ,useEffect} from 'react';
import Image from 'next/image';

import style from "./style.module.css";

import { useRestaurentDetailsContext } from '@/context/restaurentDetailsContext';
import { addMenuAction } from '@/actions/menuActions';
import CategoryName from '../../_components/CategoryName';
// Define the Page component
const Page = () => {
  const [images,setImages]=useState([])  
  const { restaurantDetails } = useRestaurentDetailsContext();
  const id = restaurantDetails.id;

  // State to manage form data
  const [menuData, setMenuData] = useState({
    menuName: '',
    description: '',
    images: [],
    price: '',
    isVegetarian: false,
  });

  // Event handler for form input changes
  const handleInputChange = async(e) => {
    const { name, value, type, checked, files } = e.target;
    
    // Handle file input separately
    if (type === 'file') {
      let filesArray = []
      const formData = new FormData();
      
    for ( const file of Array.from(files) ) {
      formData.append('file', file);
      formData.append('upload_preset', 'my_uploads_food');
      const data = await fetch('https://api.cloudinary.com/v1_1/ddw1upvx3/image/upload', {
      method: 'POST',
      body: formData
      }).then(r => r.json());
      setImages((value)=>[...value,data.url])
      filesArray.push(data.url)
      console.log(filesArray,"filesArray")
      }
      setMenuData((prevData) => ({
        ...prevData,
        images: filesArray ,
      }));
    } else if (type === 'checkbox') {
      setMenuData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else {
      setMenuData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Event handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(menuData,"menuData")
    // Create a new FormData object
    const formData = new FormData();
    
    // Append each key-value pair to the FormData object
    Object.entries(menuData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    for (const pair of formData.entries()) {
      console.log(pair);
    }

    try {
      // Call the addMenuAction function with the restaurant ID and form data
      await addMenuAction(id, formData);
      // Add any additional logic or redirection after menu submission if needed
    } catch (error) {
      console.error('Error adding menu:', error);
      // Handle error (e.g., display an error message to the user)
    }
  };
  console.log(menuData.images)
  // Return the JSX for the component
  return (
    <form className={style.form} action={addMenuAction.bind(null,id,menuData.images)}>
      <div className={style.left}>
        <input className={style.input} type="text" name="menuName" onChange={handleInputChange} />
        <textarea className={style.textarea}  type="text" name="description" onChange={handleInputChange} />
        <div className='flex gap-0'>
        <input className={style.fileinputcontainer}  type="file" accept="image/*" name="images" multiple onChange={handleInputChange} />
        <div className={style.imagescontainer}>
        {
          images.map((image,index)=>(
            <Image key={index} src={image} alt="image" height={40} width={40}></Image>
          ))
        }
        </div>
        </div>
      </div>

     <div className={style.right}>
        <input className={style.input}  type="number" name="price" onChange={handleInputChange} />
        <div className='flex w-full align-center justify-between'>
          <div className='flex  align-center gap-2'>
            <input className={style.input}  name="isVegetarian" type="checkbox"  onChange={handleInputChange} />
            <h5>is veg</h5>
          </div>

          <CategoryName />
        </div>
      
        <div className='flex gap-3 align-center '>
          <input
            className={style.input}
            name="isMeal"
            type="checkbox"
            checked={menuData.isMeal}
            onChange={handleInputChange}
          />
            <h5>is meal</h5>
        </div>
        
        <button className={style.button} type="submit">Add Menu</button>
     </div>
    </form>
  );
};

// Export the Page component
export default Page;
