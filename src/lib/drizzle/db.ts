import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { Resource } from "sst";

const connectionString = Resource.DatabaseUrl.value;
if (!connectionString) {
  throw new Error("Please provide a DATABASE_URL environment variable");
}

const client = postgres(connectionString);
export const db = drizzle(client);
