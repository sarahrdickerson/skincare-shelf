import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value;

  // Check if the token exists
  if (!token) {
    // If no token is found, redirect to the login page
    console.log('No token found, redirecting to login page');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Allow the request to proceed
  return NextResponse.next();
}

// Apply the middleware to specific routes
export const config = {
  matcher: ['/dashboard/:path*', '/protected/:path*'],
};