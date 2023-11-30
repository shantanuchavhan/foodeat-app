"use client"
import { createContext, useContext, useState} from "react";
import { useSession } from "next-auth/react";
import { getUserDetails } from "@/actions/Action";

const userDetailsContext = createContext();

export async function UserDetailsProvider({ children }) {
//   const { status, data } = useSession();
  const [userDetails, setUserDetails] = useState(null); 
//   const Data= await getUserDetails("email",data.user.email)
  return (
    <userDetailsContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </userDetailsContext.Provider>
  );
}

export function useUserDetailsContext() {
  return useContext(userDetailsContext);
}
