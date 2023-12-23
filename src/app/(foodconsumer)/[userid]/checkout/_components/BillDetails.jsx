import React from "react";
import { useState } from "react";
import { useEffect } from "react";
const BillDetails = ({ totalAmount, setTotalAmount, itemsTotal }) => {
  const [deliveryFee, setDeliveryFee] = useState(50);
  const [deliveryTip, setDeliveryTip] = useState(0);
  const [platformFee, setPlatformFee] = useState(3);
  const [gstRestaurentCharges, setGstRestaurentCharges] = useState(20);
  useEffect(() => {
    setTotalAmount((old) => {
      return (
        deliveryFee +
        deliveryTip +
        platformFee +
        gstRestaurentCharges +
        itemsTotal
      );
    });
  });
  return (
    <div className="px-2 bg-amber-100 py-4">
      <h1 className="border-b border-black border-dotted">Bill Details</h1>
      <div className="py-2">
        <div className="flex justify-between">
          <h3 className="text-sm font-extralight">Item Total</h3>
          <h2 className="text-sm">{itemsTotal}</h2>
        </div>
        <div className="flex justify-between">
          <h4 className="text-sm font-extralight">Delivery Fee|3.0</h4>
          <h4 className="text-sm">{itemsTotal ? deliveryFee: "0"}</h4>
        </div>
      </div>
      <div>
        <div className="flex justify-between">
          <h3 className="text-sm font-extralight">Delivery Tip</h3>
          <h2 className="text-sm">Add tip</h2>
        </div>
        <div className="flex justify-between">
          <h4 className="text-sm font-extralight">Platform fee</h4>
          <h4 className="text-sm">{itemsTotal ? platformFee : "0"}</h4>
        </div>
        <div className="flex justify-between">
          <h4 className="text-sm font-extralight">
            GST and Restaurant Charges
          </h4>
          <h4 className="text-sm">{itemsTotal ? gstRestaurentCharges : "0"}</h4>
        </div>
      </div>
    </div>
  );
};

export default BillDetails;
