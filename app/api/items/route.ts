import { PrismaClient } from "@prisma/client";
import {  NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function GET (){
    try{
        const items = await prisma.item.findMany({});

        if(!items || items.length === 0){
            return {
                status: 404,
                json: {message: "No items found"}
            }
        }
        return NextResponse.json(items,{status: 200});

    }catch(error){
        console.error("Error fetching items", error);
    }

}