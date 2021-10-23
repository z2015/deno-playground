import { MongoClient } from 'https://deno.land/x/mongo@v0.28.0/mod.ts'

const user = Deno.env.MONGO_USER;
const pwd = Deno.env.MONGO_PWD;
const db = Deno.env.MONGO_DB;

const uri = `mongodb+srv://${user}:${pwd}@cluster0.sls1x.mongodb.net/${db}?retryWrites=true&w=majority`;

const client = new MongoClient()
client.connectWithUri(uri)

const db = client.database(db)

export default db