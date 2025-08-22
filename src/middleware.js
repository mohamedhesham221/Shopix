// File: middleware.js
// Purpose: Protects specific routes (checkout, wishlist, profile) using Clerk authentication
// Notes: Runs before requests to verify user access to protected routes

import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
// Define which routes require authentication
const isProtectedRoute = createRouteMatcher([
  '/checkout(.*)',
  '/wishlist(.*)',
  '/profile(.*)',
])

// Middleware: Protects user from accessing protected routes without authentication
export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) await auth.protect()
});

// Configuration: Ensures middleware runs on all routes except Next.js internals and static files
export const config = {
  matcher: [
    '/((?!_next|.*\\..*).*)',
    '/(api|trpc)(.*)',],
};