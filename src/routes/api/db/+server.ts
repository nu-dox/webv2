import { json } from "@sveltejs/kit";
//import { TerminusClient } from "$lib/server/terminus";
import TerminusClient from "@terminusdb/terminusdb-client";


export async function GET() {
  try {
    const client = new TerminusClient.WOQLClient("http://100.114.38.65:6363", {
      user: "admin",
      organization: "admin",
    });

    const terminus = await client.connect({ key: "..Mk*1%4*NYc9r}147s~n@>W6B", db: "mydb" });
    //const terminus = await client();
    //const info = await terminus.info();
    return terminus;
  } catch (err) {
    console.error(err);
    return json({ error: "Failed to connect to TerminusDB" }, { status: 500 });
  }
}
