import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import style from "./app.module.css";
import { useRestaurentDetailsContext } from "@/context/restaurentDetailsContext";

const getData = async (slug) => {
  const res = await fetch(`http://localhost:3000/api/restaurent/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

const UserInfo = () => {
  const { setRestaurantDetails } = useRestaurentDetailsContext();
  const { data } = useSession();
  const [restaurentName, setRestaurentName] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (data?.user?.email) {
          const restaurant = await getData(data.user.email);
          setRestaurantDetails(restaurant);
          setRestaurentName(restaurant.restaurantName);
          console.log(restaurant.restaurantName); // Log the value directly from the fetched data
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [data?.user?.email, setRestaurantDetails]);

  return (
    <div className={style.Container}>
      <img className={style.ProfilePic} src={data?.user?.image} alt="" />
      <div>
        <h4 className={style.username}>{data?.user?.name}</h4>
      </div>
    </div>
  );
};

export default UserInfo;
