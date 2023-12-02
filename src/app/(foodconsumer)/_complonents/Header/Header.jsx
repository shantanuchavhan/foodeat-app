"use client"
import React from 'react'
import Link from 'next/link' 
import { useSession } from 'next-auth/react'
import logo from "../../../../../public/images/logo-food.png"
import Image from 'next/image'
import { useRestaurentDetailsContext } from '@/context/restaurentDetailsContext'

import { useRouter } from 'next/navigation'
import { getUserDetails } from '@/actions/Action'
import { useEffect,useState } from 'react'
import { usePathname } from 'next/navigation'

const Header = ({ params }) => {
  const [userid,setUserid]=useState()
  const {data,status}=useSession()
  const pathname = usePathname()  
    useEffect(()=>{
      const fetchedData=async()=>{
        const user=await getUserDetails("email",data?.user?.email)
        console.log(user,"user")
        setUserid(()=>user?.id)
      }
      fetchedData()
     
    },[data])
    // console.log(params.userid,"fromheaderparams")
   
    const router=useRouter()
    
    
    
    const {restaurantDetails, setRestaurantDetails}=useRestaurentDetailsContext()
    console.log(userid)
  return (
    <>
    {!data?.user ?
      (<div className='flex h-12 items-center justify-between p-10'>
        <Link href={'/'}>
          <div>
            <Image src={logo} height={30} width={30} alt="" />
          </div>
        </Link>
        <nav className='flex gap-12'>
            <div className=''></div>
            <Link href={`/dashboard`}>Add Restauret</Link> 
            <Link href={"/signin"}>login</Link>
            <Link href={"/checkout"}>Cart</Link>
        </nav>
    </div>):
    (<div className='flex h-12 items-center justify-between p-10'>
        <Link href={'/'}>
          <div>
            <Image src={logo} height={30} width={30} alt="" />
          </div>
        </Link>
        <nav className='flex gap-12'>
            <div className=''></div>
            {restaurantDetails?<Link href={'/dashboard'}>Your Restauret</Link>:<Link href={'/dashboard'}>Add Restauret</Link> }
            <Link href={`/${userid}/checkout`}>Cart</Link>
            <Link href={`/${userid}/orders`}>Orders</Link>
        </nav>
    </div>)
    }
    </>
  )
}

export default Header