import { MongoClient, Db } from "mongodb";
import { MONGODB_URI, MONGODB_NAME } from '$env/static/private';

//const uri: string = process.env.MONGODB_URI!;  
const dbName: string = MONGODB_NAME ?? "demo";
const client = new MongoClient(MONGODB_URI);

let db: Db | null = null;

export async function connectDB(): Promise<Db> {
    // If already connected, return the cached DB
    if (db) return db;

    await client.connect();

    // DB name
    db = client.db(dbName);

    return db;
}
