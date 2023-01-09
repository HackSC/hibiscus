export const getEnv = () => {
  return {
    Hibiscus: {
      Supabase: {
        apiUrl: process.env.HIBISCUS_SUPABASE_API_URL,
        anonKey: process.env.HIBISCUS_SUPABASE_ANON_KEY,
      },
      AWS: {
        accessKeyID: process.env.HIBISCUS_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.HIBISCUS_AWS_SECRET_ACCESS_KEY,
        region: process.env.HIBISCUS_AWS_REGION,
      },
      Cookies: {
        accessTokenName: process.env.NEXT_PUBLIC_HIBISCUS_ACCESS_COOKIE_NAME,
        refreshTokenName: process.env.NEXT_PUBLIC_HIBISCUS_REFRESH_COOKIE_NAME,
      },
      AppURL: {
        sso: process.env.NEXT_PUBLIC_SSO_URL,
        ssoMockApp: process.env.NEXT_PUBLIC_SSO_MOCK_APP_URL,
        portal: process.env.NEXT_PUBLIC_PORTAL_URL,
        defaultRedirect: process.env.NEXT_PUBLIC_SSO_DEFAULT_REDIRECT_URL,
      },
    },
  };
};
