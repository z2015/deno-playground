import { listenAndServe } from "https://deno.land/std@0.111.0/http/server.ts";

function handler(req) {
  return new Response("Hello world");
}

console.log("Listening on http://localhost:8000");
await listenAndServe(":8000", handler);
