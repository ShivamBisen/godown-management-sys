import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const items = await prisma.item.findMany({});

        if (!items || items.length === 0) {
            // Return a 404 response using NextResponse
            return NextResponse.json(
                { message: "No items found" },
                { status: 404 }
            );
        }

        return NextResponse.json(items, { status: 200 });
    } catch (error) {
        console.error("Error fetching items", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
