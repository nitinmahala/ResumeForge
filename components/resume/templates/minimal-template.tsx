import type { ResumeData } from "../resume-context"
import { Phone, Mail, Globe, Linkedin, Github, MapPin } from "lucide-react"

interface MinimalTemplateProps {
  data: ResumeData
}

export function MinimalTemplate({ data }: MinimalTemplateProps) {
  const { personalInfo, education, experience, skills, projects } = data

  return (
    <div className="font-sans">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <div className="flex flex-wrap gap-4 text-sm">
          {personalInfo.phone && (
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-1" />
              {personalInfo.phone}
            </div>
          )}
          {personalInfo.email && (
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-1" />
              {personalInfo.email}
            </div>
          )}
          {personalInfo.website && (
            <div className="flex items-center">
              <Globe className="h-4 w-4 mr-1" />
              {personalInfo.website}
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center">
              <Linkedin className="h-4 w-4 mr-1" />
              {personalInfo.linkedin}
            </div>
          )}
          {personalInfo.github && (
            <div className="flex items-center">
              <Github className="h-4 w-4 mr-1" />
              {personalInfo.github}
            </div>
          )}
          {personalInfo.city && personalInfo.state && (
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              {personalInfo.city}, {personalInfo.state}
            </div>
          )}
        </div>
      </header>

      {personalInfo.summary && (
        <section className="mb-8">
          <p className="text-sm leading-relaxed">{personalInfo.summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-bold mb-4 uppercase tracking-wider">Experience</h2>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold">{exp.position}</h3>
                    <div className="text-sm">
                      {exp.company}, {exp.location}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                  </div>
                </div>
                <p className="text-sm mt-2">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {education.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-bold mb-4 uppercase tracking-wider">Education</h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold">{edu.school}</h3>
                    <div className="text-sm">
                      {edu.degree} in {edu.fieldOfStudy} {edu.gpa && `(GPA: ${edu.gpa})`}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    {edu.startDate} - {edu.endDate}
                  </div>
                </div>
                {edu.description && <p className="text-sm mt-1">{edu.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {skills.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-bold mb-4 uppercase tracking-wider">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <div key={skill.id} className="text-sm border px-3 py-1 rounded-full">
                {skill.name}
              </div>
            ))}
          </div>
        </section>
      )}

      {projects.length > 0 && (
        <section>
          <h2 className="text-lg font-bold mb-4 uppercase tracking-wider">Projects</h2>
          <div className="space-y-6">
            {projects.map((project) => (
              <div key={project.id}>
                <div className="flex justify-between items-start">
                  <h3 className="font-bold">{project.title}</h3>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-600 hover:underline"
                    >
                      View Project
                    </a>
                  )}
                </div>
                <p className="text-sm mt-1">{project.description}</p>
                {project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="text-xs bg-gray-100 px-2 py-0.5 rounded">
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

