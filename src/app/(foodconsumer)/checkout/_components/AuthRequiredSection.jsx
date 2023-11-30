import React from 'react'
import Link from 'next/link'
import { useState } from 'react'
import DeliveryAndPaymentSection from './DeliveryAndPaymentSection'
import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Login from '@/components/signin/Login'
const AuthRequiredSection = () => {
  const [isAuthRequiredSectionComplete,setIsAuthRequiredSectionComplete]=useState(false)
  const {status,data}=useSession()
  useEffect(()=>{
    if(status==="authenticated"){
        setIsAuthRequiredSectionComplete(true)
    }
  },[status])

  return (
    < >
        
        
            {
                status==="authenticated" ? 
                (   <>
                    <div className='bg-amber-50'>
                        <h1 className='font-bold'>Logged in</h1>
                        {
                            <h1>
                                <span>{data?.user?.name}</span> | <span>{data?.user?.email}</span>
                            </h1>
                        }
                    </div>
                    
                    <DeliveryAndPaymentSection isAuthRequiredSectionComplete={isAuthRequiredSectionComplete} />
                    
                    </>
                )
                :(
                    <div className='relative py-4'>
                        <Login/> 
                    </div>
                )
            }
            

        
    </>
  )
}

export default AuthRequiredSection