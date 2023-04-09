import { withAuth } from "next-auth/middleware"

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    console.log('middleware req', req)
    console.log('middleware', req.nextauth.token)
  },
  {
    callbacks: {
      authorized: ({ token }) => token !== null,
    },
  }
)

export const config = { matcher: [
  "/dashboard",
  "/dashboard/(.*)"
] }