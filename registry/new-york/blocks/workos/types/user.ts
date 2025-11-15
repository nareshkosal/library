// WorkOS User type definition
export interface WorkOSUser {
  object: string
  id: string
  email: string
  emailVerified: boolean
  firstName: string | null
  profilePictureUrl: string | null
  lastName: string | null
  lastSignInAt: string | null // ISO timestamp
  locale: string | null
  createdAt: string | null // ISO timestamp
  updatedAt: string | null // ISO timestamp
  externalId: string | null
  metadata: Record<string, any>
}