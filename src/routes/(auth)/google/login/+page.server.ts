// routes/+page.server.ts
import { google } from "$lib/server/auth";
import { redirect } from "@sveltejs/kit";

import type { Actions } from "./$types";
import { generateCodeVerifier, generateState } from "arctic";
import { GOOGLE_SCOPE } from "$env/static/private";

export const actions: Actions = {
  default: async (event) => {
    const state = generateState();
    const codeVerifier = generateCodeVerifier()
    const url = await google.createAuthorizationURL(state, codeVerifier, { scopes: ['openid', 'email', 'profile', GOOGLE_SCOPE] },);
    url.searchParams.set('access_type', 'offline')
    event.cookies.set("google_oauth_state", state, {
      path: "/",
      secure: import.meta.env.PROD,
      httpOnly: true,
      maxAge: 60 * 10,
      sameSite: "lax"
    });

    event.cookies.set("code-verifier", codeVerifier, {
      path: "/",
      secure: import.meta.env.PROD,
      httpOnly: true,
      maxAge: 60 * 10,
      sameSite: "lax"
    });
    return redirect(302, url.toString());
  }
};
