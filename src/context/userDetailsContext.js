"use client"
import { createContext, useContext, useState} from "react";
import { useSession } from "next-auth/react";
import { getUserDetails } from "@/actions/Action";
import { useEffect } from "react";
const userDetailsContext = createContext();

export  function UserDetailsProvider({ children }) {
  const { status, data } = useSession();
  const [userDetails, setUserDetails] = useState(null); 
  useEffect(()=>{
    const fetchedData=async()=>{
      const Data= await getUserDetails("email",data?.user?.email)
      console.log(Data,"user Data from userDetails Provider")
      setUserDetails(Data)
      
    }
    fetchedData()
  },[data?.user?.email])

  
  console.log(userDetails,"user Data from userDetails Provider")
  return (
    <userDetailsContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </userDetailsContext.Provider>
  );
}

export function useUserDetailsContext() {
  return useContext(userDetailsContext);
}
