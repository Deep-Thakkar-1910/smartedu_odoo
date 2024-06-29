// app/api/courses/route.ts
import { NextResponse } from "next/server"
import db from "@/lib/Prisma"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/authOptions"

export async function GET() {
  const courses = await db.course.findMany({
  })
  return NextResponse.json(courses)
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== "admin") {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  try {
    const { name, description, enrollment, teacherId } = await req.json()
    const course = await db.course.create({
      data: { 
        name, 
        description, 
        enrollment, 
 
      },
    })
    return NextResponse.json(course)
  } catch (error) {
    console.error('Error creating course:', error)
    return new NextResponse("Error creating course", { status: 500 })
  }
}