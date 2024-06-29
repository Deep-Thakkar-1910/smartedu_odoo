import db from "@/lib/Prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const students = await db.student.findMany();
    const assignments = await db.assignment.findMany();
    const events = await db.event.findMany();

    // Ensure students is an array and has elements before calculating averageProgress
    const averageProgress =
      students.length > 0
        ? students.reduce((sum, student) => sum + student.progress, 0) /
          students.length
        : 0;

    // Ensure events is an array before filtering
    const upcomingEvents = events
      ? events?.filter((event) => {
          const eventDate = new Date(event.date);
          const oneWeekFromNow = new Date();
          oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);
          return eventDate <= oneWeekFromNow;
        }).length
      : 0;

    const overview = {
      averageProgress: Math.round(averageProgress),
      classPerformance: "A-",
      upcomingEvents,
      assignmentsDue: assignments.length,
    };

    return NextResponse.json(overview);
  } catch (error) {
    console.error("Error fetching overview:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
