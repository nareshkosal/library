'use client'

import * as React from "react"
import { Home, Settings, User, Menu } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/new-york/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarRail,
} from "@/registry/new-york/ui/sidebar"

// Simple navigation data
const navItems = [
  {
    title: "Home",
    icon: Home,
    href: "#",
  },
  {
    title: "Profile",
    icon: User,
    href: "#",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "#",
  },
]

export function SimpleSidebarExample({
  variant = "sidebar",
  collapsible = "icon",
  className,
  ...props
}: React.ComponentProps<"div"> & {
  variant?: "sidebar" | "floating" | "inset"
  collapsible?: "offcanvas" | "icon" | "none"
}) {
  return (
    <SidebarProvider>
      <div className={cn("flex h-[600px]", className)} {...props}>
        <Sidebar variant={variant} collapsible={collapsible}>
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <Menu className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">My App</span>
                    <span className="truncate text-xs">Dashboard</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.href}>
                        <item.icon className="mr-2 size-4" />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <User className="mr-2 size-4" />
                  <span>Account</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
          
          <SidebarRail />
        </Sidebar>
        
        <div className="flex flex-1 flex-col">
          <header className="flex h-14 items-center border-b px-4">
            <SidebarTrigger />
            <h1 className="ml-4 text-lg font-semibold">Simple Sidebar Example</h1>
          </header>
          <main className="flex flex-1 items-center justify-center p-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Welcome!</h2>
              <p className="text-muted-foreground mb-4">
                This is a simple sidebar example with {variant} variant and {collapsible} collapsible behavior.
              </p>
              <div className="space-y-2">
                <p className="text-sm">✨ Click the hamburger menu to toggle</p>
                <p className="text-sm">⌨️ Press Cmd/Ctrl + B for keyboard shortcut</p>
                <p className="text-sm">📱 Responsive design for mobile</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}