// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const url = request.nextUrl;

  // Example: redirect if user is not logged in
  const isLoggedIn = true;

  if (!isLoggedIn && url.pathname.startsWith('/my-account')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isLoggedIn && url.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (isLoggedIn && url.pathname.startsWith('/register')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Continue request
  return NextResponse.next();
}
