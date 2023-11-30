import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

// GET SINGLE POST
export const GET = async (req, { params }) => {
  const { slug } = params;
  console.log(slug,"defwe")
  try {
    const user = await prisma.user.findUnique({
        where: {
          email: slug,
        }, 
      });
      const restaurant=await prisma.Restaurant.findUnique({
        where: {
          id:user.restaurantId,
        },
      });

      

    return new NextResponse(JSON.stringify(restaurant, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};