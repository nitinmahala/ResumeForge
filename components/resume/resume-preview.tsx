"use client"

import { useResumeContext } from "./resume-context"
import { ClassicTemplate } from "./templates/classic-template"
import { ModernTemplate } from "./templates/modern-template"
import { CreativeTemplate } from "./templates/creative-template"
import { MinimalTemplate } from "./templates/minimal-template"

export function ResumePreview() {
  const { resumeData } = useResumeContext()

  const renderTemplate = () => {
    switch (resumeData.template) {
      case "classic":
        return <ClassicTemplate data={resumeData} />
      case "modern":
        return <ModernTemplate data={resumeData} />
      case "creative":
        return <CreativeTemplate data={resumeData} />
      case "minimal":
        return <MinimalTemplate data={resumeData} />
      default:
        return <ClassicTemplate data={resumeData} />
    }
  }

  return (
    <div className="bg-white text-black rounded-lg shadow-lg overflow-hidden">
      <div className="w-full h-full min-h-[800px] p-8 max-w-[800px] mx-auto">{renderTemplate()}</div>
    </div>
  )
}

