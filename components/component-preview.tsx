'use client'

import * as React from "react"
import { X, Share2, Bookmark, Maximize2 } from "lucide-react"
import { Button } from "@/registry/new-york/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/registry/new-york/ui/dialog"
import { cn } from "@/lib/utils"

interface ComponentPreviewProps {
  name: string
  title: string
  children: React.ReactNode
  className?: string
  description?: string
  author?: string
}

export function ComponentPreview({ 
  title, 
  children, 
  className, 
  description = "Bring your UI to life with beautiful components. Create immersive experiences that capture attention and enhance your design.",
  author = "serafim"
}: ComponentPreviewProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className={cn("w-fit", className)}
        >
          Preview
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl p-0">
        <div className="flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-sm font-medium">{author[0].toUpperCase()}</span>
              </div>
              <div>
                <DialogTitle className="text-lg font-semibold">{title}</DialogTitle>
                <p className="text-sm text-muted-foreground">{author}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Bookmark className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Maximize2 className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-6">
            {/* Black Card with Component Preview */}
            <div className="relative bg-black rounded-xl overflow-hidden mb-6">
              <div className="aspect-video relative">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20 z-10" />
                
                {/* Content area */}
                <div className="relative z-20 h-full flex items-center justify-center p-8">
                  <div className="text-center max-w-2xl">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                      Interactive 3D
                    </h2>
                    <p className="text-lg text-white/90 leading-relaxed">
                      {description}
                    </p>
                  </div>
                </div>
                
                {/* Component preview in corner */}
                <div className="absolute bottom-4 right-4 z-30">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    {children}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Action Button */}
            <div className="flex justify-center">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 h-10">
                OPEN COMPONENT
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}