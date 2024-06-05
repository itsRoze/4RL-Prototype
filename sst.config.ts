/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "4rl-beta",
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
    const supabaseUrl = new sst.Secret("SupabaseUrl");
    const supabaseAnonKey = new sst.Secret("SupabaseAnonKey");
    const databaseUrl = new sst.Secret("DatabaseUrl");

    new sst.aws.Remix("RemixApp", {
      path: "./apps/web",
      link: [supabaseUrl, supabaseAnonKey, databaseUrl],
      domain:
        $app.stage === "production"
          ? {
              name: "theta.4rlapp.com",
              dns: sst.vercel.dns({
                domain: "4rlapp.com",
              }),
            }
          : undefined,
    });
  },
});
