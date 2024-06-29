import db from "@/lib/Prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const events = await db.event.findMany();
    return NextResponse.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
