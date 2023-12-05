"use client"

import React from 'react'
import { useState,useEffect } from 'react'
import Link from 'antd/es/typography/Link'

import AddresComponent from './AddresComponent'
import PaymentComponent from './PaymentComponent'
import { getUserDetails } from '@/actions/Action'
import { useSession } from 'next-auth/react'
import { useUserDetailsContext } from '@/context/userDetailsContext'

const DeliveryAndPaymentSection = ({isAuthRequiredSectionComplete,userid }) => {
    const [address,setAddress]=useState()
    const [isAddressRequiredSection, setIsAddressRequiredSection]=useState(false)
    const {userDetails}=useUserDetailsContext()
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
        <>
            {
                userDetails?.cart?.length>0 ?
                    (<>
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
                    </>):
                    (
                        <div>
                            <Link href={`/`} className='bg-green-400 text-center py-5  flex align-center justify-center px-20'><h5 className='text-red-600'>Grab some foods first</h5></Link>
                        </div>
                    )
            }
       
        </>
        
    </>
  )
}

export default DeliveryAndPaymentSection