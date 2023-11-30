"use client"

import React from 'react'
import { useState,useEffect } from 'react'


import AddresComponent from './AddresComponent'
import PaymentComponent from './PaymentComponent'
import { getUserDetails } from '@/actions/Action'
import { useSession } from 'next-auth/react'

const DeliveryAndPaymentSection = ({isAuthRequiredSectionComplete,userid }) => {
    const [address,setAddress]=useState()
    const [isAddressRequiredSection, setIsAddressRequiredSection]=useState(false)
    const {data}= useSession()
    useEffect(()=>{
        const fetchData=async()=>{
            const dataa=await getUserDetails("email",data?.user?.email)
            console.log(dataa,"data address")
            setAddress((old)=>dataa.address)

        }
        fetchData() 
    },[data?.user?.email])
  return (
    < >
        {
            isAuthRequiredSectionComplete? 
            (
               <AddresComponent address={address} setAddres={setAddress} setIsAddressRequiredSection={setIsAddressRequiredSection} isAddressRequiredSection={isAddressRequiredSection}/> 
            )
            :(

                <div className='bg-amber-50 flex item-center justify-center'>
                    Delivery Address
                </div>   
            )
        }
        {
            isAddressRequiredSection ? 
            (
                <PaymentComponent userid={userid}/>
            ):
            (                
            <div className='bg-amber-50 p-10 '>
                    <h1 className='text-lg text-gray-300  font-bold'>Payment</h1>
                </div>
                
            )
        }
        
    </>
  )
}

export default DeliveryAndPaymentSection