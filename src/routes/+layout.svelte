<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import SearchBar from '$lib/SearchBar.svelte';
	import Button from '$lib/Button.svelte';
	import SearchResult from '$lib/SearchResult.svelte';
  import { onMount } from 'svelte';
  import type { Doc } from '$lib/types/doc';

  let docs: Doc[] = [];
  let searchQuery: string = '';
  let filteredResults: Doc[] = [];

	//Fetch data from mongoDB
  onMount(async () => {
    const res = await fetch("/api/docs");
    docs = await res.json();
  });

	//TODO: Make search DSL
  $: {
    if (searchQuery.trim() === '') {
      filteredResults = [];
    } else {
      const query = searchQuery.toLowerCase();
      filteredResults = docs.filter(doc =>
        doc.name.toLowerCase().includes(query) ||
        doc.fq_name.toLowerCase().includes(query) ||
        doc.documentation.toLowerCase().includes(query)
      );
    }
  }

  function truncateDescription(text: string, maxLength: number = 300): string {
    if (!text) return '';
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  }
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="flex flex-col min-h-screen">
	<nav class="flex items-center justify-between gap-4 p-5 bg-gray-800 text-white shadow">
		<Button text="+" width="2.5rem" />

		<SearchBar bind:value={searchQuery} />

		<Button text="Sign Up" width="5rem" />
	</nav>

	<main class="flex-1 flex justify-center">
		{#if filteredResults.length > 0}
			<div class="flex flex-col justify-center mt-4 space-y-2 w-1/2">
				{#each filteredResults as doc (doc._id)}
					<SearchResult 
						name={doc.name} 
						description={truncateDescription(doc.documentation)}
						slug={doc.name}
					/>
				{/each}
			</div>
		{:else if searchQuery.trim() !== ''}
			<p class="mt-4 text-gray-500">No results found.</p>
		{/if}

		{#if searchQuery.trim() === ''}
			<slot/>
		{/if}
	</main>

	<footer class="p-5 bg-gray-800 text-white text-center">
		<p>Nudox &copy; 2025</p>
	</footer>
</div>
