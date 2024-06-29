"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { BarChart, LineChart } from "./Charts";

export default function TeacherDashboard() {
  const [overview, setOverview] = useState(null);
  const [students, setStudents] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [events, setEvents] = useState([]);
  const [chartData, setChartData] = useState({ bar: [], line: [] });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const overviewData = await fetch("/api/teacher/overview").then((res) =>
      res.json()
    );
    const studentsData = await fetch("/api/teacher/students").then((res) =>
      res.json()
    );
    const assignmentsData = await fetch("/api/teacher/assignments").then(
      (res) => res.json()
    );
    const eventsData = await fetch("/api/teacher/events").then((res) =>
      res.json()
    );
    const chartData = await fetch("/api/teacher/chartData").then((res) =>
      res.json()
    );
    setChartData(chartData);
    setOverview(overviewData);
    setStudents(studentsData);
    setAssignments(assignmentsData);
    setEvents(eventsData);
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <main className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 md:p-6">
        <section className="bg-card rounded-lg shadow-sm p-4 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Overview</h2>
            <Button variant="outline" size="sm">
              View Details
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Student Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">
                  {overview?.averageProgress}%
                </div>
                <p className="text-xs text-muted-foreground">
                  Average student progress
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Class Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">
                  {overview?.classPerformance}
                </div>
                <p className="text-xs text-muted-foreground">
                  Average class performance
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">
                  {overview?.upcomingEvents}
                </div>
                <p className="text-xs text-muted-foreground">
                  Events in the next week
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Assignments Due</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">
                  {overview?.assignmentsDue}
                </div>
                <p className="text-xs text-muted-foreground">
                  Assignments due this week
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
        <section className="bg-card rounded-lg shadow-sm p-4 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Students</h2>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
          <div className="grid gap-4">
            {students.slice(0, 3).map((student) => (
              <Card key={student.id}>
                <CardContent className="flex items-center gap-4 mt-5">
                  <Avatar className="border w-12 h-12">
                    <AvatarImage src="/" />
                    <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-medium">{student.name}</div>
                    <div className="text-xs text-muted-foreground">
                      Progress: {student.progress}%
                    </div>
                  </div>
                  <div>
                    <Badge variant="secondary" className="text-xs">
                      {student.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        <section className="bg-card rounded-lg shadow-sm p-4 md:p-6 col-span-1 md:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Lessons</h2>
            <Button variant="outline" size="sm">
              View Calendar
            </Button>
          </div>
          <Calendar className="aspect-[4/3]" />
        </section>
        <section className="bg-card rounded-lg shadow-sm p-4 md:p-6 col-span-1 md:col-span-2 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Assignments</h2>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Assignment</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Feedback</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assignments.map((assignment) => (
                <TableRow key={assignment.id}>
                  <TableCell>{assignment.studentName}</TableCell>
                  <TableCell>{assignment.title}</TableCell>
                  <TableCell>{assignment.grade}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" className="w-full">
                      View Feedback
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
        <section className="bg-card rounded-lg shadow-sm p-4 md:p-6 col-span-1 md:col-span-2 lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Analytics</h2>
            <Button variant="outline" size="sm">
              View Details
            </Button>
          </div>
          <div className="grid gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Student Progress Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <LineChart className="aspect-[9/4]" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Assignment Grades</CardTitle>
              </CardHeader>
              <CardContent>
                <BarChart className="aspect-[9/4]" />
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}

// ... (BarChart and LineChart components remain the same)
