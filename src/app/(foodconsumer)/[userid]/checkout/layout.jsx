import React from 'react'
import { UserDetailsProvider } from '@/context/userDetailsContext'
const layout = ({children}) => {
  return (
    <UserDetailsProvider>
    <div>{children}</div>
    </UserDetailsProvider>
  )
}

export default layout