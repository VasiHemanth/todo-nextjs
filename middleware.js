import { withAuth } from "next-auth/middleware";
import { NextResponse } from 'next/server'
 

export default withAuth(
  function middleware(req) {
    // return NextResponse
    return NextResponse.rewrite(new URL("/todo-data", req.url));
  },
  {
    callbacks: {
      authorized({ token }) {
        console.log('middleware running')
        return token?.superuser === true;
      },
    },
  }, 
  {
    pages: {
      signIn: '/auth/signin',
      error: '/error',
    }
  }
);


// export function middleware(request) {
//   const currentUser = request.cookies.has('username')
//   const path = request.nextUrl.pathname;

//   console.log("path", path)

//   console.log('current user from middleware', currentUser)
 
//   if (currentUser) {
//     return NextResponse.redirect(new URL('/todo-data', request.url))
//   }
//   return NextResponse.redirect(new URL('/auth/signin', request.url))
// }

// export function middleware() {}
 
export const config = {
  matcher: ['/todo-data'],
}