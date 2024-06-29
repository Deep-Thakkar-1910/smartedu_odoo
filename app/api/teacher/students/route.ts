import db from "@/lib/Prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const students = await db.student.findMany();
    return NextResponse.json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
