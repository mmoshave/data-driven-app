import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - /_next
     * - /static
     * - /favicon.ico
     * - /api (unless you want to protect those too)
     */
    '/((?!_next|static|favicon.ico).*)',
  ],
};
