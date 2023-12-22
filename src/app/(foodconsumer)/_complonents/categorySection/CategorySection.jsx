"use client";
import { getCategoriesAction } from "@/actions/Action";
import style from "./style.module.css";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";
import { useCallback } from "react";
const CategorySection = () => {
  const [categories, setCategories] = useState(null); // Initialize with null

  const searchParams = useSearchParams();
  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  useEffect(() => {
    console.log("fetch started");

    const fetchData = async () => {
      try {
        const response = await fetch("/api/categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]); // Set categories to an empty array in case of an error
      }
    };

    fetchData();
  }, []);

  console.log(categories, "categories");

  return (
    <div className="bg-white text-black flex  justify-center flex-col gap-4 px-10 py-4">
      <h2>Choose your favouraite one</h2>
      <div className="flex gap-8 align-center justify-center">
        {categories === null ? (
          <p>Loading...</p>
        ) : (
          categories.map((category) => (
            <Link
              href={
                "/categories?" + createQueryString("category_id", category.id)
              }
              className="flex-col align-center gap-4 text-center"
              key={category.id}
            >
              <img
                style={{
                  height: "120px",
                  width: "200px",
                  borderRadius: "10px",
                }}
                src={category.imageUrl}
              />
              <h3>{category.categoryName}</h3>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default CategorySection;
