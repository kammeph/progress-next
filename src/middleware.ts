import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const userId = request.cookies.get('userId')?.value;
  if (!userId) return NextResponse.redirect(new URL('login', request.url));
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|login|signup|favicon.ico).*)']
};
