import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export const middleware = async (req: NextRequest) => {
  const token = await getToken({ req });

  if (!token) {
    if (req.nextUrl.pathname.startsWith('/api')) {
      // 토큰이 없는 api 요청은 401 응답
      return new NextResponse('Authentication Error', { status: 401 });
    }

    const { pathname, search, origin, basePath } = req.nextUrl;
    const signInUrl = new URL(`${basePath}/auth/signin`, origin);
    signInUrl.searchParams.append(
      'callbackUrl',
      `${basePath}${pathname}${search}`
    );
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    '/',
    '/new',
    '/api/bookmarks',
    '/api/comments',
    '/api/likes',
    '/api/follow',
    '/api/me',
    '/api/posts/:path*',
  ],
};
