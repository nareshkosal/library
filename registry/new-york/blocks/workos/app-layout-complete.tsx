// This is a complete app/layout.tsx file with WorkOS integration
// It can be used to automatically replace the existing layout during installation

import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { withAuth } from "@workos-inc/authkit-nextjs"
import type { WorkOSUser } from "@/types/workos-user"
import { WorkOSSidebarLayout } from "@/components/workos-sidebar-layout"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "WorkOS App",
  description: "Application with WorkOS authentication",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let user: WorkOSUser | null = null
  try {
    const { user: authUser } = await withAuth()
    user = (authUser as WorkOSUser) || null
  } catch (_) {}
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <WorkOSSidebarLayout user={user}>
          {children}
        </WorkOSSidebarLayout>
      </body>
    </html>
  )
}