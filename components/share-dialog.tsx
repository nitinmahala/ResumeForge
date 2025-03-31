"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Copy, Check, Mail } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface ShareDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ShareDialog({ open, onOpenChange }: ShareDialogProps) {
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)
  const [email, setEmail] = useState("")

  const shareLink = "https://resumeforge.com/share/abc123" // This would be dynamic in a real app

  const handleCopy = () => {
    navigator.clipboard.writeText(shareLink)
    setCopied(true)
    toast({
      title: "Link copied",
      description: "Share link has been copied to clipboard",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  const handleEmailShare = () => {
    // In a real app, this would send the email
    toast({
      title: "Resume shared",
      description: `Your resume has been shared with ${email}`,
      variant: "success",
    })
    setEmail("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share your resume</DialogTitle>
          <DialogDescription>Share your resume with others via a link or email.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="link">Share link</Label>
            <div className="flex items-center gap-2">
              <Input id="link" value={shareLink} readOnly className="flex-1" />
              <Button size="icon" variant="outline" onClick={handleCopy}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Share via email</Label>
            <div className="flex items-center gap-2">
              <Input
                id="email"
                type="email"
                placeholder="colleague@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
              />
              <Button variant="outline" onClick={handleEmailShare} disabled={!email}>
                <Mail className="h-4 w-4 mr-2" />
                Send
              </Button>
            </div>
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

