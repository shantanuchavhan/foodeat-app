"use client"
import React from 'react'
import Link from 'next/link' 
import { useSession } from 'next-auth/react'
import logo from "../../../../../public/images/logo-food.png"
import Image from 'next/image'
import { useRestaurentDetailsContext } from '@/context/restaurentDetailsContext'
const Header = () => {
    const {data}=useSession()
    const {restaurantDetails, setRestaurantDetails}=useRestaurentDetailsContext()
    console.log(data?.user)
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
            <Link href={'/dashboard'}>Add Restauret</Link> 
            <Link href={'/signin'}>login</Link>
            <Link href='/checkout'>Cart</Link>
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
            <Link href='/checkout'>Cart</Link>
            <Link href={'/orders'}>Orders</Link>
        </nav>
    </div>)
    }
    </>
  )
}

export default Header