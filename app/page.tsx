import * as React from "react"
import { ComponentPreview } from "@/components/component-preview"
import { DemoContent } from "@/components/demo-content"

export default function Home() {
  return (
    <div className="w-full h-full p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Components</h1>
        <ComponentPreview 
          name="demo-content" 
          title="Demo Content Component"
          description="A grid layout component showcasing various UI elements and placeholders."
        >
          <DemoContent />
        </ComponentPreview>
      </div>
      <DemoContent />
    </div>
  )
}
