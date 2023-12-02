"use client"
import React from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

const PaymentComponent = () => {
   
    return (
    <div className='bg-amber-50  py-10 h-40 flex align-center justify-center '>
    <Link href={`payment`} className='bg-green-400 text-center py-5 text-white flex align-center justify-center px-20'>Proceed to Pay</Link>
    </div>
  )
}

export default PaymentComponent