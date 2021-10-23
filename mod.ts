import { listenAndServe } from "https://deno.land/std@0.111.0/http/server.ts";
import { getStocks } from "./controllers/stocks.ts";

const root = "./public/";
const authToken = Deno.env.get("AUTH_TOKEN");

async function handleRequest(request: Request): Promise<Response> {
  const { pathname } = new URL(request.url);
  console.log(pathname);

  const hasAuth = function() {
    const token = request.headers.get("token");
    return token === authToken;
  };

  if (pathname === "/auth") {
    let status = 401;
    if (hasAuth()) {
      status = 200;
    }
    return new Response(JSON.stringify({status}), {
      status,
      headers: { "content-type": "application/json" }
    });
  }

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
  try {
    const fileBlob = await Deno.readFile(file);
    return new Response(fileBlob, {
      headers: {
        "Cache-Control": "max-age=" + 24 * 365 * 3600
      }
    });
  } catch (error) {
    return new Response("404 error", {
      status: 404
    });
  }
}

await listenAndServe(":8080", handleRequest);
