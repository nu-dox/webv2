import { MongoClient, Db } from "mongodb";

const uri: string = process.env.MONGODB_URI!;  
const client = new MongoClient(uri);

let db: Db | null = null;

export async function connectDB(): Promise<Db> {
    // If already connected, return the cached DB
    if (db) return db;

    await client.connect();

    // DB name
    db = client.db("demo");

    return db;
}
