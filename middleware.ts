import { NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';
import { getToken } from 'next-auth/jwt';

/** List of pages to visit which user should be not authorized */
const authPages = [
  '/login', '/sign-up',
];

const isRouteMatches = (path: string, pages: string[]): boolean => (
  pages.some((route) => path?.includes(route)));

export default withAuth(
  async (req) => {
    const token = await getToken({ req });

    const isAuthenticated = !!token?.tokens;

    if (!isAuthenticated && req.nextUrl.pathname === '/') {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    // Auth pages:
    /** Prevent user from visiting auth pages if he is authorized */
    if (isRouteMatches(req.nextUrl.pathname, authPages)) {
      /** If the user gets here, that means he is on auth page and needs to check if is he authorized or not */
      if (isAuthenticated) {
        return NextResponse.redirect(new URL('/', req.url));
      }

      return NextResponse.next();
    }

    return undefined;
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        /** if request page is auth page, then return true, to call auth callback function */
        if (isRouteMatches(req.nextUrl.pathname, authPages)) {
          return true;
        }

        return !!token?.tokens;
      },
    },
  },
);

export const config = {
  matcher: [
    '/', '/login', '/sign-up/:path*',
  ],
};
