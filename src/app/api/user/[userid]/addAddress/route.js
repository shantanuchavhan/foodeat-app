import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
export async function POST(req, { params }) {
    const { userid } = params;
    console.log("hii from addAddress route")
    const updatedUser = await prisma.user.update({
        where: {
          id: userid,
        },
        data: {
          address: Array.isArray(user.address) ? [...user.address, formData.get("address")] : [formData.get("address")],
        },
      });

    return new NextResponse(JSON.stringify(updatedUser, { status: 200 }))
}