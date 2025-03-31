import type { ResumeData } from "../resume-context"
import { Phone, Mail, Globe, Linkedin, Github, MapPin, Calendar } from "lucide-react"

interface ModernTemplateProps {
  data: ResumeData
}

export function ModernTemplate({ data }: ModernTemplateProps) {
  const { personalInfo, education, experience, skills, projects, color } = data

  const getColorClass = () => {
    switch (color) {
      case "blue":
        return "bg-blue-600 text-blue-600"
      case "green":
        return "bg-green-600 text-green-600"
      case "red":
        return "bg-red-600 text-red-600"
      case "purple":
        return "bg-purple-600 text-purple-600"
      case "gray":
        return "bg-gray-600 text-gray-600"
      case "black":
        return "bg-black text-black"
      default:
        return "bg-blue-600 text-blue-600"
    }
  }

  const bgColorClass = getColorClass().split(" ")[0]
  const textColorClass = getColorClass().split(" ")[1]

  return (
    <div className="font-sans">
      <header className={`${bgColorClass} text-white p-6 rounded-t-lg mb-6`}>
        <h1 className="text-3xl font-bold mb-1">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <div className="flex flex-wrap gap-4 text-sm mt-2">
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

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-3 md:col-span-1">
          {personalInfo.summary && (
            <section className="mb-6">
              <h2 className={`text-lg font-bold ${textColorClass} mb-2`}>ABOUT ME</h2>
              <p className="text-sm">{personalInfo.summary}</p>
            </section>
          )}

          {skills.length > 0 && (
            <section className="mb-6">
              <h2 className={`text-lg font-bold ${textColorClass} mb-2`}>SKILLS</h2>
              <div className="space-y-2">
                {skills.map((skill) => (
                  <div key={skill.id} className="text-sm">
                    <div className="flex justify-between mb-1">
                      <span>{skill.name}</span>
                      <span className="text-xs">
                        {["Beginner", "Elementary", "Intermediate", "Advanced", "Expert"][skill.level - 1]}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className={`${bgColorClass} h-1.5 rounded-full`}
                        style={{ width: `${skill.level * 20}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {education.length > 0 && (
            <section className="mb-6">
              <h2 className={`text-lg font-bold ${textColorClass} mb-2`}>EDUCATION</h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-bold">{edu.school}</h3>
                    <div className="text-sm">
                      {edu.degree} in {edu.fieldOfStudy}
                    </div>
                    <div className="text-xs text-gray-600 flex items-center mt-1">
                      <Calendar className="h-3 w-3 mr-1" />
                      {edu.startDate} - {edu.endDate}
                    </div>
                    {edu.gpa && <div className="text-xs mt-1">GPA: {edu.gpa}</div>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="col-span-3 md:col-span-2">
          {experience.length > 0 && (
            <section className="mb-6">
              <h2 className={`text-lg font-bold ${textColorClass} mb-2`}>WORK EXPERIENCE</h2>
              <div className="space-y-6">
                {experience.map((exp) => (
                  <div key={exp.id} className="relative pl-6 border-l-2 border-gray-200">
                    <div className={`absolute left-[-5px] top-0 w-2 h-2 rounded-full ${bgColorClass}`}></div>
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold">{exp.position}</h3>
                      <div className="text-xs text-gray-600 flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                      </div>
                    </div>
                    <div className="text-sm font-medium">
                      {exp.company}, {exp.location}
                    </div>
                    <p className="text-sm mt-2">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {projects.length > 0 && (
            <section className="mb-6">
              <h2 className={`text-lg font-bold ${textColorClass} mb-2`}>PROJECTS</h2>
              <div className="space-y-6">
                {projects.map((project) => (
                  <div key={project.id} className="relative pl-6 border-l-2 border-gray-200">
                    <div className={`absolute left-[-5px] top-0 w-2 h-2 rounded-full ${bgColorClass}`}></div>
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold">{project.title}</h3>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`text-xs ${textColorClass} hover:underline`}
                        >
                          View Project
                        </a>
                      )}
                    </div>
                    <p className="text-sm mt-2">{project.description}</p>
                    {project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {project.technologies.map((tech) => (
                          <span key={tech} className={`text-xs px-2 py-1 rounded-full ${bgColorClass} bg-opacity-10`}>
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
      </div>
    </div>
  )
}

