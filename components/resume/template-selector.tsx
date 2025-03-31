"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useResumeContext } from "./resume-context"

export function TemplateSelector() {
  const { resumeData, setTemplate, setColor } = useResumeContext()
  const [selectedTemplate, setSelectedTemplate] = useState(resumeData.template)
  const [selectedColor, setSelectedColor] = useState(resumeData.color)

  const templates = [
    { 
      id: "classic", 
      name: "Classic", 
      description: "A traditional resume layout suitable for most industries",
      imageUrl: "https://i.ibb.co/BVSWfk1j/Screenshot-2025-03-31-184522.png"
    },
    { 
      id: "modern", 
      name: "Modern", 
      description: "A clean, contemporary design with a touch of color",
      imageUrl: "https://i.ibb.co/Ldph510x/Screenshot-2025-03-31-190510.png" 
    },
    { 
      id: "creative", 
      name: "Creative", 
      description: "A bold design for creative professionals",
      imageUrl: "https://i.ibb.co/kVM9JyrQ/Screenshot-2025-03-31-190521.png" 
    },
    { 
      id: "minimal", 
      name: "Minimal", 
      description: "A simple, minimalist design focusing on content",
      imageUrl: "https://i.ibb.co/67s1ZD8S/Screenshot-2025-03-31-190542.png"
    },
    { 
      id: "professional", 
      name: "Professional", 
      description: "A structured layout ideal for corporate positions",
      imageUrl: "https://i.ibb.co/ZRP7syNV/Screenshot-2025-03-31-190534.png"
    },
    { 
      id: "executive", 
      name: "Executive", 
      description: "An elegant design for senior positions",
      imageUrl: "https://i.ibb.co/67s1ZD8S/Screenshot-2025-03-31-190542.png"
    },
  ]

  const colors = [
    { id: "blue", name: "Blue", class: "bg-blue-500" },
    { id: "green", name: "Green", class: "bg-green-500" },
    { id: "red", name: "Red", class: "bg-red-500" },
    { id: "purple", name: "Purple", class: "bg-purple-500" },
    { id: "gray", name: "Gray", class: "bg-gray-500" },
    { id: "black", name: "Black", class: "bg-black" },
  ]

  const handleTemplateChange = (value: string) => {
    setSelectedTemplate(value)
    setTemplate(value)
  }

  const handleColorChange = (value: string) => {
    setSelectedColor(value)
    setColor(value)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Choose Template</h2>
        <p className="text-sm text-muted-foreground">Select a template and color scheme for your resume.</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Resume Templates</h3>
          <RadioGroup
            value={selectedTemplate}
            onValueChange={handleTemplateChange}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {templates.map((template) => (
              <div key={template.id} className="relative">
                <RadioGroupItem 
                  value={template.id} 
                  id={`template-${template.id}`} 
                  className="sr-only peer" 
                />
                <Label
                  htmlFor={`template-${template.id}`}
                  className="flex flex-col cursor-pointer rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <div className="aspect-[3/4] mb-4 bg-muted rounded-md overflow-hidden relative">
                    <Image
                      src={template.imageUrl}
                      alt={template.name}
                      className="w-full h-full object-cover"
                      width={300}
                      height={400}
                      priority={false}
                    />
                  </div>
                  <div className="font-medium">{template.name}</div>
                  <div className="text-sm text-muted-foreground">{template.description}</div>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Color Scheme</h3>
          <RadioGroup
            value={selectedColor}
            onValueChange={handleColorChange}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4"
          >
            {colors.map((color) => (
              <div key={color.id} className="relative">
                <RadioGroupItem 
                  value={color.id} 
                  id={`color-${color.id}`} 
                  className="sr-only peer" 
                />
                <Label
                  htmlFor={`color-${color.id}`}
                  className="flex flex-col items-center justify-center cursor-pointer rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <div className={`w-8 h-8 rounded-full ${color.class} mb-2`} />
                  <div className="text-sm font-medium">{color.name}</div>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>

      <div className="flex justify-between pt-6 border-t">
        <Button variant="outline">Back</Button>
        <Button>Save & Continue</Button>
      </div>
    </div>
  )
}