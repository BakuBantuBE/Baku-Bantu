// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the token from localStorage on the client side
  // This is handled in the client components since middleware can't access localStorage
  
  // For Next.js middleware, we can use cookies instead
  const token = request.cookies.get('auth_token')?.value;
  
  // Check if the user is trying to access protected routes
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    // If no token is found, redirect to login
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  // Redirect logged-in users trying to access login/register pages
  if ((request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register') && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  return NextResponse.next();
}

// Only run middleware on specific paths
export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register'],
};