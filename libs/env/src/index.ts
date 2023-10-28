export const getEnv = () => {
  return {
    Hibiscus: {
      Battlepass: {
        ApiUrl: process.env.NEXT_PUBLIC_HIBISCUS_BATTLEPASS_API_URL,
      },
      Supabase: {
        apiUrl: process.env.NEXT_PUBLIC_HIBISCUS_SUPABASE_API_URL,
        anonKey: process.env.NEXT_PUBLIC_HIBISCUS_SUPABASE_ANON_KEY,
        serviceKey: process.env.HIBISCUS_SUPABASE_SERVICE_KEY,
      },
      AWS: {
        accessKeyID: process.env.HIBISCUS_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.HIBISCUS_AWS_SECRET_ACCESS_KEY,
        region: process.env.HIBISCUS_AWS_REGION,
      },
      Cookies: {
        accessTokenName: process.env.NEXT_PUBLIC_HIBISCUS_ACCESS_COOKIE_NAME,
        refreshTokenName: process.env.NEXT_PUBLIC_HIBISCUS_REFRESH_COOKIE_NAME,
        maxAge: process.env.NEXT_PUBLIC_HIBISCUS_COOKIE_MAX_AGE,
        disableSSO:
          process.env.NEXT_PUBLIC_DISABLE_SSO?.toLowerCase() === 'true',
      },
      AppURL: {
        baseDomain: process.env.NEXT_PUBLIC_HIBISCUS_DOMAIN,
        sso: process.env.NEXT_PUBLIC_SSO_URL,
        ssoMockApp: process.env.NEXT_PUBLIC_SSO_MOCK_APP_URL,
        portal: process.env.NEXT_PUBLIC_PORTAL_URL,
        defaultRedirect: process.env.NEXT_PUBLIC_SSO_DEFAULT_REDIRECT_URL,
      },
      Hackform: {
        HackerAppResponsesTable:
          process.env.HIBISCUS_HACKER_APP_RESPONSES_TABLENAME,
        TallyApps2023XUrl: process.env.NEXT_PUBLIC_TALLY_APPS_2023_X,
      },
      RSVPForm: {
        ResumeStorageBucketName: 'rsvp-resume-hacker-2023',
      },
      FeatureFlag: {
        RedisURL: process.env.HIBISCUS_FEATURE_FLAG_REDIS_URL,
        MongoURI: process.env.HIBISCUS_FEATURE_FLAG_MONGO_URI,
      },
      Discord: {
        ApiUrl: process.env.NEXT_PUBLIC_DISCORD_API_URL,
        InviteUrl: process.env.NEXT_PUBLIC_DISCORD_INVITE_URL,
      },
    },
  };
};
