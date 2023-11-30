import React, { useState, useCallback } from 'react';
import { usePathname,useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

const Toggle = ({key, filter, setFilters }) => {
  const [toggle, setToggle] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleToggle = () => {
    setToggle(!toggle);

    // Toggle the filter value and update the URL
    const updatedFilters = { ...filter, value: !filter.value };
    setFilters((old) => {
        const index = old.findIndex((item) => item.name === filter.name);
      
        if (index !== -1) {
          const updatedFilters = [...old];
          updatedFilters[index] = {
            ...old[index],
            value: !old[index].value,
          };
          
          return updatedFilters;
        }
      
        return old;
      });
      

    // Construct the new searchParams string
    const updatedQueryString = createQueryString(filter.name, updatedFilters.value);

    // Update the URL
    router.push(pathname + '?' + updatedQueryString)
  };

  return (
    <div className='relative flex'>
      <div
        onClick={handleToggle}
        className={`cursor-pointer  text-center text-xs rounded-md h-10 w-10 text-green-700 ${
          filter.value ? 'text-green-700 bg-green-700 ' : 'bg-white text-red-700'
        }`}
      >
        <h1 className='flex py-2 text-center justify-center items-center'>{filter.name}</h1>
      </div>
      <div
        onClick={handleToggle}
        className={`cursor-pointer w-10 rounded-md text-center h-10 ${
          filter.value ? 'bg-white text-green-700' : 'bg-red-700 text-red-700'
        }`}
      >
        <h1 className='flex text-center text-xs py-2 justify-center items-center'>{filter.name}</h1>
      </div>
    </div>
  );
};

export default Toggle;
