import { getEnv } from '@hibiscus/env';
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  console.log(`Middeware ${req.method}`);
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return NextResponse.json(null, { status: 200 });
  }

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

  const supabase = createClient(
    getEnv().Hibiscus.Supabase.apiUrl,
    getEnv().Hibiscus.Supabase.serviceKey
  );
  const user = await supabase.auth.getUser(accessToken);
  if (user.error != null) {
    req.nextUrl.searchParams.set('status', '401');
    req.nextUrl.searchParams.set('message', 'Invalid access token');
    req.nextUrl.pathname = '/api/error';
    return NextResponse.redirect(req.nextUrl);
  }
  const userId = user.data.user?.id;
  if (!userId) {
    req.nextUrl.searchParams.set('status', '401');
    req.nextUrl.searchParams.set('message', 'Invalid access token');
    req.nextUrl.pathname = '/api/error';
    return NextResponse.redirect(req.nextUrl);
  }
  const { data: userData, error: userError } = await supabase
    .from('user_profiles')
    .select('*, role (name)')
    .eq('user_id', userId);
  if (userError || userData?.length === 0) {
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
    { route: '/projects/[verticalId]', methods: ['GET'] },
  ];

  const isAccessingJudgeRoute = judgeRoutes.some(({ route, methods }) => {
    const regex = new RegExp(`^/api${route.replace(/\[.*?\]/g, '[^/]+')}$`);
    return regex.test(path.pathname) && methods.includes(req.method);
  });

  try {
    const role = userData[0].role.name;

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
