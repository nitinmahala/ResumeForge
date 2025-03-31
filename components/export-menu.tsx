"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Download, FileText, Image, FileJson } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { saveAs } from "file-saver"
import { PDFDocument, rgb } from "pdf-lib"
import { Document, Packer, Paragraph } from "docx"
import html2canvas from "html2canvas"

interface ExportMenuProps {
  size?: "default" | "sm" | "lg"
  variant?: "default" | "outline" | "secondary" | "ghost" | "link"
}

export function ExportMenu({ size = "default", variant = "default" }: ExportMenuProps) {
  const { toast } = useToast()

  const handleExport = async (format: string) => {
    let fileName = `resume.${format}`

    // Example resume data
    const resumeData = {
      name: "John Doe",
      email: "john.doe@example.com",
      experience: "Software Engineer at XYZ Corp.",
    }

    if (format === "json") {
      // JSON export
      const blob = new Blob([JSON.stringify(resumeData, null, 2)], { type: "application/json" })
      saveAs(blob, fileName)
    } else if (format === "docx") {
      // DOCX export using `docx` library
      const doc = new Document({
        sections: [
          {
            properties: {},
            children: [
              new Paragraph(`Name: ${resumeData.name}`),
              new Paragraph(`Email: ${resumeData.email}`),
              new Paragraph(`Experience: ${resumeData.experience}`),
            ],
          },
        ],
      })
      const blob = await Packer.toBlob(doc)
      saveAs(blob, fileName)
    } else if (format === "pdf") {
      // PDF export using `pdf-lib`
      const pdfDoc = await PDFDocument.create()
      const page = pdfDoc.addPage([600, 400])
      const { width, height } = page.getSize()
      const font = await pdfDoc.embedFont(PDFDocument.PDFName.of("Helvetica"))
      page.drawText(`Name: ${resumeData.name}`, { x: 50, y: height - 50, size: 20, font, color: rgb(0, 0, 0) })
      page.drawText(`Email: ${resumeData.email}`, { x: 50, y: height - 80, size: 16, font, color: rgb(0, 0, 0) })
      page.drawText(`Experience: ${resumeData.experience}`, { x: 50, y: height - 110, size: 16, font, color: rgb(0, 0, 0) })
      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes], { type: "application/pdf" })
      saveAs(blob, fileName)
    } else if (format === "png") {
      // PNG export using `html2canvas`
      const element = document.body // You can replace this with a specific resume container
      const canvas = await html2canvas(element)
      canvas.toBlob((blob) => {
        if (blob) saveAs(blob, fileName)
      }, "image/png")
    } else {
      toast({ title: "Unsupported Format", description: `Export to ${format.toUpperCase()} is not available.`, variant: "destructive" })
      return
    }

    toast({ title: "Export Complete", description: `Your resume has been exported as ${format.toUpperCase()}.`, variant: "success" })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={size} variant={variant}>
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleExport("pdf")}>
          <FileText className="mr-2 h-4 w-4" />
          <span>PDF Document</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport("docx")}>
          <FileText className="mr-2 h-4 w-4" />
          <span>Word Document (DOCX)</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport("png")}>
          <Image className="mr-2 h-4 w-4" />
          <span>Image (PNG)</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport("json")}>
          <FileJson className="mr-2 h-4 w-4" />
          <span>JSON Data</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
