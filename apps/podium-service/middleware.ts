import { getEnv } from '@hibiscus/env';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const path = req.nextUrl;

  if (
    path.pathname.startsWith('/api/error') ||
    path.pathname.startsWith('/api/health')
  ) {
    return NextResponse.next();
  }

  const authServiceUrl = getEnv().Hibiscus.Podium.ApiUrl;
  const masterToken = getEnv().Hibiscus.Podium.ApiMasterToken;

  const headers = req.headers;
  let accessToken = headers.get('Authorization');

  if (!accessToken) {
    req.nextUrl.searchParams.set('status', '403');
    req.nextUrl.searchParams.set('message', 'No access token provided');
    req.nextUrl.pathname = '/api/error';
    return NextResponse.redirect(req.nextUrl);
  }

  if (!accessToken.startsWith('Bearer')) {
    req.nextUrl.searchParams.set('status', '401');
    req.nextUrl.searchParams.set(
      'message',
      'Invalid authentication token format.'
    );
    req.nextUrl.pathname = '/api/error';
    return NextResponse.redirect(req.nextUrl);
  }

  accessToken = accessToken.split('Bearer ')[1];

  if (accessToken === masterToken) {
    return NextResponse.next();
  }

  const res = await fetch(`${authServiceUrl}/verify-token/${accessToken}`);

  if (res.status !== 200) {
    req.nextUrl.searchParams.set('status', '401');
    req.nextUrl.searchParams.set('message', 'Invalid access token');
    req.nextUrl.pathname = '/api/error';
    return NextResponse.redirect(req.nextUrl);
  }

  const judgeRoutes = [
    { route: '/verticals', methods: ['GET'] },
    { route: '/projects', methods: ['GET'] },
    {
      route: '/ranking/[verticalId]/[userId]',
      methods: ['POST', 'GET', 'DELETE'],
    },
    {
      route: '/notes/[verticalId]/[projectId]/[userId]',
      methods: ['POST', 'GET'],
    },
    { route: '/comments/[projectId]/user/[userId]', methods: ['POST'] },
    { route: '/comments/id/[commentId]', methods: ['PUT'] },
    { route: '/comments/[projectId]', methods: ['GET'] },
    { route: '/judges/[judgeId]', methods: ['GET'] },
  ];

  const isAccessingJudgeRoute = judgeRoutes.some(({ route, methods }) => {
    const regex = new RegExp(`^/api${route.replace(/\[.*?\]/g, '[^/]+')}$`);
    return regex.test(path.pathname) && methods.includes(req.method);
  });

  try {
    const data = await res.json();
    const role = data.role;

    if (role === 'SUPERADMIN') {
      return NextResponse.next();
    } else if (isAccessingJudgeRoute && role === 'JUDGE') {
      return NextResponse.next();
    } else {
      req.nextUrl.searchParams.set('status', '403');
      req.nextUrl.searchParams.set(
        'message',
        'Access denied. User does not have permissions.'
      );
      req.nextUrl.pathname = '/api/error';
      return NextResponse.redirect(req.nextUrl);
    }
  } catch (error) {
    req.nextUrl.searchParams.set('status', '500');
    req.nextUrl.searchParams.set('message', `Internal server error: ${error}`);
    req.nextUrl.pathname = '/api/error';
    return NextResponse.redirect(req.nextUrl);
  }
}

export const config = {
  matcher: '/api/:path*',
};
