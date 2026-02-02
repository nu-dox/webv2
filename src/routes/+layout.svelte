<script lang="ts">
	import '../app.css';
	// @ts-ignore: allow importing SVG asset without type declarations
	import favicon from '$lib/assets/favicon.svg';
	import Button from '$lib/Button.svelte';
	import SearchBar from '$lib/SearchBar.svelte';
	import SearchResult from '$lib/SearchResult.svelte';
	import { searchQuery, showNavbarSearch, currentDocs } from '$lib/stores/search';
	import type { Doc } from '$lib/types/doc';
	import { onMount } from 'svelte';

	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();

	let localSearchQuery = $state('');
	let docs: Doc[] = $state([]);

	onMount(() => {
		// Subscribe to stores
		const unsub1 = searchQuery.subscribe(v => localSearchQuery = v);
		const unsub2 = currentDocs.subscribe(v => docs = v);
		
		return () => {
			unsub1();
			unsub2();
		};
	});

	let filteredResults: Doc[] = $derived.by(() => {
		if (localSearchQuery.trim() === '' || docs.length === 0) {
			return [];
		}
		const query = localSearchQuery.toLowerCase();
		const nameSearch = docs.filter(doc =>
			doc.name.toLowerCase().includes(query)
		);
		const fqNameSearch = docs.filter(doc =>
			doc.fq_name.toLowerCase().includes(query)
		);
		const combinedResults = [...nameSearch, ...fqNameSearch];
		const uniqueResultsMap = new Map<string, Doc>();
		combinedResults.forEach(doc => {
			uniqueResultsMap.set(doc._id, doc);
		});
		return Array.from(uniqueResultsMap.values());
	});

	function truncateDescription(text: string, maxLength: number = 300): string {
		if (!text) return '';
		if (text.length > maxLength) {
			return text.substring(0, maxLength) + '...';
		}
		return text;
	}

	let isSearching = $derived(localSearchQuery.trim() !== '' && $showNavbarSearch && docs.length > 0);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="flex flex-col min-h-screen">
	<nav class="grid grid-cols-[auto_1fr_auto] items-center gap-4 px-6 py-4 bg-gray-800 text-white shadow min-h-[72px]">
		<a href="/" class="text-xl font-bold hover:text-gray-300 transition-colors">Nudox</a>

		{#if $showNavbarSearch}
			<div class="flex justify-center px-4">
				<div class="w-full max-w-3xl">
					<SearchBar bind:value={$searchQuery} />
				</div>
			</div>
		{:else}
			<div></div>
		{/if}

		<Button text="Sign Up" width="5rem" />
	</nav>

	<main class="flex-1 flex flex-col">
		{#if isSearching}
			<!-- Search Results Overlay -->
			<div class="flex flex-col items-center py-8 px-4 bg-gray-50 flex-1">
				{#if filteredResults.length > 0}
					<div class="flex flex-col w-full max-w-2xl space-y-2">
						{#each filteredResults as doc (doc._id)}
							<SearchResult 
								name={doc.name} 
								description={truncateDescription(doc.documentation)}
								slug={doc.name}
							/>
						{/each}
					</div>
				{:else}
					<p class="text-gray-500 mt-8">No results found for "{localSearchQuery}"</p>
				{/if}
			</div>
		{:else}
			{@render children()}
		{/if}
	</main>

	<footer class="p-5 bg-gray-800 text-white text-center">
		<p>Nudox &copy; 2025</p>
	</footer>
</div>
