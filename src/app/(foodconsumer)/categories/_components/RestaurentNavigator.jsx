import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getRestaurentDetails } from "@/actions/Action";

const RestaurentNavigator = ({ id }) => {
  const [restaurentData, setRestaurentData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRestaurentDetails(id);
        console.log(data);
        setRestaurentData(data);
      } catch (error) {
        console.error("Error fetching restaurant data", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <Link href={`/restaurent/${restaurentData?.id}`}>
      <div className="text-[#FFF37C] bg-black  py-3 flex px-4 py-2 align-center justify-between text-center border-b border-dotted border-gray-500">
        <div>
          <h1>
            <span className="text-gray-300">From:</span>{" "}
            {restaurentData?.restaurantName}
          </h1>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </div>
    </Link>
  );
};

export default RestaurentNavigator;
