import { Application, Router } from 'https://deno.land/x/oak/mod.ts'

import {
  getStocks,
} from './controllers/stocks.ts'

const app = new Application()
const port = 8000
const router = new Router()

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
});

router
  .get('/code.json', getStocks)

app.use(router.routes())
app.use(router.allowedMethods())

await app.listen({ port })