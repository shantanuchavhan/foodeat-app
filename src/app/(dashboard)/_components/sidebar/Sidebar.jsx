"use client"
import React from 'react'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'


import UserInfo from './_components/UserInfo/UserInfo'
import style from  "./Sidebar.module.css"
import AddDishButton from '@/components/button/Button'
import Navbar from './_components/Navbar/Navbar'
import logo from "../../../../../public/images/logo-food.png"
import { useRestaurentDetailsContext } from '@/context/restaurentDetailsContext';

const Sidebar = () => {
  const {restaurantDetails} = useRestaurentDetailsContext()
  const [activeSection,setActiveSection]=useState("Home")
  return (
    <div className={style.Sidebar}>
        <div className={style.sitelogo}><div className='logo-img'><Image style={{ borderRadius: '12px' }}    height={30} width={30} src={logo} alt="" /></div><h5 >Foodeat</h5></div>
        <UserInfo/>
        <Link href={`/dashboard/${restaurantDetails.restaurantName}/add-menu `} onClick={()=>setActiveSection("")}><AddDishButton/></Link>
        <Navbar activeSection={activeSection} setActiveSection={setActiveSection}/>
    </div>
  )
}

export default Sidebar