<!--Docs Page-->

<script lang="ts">
  import SearchResult from '$lib/SearchResult.svelte';

  let { data } = $props();

  let docs = [];

    onMount(async () => {
        const res = await fetch("/api/docs");
        docs = await res.json();
    });
</script>

<h1>Documentation</h1>

  <SearchResult label="Documentation 1"/>

<ul>
  {#each data.summaries as {slug, title}}
    <li><a href={"/docs/" + slug}>{title}</a></li>
  {/each}
</ul>

{#each docs as u}
    <p>{u.name}</p>
{/each}