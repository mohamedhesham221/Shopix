import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher([
  '/cart(.*)',
  '/wishlist(.*)',
  '/profile(.*)',
])

export default clerkMiddleware(async (auth, req) => {
  console.log('Middleware running for:', req.url);
  if (isProtectedRoute(req)) await auth.protect()
});

export const config = {
  matcher: [
    '/((?!_next|.*\\..*).*)',
    '/(api|trpc)(.*)',],
};