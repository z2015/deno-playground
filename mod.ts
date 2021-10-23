import { Application, Router } from 'https://deno.land/x/oak/mod.ts'

import {
  getStocks,
} from './controllers/stocks.ts'

const app = new Application()
const port = 8000
const router = new Router()

router
  .get('/code.json', getStocks)

app.use(router.routes())
app.use(router.allowedMethods())

await app.listen({ port })