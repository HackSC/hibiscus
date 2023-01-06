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
    },
  };
};
