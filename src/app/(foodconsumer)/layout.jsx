import AuthProvider from "@/providers/AuthProvider"
import Header from "./_complonents/Header/Header"
import style from "./style.module.css"
import Footer from "./_complonents/Footer/Footer"
import { getRestaurentDetails } from "@/actions/Action"
import { CartDetailsProvider } from "@/context/cartContext"
import { RestaurantDetails } from "@/context/restaurentDetailsContext"
import { UserDetailsProvider } from "@/context/userDetailsContext"

const layout = ({children}) => {
  return (
    <RestaurantDetails>
    <AuthProvider>
      
        <div className={style.backgroundImage}> </div>
         <Header/> 
        <div>{children}</div>
        <Footer/>
     
    </AuthProvider>
    </RestaurantDetails>
  )
}

export default layout