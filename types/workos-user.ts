export interface WorkOSUser {
  object: string
  id: string
  email: string
  emailVerified: boolean
  firstName: string | null
  profilePictureUrl: string | null
  lastName: string | null
  lastSignInAt: string | null
  locale: string | null
  createdAt: string | null
  updatedAt: string | null
  externalId: string | null
  metadata: Record<string, any>
}