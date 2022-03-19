import { listenAndServe } from "https://deno.land/std@0.111.0/http/server.ts";
import { cron } from "https://deno.land/x/deno_cron/cron.ts";
import { getStockPriceData } from "./api/eastmoney.ts";
import { extractStock, filterUp, mapStockName } from "./api/filterStock.ts";
import { sendMsgApi } from "./api/weWork.ts";
import { getStocks } from "./controllers/stocks.ts";

const root = "./public/";
const authToken = Deno.env.get("AUTH_TOKEN");

// setInterval(async () => {
//   try {
//     const stocksData = await getStocks();
//     const data = await getStockPriceData(stocksData.map((d) => d.code));
//     console.log(data);
//     const priceData = extractStock(data);
//     console.log(priceData);
//     const upStock = filterUp(priceData);
//     console.log(upStock);
//     const upStockName = mapStockName(upStock);
//     console.log(upStockName);
//     sendMsgApi(upStockName);
//   } catch (error) {
//     console.error(error);
//   }
// }, 30e3);

async function handleRequest(request: Request): Promise<Response> {
  const { pathname, searchParams } = new URL(request.url);
  console.log(pathname);

  const hasAuth = function () {
    const token = searchParams.get("token");
    console.log(token);
    return token === authToken;
  };

  if (pathname === "/msg") {
    const data = await sendMsgApi(new Date());
    console.log(data);
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  if (pathname === "/auth") {
    let status = 401;
    if (hasAuth()) {
      status = 200;
    }
    console.log(hasAuth(), status);
    return new Response(JSON.stringify({ status }), {
      status,
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  if (pathname === "/code.json") {
    const data = await getStocks();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  if (pathname === "/heartbeat") {
    return new Response(Date.now() + "", {
      status: 200,
      headers: { "content-type": "text/plain" },
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
        "Cache-Control": "max-age=" + 24 * 365 * 3600,
      },
    });
  } catch (error) {
    return new Response("404 error", {
      status: 404,
    });
  }
}

await listenAndServe(":8080", handleRequest);
