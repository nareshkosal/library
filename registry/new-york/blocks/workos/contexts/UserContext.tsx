import React, { createContext, useContext, ReactNode } from "react"
import type { WorkOSUser } from "../types/user"

interface UserContextType {
  user: WorkOSUser | null
}

const UserContext = createContext<UserContextType | undefined>(undefined)

interface UserProviderProps {
  children: ReactNode
  user: WorkOSUser | null
}

export function UserProvider({ children, user }: UserProviderProps) {
  return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}