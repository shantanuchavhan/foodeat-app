import { getMenuDetail } from "@/actions/Action";
import { useEffect, useState } from "react";
import Image from "next/image";
import AddToCart from "../../_complonents/AddToCart/AddToCart";
import { menu } from "@nextui-org/react";

const CartItems = ({ cartItem, setItemsTotal,itemsTotal }) => {
  
  const [isLoading, setIsLoading] = useState(!cartItem? true : false);
  console.log("cartItem", cartItem)
  

  useEffect(() => {
    if (cartItem?.menu?.price) {
      console.log(cartItem.menu.price,"uce")
      setItemsTotal((old) => old + (cartItem.menu.price*cartItem.quantity));
    }
  }, [cartItem,setItemsTotal]);

  return (
    <div className="text-black flex items-center justify-between py-2">
      <div className="flex  gap-2 w-3/5 p-2">
        <div className="overflow-hidden h-6">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <Image
              src={cartItem?.menu?.imageUrls[0] || "/placeholder-image.jpg"}
              height={60}
              width={60}
              objectFit="cover"
              alt=""
            />
          )}
        </div>
        <h1 className="text-sm">{cartItem?.menu?.itemName || "Item Name"}</h1>
      </div>
      <div className="flex w-2/5 gap-10 items-center justify-center">
        <AddToCart quantity={cartItem.quantity} menuId={cartItem.menuId} />
        <h1 className="text-sm">{cartItem?.menu?.price*cartItem?.quantity || 0}</h1>
      </div>
    </div>
  );
};

export default CartItems;
