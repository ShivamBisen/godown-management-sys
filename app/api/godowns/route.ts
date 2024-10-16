import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";


const prisma = new PrismaClient

export async function GET(){
    try{
        const godown = await prisma.godown.findMany({})
        if (!godown || godown.length === 0) {
			return NextResponse.json(
				{ message: "No godown found" },
				{ status: 404 }
			);
		}
		return NextResponse.json(godown, { status: 200 });

    }catch(e){
        console.error("Error fetching godown", e);
    }
}