import {
  TERMINUS_DB_PASSWORD,
  TERMINUS_SERVER_URL,
  TERMINUS_DB_NAME,
  TERMINUS_DB_USER,
  TERMINUS_DB_ORGANIZATION
} from '$env/static/private';
import TerminusClient from '@terminusdb/terminusdb-client';

let clientInstance: InstanceType<typeof TerminusClient.WOQLClient> | null = null;

 //Returns a singleton WOQLClient connected to the configured TerminusDB.
 //Reconnects automatically if the previous connection was lost.
export async function getTerminusClient() {
  if (!clientInstance) {
    clientInstance = new TerminusClient.WOQLClient(TERMINUS_SERVER_URL, {
      user: TERMINUS_DB_USER,
      organization: TERMINUS_DB_ORGANIZATION
    });

    await clientInstance.connect({
      key: TERMINUS_DB_PASSWORD,
      db: TERMINUS_DB_NAME
    });
  }
  return clientInstance;
}

// Reset the cached client 
export function resetTerminusClient() {
  clientInstance = null;
}

// Data-pull helpers
export interface TerminusDocumentQuery {
  type?: string;
  id?: string;
  // Max documents to return
  count?: number;
  // Number of documents to skip
  skip?: number;
}

//Fetch documents from the connected TerminusDB.
export async function fetchDocuments(query: TerminusDocumentQuery = {}) {
  const client = await getTerminusClient();

  // Single document by ID
  if (query.id) {
    const doc = await client.getDocument({ id: query.id });
    return doc;
  }

  // Multiple documents, optionally filtered by @type
  const params: Record<string, unknown> = {};
  if (query.type) params['query'] = { '@type': query.type };
  if (query.count) params['count'] = query.count;
  if (query.skip) params['skip'] = query.skip;

  const docs = await client.getDocument(params);
  return docs;
}

//List every database the current user can see.
export async function listDatabases() {
  const client = await getTerminusClient();
  return client.getDatabases();
}

// Quick health-check / server info
export async function getServerInfo() {
  const client = await getTerminusClient();
  return client.info();
}

export const getTerminus = getTerminusClient;

