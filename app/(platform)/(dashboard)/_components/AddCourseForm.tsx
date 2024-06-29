// components/AddCourseForm.tsx
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


type AddCourseFormProps = {
  onSubmit: (courseData: any) => void
}

export function AddCourseForm({ onSubmit }: AddCourseFormProps) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [enrollment, setEnrollment] = useState('')
  const [teacherId, setTeacherId] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ name, description, enrollment: parseInt(enrollment), teacherId })
    setName('')
    setDescription('')
    setEnrollment('')
    setTeacherId('')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Course Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Textarea
        placeholder="Course Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <Input
        type="number"
        placeholder="Initial Enrollment"
        value={enrollment}
        onChange={(e) => setEnrollment(e.target.value)}
        required
      />
      
      <Button type="submit">Add Course</Button>
    </form>
  )
}