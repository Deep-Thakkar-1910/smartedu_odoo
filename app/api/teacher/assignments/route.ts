import db from "@/lib/Prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const assignments = await db.assignment.findMany({
      include: {
        student: true,
      },
    });

    const formattedAssignments = assignments.map((assignment) => ({
      id: assignment.id,
      title: assignment.title,
      grade: assignment.grade,
      studentName: assignment.student.name,
    }));

    return NextResponse.json(formattedAssignments);
  } catch (error) {
    console.error("Error fetching assignments:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
