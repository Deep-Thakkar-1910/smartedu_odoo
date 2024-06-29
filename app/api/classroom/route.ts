// app/api/classrooms/route.ts
import { NextResponse } from "next/server"
import db from "@/lib/Prisma"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/authOptions"

export async function GET() {
  const classrooms = await db.classroom.findMany({ })
  return NextResponse.json(classrooms)
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== "admin") {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  const { name, teacherId, students } = await req.json()
  const classroom = await db.classroom.create({
    data: { name, students },
  })
  return NextResponse.json(classroom)
}