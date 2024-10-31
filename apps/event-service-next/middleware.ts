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
  const authServiceUrl = getEnv().Hibiscus.AuthService.ApiUrl;
  const masterToken = getEnv().Hibiscus.Events.MasterToken;

  const headers = request.headers;
  let accessToken = headers.get('Authorization');

  if (!accessToken) {
    request.nextUrl.searchParams.set('status', '403');
    request.nextUrl.searchParams.set('message', 'No access token provided');
    request.nextUrl.pathname = '/api/error';
    return NextResponse.redirect(request.nextUrl);
  }

  if (!accessToken.startsWith('Bearer ')) {
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
  const apiUrl = `${authServiceUrl}/verify-token/${accessToken}`;
  const response = await fetch(apiUrl);

  if (response.status !== 200) {
    request.nextUrl.searchParams.set('status', '401');
    request.nextUrl.searchParams.set('message', 'Invalid access token');
    request.nextUrl.pathname = '/api/error';
    return NextResponse.redirect(request.nextUrl);
  }

  try {
    const data = await response.json();
    const role = data.role;
    const method = request.method;
    if (role === 'SUPERADMIN') {
      return NextResponse.next();
    }
    if (
      (path.pathname === '/api/events' && method === 'GET') ||
      // has {user_id} in path
      (path.pathname.startsWith('/api/events/') &&
        path.pathname.split('/').length === 4 &&
        method === 'GET')
    ) {
      return NextResponse.next(); // Bypass the middleware for these routes
    } else if (path.pathname.startsWith('/api/pinned-events')) {
      const userId = path.pathname.split('/')[3];

      if (userId === data.user_id) {
        return NextResponse.next();
      } else {
        request.nextUrl.searchParams.set('status', '403');
        request.nextUrl.searchParams.set(
          'message',
          'Access denied. User ID from call does not match stored user ID'
        );
        request.nextUrl.pathname = '/api/error';
        return NextResponse.redirect(request.nextUrl);
      }
    } else {
      // Non-admin attempt to access admin-only endpoints
      request.nextUrl.searchParams.set('status', '401');
      request.nextUrl.searchParams.set(
        'message',
        'Access denied. User is unauthorized to access this endpoint'
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
