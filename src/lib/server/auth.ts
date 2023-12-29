// src/lib/server/auth.ts
import { Lucia } from "lucia";
import { dev } from "$app/environment";
import { Google } from "arctic";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI } from "$env/static/private"
import { LibSQLAdapter } from "@lucia-auth/adapter-sqlite";
import { client } from "$lib/server/db";

const adapter = new LibSQLAdapter(client, {
  user: 'user',
  session: 'user_session'
});

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: !dev
    }
  },
  getUserAttributes: (attributes) => {
    return {
      // attributes has the type of DatabaseUserAttributes
      gmail: attributes.gmail,
      fullName: attributes.full_name
    };
  }
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
  }
  interface DatabaseUserAttributes {
    gmail: string;
    full_name: string;
  }
}

export const google = new Google(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, dev ? 'http://localhost:3000/google/callback' : GOOGLE_REDIRECT_URI);
