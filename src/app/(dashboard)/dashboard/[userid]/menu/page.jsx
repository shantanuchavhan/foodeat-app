"use client";
import getRestaurentMenuList from "@/actions/Action";
import { useRestaurentDetailsContext } from "@/context/restaurentDetailsContext";
import { useEffect, useState } from "react";
import Image from "next/image";
import style from './style.module.css'
import { useRouter } from "next/navigation";
import Delete from "./_components/Delete";
const Page = () => {
  const [MenuList, setMenuList] = useState();
  const { restaurantDetails } = useRestaurentDetailsContext();
  const router=useRouter()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const Menu = await getRestaurentMenuList(restaurantDetails.id);
        console.log(Menu.categoryId, "Menu");
        setMenuList(Menu);
      } catch (error) {
        console.error("Error fetching menu:", error);
        // Handle the error as needed
      }
    };

    fetchData(); // Invoke the asynchronous function
  }, [restaurantDetails.id, setMenuList]);

  console.log(MenuList)

  function Edit(id){
    router.push(`Edit/${id}`)
  }

  return (
    <>
      <h1>Menu List</h1>
      <div>
        <table className={style.table}>
          <thead>
            <tr>
              <th className={style.th}>Photos</th>
              <th className={style.th}>Name</th>
              <th className={style.th}>Price</th>
              <th className={style.th}>Is Veg</th>
              <th className={style.th}>Update</th>
              <th className={style.th}>Delete</th>
            </tr>
          </thead>
          <tbody>
            {MenuList &&
              MenuList.map((menu) => (
                <tr key={menu.id}>
                  <td className={style.td}><Image src={menu.imageUrls[0]} height={30} width={30} alt="image loadi"></Image></td>
                  <td className={style.td}>{menu.itemName}</td>
                  <td className={style.td}>{menu.price} Rs.</td>

                  <td className={style.td}>{menu.isVegetarian ? "Yes" : "No"}</td>

                  <td className={style.td} onClick={()=>Edit(menu.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>
                  </td>
                  <Delete id={menu.id}/>
                  
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Page;
