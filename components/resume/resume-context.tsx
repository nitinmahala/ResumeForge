"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export type Education = {
  id: string
  school: string
  degree: string
  fieldOfStudy: string
  startDate: string
  endDate: string
  gpa: string
  description: string
}

export type Experience = {
  id: string
  company: string
  position: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  description: string
}

export type Project = {
  id: string
  title: string
  description: string
  technologies: string[]
  link: string
}

export type Skill = {
  id: string
  name: string
  level: number // 1-5
}

export type PersonalInfo = {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  linkedin: string
  github: string
  website: string
  summary: string
}

export type ResumeData = {
  personalInfo: PersonalInfo
  education: Education[]
  experience: Experience[]
  projects: Project[]
  skills: Skill[]
  template: string
  color: string
}

type ResumeContextType = {
  resumeData: ResumeData
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void
  addEducation: (education: Education) => void
  updateEducation: (id: string, education: Partial<Education>) => void
  removeEducation: (id: string) => void
  addExperience: (experience: Experience) => void
  updateExperience: (id: string, experience: Partial<Experience>) => void
  removeExperience: (id: string) => void
  addProject: (project: Project) => void
  updateProject: (id: string, project: Partial<Project>) => void
  removeProject: (id: string) => void
  addSkill: (skill: Skill) => void
  updateSkill: (id: string, skill: Partial<Skill>) => void
  removeSkill: (id: string) => void
  setTemplate: (template: string) => void
  setColor: (color: string) => void
}

const defaultResumeData: ResumeData = {
  personalInfo: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    linkedin: "",
    github: "",
    website: "",
    summary: "",
  },
  education: [],
  experience: [],
  projects: [],
  skills: [],
  template: "classic",
  color: "blue",
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined)

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData)

  const updatePersonalInfo = (info: Partial<PersonalInfo>) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        ...info,
      },
    }))
  }

  const addEducation = (education: Education) => {
    setResumeData((prev) => ({
      ...prev,
      education: [...prev.education, education],
    }))
  }

  const updateEducation = (id: string, education: Partial<Education>) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.map((item) => (item.id === id ? { ...item, ...education } : item)),
    }))
  }

  const removeEducation = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((item) => item.id !== id),
    }))
  }

  const addExperience = (experience: Experience) => {
    setResumeData((prev) => ({
      ...prev,
      experience: [...prev.experience, experience],
    }))
  }

  const updateExperience = (id: string, experience: Partial<Experience>) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.map((item) => (item.id === id ? { ...item, ...experience } : item)),
    }))
  }

  const removeExperience = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.filter((item) => item.id !== id),
    }))
  }

  const addProject = (project: Project) => {
    setResumeData((prev) => ({
      ...prev,
      projects: [...prev.projects, project],
    }))
  }

  const updateProject = (id: string, project: Partial<Project>) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.map((item) => (item.id === id ? { ...item, ...project } : item)),
    }))
  }

  const removeProject = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.filter((item) => item.id !== id),
    }))
  }

  const addSkill = (skill: Skill) => {
    setResumeData((prev) => ({
      ...prev,
      skills: [...prev.skills, skill],
    }))
  }

  const updateSkill = (id: string, skill: Partial<Skill>) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.map((item) => (item.id === id ? { ...item, ...skill } : item)),
    }))
  }

  const removeSkill = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.filter((item) => item.id !== id),
    }))
  }

  const setTemplate = (template: string) => {
    setResumeData((prev) => ({
      ...prev,
      template,
    }))
  }

  const setColor = (color: string) => {
    setResumeData((prev) => ({
      ...prev,
      color,
    }))
  }

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        updatePersonalInfo,
        addEducation,
        updateEducation,
        removeEducation,
        addExperience,
        updateExperience,
        removeExperience,
        addProject,
        updateProject,
        removeProject,
        addSkill,
        updateSkill,
        removeSkill,
        setTemplate,
        setColor,
      }}
    >
      {children}
    </ResumeContext.Provider>
  )
}

export function useResumeContext() {
  const context = useContext(ResumeContext)
  if (context === undefined) {
    throw new Error("useResumeContext must be used within a ResumeProvider")
  }
  return context
}

