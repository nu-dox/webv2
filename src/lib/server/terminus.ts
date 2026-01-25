import { 
  TERMINUS_DB_PASSWORD, 
  TERMINUS_SERVER_URL, 
  TERMINUS_DB_NAME,
  TERMINUS_DB_USER,
  TERMINUS_DB_ORGANIZATION
} from '$env/static/private';
import TerminusClient from "@terminusdb/terminusdb-client";

let clientInstance: InstanceType<typeof TerminusClient.WOQLClient> | null = null;

export async function getTerminusClient() {
  if (!clientInstance) {
    clientInstance = new TerminusClient.WOQLClient(TERMINUS_SERVER_URL, {
      user: TERMINUS_DB_USER,
      organization: TERMINUS_DB_ORGANIZATION,
    });

    await clientInstance.connect({ 
      key: TERMINUS_DB_PASSWORD, 
      db: TERMINUS_DB_NAME 
    });
  }
  return clientInstance;
}

// Alias for backwards compatibility
export const getTerminus = getTerminusClient;

