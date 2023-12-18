"use client"
import { createContext, useContext, useState} from "react";
import { useSession } from "next-auth/react";
import { getUserDetails } from "@/actions/Action";
import { useEffect } from "react";
const userDetailsContext = createContext();

export  function UserDetailsProvider({ children }) {
  const { status, data } = useSession();
  const [userDetails, setUserDetails] = useState(null); 
  useEffect(() => {
    const fetchData = async () => {
      
      try {
        if (status === "authenticated") {
          console.log(data?.user?.email,"status")
          const userData = await getUserDetails("email", data?.user?.email);
          
          if(userData){
            console.log(userData, "user Data from userDetails Provider");
            setUserDetails(userData);
          }
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
  
    fetchData();
  }, [data?.user?.email]);

  
  
  return (
    <userDetailsContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </userDetailsContext.Provider>
  );
}

export function useUserDetailsContext() {
  return useContext(userDetailsContext);
}
