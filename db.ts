import { MongoClient } from 'https://deno.land/x/mongo@v0.28.0/mod.ts'

const user = Deno.env.get('MONGO_USER');
const pwd = Deno.env.get('MONGO_PWD');
const db = Deno.env.get('MONGO_DB');

const uri = `mongodb+srv://${user}:${pwd}@cluster0.sls1x.mongodb.net/${db}?authMechanism=SCRAM-SHA-1&retryWrites=true&w=majority`;
console.log(uri);

const client = new MongoClient()
await client.connect(uri)

const database = client.database(db)

export default database