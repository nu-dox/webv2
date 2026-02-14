import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import {
  getServerInfo,
  listDatabases,
  fetchDocuments,
  resetTerminusClient,
  type TerminusDocumentQuery
} from '$lib/server/terminus';

/**
 * GET /api/db
 *
 * Query params:
 *   ?info=true        → server health-check / version info
 *   ?listDbs=true     → list all databases visible to the user
 *   ?type=<@type>     → filter documents by schema type
 *   ?id=<docId>       → fetch a single document by ID
 *   ?count=<n>        → limit results  (default 100)
 *   ?skip=<n>         → pagination offset
 *   ?simulate=true    → return simulated test data (dev only)
 */
export const GET: RequestHandler = async ({ url }) => {
  if (url.searchParams.get('simulate') === 'true') {
    return json({
      source: 'simulated',
      note: 'Test data to check data pull. Remove ?simulate=true to hit TerminusDB.',
      documents: [
        {
          '@id': 'Doc/numpy_array',
          '@type': 'Symbol',
          language: 'Python',
          library_name: 'NumPy',
          library_version: '2.1.0',
          name: 'array',
          fq_name: 'numpy.array',
          symbol_type: 'function',
          visibility: 'public',
          documentation: 'Create an array.',
          has_docs: true,
          has_members: false,
          input_type_strings: ['object', 'dtype', 'copy', 'order', 'subok', 'ndmin', 'like'],
          output_type_strings: ['ndarray']
        },
        {
          '@id': 'Doc/axios_get',
          '@type': 'Symbol',
          language: 'TypeScript',
          library_name: 'Axios',
          library_version: '1.7.0',
          name: 'get',
          fq_name: 'axios.get',
          symbol_type: 'function',
          visibility: 'public',
          documentation: 'Send a GET request.',
          has_docs: true,
          has_members: false,
          input_type_strings: ['url', 'config?'],
          output_type_strings: ['Promise<AxiosResponse>']
        },
        {
          '@id': 'Doc/tokio_spawn',
          '@type': 'Symbol',
          language: 'Rust',
          library_name: 'tokio',
          library_version: '1.42.0',
          name: 'spawn',
          fq_name: 'tokio::spawn',
          symbol_type: 'function',
          visibility: 'public',
          documentation: 'Spawns a new asynchronous task.',
          has_docs: true,
          has_members: false,
          input_type_strings: ['Future<Output = T>'],
          output_type_strings: ['JoinHandle<T>']
        }
      ]
    });
  }

  try {
    // Server info 
    if (url.searchParams.get('info') === 'true') {
      const info = await getServerInfo();
      return json({ source: 'terminusdb', info });
    }

    //List databases 
    if (url.searchParams.get('listDbs') === 'true') {
      const databases = await listDatabases();
      return json({ source: 'terminusdb', databases });
    }

    // Document query
    const query: TerminusDocumentQuery = {};
    const type = url.searchParams.get('type');
    const id = url.searchParams.get('id');
    const count = url.searchParams.get('count');
    const skip = url.searchParams.get('skip');

    if (type) query.type = type;
    if (id) query.id = id;
    if (count) query.count = parseInt(count, 10);
    if (skip) query.skip = parseInt(skip, 10);

    const documents = await fetchDocuments(query);
    return json({ source: 'terminusdb', documents });
  } catch (err) {
    console.error('TerminusDB error:', err);
    // Reset client so the next request gets a fresh connection
    resetTerminusClient();
    return json(
      { error: 'Failed to communicate with TerminusDB', details: String(err) },
      { status: 500 }
    );
  }
};
