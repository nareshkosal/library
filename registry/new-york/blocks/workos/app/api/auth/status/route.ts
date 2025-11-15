import { NextResponse } from 'next/server'
import { withAuth } from '@workos-inc/authkit-nextjs'

export async function GET() {
  try {
    const { user } = await withAuth()
    
    return NextResponse.json({ 
      user,
      authenticated: !!user 
    })
  } catch (error) {
    // User is not authenticated
    return NextResponse.json({ 
      user: null,
      authenticated: false 
    }, { status: 401 })
  }
}