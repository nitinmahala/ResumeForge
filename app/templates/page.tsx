"use client"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { FileText, ArrowLeft } from "lucide-react"
import { GeometricBackground } from "@/components/ui/geometric-background"
import { Footer } from "@/components/ui/footer"
import { ThemeToggle } from "@/components/theme-toggle"

export default function TemplatesPage() {
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
            <Button size="sm" asChild>
              <Link href="/builder">Create Resume</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="container py-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Resume Templates</h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Choose from our professionally designed templates to create your perfect resume
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((template) => (
              <Card key={template.id} className="overflow-hidden group hover:shadow-lg transition-all">
                <div className="aspect-[3/4] relative overflow-hidden">
                  <Image
                    src={template.imageUrl}
                    alt={`${template.name} template preview`}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    width={300}
                    height={400}
                    priority={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
                    <Button size="sm" className="mb-4" asChild>
                      <Link href={`/builder?template=${template.id}`}>Use Template</Link>
                    </Button>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold">{template.name}</h3>
                  <p className="text-sm text-muted-foreground">{template.description}</p>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={template.imageUrl} target="_blank" rel="noopener noreferrer">
                      Preview
                    </Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link href={`/builder?template=${template.id}`}>Use Template</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}