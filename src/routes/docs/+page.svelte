<!--Docs Page-->

<script lang="ts">
  let { data } = $props();
</script>

<h1>Documentation</h1>

<ul>
  {#each data.summaries as {slug, title}}
    <li><a href={"/docs/" + slug}>{title}</a></li>
  {/each}
</ul>