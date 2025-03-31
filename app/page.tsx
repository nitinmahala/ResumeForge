"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, FileText, Palette, Download, Eye } from "lucide-react"
import { GeometricBackground } from "@/components/ui/geometric-background"
import { Footer } from "@/components/ui/footer"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <GeometricBackground />

      <header className="border-b border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-1 rounded-md group-hover:opacity-90 transition-opacity">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                ResumeForge
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button size="sm" className="bg-gradient-to-br from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white" asChild>
              <Link href="/builder">Create Resume</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-28 lg:py-36 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-gray-300/50 dark:bg-grid-gray-700/20 [mask-image:linear-gradient(to_bottom,transparent,white,transparent)]" />
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center text-center space-y-8 max-w-3xl mx-auto">
              <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full shadow-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                Create professional resumes in minutes
              </h1>
              <p className="max-w-[700px] text-gray-600 dark:text-gray-300 text-lg md:text-xl">
                Build stunning, ATS-friendly resumes with our easy-to-use builder. Choose from multiple templates and
                customize to stand out.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-base px-8 bg-gradient-to-br from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all" asChild>
                  <Link href="/builder" className="flex items-center gap-1">
                    Create Your Resume <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="text-base px-8 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100/50 dark:hover:bg-gray-800/50" asChild>
                  <Link href="/templates">View Templates</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 md:py-28 relative">
          <div className="absolute inset-0 bg-grid-gray-300/30 dark:bg-grid-gray-700/10 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
          <div className="container px-4 md:px-6 relative z-10">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full shadow-lg">
                <Palette className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                Powerful Features
              </h2>
              <p className="max-w-[85%] text-gray-600 dark:text-gray-300 text-lg">
                Everything you need to create a professional resume that gets you noticed
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-3">
              {[
                {
                  icon: <Palette className="h-6 w-6 text-white" />,
                  title: "Multiple Templates",
                  description: "Choose from a variety of professionally designed templates to match your style and industry."
                },
                {
                  icon: <Eye className="h-6 w-6 text-white" />,
                  title: "Real-time Preview",
                  description: "See changes instantly as you edit your resume, ensuring it looks perfect before downloading."
                },
                {
                  icon: <Download className="h-6 w-6 text-white" />,
                  title: "Easy Export",
                  description: "Download your resume as a PDF in A4 or US Letter size, ready to send to employers."
                }
              ].map((feature, index) => (
                <div 
                  key={index}
                  className="flex flex-col items-center space-y-4 rounded-xl border border-gray-200/50 dark:border-gray-700/50 p-6 shadow-sm bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm hover:shadow-md transition-all hover:border-blue-300/50 dark:hover:border-blue-500/50"
                >
                  <div className="rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 p-3 shadow">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">{feature.title}</h3>
                  <p className="text-center text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 relative">
          <div className="absolute inset-0 bg-grid-blue-400/20 dark:bg-grid-blue-600/10 [mask-image:linear-gradient(to_bottom,transparent_10%,white,transparent_90%)]" />
          <div className="container px-4 md:px-6 relative z-10">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500/5 to-indigo-600/5 px-6 py-16 shadow-xl border border-blue-200/30 dark:border-blue-900/30">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-blue-400/10 via-transparent to-transparent opacity-60" />
              <div className="relative mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                  Ready to create your professional resume?
                </h2>
                <p className="mt-4 text-gray-600 dark:text-gray-300">
                  Join thousands of job seekers who have successfully landed their dream jobs with our resume builder.
                </p>
                <div className="mt-8">
                  <Button 
                    size="lg" 
                    className="text-base px-8 bg-gradient-to-br from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all"
                    asChild
                  >
                    <Link href="/builder" className="flex items-center gap-1">
                      Get Started Now <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}