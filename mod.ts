import { Application, Context, Router } from 'https://deno.land/x/oak/mod.ts'

const app = new Application()
const port = 8000
const router = new Router()

router.get('/', (context: Context) => {
  context.response.body = 'Hello Deno!'
})

app.use(router.routes())
app.use(router.allowedMethods())

await app.listen({ port })