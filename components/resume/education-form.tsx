"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"
import { useResumeContext, type Education } from "./resume-context"

export function EducationForm() {
  const { resumeData, addEducation, updateEducation, removeEducation } = useResumeContext()
  const [newEducation, setNewEducation] = useState<Omit<Education, "id">>({
    school: "",
    degree: "",
    fieldOfStudy: "",
    startDate: "",
    endDate: "",
    gpa: "",
    description: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewEducation((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addEducation({
      ...newEducation,
      id: crypto.randomUUID(),
    })
    setNewEducation({
      school: "",
      degree: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: "",
      gpa: "",
      description: "",
    })
  }

  const handleUpdate = (id: string, field: string, value: string) => {
    updateEducation(id, { [field]: value })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Education</h2>
        <p className="text-sm text-muted-foreground">Add your educational background to your resume.</p>
      </div>

      {resumeData.education.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Added Education</h3>
          {resumeData.education.map((edu) => (
            <Card key={edu.id} className="p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-medium">{edu.school}</h4>
                  <p className="text-sm text-muted-foreground">
                    {edu.degree} in {edu.fieldOfStudy}
                  </p>
                </div>
                <Button variant="destructive" size="icon" onClick={() => removeEducation(edu.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`school-${edu.id}`}>School</Label>
                  <Input
                    id={`school-${edu.id}`}
                    value={edu.school}
                    onChange={(e) => handleUpdate(edu.id, "school", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`degree-${edu.id}`}>Degree</Label>
                  <Input
                    id={`degree-${edu.id}`}
                    value={edu.degree}
                    onChange={(e) => handleUpdate(edu.id, "degree", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`field-${edu.id}`}>Field of Study</Label>
                  <Input
                    id={`field-${edu.id}`}
                    value={edu.fieldOfStudy}
                    onChange={(e) => handleUpdate(edu.id, "fieldOfStudy", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`gpa-${edu.id}`}>GPA</Label>
                  <Input
                    id={`gpa-${edu.id}`}
                    value={edu.gpa}
                    onChange={(e) => handleUpdate(edu.id, "gpa", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`start-${edu.id}`}>Start Date</Label>
                  <Input
                    id={`start-${edu.id}`}
                    type="month"
                    value={edu.startDate}
                    onChange={(e) => handleUpdate(edu.id, "startDate", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`end-${edu.id}`}>End Date</Label>
                  <Input
                    id={`end-${edu.id}`}
                    type="month"
                    value={edu.endDate}
                    onChange={(e) => handleUpdate(edu.id, "endDate", e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2 mt-4">
                <Label htmlFor={`desc-${edu.id}`}>Description</Label>
                <Textarea
                  id={`desc-${edu.id}`}
                  value={edu.description}
                  onChange={(e) => handleUpdate(edu.id, "description", e.target.value)}
                />
              </div>
            </Card>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 border-t pt-6">
        <h3 className="text-lg font-medium">Add New Education</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="school">School</Label>
            <Input
              id="school"
              name="school"
              value={newEducation.school}
              onChange={handleChange}
              placeholder="University Name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="degree">Degree</Label>
            <Input
              id="degree"
              name="degree"
              value={newEducation.degree}
              onChange={handleChange}
              placeholder="Bachelor's, Master's, etc."
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="fieldOfStudy">Field of Study</Label>
            <Input
              id="fieldOfStudy"
              name="fieldOfStudy"
              value={newEducation.fieldOfStudy}
              onChange={handleChange}
              placeholder="Computer Science, Business, etc."
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gpa">GPA</Label>
            <Input id="gpa" name="gpa" value={newEducation.gpa} onChange={handleChange} placeholder="3.8/4.0" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              id="startDate"
              name="startDate"
              type="month"
              value={newEducation.startDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="endDate">End Date</Label>
            <Input
              id="endDate"
              name="endDate"
              type="month"
              value={newEducation.endDate}
              onChange={handleChange}
              placeholder="Present"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={newEducation.description}
            onChange={handleChange}
            placeholder="Relevant coursework, achievements, etc."
            className="min-h-[100px]"
          />
        </div>
        <div className="flex justify-end">
          <Button type="submit">
            <Plus className="mr-2 h-4 w-4" />
            Add Education
          </Button>
        </div>
      </form>

      <div className="flex justify-between pt-6 border-t">
        <Button variant="outline">Back</Button>
        <Button>Save & Continue</Button>
      </div>
    </div>
  )
}

