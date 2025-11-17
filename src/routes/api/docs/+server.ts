import { connectDB } from "$lib/server/mongo";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async () => {
    const db = await connectDB();
    const docs = await db.collection("symbols").find({}).toArray();

    return new Response(JSON.stringify(docs), {
        headers: { "Content-Type": "application/json" }
    });
};
