<!--Docs Page-->
<script lang="ts">  
  import { onMount } from 'svelte';

  //let { data } = $props();

  type Doc = {
    _id: string;
    language: string;
    library_name: string;
    library_version: string;
    ir_version: string;
    path: Array<string>;
    name: string;
    fq_name: string;
    king_tag: string;
    symbol_type: string;
    visibility: string;
    export: boolean;
    show: boolean;
    has_docs: boolean;
    has_members: boolean;
    has_input_params: boolean;
    has_output_params: boolean;
    input_type_strings: Array<string>;
    output_type_strings: Array<string>;
    variant_names: Array<string>;
    documentation: string;
    members: Array<string>;
    inputParameters: Array<object>;
    outputParameters: Array<object>;
    kind: Object;
  };

  let docs: Doc[] = [];


  onMount(async () => {
    const res = await fetch("/api/docs");
    docs = await res.json();
  });

</script>

<h1>Documentation</h1>


{#each docs as doc}
  <p>{doc._id}</p>
  <p>{doc.name}</p>
  <p>{doc.documentation}</p>
  <br>
{/each}


<!--<ul>
  {#each data.summaries as {slug, title}}
    <li><a href={"/docs/" + slug}>{title}</a></li>
  {/each}
</ul>-->