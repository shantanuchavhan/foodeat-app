"use client";
import { Select } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { getCategoriesAction } from "@/actions/Action";

const CategoryName = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [categories, setCategories] = useState();
  useEffect(() => {
    console.log("fetch started");

    const fetchData = async () => {
      try {
        const data = await getCategoriesAction();
        console.log(data, "data");
        setCategories(data);
        setSelectedOption(data[0].id);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]); // Set categories to an empty array in case of an error
      }
    };

    fetchData();
  }, []);
  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };
  console.log(categories, "categories");
  return (
    <div className="text-black bg-red-100  py-1  flex  items-center  justify-center h-12 px-3">
      <input type="hidden" name="categoryName" value={selectedOption} />
      <label htmlFor="categorySelect">Select Category : </label>
      <select
        className="bg-yellow-100"
        id="categorySelect"
        value={selectedOption}
        onChange={handleSelectChange}
      >
        <option value="" disabled>
          Select Category
        </option>
        <h1>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam
          corrupti facere nulla repellendus quo cupiditate optio fugiat
          reiciendis beatae veritatis ipsam, laudantium dignissimos odio,
          consequatur, accusantium eius eum molestias repudiandae.
        </h1>
        {categories?.map((category) => (
          <option key={category.id} value={category.id}>
            {category.categoryName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryName;
