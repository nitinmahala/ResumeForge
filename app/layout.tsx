import type React from "react"
import "@/app/globals.css"
import { ResumeProvider } from "@/components/resume/resume-context"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "ResumeForge - Create Professional Resumes in Minutes",
  description:
    "Build stunning, ATS-friendly resumes with our easy-to-use builder. Choose from multiple templates and customize to stand out."
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="\Illustration.ico" type="image/x-icon" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ResumeProvider>{children}</ResumeProvider>
      </body>
    </html>
  )
}

import "./globals.css"