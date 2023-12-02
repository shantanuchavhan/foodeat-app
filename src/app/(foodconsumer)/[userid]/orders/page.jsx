import { getAllOrders } from "@/actions/orderActions"; // Assuming the correct function name is getAllOrder

const Page = async ({ params }) => {
  console.log("hii");
  const data = await getAllOrders(params.userId); // Corrected function name
  console.log(data)

  return (
    <div className="bg-amber-100 min-h-screen flex flex-col text-black  p-20">
    <div >
      {data.map((order) => (
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
                  <button >
                    <h3 className="bg-red-500 p-2 rounded-md">Cancel</h3>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            ""
          )}
        </div>
      ))}
    </div>
  </div>
   
  );
};

export default Page; // Renamed the component to start with an uppercase letter as per React convention
