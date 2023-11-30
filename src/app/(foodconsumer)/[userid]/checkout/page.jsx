
"use client"
import React from 'react';
import { useSession } from 'next-auth/react';

import { useEffect,useState } from "react"
import emptyCartimg from "../../../../../public/images/Cart_empty.webp"
import Image from 'next/image';


import CartPaymentDetails from './_components/CartPaymentDetails';

import { getUserCart } from '@/actions/Action';


import AuthRequiredSection from './_components/AuthRequiredSection';
import DeliveryAndPaymentSection from './_components/DeliveryAndPaymentSection';



const Page = ({params}) => {
  
  const { status,data } = useSession();
  const [cartItems, setCartItems] = useState(null);
  const [ cartPaymentDetailsSection, setCartPaymentDetailSection]=useState(false)
 
  useEffect(() => {
    const fetchUserCart = async () => {
      try {
        console.log(fetchUserCart ,"fetchcart strated")
        const cartItems = await getUserCart(data?.user?.email);
        setCartItems((old)=>cartItems)
        console.log(cartItems)
        if(cartItems[0].id){
          
          setCartPaymentDetailSection((old)=>true)
        }
      } catch (error) {
        // Handle any errors that occurred during the fetch
        console.error("Error fetching user cart:", error);
      }
    };
    fetchUserCart();
  }, [data?.user?.email]);


 
  

  console.log(cartPaymentDetailsSection,"cartPaymentDetailsSection ")
  return (
    <div className='flex text-black gap-10 py-10  px-10 bg-amber-100 h-screen'>
      <div className='w-full '>
        {status === 'loading' ? (
          <p className='w-4/5  h-100 flex-col justify-center align-center gap-12 p-5 '>Loading...</p>
        ) : status !== 'authenticated' ? (
          <div className=''>
            <AuthRequiredSection />
          </div>
        ) : (
          <div className='flex flex-col gap-5'>
              <DeliveryAndPaymentSection isAuthRequiredSectionComplete={true} userid={params.userid} />
          </div>
        )}
      </div>

    
      
          {
            
            cartPaymentDetailsSection ? 
              (
                <CartPaymentDetails cartItems={cartItems}/>
              ):(
                <div className='w-1/5 flex-col py-10 item-center justify-center'>
                  <h1 className='text-center font-bold text-slate-600 text-lg'>Empty Cart</h1>
                  <div className='py-10'>
                    <Image src={emptyCartimg} height={300}  width={300} alt=''/>
                    <p className='py-4 text-slate-400'>Good food is always cooking! Go ahead, order some yummy items from the menu.</p>
                  </div>
                </div>
              )
            }
       
    </div>
  );
};

export default Page;
