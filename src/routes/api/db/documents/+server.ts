import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { fetchDocuments, listDatabases, resetTerminusClient } from '$lib/server/terminus';

/**
 * GET /api/db/documents
 *
 * Dedicated document endpoint using the typed helpers from terminus.ts.
 *
 * Query params:
 *   ?type=<@type>   → filter by schema type
 *   ?id=<docId>     → single document
 *   ?listDbs=true   → list databases instead
 *   ?count=<n>      → limit
 *   ?skip=<n>       → offset
 */
export const GET: RequestHandler = async ({ url }) => {
  const type = url.searchParams.get('type');
  const id = url.searchParams.get('id');
  const listDbs = url.searchParams.get('listDbs');
  const count = url.searchParams.get('count');
  const skip = url.searchParams.get('skip');

  try {
    if (listDbs === 'true') {
      const databases = await listDatabases();
      return json({ databases });
    }

    const documents = await fetchDocuments({
      ...(type ? { type } : {}),
      ...(id ? { id } : {}),
      ...(count ? { count: parseInt(count, 10) } : {}),
      ...(skip ? { skip: parseInt(skip, 10) } : {})
    });

    return json({ documents });
  } catch (error) {
    console.error('Error fetching documents:', error);
    resetTerminusClient();
    return json(
      { error: 'Failed to fetch documents', details: String(error) },
      { status: 500 }
    );
  }
};
