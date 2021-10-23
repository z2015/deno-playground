import { listenAndServe } from "https://deno.land/std@0.111.0/http/server.ts";
import { getStocks } from "./controllers/stocks.ts";

const root = "./public/";

async function handleRequest(request: Request): Promise<Response> {
  const { pathname } = new URL(request.url);
  console.log(pathname);

  if (pathname === "/code.json") {
    const data = await getStocks();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "content-type": "application/json" }
    });
  }

  if (pathname === "/heartbeat") {
    return new Response(Date.now() + "", {
      status: 200,
      headers: { "content-type": "text/plain" }
    });
  }

  let file = root + pathname;
  if (pathname === "/") {
    file = root + "index.html";
  }
  const fileBlob = await Deno.readFile(file, {
    headers: {
      "Cache-Control": "max-age=" + 24 * 365 * 3600
    }
  });
  return new Response(fileBlob);
}

await listenAndServe(":8080", handleRequest);
