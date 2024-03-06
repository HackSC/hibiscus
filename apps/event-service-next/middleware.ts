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
  const authServiceUrl = getEnv().Hibiscus.EventService.authServiceUrl;
  const masterToken = getEnv().Hibiscus.EventService.masterToken;

  const headers = request.headers;
  let accessToken = headers.get('Authorization');

  if (!accessToken) {
    // Works
    console.log('no access token');
    request.nextUrl.searchParams.set('status', '403');
    request.nextUrl.searchParams.set('message', 'No access token provided');
    request.nextUrl.pathname = '/api/error';
    return NextResponse.redirect(request.nextUrl);
  }

  if (!accessToken.startsWith('Bearer ')) {
    // Works
    console.log('invalid token format');
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
    // Works
    console.log('master token');
    return NextResponse.next();
  }
  const apiUrl = `${authServiceUrl}/verify-token/${accessToken}`;
  const response = await fetch(apiUrl);

  if (response.status !== 200) {
    console.log('invalid token');
    request.nextUrl.searchParams.set('status', '401');
    request.nextUrl.searchParams.set('message', 'Invalid access token');
    request.nextUrl.pathname = '/api/error';
    return NextResponse.redirect(request.nextUrl);
  }

  try {
    const data = await response.json();
    console.log('data', data);
    const role = data.role;
    const method = request.method;
    if (role === 'SUPERADMIN') {
      console.log('superadmin');
      return NextResponse.next();
    }
    console.log('path', path.pathname);
    if (
      // Test /api/event-id
      (path.pathname === '/api/events' && method === 'GET') ||
      (path.pathname.startsWith('/api/events/') &&
        path.pathname.split('/').length === 3 &&
        method === 'GET')
    ) {
      console.log('bypass');
      return NextResponse.next(); // Bypass the middleware for these routes
    } else if (path.pathname.startsWith('/api/pinned-events')) {
      console.log('HEREREREREE');
      const userId = path.pathname.split('/')[3];
      console.log('userId', userId);
      console.log('data.userId', data.userId);
      if (userId === data.user_id) {
        // Works
        console.log('match');
        return NextResponse.next();
      } else {
        // Works
        request.nextUrl.searchParams.set('status', '403');
        request.nextUrl.searchParams.set(
          'message',
          'Access denied. User ID from call does not match stored user ID'
        );
        request.nextUrl.pathname = '/api/error';
        return NextResponse.redirect(request.nextUrl);
      }
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
