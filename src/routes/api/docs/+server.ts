import type { RequestHandler } from '@sveltejs/kit';
import { connectDB } from '$lib/server/mongo';

export const GET: RequestHandler = async () => {
	const db = await connectDB();
	const docs = await db.collection('symbols').find({}).toArray();

	return new Response(JSON.stringify(docs), {
		headers: { 'Content-Type': 'application/json' }
	});
};
