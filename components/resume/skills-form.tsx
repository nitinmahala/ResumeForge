"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2 } from "lucide-react"
import { useResumeContext, type Skill } from "./resume-context"

export function SkillsForm() {
  const { resumeData, addSkill, updateSkill, removeSkill } = useResumeContext()
  const [newSkill, setNewSkill] = useState<Omit<Skill, "id">>({
    name: "",
    level: 3,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewSkill((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSliderChange = (value: number[]) => {
    setNewSkill((prev) => ({
      ...prev,
      level: value[0],
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newSkill.name.trim()) {
      addSkill({
        ...newSkill,
        id: crypto.randomUUID(),
      })
      setNewSkill({
        name: "",
        level: 3,
      })
    }
  }

  const getLevelLabel = (level: number) => {
    switch (level) {
      case 1:
        return "Beginner"
      case 2:
        return "Elementary"
      case 3:
        return "Intermediate"
      case 4:
        return "Advanced"
      case 5:
        return "Expert"
      default:
        return "Intermediate"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Skills</h2>
        <p className="text-sm text-muted-foreground">Add your skills and proficiency levels to your resume.</p>
      </div>

      {resumeData.skills.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Added Skills</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resumeData.skills.map((skill) => (
              <Card key={skill.id} className="p-4 flex justify-between items-center">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{skill.name}</h4>
                    <Badge variant="outline">{getLevelLabel(skill.level)}</Badge>
                  </div>
                  <Slider
                    value={[skill.level]}
                    min={1}
                    max={5}
                    step={1}
                    onValueChange={(value) => updateSkill(skill.id, { level: value[0] })}
                    className="w-full"
                  />
                </div>
                <Button variant="ghost" size="icon" onClick={() => removeSkill(skill.id)} className="ml-2">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </Card>
            ))}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 border-t pt-6">
        <h3 className="text-lg font-medium">Add New Skill</h3>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="space-y-2 flex-1">
            <Label htmlFor="name">Skill Name</Label>
            <Input
              id="name"
              name="name"
              value={newSkill.name}
              onChange={handleChange}
              placeholder="e.g., JavaScript, Project Management, Photoshop"
              required
            />
          </div>
          <div className="space-y-2 flex-1">
            <div className="flex justify-between">
              <Label htmlFor="level">Proficiency Level</Label>
              <span className="text-sm text-muted-foreground">{getLevelLabel(newSkill.level)}</span>
            </div>
            <Slider
              id="level"
              value={[newSkill.level]}
              min={1}
              max={5}
              step={1}
              onValueChange={handleSliderChange}
              className="w-full"
            />
          </div>
          <div className="flex items-end">
            <Button type="submit">
              <Plus className="mr-2 h-4 w-4" />
              Add
            </Button>
          </div>
        </div>
      </form>

      <div className="flex justify-between pt-6 border-t">
        <Button variant="outline">Back</Button>
        <Button>Save & Continue</Button>
      </div>
    </div>
  )
}

