// @ts-nocheck
import { authkitMiddleware } from '@workos-inc/authkit-nextjs'

// Full middleware solution; protects routes and manages the session.
export default authkitMiddleware()

// Configure which routes should be matched by middleware-based auth.
// This covers all routes except API routes and static files
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}