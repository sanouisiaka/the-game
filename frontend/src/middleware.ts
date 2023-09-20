import { withAuth } from "next-auth/middleware"
import { getSession, useSession } from 'next-auth/react'

// middleware is applied to all routes, use conditionals to select

export default withAuth(function middleware () {
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        return getSession() !== null || req.nextUrl.pathname === '/';

      }
    }
  }
)