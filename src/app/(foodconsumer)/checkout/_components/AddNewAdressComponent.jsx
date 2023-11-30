
import { addUserAddress } from '@/actions/Action'
import { useSession } from 'next-auth/react'

const AddNewAdressComponent = () => {
    const {data}=useSession()
  return (
    <div className='border  border-solid border-gray p-4 h-12/13 w-3/6 flex flex-col gap-3 align-center justify-center'>
        <div className='flex gap-2'>
            <div className='relative w-6'>
                <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg >
                <div className="absolute top-0 right-0">
                    <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 rounded-full text-white  bg-green-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
            </div>
            <div>
                <h1>Add New Address</h1>
            </div>
        </div>
        <form  action={addUserAddress.bind(null,data?.user?.email)}>
            <textarea className='border border-gray-100 w-full p-2' name="address" type="text" />
            <button className='border  border-solid border-gray  flex align-center justify-center p-3 text-green-500' type='submit'>Add Address</button>
        </form>
    
    </div>
  )
}

export default AddNewAdressComponent