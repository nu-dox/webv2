import { json } from '@sveltejs/kit';
import { getTerminusClient } from '$lib/server/terminus';

export async function GET({ url }) {
	const client = await getTerminusClient();

	// Get document type from query params
	const type = url.searchParams.get('type');
	const id = url.searchParams.get('id');
	const listDbs = url.searchParams.get('listDbs');

	try {
		// List all available databases
		if (listDbs === 'true') {
			const databases = await client.getDatabases();
			return json({ databases });
		}

		if (id) {
			// Get specific document by ID
			const document = await client.getDocument({ id });
			return json(document);
		}

		// Query all documents, or filter by type
		const query = type ? { '@type': type } : {};
		const documents = await client.getDocument({ query });

		return json(documents);
	} catch (error) {
		console.error('Error fetching documents:', error);
		return json({ error: 'Failed to fetch documents', details: String(error) }, { status: 500 });
	}
}
