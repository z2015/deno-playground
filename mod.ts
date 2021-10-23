import { listenAndServe } from "https://deno.land/std@0.111.0/http/server.ts";
import {getStocks} from './controllers/stocks.ts';

async function handleRequest(request: Request): Promise<Response> {
  const { pathname } = new URL(request.url);
  console.log(pathname);

  // This is how the server works:
  // 1. A request comes in for a specific asset.
  // 2. We read the asset from the file system.
  // 3. We send the asset back to the client.

  // Check if the request is for style.css.
  if (pathname.startsWith("/style.css")) {
    // Read the style.css file from the file system.
    const file = await Deno.readFile("./style.css");
    // Respond to the request with the style.css file.
    return new Response(file, {
      headers: {
        "content-type": "text/css",
      },
    });
  }

  if (pathname === '/code.json') {
    const data = await getStocks();
    return new Response(
      JSON.stringify(data),
      {
        status: 200,
        headers: {'content-type': 'application/json'}
      }
    )
  }

  if (pathname === '/heartbeat') {
    return new Response(
      Date.now()+'',
      {
        status: 200,
        headers: {'content-type': 'application/json'}
      }
    )
  }
  
}

await listenAndServe(":8080", handleRequest);
