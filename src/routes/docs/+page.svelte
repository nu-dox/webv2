<!--Docs Page-->

<script lang="ts">
  import SearchResult from '$lib/SearchResult.svelte';

  let { data } = $props();
</script>

<h1>Documentation</h1>

  <SearchResult label="Documentation 1"/>

<ul>
  {#each data.summaries as {slug, title}}
    <li><a href={"/docs/" + slug}>{title}</a></li>
  {/each}
</ul>