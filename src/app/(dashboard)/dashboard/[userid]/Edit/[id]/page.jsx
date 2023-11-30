
"use client"
import React from 'react'
import Image from 'next/image'
import style from "../../add-menu/style.module.css"
import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import { getMenuDetail } from '@/actions/Action'
import { useState } from 'react'
import { updateMenu } from '@/actions/menuActions'


const Page = () => {
  const params =useParams()
  console.log(params)
  const [menuData, setMenuData] = useState({
    menuName: '',
    description: '',
    images: [],
    price: '',
    isVegetarian: false,
    isMeal:false
  });

  useEffect(() => {
    try {
      const fetchData = async () => {
        console.log("hoo")
        const fetchedMenu = await getMenuDetail(params.id); // Use `params.id` to get the menu ID from the route
        console.log("hodco")

        // Set the state with the fetched menu data
        setMenuData({
          menuName: fetchedMenu.itemName,
          description: fetchedMenu.description,
          images: fetchedMenu.imageUrls,
          price: fetchedMenu.price,
          isVegetarian: fetchedMenu.isVegetarian,
          isMeal:fetchedMenu.isMeal
        });
      };

      fetchData(); // Invoke the async function
    } catch (error) {
      console.error('Error fetching menu:', error);
      // Handle the error as needed
    }
  }, [params.id]);

  // Event handler for form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    // Handle file input separately
    if (type === 'file') {
      // Your file handling logic here
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
  const handleSubmit = async() => {
    
    console.log("hii")
    // Create a FormData object
    const formData = new FormData();
  
    // Append each property of menuData to the FormData object
    

    Object.entries(menuData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    for (const pair of formData.entries()) {
      console.log(pair);
    }
  
    console.log('Menu data submitted:', formData);

    try {
      await updateMenu.bind(null,menuData.id);
    } catch (error) {
      console.error('Error adding menu:', error);
      // Handle error (e.g., display an error message to the user)
    }
  };
  
  return (
    <form className={style.form} action={updateMenu}>
      <div className={style.left}>
      <input type="hidden" value={params.id} name="id"/>

        <input className={style.input} type="text" value={menuData.menuName} name="menuName" onChange={handleInputChange} />
        <textarea className={style.textarea} value={menuData.description}  type="text" name="description" onChange={handleInputChange} />
        <input className={style.input}  type="number" value={menuData.price}  name="price" onChange={handleInputChange} />
      </div>

     <div className={style.right}>

     <div className='flex gap-0'>
        <input className={style.fileinputcontainer}  type="file" accept="image/*" name="images" multiple onChange={handleInputChange} />
        <div className={style.imagescontainer}>
        {
          menuData?.images?.map((image,index)=>(
            <Image key={index} src={image} alt="image" height={40} width={40}></Image>
          ))
        }
        </div>
        </div>
        <div className='flex w-full'>
        <input
          className={style.input}
          name="isVegetarian"
          type="checkbox"
          checked={menuData.isVegetarian}
          onChange={handleInputChange}
        />
          <h5>is veg</h5>
        </div>
        <div className='py-2'>
            <input
              className={style.input}
              name="isMeal"
              type="checkbox"
              checked={menuData.isMeal}
              onChange={handleInputChange}
            />
          <h5>is meal</h5>
        </div>
        <button className={style.button} type="submit">Edit Menu</button>
     </div>
    </form>
  )
}

export default Page