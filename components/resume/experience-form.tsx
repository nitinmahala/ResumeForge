"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Trash2 } from "lucide-react"
import { useResumeContext, type Experience } from "./resume-context"

export function ExperienceForm() {
  const { resumeData, addExperience, updateExperience, removeExperience } = useResumeContext()
  const [newExperience, setNewExperience] = useState<Omit<Experience, "id">>({
    company: "",
    position: "",
    location: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewExperience((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setNewExperience((prev) => ({
      ...prev,
      current: checked,
      endDate: checked ? "" : prev.endDate,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addExperience({
      ...newExperience,
      id: crypto.randomUUID(),
    })
    setNewExperience({
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    })
  }

  const handleUpdate = (id: string, field: string, value: string | boolean) => {
    updateExperience(id, { [field]: value })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Work Experience</h2>
        <p className="text-sm text-muted-foreground">Add your work experience to your resume.</p>
      </div>

      {resumeData.experience.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Added Experience</h3>
          {resumeData.experience.map((exp) => (
            <Card key={exp.id} className="p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-medium">{exp.position}</h4>
                  <p className="text-sm text-muted-foreground">
                    {exp.company}, {exp.location}
                  </p>
                </div>
                <Button variant="destructive" size="icon" onClick={() => removeExperience(exp.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`company-${exp.id}`}>Company</Label>
                  <Input
                    id={`company-${exp.id}`}
                    value={exp.company}
                    onChange={(e) => handleUpdate(exp.id, "company", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`position-${exp.id}`}>Position</Label>
                  <Input
                    id={`position-${exp.id}`}
                    value={exp.position}
                    onChange={(e) => handleUpdate(exp.id, "position", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`location-${exp.id}`}>Location</Label>
                  <Input
                    id={`location-${exp.id}`}
                    value={exp.location}
                    onChange={(e) => handleUpdate(exp.id, "location", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`start-${exp.id}`}>Start Date</Label>
                  <Input
                    id={`start-${exp.id}`}
                    type="month"
                    value={exp.startDate}
                    onChange={(e) => handleUpdate(exp.id, "startDate", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 mb-2">
                    <Checkbox
                      id={`current-${exp.id}`}
                      checked={exp.current}
                      onCheckedChange={(checked) => handleUpdate(exp.id, "current", !!checked)}
                    />
                    <Label htmlFor={`current-${exp.id}`}>I currently work here</Label>
                  </div>
                  {!exp.current && (
                    <Input
                      id={`end-${exp.id}`}
                      type="month"
                      value={exp.endDate}
                      onChange={(e) => handleUpdate(exp.id, "endDate", e.target.value)}
                      placeholder="End Date"
                    />
                  )}
                </div>
              </div>
              <div className="space-y-2 mt-4">
                <Label htmlFor={`desc-${exp.id}`}>Description</Label>
                <Textarea
                  id={`desc-${exp.id}`}
                  value={exp.description}
                  onChange={(e) => handleUpdate(exp.id, "description", e.target.value)}
                />
              </div>
            </Card>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 border-t pt-6">
        <h3 className="text-lg font-medium">Add New Experience</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              name="company"
              value={newExperience.company}
              onChange={handleChange}
              placeholder="Company Name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="position">Position</Label>
            <Input
              id="position"
              name="position"
              value={newExperience.position}
              onChange={handleChange}
              placeholder="Job Title"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              value={newExperience.location}
              onChange={handleChange}
              placeholder="City, State or Remote"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              id="startDate"
              name="startDate"
              type="month"
              value={newExperience.startDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2 col-span-2 md:col-span-1">
            <div className="flex items-center space-x-2 mb-2">
              <Checkbox id="current" checked={newExperience.current} onCheckedChange={handleCheckboxChange} />
              <Label htmlFor="current">I currently work here</Label>
            </div>
            {!newExperience.current && (
              <Input
                id="endDate"
                name="endDate"
                type="month"
                value={newExperience.endDate}
                onChange={handleChange}
                placeholder="End Date"
              />
            )}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={newExperience.description}
            onChange={handleChange}
            placeholder="Describe your responsibilities and achievements..."
            className="min-h-[100px]"
          />
        </div>
        <div className="flex justify-end">
          <Button type="submit">
            <Plus className="mr-2 h-4 w-4" />
            Add Experience
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

