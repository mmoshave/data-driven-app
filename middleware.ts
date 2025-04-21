import { clerkMiddleware } from '@clerk/nextjs/server'

export default clerkMiddleware({
  publicRoutes: ['/', '/products', '/api/products'],
})

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
}
