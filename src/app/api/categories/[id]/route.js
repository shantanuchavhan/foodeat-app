import { NextResponse } from "next/server";

export const GET =async(req,{params})=>{
    const {id}=params
    try {
        const categoryWithMenus = await prisma.Categories.findUnique({
            where: { id: id },
            include: { menus: true },
          });
          return new NextResponse(JSON.stringify(categoryWithMenus, { status: 200 }));
        
    } catch (error) {
        return new NextResponse(
            JSON.stringify({ message: "Something went wrong!" }, { status: 500 }),
          );
    }

}