import React from "react";
import Link from "next/link";
import { addOrder } from "@/actions/orderActions";

const page = ({ params }) => {
  return (
    <div className="bg-amber-100 text-black  min-h-screen flex flex-col  items-center">
      <div className="flex items-center p-4 gap-4 w-3/5 bg-amber-100 ">
        <Link href="/checkout">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-gray-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
        </Link>
        <div>
          <div className="bg-amber-100">
            <h1>Payment Options</h1>
            <p className="text-gray-500">1 Item.Total : Rs193</p>
          </div>
        </div>
      </div>
      <div className="bg-amber-50 w-3/5 p-6 min-h-screen flex flex-col gap-6 ">
        <h1>UPI</h1>
        <div className="bg-white flex gap-3  items-center p-2 rounded-lg shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6  text-amber-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div className="p-4">
            <h3 className="text-amber-600">Add new UPI id</h3>
            <p className="text-gray-700">You need to have registered upi id</p>
          </div>
        </div>
        <h1>Credit & Debit Cards</h1>
        <div className="bg-white flex gap-3 rounded-lg  items-center p-2 rounded-sm border-1 shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-amber-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div className="p-4">
            <h3 className="text-amber-600 ">Add new UPI id</h3>
            <p className="text-gray-700">You need to have registered upi id</p>
          </div>
        </div>
        <form action={addOrder}>
          <input type="hidden" value={params.userid} name="id" />
          <button
            type="submit"
            className="bg-green-400 text-center py-5 text-white flex align-center justify-center px-20"
          >
            Book Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default page;
