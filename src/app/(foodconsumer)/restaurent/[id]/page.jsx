"use client"
import { useParams } from "next/navigation"
import { useEffect,useState } from "react"
import { getRestaurentDetails } from "@/actions/Action"
import Toggle from "../../_complonents/Toggle/Toggle"
import MenuCard from "../../_complonents/MenuCard/MenuCard"
import { useSearchParams } from "next/navigation"
const Page = () => {
    const [restaurantData,setRestaurentData]=useState()
    const pathname=useParams()
    const searchParams = useSearchParams()
    const veg = searchParams.get('veg')||false
    const rating = searchParams.get('4+')||false
    const meal = searchParams.get('meal')||false
    console.log(veg)
    const [filters,setFilters]=useState([
       {name:"veg", value:veg} ,
       {name:"4+", value:rating}, 
       {name:"meal", value:meal}, 
    ])
    console.log(pathname,"pathname")
    useEffect(() => {
        console.log(veg,"veg")
        const fetchData = async () => {
          try {
            const data = await getRestaurentDetails(pathname?.id);
            console.log(data,"guyh")
            setRestaurentData(data);
          } catch (error) {
            console.error('Error fetching restaurant data', error);
          }
        };
        fetchData();
      }, [pathname?.id,veg]);
  return (
    <div className="flex align-center justify-center py-12">
        <div className="">
            <div className="flex align-center p-10 justify-between">
                <div>
                    <h1 className="text-2xl">{restaurantData?.restaurantName.charAt(0).toUpperCase() + restaurantData?.restaurantName.slice(1)}</h1>
                    <h4>3km Away </h4>
                </div>
                <div className="flex  gap-4">
                    
                    {
                        filters?.map((filter,index) => (
                            <Toggle key={index} filter={filter} setFilters={setFilters} />
                        ))
                    }

                        
                </div>
                <div className="flex-col">
                    <div className="flex gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                        </svg>
                        <h1>4.4</h1>
                    </div>
                    
                    <div>
                        55+ Ratings
                    </div>
                    
                </div>
            </div>
            <div className="grid   grid-rows-3 grid-cols-3 p-12 gap-8 px-20 align-center justify-center bg-white text-white ">
                {
                    restaurantData?.menuItems.map((menu)=>(
                        <MenuCard key={menu.id} category={menu} />
                    ))
                }
            </div>

        </div>

    </div>
  )
}

export default Page