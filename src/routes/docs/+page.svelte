<!--Docs Page-->
<!--Code on this page doesnt really matter, user should never be on this page. This page is for testing things-->
<script lang="ts">  
  import { onMount } from 'svelte';
  import type { Doc } from '$lib/types/doc';

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

