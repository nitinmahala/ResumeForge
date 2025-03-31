import Link from "next/link"
import { Github } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container flex flex-col items-center justify-center gap-4 text-center">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Built with ❤️ by ResumeForge Team</span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="https://github.com/nitinmahala/ResumeForge"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="h-4 w-4" />
            <span>GitHub</span>
          </Link>
         
        </div>
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} ResumeForge. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

