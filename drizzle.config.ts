import { defineConfig } from 'drizzle-kit'
import * as dotenv from "dotenv";
dotenv.config();

export default defineConfig({
  schema: "./src/lib/shared/db/schema/index.ts",
  out: "./drizzle",
  driver: 'turso',
  dbCredentials: {
    url: process.env.PUBLIC_DATABASE_URL!,
    authToken: process.env.PUBLIC_DATABASE_AUTH_TOKEN!
  },
  // Print all statements
  verbose: true,
  // Always ask for my confirmation
  strict: true,
})
