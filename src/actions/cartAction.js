"use server"
import prisma from "@/utils/connect";
import { getUserDetails } from "./Action";
import { revalidatePath } from "next/cache";
// export async function addCartItem(cartItemDetails) {
//   console.log(cartItemDetails, "cartItemDetails");

//   try {
//     const menuId = cartItemDetails.menuId;
//     const user = await getUserDetails('email', cartItemDetails.user.email);
//     console.log(menuId, user?.id, cartItemDetails.quantity, "ids");

//     if (user) {
//       const cartItemget = await prisma.cartItem.findUnique({
//         where: {
//           likeId : {
//             menuId: menuId,
//             userId: user?.id,
//           },
//         },
//       })
//       const updateCartItem =await prisma.cartItem.update({
//         where: {
//           id: cartItemget.id,
//         },
//         data: {
//           quantity:  {
//             increment: cartItemDetails.quantity,
//           }
//         },
//       });
//       console.log(updateCartItem,"cartItemget " )
//     if(!updateCartItem){
//         const CartItem = await prisma.cartItem.create({
//           data: {
//             menu : {
//               connect:{id: menuId},
//             },
//             user: {
//               connect: { id: user?.id },
//             },
//             quantity: cartItemDetails.quantity,
//           },
//         });
//         console.log('CartItem created:', CartItem);
//       }
      
//     }
//   } catch (error) {
    
//     console.error('Error adding cart item:', error.message);
//   } 
// }



export async function addCartItem(cartItemDetails) {
  console.log(cartItemDetails, "cartItemDetails");

  try {
    const menuId = cartItemDetails.menuId;
    const user = await getUserDetails('email', cartItemDetails.user.email);
    console.log(menuId, user?.id, cartItemDetails.quantity, "ids");

    
   
    if (user) {
      if(cartItemDetails.quantity<=0){
        const updatedCartItem=await prisma.cartItem.delete({
          where:{
            CartItemId : {
              menuId: menuId,
              userId: user?.id,
            }
          }
          
        })
        console.log(updatedCartItem)

      }else{
        const upsertedCartItem = await prisma.cartItem.upsert({
          where: {
            CartItemId : {
              menuId: menuId,
              userId: user?.id,
            },
          },
          update: {
            quantity:cartItemDetails.quantity,
          },
          create: {
            menu: {
              connect: { id: menuId },
            },
            user: {
              connect: { id: user.id },
            },
            quantity: cartItemDetails.quantity,
          },
        });
        console.log('CartItem upserted:', upsertedCartItem);
      }

      if(user.id){
        revalidatePath(`/${user.id}/checkout`)
      }
    }
  } catch (error) {
    console.error('Error adding/updating cart item:', error.message);
  }
}


export async function getUserCart(type,value){
    const User= await getUserDetails(type,value)
    if(User){
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
      console.log(userWithCart,"userWithCart")
      return userWithCart.cart
    }

}










  