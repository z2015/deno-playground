import db from "../db.ts";

const collectionName = Deno.env.get("MONGO_COLLECTION");
interface Stock {
  code: string;
}
const stocks = db.collection(collectionName);

export const getStocks = async () => {
  const data: Stock[] = await stocks
    .find({ new: 1 }, { noCursorTimeout: false })
    .toArray();
  return data;
};
