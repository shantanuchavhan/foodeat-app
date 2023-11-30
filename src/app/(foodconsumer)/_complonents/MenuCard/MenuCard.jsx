import React from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import AddToCart from '../AddToCart/AddToCart';
const MenuCard = ({ category }) => {
  const searchParams = useSearchParams();
  const veg = searchParams.get('veg');
  if (veg === 'true' && !category.isVegetarian) {
    // Skip rendering non-vegetarian items when 'veg' is true
    return null;
  }

  return (
    <div className='flex-col rounded-md p-2 min-h-70 w-full bg-black'>
      <div key={category.id}>
        <div className='h-40 overflow-hidden'>
          <Image
            src={category.imageUrls[0]}
            height={300}
            width={300}
            alt='image'
            objectFit='cover'
            loading='lazy'
            quality={100}
            placeholder='blur'
            blurDataURL='https://i.pinimg.com/originals/c4/cb/9a/c4cb9abc7c69713e7e816e6a624ce7f8.gif'
          />
        </div>
        <div className='py-2 px-1'>
          <div className='flex justify-between align-center'>
            <h1 className=''>{category.itemName.charAt(0).toUpperCase() + category.itemName.slice(1)}</h1>
            <AddToCart menuId={category.id}/>
            <div className='flex justify-center items-center bg-lime-500 rounded p-1 px-2 text-white'>
              <h3>4.4</h3>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-3 h-3'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z' />
              </svg>
            </div>
          </div>
          <div></div>
          <div className='flex justify-between align-center py-2'>
            <p className='text-gray-400'>{category.description.split(' ').slice(0, 4).join(' ')}...</p>
            <h5>{category.price} for one</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
