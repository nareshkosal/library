# WorkOS Block Installation Guide

This WorkOS block provides two approaches for integration:

## Approach 1: Server-Side (Default)
Uses `app/layout.tsx` with server-side authentication

**Pros:**
- Better performance (no client-side auth check)
- SEO-friendly
- Cleaner code

**Requirements:**
- Middleware must be properly configured
- All routes must be covered by middleware

## Approach 2: Client-Side (Fallback)
Uses `app/layout-client.tsx` with client-side authentication

**Pros:**
- No middleware configuration needed
- More flexible routing
- Easier to debug

**Cons:**
- Slight loading delay on auth check
- Client-side JavaScript required

## Fixing the Middleware Error

If you get the error: "You are calling 'withAuth' on a route that isn't covered by the AuthKit middleware"

### Option 1: Fix Middleware Configuration
Ensure your `middleware.ts` covers all necessary routes:

```typescript
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
```

### Option 2: Use Client-Side Approach
Replace your `app/layout.tsx` with the client-side version:

```bash
mv app/layout-client.tsx app/layout.tsx
```

The client-side version uses `/api/auth/status` endpoint instead of `withAuth()` and doesn't require middleware configuration.