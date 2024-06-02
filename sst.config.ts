/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "4rl-prototype",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
      providers: {
        aws: {
          profile: input?.stage === "production" ? "4rl-production" : "4rl-dev",
          region: "us-east-1",
        },
      },
    };
  },
  async run() {
    const secretPublicDomain = new sst.Secret("PublicDomain");
    const secretSupabaseUrl = new sst.Secret("SupabaseUrl");
    const secretSupabaseAnonKey = new sst.Secret("SupabaseAnonKey");
    const secretDatabaseUrl = new sst.Secret("DatabaseUrl");

    new sst.aws.Nextjs("NextApp", {
      link: [
        secretPublicDomain,
        secretSupabaseUrl,
        secretSupabaseAnonKey,
        secretDatabaseUrl,
      ],
      environment: {
        NEXT_PUBLIC_SUPABASE_URL: secretSupabaseUrl.value,
        NEXT_PUBLIC_SUPABASE_ANON_KEY: secretSupabaseAnonKey.value,
      },
      domain:
        $app.stage === "production"
          ? {
              name: "beta.4rlapp.com",
              dns: sst.vercel.dns({
                domain: "4rlapp.com",
              }),
            }
          : undefined,
    });
  },
});
