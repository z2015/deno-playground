import { listenAndServe } from "https://deno.land/std@0.111.0/http/server.ts";

function handler(req) {
  const { pathname } = new URL(request.url);

  if (pathname.startsWith("/public")) {
    const file = await Deno.readFile('.' + pathname);
    return new Response(file, {
      headers: {
        "content-type": "text/text",
      },
    });
  }

  return new Response("Hello zjh  world");
}

console.log("Listening on http://localhost:8000");
await listenAndServe(":8000", handler);
