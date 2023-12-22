import React from "react";
import { useUserDetailsContext } from "@/context/userDetailsContext";
import { ToastContainer, toast } from "react-toastify";
const Addresses = ({
  addres,
  index,
  setConfirmAddress,
  setIsAddressRequiredSection,
}) => {
  const { userDetails, setUserDetails } = useUserDetailsContext();

  const removeAddress = async (e) => {
    e.preventDefault();

    setUserDetails((old) => {
      return {
        ...old,
        address: old?.address.filter((addr) => addr !== addres),
      };
    });

    try {
      const response = await fetch(
        `/api/user/${userDetails?.id}/deleteAddress`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ address: addres }),
        },
      );

      if (!response.ok) {
        console.error("Error removing address:", response.statusText);
        toast.error("error while removing.", { autoClose: 500 });
        return;
      }

      // Assuming the response includes the updated user details
      const updatedUserDetails = await response.json();
      console.log(updatedUserDetails);
      setUserDetails((old) => {
        return updatedUserDetails;
      });

      toast.success("address removed successfully", { autoClose: 500 });

      // Additional logic if needed after successfully removing the address
    } catch (error) {
      console.error("Error removing address:", error);
      // Handle unexpected errors, show a message, or perform any other necessary actions
    }
  };

  return (
    <>
      {addres ? (
        <div className="border relative border-solid border-gray p-4 h-12/13 w-3/6 flex flex-col gap-3 align-center justify-center">
          <ToastContainer />
          <div className="flex gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-gray-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>
            Other
          </div>
          <div className="flex gap-2">
            <h3 className="text-gray-400 px-3">{addres}</h3>
          </div>

          <button
            type="submit"
            className="border border-solid border-gray flex align-center justify-center p-3 w-3/5 bg-green-500 text-white"
            onClick={() => {
              setConfirmAddress((old) => addres);
              setIsAddressRequiredSection((old) => true);
            }}
          >
            Deliver Here
          </button>
          <form className="absolute -top-3 -right-2">
            <input type="hidden" name="address" value={addres} />
            <input type="hidden" name="id" value={index} />
            <button type="submit" onClick={(e) => removeAddress(e)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-red-200"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </form>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Addresses;
