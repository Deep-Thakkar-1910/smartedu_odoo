"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TabsContent, TabsTrigger } from "@/components/ui/tabs"
// components/AdminDashboard.tsx
import { Classroom, Course } from "@prisma/client"
import { Tabs, TabsList } from "@radix-ui/react-tabs"
import { useState } from "react"
import { AddCourseForm } from "./AddCourseForm"
// ... (import other necessary components)

type AdminDashboardProps = {
  classrooms: Classroom[]
  courses: Course[]
  totalStudents: number
}



export default function AdminDashboard({ classrooms, courses, totalStudents }: AdminDashboardProps) {


    const [isAddingCourse, setIsAddingCourse] = useState(false)

  const handleAddCourse = async (courseData: any) => {
    try {
      const response = await fetch('/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(courseData),
      })

      if (!response.ok) {
        throw new Error('Failed to add course')
      }

      const newCourse = await response.json()
      // You might want to update the courses state here or refetch the data
      setIsAddingCourse(false)
    } catch (error) {
      console.error('Error adding course:', error)
      // Handle error (e.g., show an error message to the user)
    }
  }

  return (
    <div className="grid min-h-screen w-full grid-cols-[280px_1fr] overflow-hidden">
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-6">
          <h1 className="flex-1 font-semibold text-lg">Admin Dashboard</h1>
        </header>
        <main className="flex-1 p-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="min-w-fit">
              <CardHeader>
                <CardTitle>Student Enrollment</CardTitle>
                <CardDescription>Total students enrolled</CardDescription>
              </CardHeader>
              <CardContent className="min-w-fit">
                <div className="text-4xl font-bold">{totalStudents}</div>
              </CardContent>
            </Card>
          
          </div>
          <div className="mt-6">
            <Tabs defaultValue="classrooms">
              <TabsList>
                <TabsTrigger value="classrooms">Classrooms</TabsTrigger>
                <TabsTrigger value="courses">Courses</TabsTrigger>
              </TabsList>
              <TabsContent value="classrooms">
                <Card>
                  <CardHeader>
                    <CardTitle>Classrooms</CardTitle>
                    <CardDescription>View and manage all classrooms</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Classroom</TableHead>
                          <TableHead>Teacher</TableHead>
                          <TableHead>Students</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {classrooms.map((classroom) => (
                          <TableRow key={classroom.id}>
                            <TableCell>{classroom.name}</TableCell>
                            <TableCell>{classroom.students}</TableCell>
                            <TableCell>
                              {/* ... (Actions dropdown remains the same) */}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="courses">
                <Card>
                  <CardHeader>
                    <CardTitle>Courses</CardTitle>
                    <CardDescription>View and manage all courses</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Course</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead>Enrollment</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {courses.map((course) => (
                          <TableRow key={course.id}>
                            <TableCell>{course.name}</TableCell>
                            <TableCell>{course.description}</TableCell>
                            <TableCell>{course.enrollment}</TableCell>
                            <TableCell>
                              {/* ... (Actions dropdown remains the same) */}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter>
                    {isAddingCourse ? (
                    <AddCourseForm  onSubmit={handleAddCourse} />
                    ) : (
                    <Button onClick={() => setIsAddingCourse(true)}>Add New Course</Button>
                    )}
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}