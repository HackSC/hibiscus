import { getEnv } from '@hibiscus/env';
import {
  createClient,
  SupabaseClient,
  UserResponse,
} from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const path = req.nextUrl;

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    const res = NextResponse.next();

    // add the CORS headers to the response
    res.headers.append('Access-Control-Allow-Credentials', 'true');
    res.headers.append('Access-Control-Allow-Origin', '*'); // Allow all origins
    res.headers.append(
      'Access-Control-Allow-Methods',
      'GET,DELETE,PATCH,POST,PUT'
    );
    res.headers.append(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Authorization, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    return res;
  }

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

  const res = await verifyToken(accessToken);

  if (res.error != null) {
    req.nextUrl.searchParams.set('status', '401');
    req.nextUrl.searchParams.set('message', 'Invalid access token');
    req.nextUrl.pathname = '/api/error';
    return NextResponse.redirect(req.nextUrl);
  }

  const judgeRoutes = [
    { route: '/verticals', methods: ['GET'] },
    { route: '/projects', methods: ['GET'] },
    { route: '/projects/[verticalId]', methods: ['GET'] },
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
    const supabase = createSupabaseServiceClient();
    const roleRes = await supabase
      .from('user_profiles')
      .select('role')
      .eq('user_id', res.data.user.id)
      .maybeSingle();
    const role = roleRes.data.role;

    if (role === 1) {
      return NextResponse.next();
    } else if (isAccessingJudgeRoute && role === 7) {
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

async function verifyToken(access_token: string): Promise<UserResponse> {
  const supabase = createSupabaseServiceClient();

  // Verify access token
  const userRes = await supabase.auth.getUser(access_token);

  return userRes;
}

function createSupabaseServiceClient(): SupabaseClient {
  return createClient(
    getEnv().Hibiscus.Supabase.apiUrl,
    getEnv().Hibiscus.Supabase.serviceKey
  );
}
