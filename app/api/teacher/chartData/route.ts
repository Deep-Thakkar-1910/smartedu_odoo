import db from "@/lib/Prisma";
import { NextResponse } from "next/server";

interface BarChartData {
  assignment: string;
  A: number;
  B: number;
  C: number;
  D: number;
  F: number;
}

export async function GET() {
  try {
    const students = await db.student.findMany();
    const assignments = await db.assignment.findMany();

    // Prepare line chart data
    const lineData = [
      {
        id: "Average Progress",
        data: students.map((student, index) => ({
          x: `Week ${index + 1}`,
          y: student.progress,
        })),
      },
    ];

    // Prepare bar chart data
    const barData = assignments.reduce<BarChartData[]>((acc, assignment) => {
      const existingAssignment = acc.find(
        (a) => a.assignment === assignment.title
      );
      if (existingAssignment) {
        existingAssignment[
          assignment.grade as keyof Omit<BarChartData, "assignment">
        ]++;
      } else {
        acc.push({
          assignment: assignment.title,
          A: assignment.grade === "A" ? 1 : 0,
          B: assignment.grade === "B" ? 1 : 0,
          C: assignment.grade === "C" ? 1 : 0,
          D: assignment.grade === "D" ? 1 : 0,
          F: assignment.grade === "F" ? 1 : 0,
        });
      }
      return acc;
    }, []);

    return NextResponse.json({
      line: lineData,
      bar: barData,
    });
  } catch (error) {
    console.error("Error fetching chart data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
