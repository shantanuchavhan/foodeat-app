"use server";

import prisma from "@/utils/connect";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Revalidate } from "next/dist/server/lib/revalidate";

export async function getUserDetails(key, value) {
  console.log(key, value, "key-value");
  if (value) {
    const user = await prisma.user.findUnique({
      where: {
        [key]: value,
      },
      include: {
        cart: {
          include: {
            menu: true,
          },
        },
      },
    });
    console.log(user, "user");
    return user;
  }
}

// Function to add a new restaurant
export async function addRestaurentAction(email, formData) {
  try {
    // Find the user based on the email
    const user = await getUserDetails("email", email);
    if (user) {
      const userId = user.id;
      // Create a new restaurant and associate it with the user
      const newRestaurant = await prisma.Restaurant.create({
        data: {
          restaurantName: formData.get("restaurantName"),
          users: {
            connect: { id: userId },
          },
        },
      });
      // Access the ID of the newly created restaurant
      const restaurantName = newRestaurant.restaurantName;
      redirect(`/dashboard/${restaurantName}`);
    } else {
      console.log("User not found for email:", email);
      return null; // or handle the case where the user is not found
    }
  } catch (error) {
    console.error("Error finding user or creating restaurant:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export async function getUserCart(value) {
  console.log("hii");
  const User = await getUserDetails("email", value);
  if (User) {
    const userWithCart = await prisma.user.findUnique({
      where: { id: User.id },
      include: {
        cart: {
          include: {
            menu: true,
          },
        },
      },
    });
    console.log(userWithCart, "userWithCart");
    return userWithCart.cart;
  }
}

export async function getRestaurentDetails(id) {
  try {
    const Restaurant = await prisma.Restaurant.findUnique({
      where: { id: id },
      include: { menuItems: true },
    });
    console.log(Restaurant);
    return Restaurant;
  } catch (error) {}
}

export async function getRestaurent(key, value) {
  // get Restaurent from userid
  console.log(key, value);
  try {
    const User = await getUserDetails(key, value);
    const restaurant = await getRestaurentDetails(User.restaurantId);

    return restaurant;
  } catch (error) {
    console.error("Error adding menu item:", error);
    throw error;
  }
}

export default async function getRestaurentMenuList(id) {
  // get Restaurent from restaurent Menu id
  console.log(id, "getRestaurentMenuList");
  try {
    const menuList = await prisma.Menu.findMany({
      where: {
        restaurantId: id,
      },
    });

    return menuList;
  } catch (error) {
    console.error("Error fetching menu:", error);
    throw error; // Rethrow the error to handle it wherever you call this function
  } finally {
    await prisma.$disconnect(); // Disconnect from the Prisma client
  }
}

export async function getMenuDetail(id) {
  console.log(id, "id");
  try {
    if (id) {
      const menu = await prisma.Menu.findUnique({
        where: {
          id: id,
        },
      });
      console.log(menu);
      return menu;
    }
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export async function getCategoriesAction() {
  const categories = await prisma.Categories.findMany();
  return categories;
}

export async function getMenuCategoryAction(id) {
  // Assuming `defaultValue` is the default value you want to set
  try {
    const categoryWithMenus = await prisma.Categories.findUnique({
      where: { id: id },
      include: { menus: true },
    });
    return categoryWithMenus;
  } catch (error) {
    throw error;
  }
}

export async function addUserAddress(value, formData) {
  console.log(value, formData);
  const user = await getUserDetails("email", value);
  console.log(user, "User");

  const updatedUser = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      address: Array.isArray(user.address)
        ? [...user.address, formData.get("address")]
        : [formData.get("address")],
    },
  });

  console.log(updatedUser);
}

export async function removeUserAddress(value, formData) {
  const user = await getUserDetails("email", value);
  const id = formData.get("id");
  const addresses = formData.get("address");
  console.log(addresses, "addresses");
  const updatedAddresses = user.address.filter(
    (address) => address !== addresses,
  );
  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: {
      address: updatedAddresses,
    },
  });
  revalidatePath(`http://localhost:3000/${user.id}/checkout`);
  console.log(updatedUser.address);
}
