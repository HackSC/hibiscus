import { getEnv } from '@hibiscus/env';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl;

  if (
    path.pathname.startsWith('/api/error') ||
    path.pathname.startsWith('/api/health')
  ) {
    return NextResponse.next();
  }

  const authServiceUrl = getEnv().Hibiscus.Podium.ApiUrl;
  const masterToken = getEnv().Hibiscus.Podium.ApiMasterToken;

  const headers = request.headers;
  let accessToken = headers.get('Authorization');

  if (!accessToken) {
    request.nextUrl.searchParams.set('status', '403');
    request.nextUrl.searchParams.set('message', 'No access token provided');
    request.nextUrl.pathname = '/api/error';
    return NextResponse.redirect(request.nextUrl);
  }

  if (!accessToken.startsWith('Bearer')) {
    request.nextUrl.searchParams.set('status', '401');
    request.nextUrl.searchParams.set(
      'message',
      'Invalid authentication token format.'
    );
    request.nextUrl.pathname = '/api/error';
    return NextResponse.redirect(request.nextUrl);
  }

  accessToken = accessToken.split('Bearer ')[1];

  if (accessToken === masterToken) {
    return NextResponse.next();
  }
  const response = await fetch(`${authServiceUrl}/verify-token/${accessToken}`);

  if (response.status !== 200) {
    request.nextUrl.searchParams.set('status', '401');
    request.nextUrl.searchParams.set('message', 'Invalid access token');
    request.nextUrl.pathname = '/api/error';
    return NextResponse.redirect(request.nextUrl);
  }

  const judgeRoutes = ['/verticals', '/projects', '/ranking', '/notes', '/comments', '/judges'];
  const isAccessingJudgeRoute = judgeRoutes.some((route) => path.pathname.startsWith('/api' + route));

  try {
    const data = await response.json();
    const role = data.role;
    const method = request.method;

    if (role === 'SUPERADMIN') {
      return NextResponse.next();
    } else if (isAccessingJudgeRoute && role === 'JUDGE') { // TODO: Specify endpoints
      return NextResponse.next();
    } else {
      request.nextUrl.searchParams.set('status', '403');
      request.nextUrl.searchParams.set(
        'message',
        'Access denied. User does not have permissions.'
      );
      request.nextUrl.pathname = '/api/error';
      return NextResponse.redirect(request.nextUrl);
    }
  } catch (error) {
    request.nextUrl.searchParams.set('status', '500');
    request.nextUrl.searchParams.set(
      'message',
      `Internal server error: ${error}`
    );
    request.nextUrl.pathname = '/api/error';
    return NextResponse.redirect(request.nextUrl);
  }
}

export const config = {
  matcher: '/api/:path*',
};
