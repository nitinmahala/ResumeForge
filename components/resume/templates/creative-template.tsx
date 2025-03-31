import type { ResumeData } from "../resume-context"
import { Phone, Mail, Globe, Linkedin, Github, MapPin, Calendar, Star } from "lucide-react"

interface CreativeTemplateProps {
  data: ResumeData
}

export function CreativeTemplate({ data }: CreativeTemplateProps) {
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
      <div className="grid grid-cols-12 gap-6">
        <div className={`col-span-12 md:col-span-4 ${bgColorClass} text-white p-6 rounded-lg`}>
          <div className="flex justify-center mb-6">
            <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center text-4xl font-bold text-gray-800">
              {personalInfo.firstName?.[0] || ""}
              {personalInfo.lastName?.[0] || ""}
            </div>
          </div>

          <h1 className="text-2xl font-bold text-center mb-1">
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>

          <div className="space-y-6 mt-6">
            <div className="space-y-2">
              <h2 className="text-lg font-bold border-b border-white pb-1">CONTACT</h2>
              <div className="space-y-2 text-sm">
                {personalInfo.phone && (
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2" />
                    {personalInfo.phone}
                  </div>
                )}
                {personalInfo.email && (
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2" />
                    {personalInfo.email}
                  </div>
                )}
                {personalInfo.website && (
                  <div className="flex items-center">
                    <Globe className="h-4 w-4 mr-2" />
                    {personalInfo.website}
                  </div>
                )}
                {personalInfo.linkedin && (
                  <div className="flex items-center">
                    <Linkedin className="h-4 w-4 mr-2" />
                    {personalInfo.linkedin}
                  </div>
                )}
                {personalInfo.github && (
                  <div className="flex items-center">
                    <Github className="h-4 w-4 mr-2" />
                    {personalInfo.github}
                  </div>
                )}
                {personalInfo.city && personalInfo.state && (
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    {personalInfo.city}, {personalInfo.state}
                  </div>
                )}
              </div>
            </div>

            {skills.length > 0 && (
              <div className="space-y-2">
                <h2 className="text-lg font-bold border-b border-white pb-1">SKILLS</h2>
                <div className="space-y-3">
                  {skills.map((skill) => (
                    <div key={skill.id} className="text-sm">
                      <div className="flex justify-between mb-1">
                        <span>{skill.name}</span>
                      </div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < skill.level ? "fill-white" : "stroke-white fill-transparent"}`}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {education.length > 0 && (
              <div className="space-y-2">
                <h2 className="text-lg font-bold border-b border-white pb-1">EDUCATION</h2>
                <div className="space-y-4">
                  {education.map((edu) => (
                    <div key={edu.id}>
                      <h3 className="font-bold">{edu.school}</h3>
                      <div className="text-sm">
                        {edu.degree} in {edu.fieldOfStudy}
                      </div>
                      <div className="text-xs flex items-center mt-1">
                        <Calendar className="h-3 w-3 mr-1" />
                        {edu.startDate} - {edu.endDate}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="col-span-12 md:col-span-8 p-6">
          {personalInfo.summary && (
            <section className="mb-8">
              <h2 className={`text-xl font-bold ${textColorClass} mb-3`}>ABOUT ME</h2>
              <p className="text-sm leading-relaxed">{personalInfo.summary}</p>
            </section>
          )}

          {experience.length > 0 && (
            <section className="mb-8">
              <h2 className={`text-xl font-bold ${textColorClass} mb-3`}>WORK EXPERIENCE</h2>
              <div className="space-y-6">
                {experience.map((exp) => (
                  <div key={exp.id} className="relative">
                    <div className={`absolute left-0 top-0 w-1 h-full ${bgColorClass}`}></div>
                    <div className="pl-6">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-lg">{exp.position}</h3>
                        <div className="text-sm text-gray-600 flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                        </div>
                      </div>
                      <div className={`text-sm font-medium ${textColorClass}`}>
                        {exp.company}, {exp.location}
                      </div>
                      <p className="text-sm mt-2 leading-relaxed">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {projects.length > 0 && (
            <section>
              <h2 className={`text-xl font-bold ${textColorClass} mb-3`}>PROJECTS</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((project) => (
                  <div key={project.id} className={`border-l-4 ${bgColorClass} pl-4 py-2`}>
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
                          <span
                            key={tech}
                            className={`text-xs px-2 py-0.5 rounded ${bgColorClass} bg-opacity-20 ${textColorClass}`}
                          >
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

