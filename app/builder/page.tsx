"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { FileText, Save, Share2, ArrowLeft } from "lucide-react"
import { PersonalInfoForm } from "@/components/resume/personal-info-form"
import { EducationForm } from "@/components/resume/education-form"
import { ExperienceForm } from "@/components/resume/experience-form"
import { SkillsForm } from "@/components/resume/skills-form"
import { ProjectsForm } from "@/components/resume/projects-form"
import { ResumePreview } from "@/components/resume/resume-preview"
import { TemplateSelector } from "@/components/resume/template-selector"
import { Footer } from "@/components/ui/footer"
import { GeometricBackground } from "@/components/ui/geometric-background"
import { ThemeToggle } from "@/components/theme-toggle"
import { ExportMenu } from "@/components/export-menu"
import { ShareDialog } from "@/components/share-dialog"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function ResumeBuilder() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("personal")
  const [showPreview, setShowPreview] = useState(false)
  const [shareDialogOpen, setShareDialogOpen] = useState(false)

  const handleSave = () => {
    // In a real app, this would save the resume data
    toast({
      title: "Resume saved",
      description: "Your resume has been saved successfully.",
      variant: "success",
    })
  }

  return (
    <div className="flex min-h-screen flex-col relative">
      <GeometricBackground />

      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-primary/10 p-1 rounded-md group-hover:bg-primary/20 transition-colors">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <span className="font-bold text-xl">ResumeForge</span>
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button variant="outline" size="sm" onClick={() => setShowPreview(!showPreview)}>
              {showPreview ? "Edit Resume" : "Preview Resume"}
            </Button>
            <Button variant="outline" size="sm" onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              Save
            </Button>
            <Button variant="outline" size="sm" onClick={() => setShareDialogOpen(true)}>
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <ExportMenu size="sm" />
          </div>
        </div>
      </header>

      <main className="flex-1 py-8">
        <div className="container">
          {showPreview ? (
            <div className="flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPreview(false)}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Editor
                </Button>
                <h2 className="text-2xl font-bold">Resume Preview</h2>
                <ExportMenu />
              </div>
              <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-xl border p-8 max-w-4xl mx-auto">
                <ResumePreview />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid grid-cols-6 mb-6">
                    <TabsTrigger value="personal">Personal</TabsTrigger>
                    <TabsTrigger value="education">Education</TabsTrigger>
                    <TabsTrigger value="experience">Experience</TabsTrigger>
                    <TabsTrigger value="skills">Skills</TabsTrigger>
                    <TabsTrigger value="projects">Projects</TabsTrigger>
                    <TabsTrigger value="template">Template</TabsTrigger>
                  </TabsList>
                  <TabsContent value="personal">
                    <Card className="p-6 shadow-md">
                      <PersonalInfoForm />
                    </Card>
                  </TabsContent>
                  <TabsContent value="education">
                    <Card className="p-6 shadow-md">
                      <EducationForm />
                    </Card>
                  </TabsContent>
                  <TabsContent value="experience">
                    <Card className="p-6 shadow-md">
                      <ExperienceForm />
                    </Card>
                  </TabsContent>
                  <TabsContent value="skills">
                    <Card className="p-6 shadow-md">
                      <SkillsForm />
                    </Card>
                  </TabsContent>
                  <TabsContent value="projects">
                    <Card className="p-6 shadow-md">
                      <ProjectsForm />
                    </Card>
                  </TabsContent>
                  <TabsContent value="template">
                    <Card className="p-6 shadow-md">
                      <TemplateSelector />
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
              <div className="hidden lg:block">
                <div className="sticky top-24">
                  <h3 className="font-medium mb-4 text-lg">Live Preview</h3>
                  <div className="border rounded-xl overflow-hidden shadow-lg bg-white dark:bg-zinc-900">
                    <div className="p-6 max-h-[700px] overflow-auto">
                      <ResumePreview />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <ShareDialog open={shareDialogOpen} onOpenChange={setShareDialogOpen} />
      <Toaster />
    </div>
  )
}

