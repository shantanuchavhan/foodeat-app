import React from 'react'
import { useSession } from 'next-auth/react'


import { removeUserAddress } from '@/actions/Action'

const Addresses = ({addres,index ,setConfirmAddress,confirmAddress,setIsAddressRequiredSection}) => {
  const {data}=useSession()
  console.log(confirmAddress,"confirmAddress")
  return (
        <>
        {
            addres ? (
                <div className='border relative  border-solid border-gray p-4 h-12/13 w-3/6 flex flex-col gap-3 align-center justify-center'>
        <div className='flex gap-2'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            Other
        </div>
        <div className='flex gap-2'>
            <h3 className='text-gray-400 px-3'>{addres}</h3>
        </div>

        <button
            type="submit"
            className="border border-solid border-gray flex align-center justify-center p-3 w-3/5 bg-green-500 text-white"
            onClick={() => {
                setConfirmAddress((old) => addres)
                setIsAddressRequiredSection((old) => true)
                // console.log(confirmAddress,"confirmAddress")
            }}
            >
            Delivere Here
        </button>
        <form className='absolute -top-3 -right-2' action={removeUserAddress.bind(null,data?.user?.email)} >
            <input type="hidden" name='address' value={addres} />
            <input type="hidden" name='id' value={index} />
            <button type='submit'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-200">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </button>
        </form>
        </div> 
            ):(
                ""
            )
        }   
    </>      
  )
}

export default Addresses