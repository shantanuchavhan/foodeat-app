"use client"
import { getAllOrders } from "@/actions/orderActions";
import { cancelOrder } from "@/actions/orderActions";
import emptyOrdersImage from "../../../../../public/images/noOrderHistory.jpg"
import Image from 'next/image';
import { useEffect, useState } from "react";
import { Popover } from '@headlessui/react'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Page =  ({ params }) => {
  console.log("hii");
  console.log(params.userId,'params.userId')
  const[orders,setOrders]=useState([])
  const [isPopoverOpen, setPopoverOpen] = useState(false);
   
  useEffect(()=>{
    const fetchData = async () => {
      try {
        const data = await getAllOrders(params.userId);
        setOrders((old) => data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    
    fetchData()
    
  },[params.userId])
  console.log(orders,"orders records are here")

  async function removeOrder(orderToRemove) {
    
    const data = await cancelOrder(orderToRemove.id,params.id)
    if(data){
      setOrders((oldOrders) => oldOrders.filter((order) => order.id !== orderToRemove.id));
      toast.success("order canceled successfully",{ autoClose: 500 })
    }
    
    
  }
  

  return (
    <div className="bg-amber-100 min-h-screen flex flex-col text-black  p-20">
      {
        orders?.length > 0? (
          <div >
          {orders?.map((order) => (
            <div  className="flex flex-col gap-2 py-2"  key={order.id}>
              {order.orderedItems && order.orderedItems.length > 0 ? (
                <div >
                  <div className="flex gap-3 bg-red-200 p-2 ">
                    <h1>{order.orderNumber}</h1>
                    <h3>Total Amount:- {order.totalAmount}</h3>
                  </div>
                  {order.orderedItems.map((item) => (
                    <div key={item.id} className="flex gap-2 justify-between bg-red-300 p-2 ">
                      {/* Render individual ordered item details */}
                      <div>
                        <p className="">{item.menu.itemName}</p>
                        <p className="">Quantity:- {item.quantity}</p>
                        {item.deliveryCompletions==null&&<div><h1>Arriving soon</h1></div> }
                      </div>
                      <ToastContainer></ToastContainer>
                      <Popover> 
                        <Popover.Button className="px-2 bg-white text-red-400" 
                          onClick={()=>{
                            setPopoverOpen((old)=>true)
                            console.log("isPopoverOpen Popover.Button:-",isPopoverOpen)
                          }}>Cancel Order
                        </Popover.Button>
                        {
                          isPopoverOpen && (<Popover.Panel>
                            <div className="px-2 flex gap-4 bg-amber-400 py-2">
                              <div >
                                <input type="hidden" name="id" value={order.id} />
                                <input type="hidden" name="userId" value={params.id} />
                                <button type="submit" onClick={()=>removeOrder(order)}>
                                  <h1>Yes</h1>
                                </button>
                              </div>
                              <div>
                              <button
                                  type="submit"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    
                                    setPopoverOpen(false);
                                  }}
                                >
                                  <h1>no</h1>
                                </button>                                
                              </div>
                              
                            </div>
                                
                            </Popover.Panel>)
                        }
                      </Popover>
                      
                    </div>
                  ))}
                </div>
              ) : (
                ""
              )}
            </div>
          ))}
        </div>
        ):(
          <div className="flex flex-col items-center justify-center">
            <Image src={emptyOrdersImage} height={300} width={300} alt="no orders"/>
          </div>
        )
      }
  </div>
   
  );
};

export default Page; // Renamed the component to start with an uppercase letter as per React convention
