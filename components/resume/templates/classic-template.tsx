import type { ResumeData } from "../resume-context"
import { Phone, Mail, Globe, Linkedin, Github, MapPin, Calendar } from "lucide-react"

interface ClassicTemplateProps {
  data: ResumeData
}

export function ClassicTemplate({ data }: ClassicTemplateProps) {
  const { personalInfo, education, experience, skills, projects } = data

  return (
    <div className="font-serif">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-1">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <div className="flex flex-wrap justify-center gap-3 text-sm">
          {personalInfo.phone && (
            <div className="flex items-center">
              <Phone className="h-3 w-3 mr-1" />
              {personalInfo.phone}
            </div>
          )}
          {personalInfo.email && (
            <div className="flex items-center">
              <Mail className="h-3 w-3 mr-1" />
              {personalInfo.email}
            </div>
          )}
          {personalInfo.website && (
            <div className="flex items-center">
              <Globe className="h-3 w-3 mr-1" />
              {personalInfo.website}
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center">
              <Linkedin className="h-3 w-3 mr-1" />
              {personalInfo.linkedin}
            </div>
          )}
          {personalInfo.github && (
            <div className="flex items-center">
              <Github className="h-3 w-3 mr-1" />
              {personalInfo.github}
            </div>
          )}
          {personalInfo.city && personalInfo.state && (
            <div className="flex items-center">
              <MapPin className="h-3 w-3 mr-1" />
              {personalInfo.city}, {personalInfo.state}
            </div>
          )}
        </div>
      </header>

      {personalInfo.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-bold border-b-2 border-gray-300 mb-2">Professional Summary</h2>
          <p className="text-sm">{personalInfo.summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold border-b-2 border-gray-300 mb-2">Work Experience</h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-center">
                  <h3 className="font-bold">{exp.position}</h3>
                  <div className="text-sm flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                  </div>
                </div>
                <div className="text-sm font-semibold">
                  {exp.company}, {exp.location}
                </div>
                <p className="text-sm mt-1">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold border-b-2 border-gray-300 mb-2">Education</h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-center">
                  <h3 className="font-bold">{edu.school}</h3>
                  <div className="text-sm flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {edu.startDate} - {edu.endDate}
                  </div>
                </div>
                <div className="text-sm font-semibold">
                  {edu.degree} in {edu.fieldOfStudy} {edu.gpa && `(GPA: ${edu.gpa})`}
                </div>
                {edu.description && <p className="text-sm mt-1">{edu.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold border-b-2 border-gray-300 mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <div key={skill.id} className="text-sm bg-gray-100 px-2 py-1 rounded">
                {skill.name}
              </div>
            ))}
          </div>
        </section>
      )}

      {projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold border-b-2 border-gray-300 mb-2">Projects</h2>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id}>
                <div className="flex justify-between items-center">
                  <h3 className="font-bold">{project.title}</h3>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      <Globe className="h-3 w-3 inline" /> View Project
                    </a>
                  )}
                </div>
                <p className="text-sm mt-1">{project.description}</p>
                {project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

