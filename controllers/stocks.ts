import db from '../db.ts'
import { Context } from 'https://deno.land/x/oak/mod.ts'

const collectionName = Deno.env.get('MONGO_COLLECTION');
interface Stock {
  code: string
}
const stocks = db.collection(collectionName);
console.log(collectionName);

export const getStocks = async ({ response }: Context) => {
  const data: Stock[] = await stocks.find({new: 1}).toArray();
  console.log(data);
  if (data) {
    response.body = data,
    response.status = 200
  } else {
    response.body = 'not found',
    response.status = 204
  }
}