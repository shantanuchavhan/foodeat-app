"use server"
import { revalidatePath } from "next/cache";

export async function addMenuAction(id, imageUrls,formData) {
  console.log(formData,id, imageUrls,"hii")
  try {
    let newMenuItem;
    const category_id=formData.get("categoryName")
    
    if (id) {
      // Create a new restaurant and associate it with the user
      newMenuItem = await prisma.Menu.create({
        data: {
          itemName: formData.get("menuName"),
          price: parseInt(formData.get("price")) ,
          description: formData.get("description"),
          isVegetarian: formData.get("isVegetarian")==="on"? true:false,
          imageUrls: imageUrls,
          isMeal:formData.get("isMeal")==="on"? true:false,
          // Assuming you have restaurantId in formData
          category:{
            connect:{id:category_id}
          },
          restaurant: {
            connect: { id: id },
          },
        },
      });
      revalidatePath(`/dashboard/${id}/add-menu`)
      // Example: Log the new menu item
      console.log(newMenuItem);
    }

  } catch (error) {
    console.error('Error adding menu item:', error);
    throw error;
  } 
}

export async function updateMenu(formData) {
    console.log(formData.get("isVegetarian"))
    console.log(formData,"updateMenu");
    try {
      const updatedMenu = await prisma.menu.update({
        where: {
          id: formData.get("id"),
        },
        data: {
            itemName: formData.get("menuName"),
            price: parseInt(formData.get("price")) ,
            description: formData.get("description"),
            isVegetarian: formData.get("isVegetarian")==="on"? true:false,
            
        },
      });
      // Log or return the updated menu
      console.log(updatedMenu);
      return updatedMenu;
    } catch (error) {
      console.error("Error updating menu:", error);
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }


  export async function deleteMenu(formData) {
    console.log(formData,"deleteMenu")
    try {
      const existingMenu = await prisma.menu.findUnique({
        where: { id: formData.get("id") },
      });
      
      if (!existingMenu) {
        throw new Error(`Menu with ID  not found.`);
      }
      // Use Prisma's delete method to remove the menu item
      const deletedMenu = await prisma.menu.delete({
        where: {
          id: formData.get("id"), // Assuming your ID is an integer, adjust accordingly
        },
      });
      
      revalidatePath(`/dashboard/saiprasad%20restaurent/menu`)
      return {props: {
        deletedMenu,
      },
      revalidate: true  ,};
    } catch (error) {
      console.error("Error deleting menu:", error);
      throw error; // Rethrow the error to handle it wherever you call this function
    } finally {
      await prisma.$disconnect(); // Disconnect from the Prisma client
    }
  }