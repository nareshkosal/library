'use client'

import * as React from "react"
import { Card, CardContent } from "@/registry/new-york/ui/card"

export function DemoContent() {
  return (
    <div className="grid grid-cols-2 gap-4 py-10 sm:grid-cols-3 md:grid-cols-4">
      {[...Array(12)].map((_, i) => (
        <Card key={i} className="border-0 shadow-none">
          <CardContent className="p-4">
            <div className="aspect-square bg-gray-200 rounded-lg mb-2" />
            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}