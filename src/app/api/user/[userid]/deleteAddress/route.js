// pages/api/user/[userid]/deleteAddress.js

import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
import { getUserDetails } from "@/actions/Action";
export  async function POST(Request, {params}) {
  const { userid } = params;
  const user = await getUserDetails("id", userid);
  const {address} = await Request.json()
    console.log(userid,address,"deletAddress route")
    const updatedAddresses = user.address.filter((addres) => addres !== address);
    const updatedUser = await prisma.user.update({
        where: { id: userid },
        data: {
        address:updatedAddresses,
        },
    });

    return new NextResponse(JSON.stringify(updatedUser, { status: 200 }));
}
