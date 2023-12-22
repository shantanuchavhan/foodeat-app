"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { addRestaurentAction } from "@/actions/Action";

const CreateRestaurent = () => {
  const { data } = useSession();
  const useremail = data?.user?.email;
  const addRestaurent = addRestaurentAction.bind(null, useremail);

  return (
    <form action={addRestaurent}>
      <input type="text" name="restaurantName" />
      <button type="submit">Create Restaurent</button>
    </form>
  );
};

export default CreateRestaurent;
