import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const godowns = await prisma.godown.findMany({});
        
        // Check if godowns were found
        if (!godowns || godowns.length === 0) {
            return NextResponse.json(
                { message: "No godowns found" },
                { status: 404 }
            );
        }

        // Return the list of godowns with a 200 status
        return NextResponse.json(godowns, { status: 200 });
    } catch (error) {
        console.error("Error fetching godowns", error);
        // Return a 500 response for internal server errors
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect(); // Ensure the Prisma Client is disconnected
    }
}
