import TerminusClient from '@terminusdb/terminusdb-client';
import {
	TERMINUS_DB_NAME,
	TERMINUS_DB_ORGANIZATION,
	TERMINUS_DB_PASSWORD,
	TERMINUS_DB_USER,
	TERMINUS_SERVER_URL
} from '$env/static/private';

let clientInstance: InstanceType<typeof TerminusClient.WOQLClient> | null = null;

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

// Alias for backwards compatibility
export const getTerminus = getTerminusClient;
