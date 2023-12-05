import React, { useState } from 'react';
import AddNewAdressComponent from './AddNewAdressComponent';
import Addresses from './Addresses';
import { useUserDetailsContext } from '@/context/userDetailsContext';
import "react-toastify/dist/ReactToastify.css";
const AddresComponent = ({setIsAddressRequiredSection}) => {
  const [confirmAddress, setConfirmAddress] = useState("");
  const {userDetails}=useUserDetailsContext()
  return (
    <>
      {confirmAddress==="" ? (
        // If confirmAddress is truthy, display address confirmation
        <div className='bg-amber-50 p-10 min-h- flex flex-col gap-6 '>
          <div>
            <h3 className='font-bold text-gray-700'>
              {userDetails?.address ? "Select delivery address" : "Add New Address"}
            </h3>
            <p className='text-slate-400 '>You have a saved address in this location</p>
          </div>
          <div className='h-3/4 flex gap-5'>
            {userDetails?.address ? (
              // If address exists, map over the array and render Addresses component for each
              <>
                {userDetails?.address.map((addres, index) => (
                  <Addresses
                    key={index}
                    index={index}
                    addres={addres}
                    confirmAddress={confirmAddress}
                    setConfirmAddress={setConfirmAddress}
                    setIsAddressRequiredSection={setIsAddressRequiredSection}
                  />
                ))}
                <AddNewAdressComponent ></AddNewAdressComponent>
              </>
            ) : (
              // If address doesn't exist, render only AddNewAdressComponent
              <>
                <AddNewAdressComponent></AddNewAdressComponent>
              </>
            )}
          </div>
        </div>
      ) : (
        // If confirmAddress is falsy, display 'x'
        <div className='bg-amber-50 p-10 min-h- flex flex-col gap-3'>
           <div className='flex justify-between'>
              <div className='flex gap-2'>
                <h1>Delivery address </h1>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 bg-green-500 rounded-full text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
              <button className='text-red-700 text-sm' onClick={()=>{
                setConfirmAddress("")
                setIsAddressRequiredSection((old) => false)
              }}>
                CHANGE
              </button>
            </div>
          
            </div>
           <div>
              <h2>Other</h2>
              <button className='text-gray-400 text-sm' > {confirmAddress}</button>
           </div>
        </div>
      )}
    </>
  );
};

export default AddresComponent;
