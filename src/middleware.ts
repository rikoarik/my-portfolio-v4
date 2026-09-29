import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isAdminRoute = pathname.startsWith('/admin');
  const isLoginPage = pathname === '/admin/login';

  const adminSession = request.cookies.get('ark_admin_session')?.value;
  const isAuthenticated = adminSession === 'authorized_ark_admin';

  if (isAdminRoute && !isLoginPage && !isAuthenticated) {
    const url = request.nextUrl.clone();
    url.pathname = '/admin/login';
    return NextResponse.redirect(url);
  }

  if (isLoginPage && isAuthenticated) {
    const url = request.nextUrl.clone();
    url.pathname = '/admin';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|images|resume|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif)$).*)',
  ],
};
