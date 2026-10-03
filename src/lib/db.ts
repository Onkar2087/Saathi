import { MongoClient, type Db } from "mongodb";

const globalForMongo = globalThis as unknown as { _saathiMongo?: Promise<MongoClient> };

/** Returns the Atlas database, or null when MONGODB_URI isn't set (the app still works without it). */
export async function getDb(): Promise<Db | null> {
  const uri = process.env.MONGODB_URI;
  if (!uri) return null;
  globalForMongo._saathiMongo ??= new MongoClient(uri, { serverSelectionTimeoutMS: 5000 }).connect();
  try {
    const client = await globalForMongo._saathiMongo;
    return client.db(process.env.MONGODB_DB_NAME || "saathi");
  } catch (err) {
    globalForMongo._saathiMongo = undefined;
    console.error("[db] MongoDB unavailable:", err);
    return null;
  }
}
