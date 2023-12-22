"use server";

import prisma from "@/utils/connect";
// import { revalidatePath } from "next/cache";

import { getUserDetails } from "./Action";

import { getUserCart } from "./cartAction";

function generateOrderNumber() {
  const timestamp = new Date()
    .toISOString()
    .replace(/[-:T.]/g, "")
    .slice(0, 14);
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  const orderNumber = `ORD-${timestamp}-${randomDigits}`;
  return orderNumber;
}

export async function addOrder(formData) {
  console.log(formData);
  const user = await getUserDetails("id", formData.get("id"));
  const cart = await getUserCart("id", formData.get("id"));
  let totalAmount = 0;
  for (let index = 0; index < cart.length; index++) {
    totalAmount += cart[index].menu.price * cart[index].quantity;
  }
  const deliveryPerson = await prisma.DeliveryPerson.findFirst({
    where: {
      isAvailable: true,
    },
  });

  console.log(deliveryPerson, "deliveryPerson");
  const data = await prisma.Order.create({
    data: {
      orderNumber: generateOrderNumber(),
      totalAmount: totalAmount,
      user: {
        connect: { id: user.id },
      },
      deliveryPerson: {
        connect: { id: deliveryPerson.id },
      },
    },
  });

  for (let index = 0; index < cart.length; index++) {
    const orderItem = await prisma.OrderItem.create({
      data: {
        order: {
          connect: { id: data.id },
        },

        menu: {
          connect: { id: cart[index].menuId },
        },
        quantity: cart[index].quantity,
        price: cart[index].menu.price,
        total: cart[index].menu.price * cart[index].quantity,
      },
    });
    console.log(orderItem, "orderItem");
  }
  if (data) {
    const deleteCartItems = await prisma.CartItem.deleteMany({
      where: {
        userId: user.id,
      },
    });

    return { data: "succesfully order created" };
  }
}

export async function getAllOrders(id) {
  console.log(id, "id");
  const orders = await prisma.Order.findMany({
    where: {
      userId: id,
    },
    include: {
      orderedItems: {
        include: {
          menu: true,
        },
      }, // This includes the associated orderedItems
      deliveryCompletions: true,
    },
  });
  // console.log(orders[2].orderedItems)
  return orders;
}

export async function cancelOrder(orderid, userid) {
  console.log(orderid, "formData,path");
  const order = await prisma.Order.delete({
    where: {
      id: orderid,
    },
  });

  return order;
}

export async function getAllRestaurentOrders(userId) {
  try {
    const orders = await prisma.order.findMany({
      where: {
        userId: userId,
      },
    });

    return orders;
  } catch (error) {
    // Handle errors appropriately (e.g., log, throw, or return a specific error response)
    console.error("Error fetching restaurant orders:", error);
    throw error;
  } finally {
    await prisma.$disconnect(); // Close the Prisma client connection
  }
}
