
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { addCartItem } from '@/actions/cartAction';
const AddToCart = ({menuId,quantity}) => {
  const {data}=useSession()
  const [toggle, setToggle] = useState(quantity?true:false);
  const [count,setCount]=useState(quantity||1)
  const [userId,setUserId]=useState()
  console.log(userId,"console.log(userId)")
  const handleClick = () => {
    setToggle((prevToggle) => !prevToggle);
    AddtoCart(1)
    console.log(toggle)
  };

  async function AddtoCart(quantity){
    console.log("hii")
    const CartItem=await addCartItem({
        menuId:menuId,
        user:data.user,
        quantity:quantity
    })
  }

  function countit(value){
    if(value>=0){
        setCount((old)=>old+1)
        console.log(count)
        AddtoCart(count+1)

    }else{
        setCount((old)=>{
          
            if(old>1){
              console.log(old-1,"old")
                return old-1
            }else{
                if(old<=1){
                  console.log(old,"last")
                  AddtoCart(0)
                  return 0
                }
                return 
            }
        })
        AddtoCart(count)
      }
    
  }

  return (
    <div className='py-1 ' >
      {!toggle ? (
        <div className='bg-white rounded-md p-1 text-black' onClick={handleClick}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
          </svg>
        </div>
      ) : (
        <div className='bg-white rounded-md text-black p-1 flex gap-2 align-center'  >
            <svg onClick={()=>countit(-1)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
            </svg>
            {count}
          <svg onClick={()=>countit(1)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default AddToCart;
