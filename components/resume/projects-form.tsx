"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, X } from "lucide-react"
import { useResumeContext, type Project } from "./resume-context"

export function ProjectsForm() {
  const { resumeData, addProject, updateProject, removeProject } = useResumeContext()
  const [newProject, setNewProject] = useState<Omit<Project, "id">>({
    title: "",
    description: "",
    technologies: [],
    link: "",
  })
  const [technology, setTechnology] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewProject((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAddTechnology = () => {
    if (technology.trim() && !newProject.technologies.includes(technology.trim())) {
      setNewProject((prev) => ({
        ...prev,
        technologies: [...prev.technologies, technology.trim()],
      }))
      setTechnology("")
    }
  }

  const handleRemoveTechnology = (tech: string) => {
    setNewProject((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((t) => t !== tech),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addProject({
      ...newProject,
      id: crypto.randomUUID(),
    })
    setNewProject({
      title: "",
      description: "",
      technologies: [],
      link: "",
    })
  }

  const handleUpdateTechnology = (projectId: string, tech: string) => {
    const project = resumeData.projects.find((p) => p.id === projectId)
    if (project) {
      updateProject(projectId, {
        technologies: project.technologies.filter((t) => t !== tech),
      })
    }
  }

  const handleAddTechnologyToProject = (projectId: string, tech: string) => {
    const project = resumeData.projects.find((p) => p.id === projectId)
    if (project && tech.trim() && !project.technologies.includes(tech.trim())) {
      updateProject(projectId, {
        technologies: [...project.technologies, tech.trim()],
      })
      return true
    }
    return false
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Projects</h2>
        <p className="text-sm text-muted-foreground">Add your projects to showcase your skills and experience.</p>
      </div>

      {resumeData.projects.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Added Projects</h3>
          {resumeData.projects.map((project) => (
            <Card key={project.id} className="p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-medium">{project.title}</h4>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline"
                    >
                      {project.link}
                    </a>
                  )}
                </div>
                <Button variant="destructive" size="icon" onClick={() => removeProject(project.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor={`title-${project.id}`}>Project Title</Label>
                  <Input
                    id={`title-${project.id}`}
                    value={project.title}
                    onChange={(e) => updateProject(project.id, { title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`link-${project.id}`}>Project Link</Label>
                  <Input
                    id={`link-${project.id}`}
                    value={project.link}
                    onChange={(e) => updateProject(project.id, { link: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`desc-${project.id}`}>Description</Label>
                  <Textarea
                    id={`desc-${project.id}`}
                    value={project.description}
                    onChange={(e) => updateProject(project.id, { description: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Technologies Used</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="flex items-center gap-1">
                        {tech}
                        <button
                          type="button"
                          onClick={() => handleUpdateTechnology(project.id, tech)}
                          className="ml-1 rounded-full hover:bg-muted"
                        >
                          <X className="h-3 w-3" />
                          <span className="sr-only">Remove {tech}</span>
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add technology..."
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          const input = e.currentTarget
                          if (handleAddTechnologyToProject(project.id, input.value)) {
                            input.value = ""
                          }
                        }
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={(e) => {
                        const input = e.currentTarget.previousElementSibling as HTMLInputElement
                        if (handleAddTechnologyToProject(project.id, input.value)) {
                          input.value = ""
                        }
                      }}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 border-t pt-6">
        <h3 className="text-lg font-medium">Add New Project</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Project Title</Label>
            <Input
              id="title"
              name="title"
              value={newProject.title}
              onChange={handleChange}
              placeholder="My Awesome Project"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="link">Project Link</Label>
            <Input
              id="link"
              name="link"
              value={newProject.link}
              onChange={handleChange}
              placeholder="https://github.com/username/project"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={newProject.description}
              onChange={handleChange}
              placeholder="Describe your project, its purpose, and your role..."
              className="min-h-[100px]"
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Technologies Used</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {newProject.technologies.map((tech) => (
                <Badge key={tech} variant="secondary" className="flex items-center gap-1">
                  {tech}
                  <button
                    type="button"
                    onClick={() => handleRemoveTechnology(tech)}
                    className="ml-1 rounded-full hover:bg-muted"
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove {tech}</span>
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Add technology..."
                value={technology}
                onChange={(e) => setTechnology(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    handleAddTechnology()
                  }
                }}
              />
              <Button type="button" variant="outline" onClick={handleAddTechnology}>
                Add
              </Button>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button type="submit">
            <Plus className="mr-2 h-4 w-4" />
            Add Project
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

