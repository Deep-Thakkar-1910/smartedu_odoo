// app/dashboard/page.tsx
import { getServerSession } from "next-auth/next"
import db from "@/lib/Prisma"

import { authOptions } from "@/lib/authOptions"
import AdminDashboard from "../_components/AdminDashboard"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  
  if (!session || session.user.role !== "admin") {
    return <div>Access Denied</div>
  }

  const classrooms = await db.classroom.findMany({})

  const courses = await db.course.findMany({})

  const totalStudents = await db.classroom.aggregate({
    _sum: { students: true },
  })

  return (
    <AdminDashboard
      classrooms={classrooms} 
      courses={courses} 
      totalStudents={totalStudents._sum.students || 0}
    />
  )
}