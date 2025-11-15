'use client'

import * as React from "react"
import { Home, Settings, User, Menu, LogOut } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/new-york/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/registry/new-york/ui/dropdown-menu"
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

// Navigation data
const navItems = [
  {
    title: "Dashboard",
    icon: Home,
    href: "/",
  },
  {
    title: "Profile",
    icon: User,
    href: "/profile",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/settings",
  },
]

interface WorkOSSidebarProps {
  className?: string
  children: React.ReactNode
  user?: {
    email: string
    name?: string
    avatarUrl?: string
  } | null
  onSignOut?: () => Promise<void>
}

export function WorkOSSidebar({
  className,
  children,
  user,
  onSignOut,
  ...props
}: WorkOSSidebarProps) {
  return (
    <SidebarProvider>
      <div className={cn("flex h-screen w-full", className)} {...props}>
        <Sidebar>
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-black text-white">
                    <Menu className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">WorkOS App</span>
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
              {user ? (
                <>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <div className="flex aspect-square size-8 items-center justify-center rounded-full bg-gray-200">
                        <User className="size-4" />
                      </div>
                      <span>{user.name || user.email}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  {onSignOut && (
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <button 
                          onClick={onSignOut}
                          className="flex w-full items-center text-left"
                        >
                          <LogOut className="mr-2 size-4" />
                          <span>Logout</span>
                        </button>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}
                </>
              ) : (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="/login">
                      <User className="mr-2 size-4" />
                      <span>Sign In</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarFooter>
          
          <SidebarRail />
        </Sidebar>
        
        <div className="flex flex-1 flex-col">
          <header className="flex h-14 items-center justify-between border-b bg-background px-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <h1 className="ml-4 text-lg font-semibold">WorkOS Dashboard</h1>
            </div>
            
            <div className="flex items-center gap-2">
              {user && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      {user.name || user.email}
                      <span className="ml-1">▼</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <a href="/profile">Profile</a>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <a href="/settings">Settings</a>
                    </DropdownMenuItem>
                    {onSignOut && (
                      <DropdownMenuItem>
                        <button 
                          onClick={onSignOut}
                          className="w-full text-left"
                        >
                          Logout
                        </button>
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-0 lg:gap-0">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}