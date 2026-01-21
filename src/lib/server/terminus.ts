import { TERMINUS_DB_PASSWORD, SERVER_URL } from '$env/static/private';
import TerminusClient from "@terminusdb/terminusdb-client";


export async function getTerminus() {
  const client = new TerminusClient.WOQLClient("http://100.114.38.65:6363", {
    user: "admin",
    organization: "admin",
  });

  await client.connect({ 
    key: "..Mk*1%4*NYc9r}147s~n@>W6B", 
    db: "mydb" 
  });

  return client;
}

