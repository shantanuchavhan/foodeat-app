import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

// GET SINGLE POST
export const GET = async (req, { params }) => {
  const { slug } = params;

if (!slug) {
  return new NextResponse(
    JSON.stringify({ message: "Invalid or missing slug parameter" }),
    { status: 400 } // 400 Bad Request status code
  );
}
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: slug,
      },
    });
    const restaurant = await prisma.Restaurant.findUnique({
      where: {
        id: user.restaurantId,
      },
    });

    return new NextResponse(JSON.stringify(restaurant, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 }),
    );
  }
};




export const POST = async (req, { params }) => {
  const { restaurantName,address } = await req.json()
  const { slug } = params;
  console.log(slug,"slug")


if (!slug) {
  return new NextResponse(
    JSON.stringify({ message: "Invalid or missing slug parameter" }),
    { status: 400 } // 400 Bad Request status code
  );
}

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: slug,
      },
    });

    if (user) {
      const userId = user.id;
      const data = req.data; // Extract restaurantName from the request body
      console.log(data)

      // Create a new restaurant and associate it with the user
      const newRestaurant = await prisma.Restaurant.create({
        data: {
          restaurantName,
          address,
          users: {
            connect: { id: userId },
          },
        },
      });

      // Access the ID of the newly created restaurant
      const createdRestaurantName = newRestaurant.restaurantName;
      redirect(`/dashboard/${restaurantName}`);

      // Send a response indicating success
      return new NextResponse(
        JSON.stringify({
          message: "Restaurant created successfully",
          restaurantName: createdRestaurantName,
        }),
        { status: 201 } // 201 Created status code
      );
    } else {
      return new NextResponse(
        JSON.stringify({ message: "User not found" }),
        { status: 404 } // 404 Not Found status code
      );
    }
  } catch (err) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 } // 500 Internal Server Error status code
    );
  }
};
