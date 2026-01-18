/*import TerminusClient from "@terminusdb/terminusdb-client";
import { TERMINUS_DB_PASSWORD } from '$env/static/private';

export const terminus = new TerminusClient.WOQLClient(
  "http://100.114.38.65:6363"
);

// Login using secret 
await terminus.connect({
  user: "admin",
  key: TERMINUS_DB_PASSWORD as string,
});*/
import { TERMINUS_DB_PASSWORD, SERVER_URL } from '$env/static/private';
import TerminusClient from "@terminusdb/terminusdb-client";

let terminus: TerminusClient.WOQLClient | null = null;

function normalizeServerUrl(url: string) {
  return url?.toString().replace(/\/$/, "") || url;
}

export async function getTerminus() {
  if (terminus) return terminus;

  const server = normalizeServerUrl(SERVER_URL as string);
  terminus = new TerminusClient.WOQLClient(server, { user: "admin" });

  // connect using the secret from env
  await terminus.connect({ key: TERMINUS_DB_PASSWORD as string });

  return terminus;
}

export type { TerminusClient };