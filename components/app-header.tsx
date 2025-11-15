'use client'

import * as React from "react"
import { Share2, RefreshCw, Bookmark, Maximize2 } from "lucide-react"
import { Button } from "@/registry/new-york/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/registry/new-york/ui/dropdown-menu"
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu"


export function AppHeader() {
  return (
    <header className="flex h-14 items-center justify-between border-b bg-background px-4">
      <div className="flex items-center gap-2">
        <h1 className="text-lg font-bold">Sidebar</h1>
        <span className="text-sm text-muted-foreground">Aceternity UI</span>
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Share2 className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <RefreshCw className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Bookmark className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Maximize2 className="h-4 w-4" />
        </Button>
        
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          Open Component
        </Button>
        
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <span className="text-lg">×</span>
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              Sidebar Demo
              <span className="ml-1">▼</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Sidebar Demo</DropdownMenuItem>
            <DropdownMenuItem>Alternative Layout</DropdownMenuItem>
            <DropdownMenuItem>Compact View</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}