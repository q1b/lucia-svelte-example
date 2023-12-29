import { lucia } from "$lib/server/auth";

export const prerender = false;

export const GET = async (event) => {
  console.log("OK")
  if (!event.locals.session) {
    return new Response(null, {
      status: 401,
      headers: {
        Location: '/'
      }
    })
  }
  console.log("OKKK")
  await lucia.invalidateSession(event.locals.session.id);
  const sessionCookie = lucia.createBlankSessionCookie();
  event.cookies.set(sessionCookie.name, sessionCookie.value, {
    path: ".",
    ...sessionCookie.attributes
  });
  return new Response(null, {
    status: 308,
    headers: {
      Location: '/'
    }
  });
}
