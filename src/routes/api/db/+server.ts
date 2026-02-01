import { json } from '@sveltejs/kit';
import { getTerminus } from '$lib/server/terminus';

export async function GET() {
	try {
		const terminus = await getTerminus();
		const info = await terminus.info();
		console.log('TerminusDB Info:', info); // Log the info to the server console
		return json(info);
	} catch (err) {
		console.error(err);
		return json({ error: 'Failed to connect to TerminusDB' }, { status: 500 });
	}
}
