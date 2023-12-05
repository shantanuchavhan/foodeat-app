import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
export async function POST(req, { params }) {
  console.log("hii from addAddress route")
    const { userid } = params;
    const {body}= req.JSON()
    
    const updatedUser = await prisma.user.update({
        where: {
          id: userid,
        },
        data: {
          address: Array.isArray(user.address) ? [...user.address, body.address] : [formData.get("address")],
        },
      });

    return new NextResponse(JSON.stringify(updatedUser, { status: 200 }))
}