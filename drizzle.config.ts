import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/lib/drizzle/schema.ts",
  driver: "pg",
  dbCredentials: {
    connectionString: "postgresql://postgres:postgres@127.0.0.1:54322/postgres",
  },
  verbose: true,
  strict: true,
});
