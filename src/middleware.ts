// middleware.ts
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const publicPages = ['/', '/login', '/register'];
const protectedPages = ['/workspace'];

export function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;
  const token = req.cookies.get('token')?.value;

  // 1) 인증된 사용자가 publicPages 접근 시
  if (token && publicPages.includes(pathname)) {
    // return NextResponse.redirect(new URL('/workspace', origin));
  }

  // 2) 비인증 사용자가 protectedPages 접근 시
  const isProtected = protectedPages.some(
    (p) => pathname === p || pathname.startsWith(p + '/'),
  );
  if (!token && isProtected) {
    return NextResponse.redirect(new URL('/', origin));
  }

  // 3) 그 외는 통과
  return NextResponse.next();
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
