<script lang="ts">
	import { onMount } from 'svelte';
	import { showNavbarSearch, currentDocs } from '$lib/stores/search';
	import { get } from 'svelte/store';

	let { data } = $props();
	
	let loading = $state(true);

	onMount(async () => {
		// Show search bar in navbar when on repo page with data
		if (data.repo.hasData) {
			showNavbarSearch.set(true);
			
			// Load docs if not already loaded
			if (get(currentDocs).length === 0) {
				const res = await fetch('/api/docs');
				const docs = await res.json();
				currentDocs.set(docs);
			}
		}
		loading = false;
	});
</script>

<div class="flex flex-col min-h-[calc(100vh-140px)]">
	<!-- Repo Header -->
	<div class="bg-white border-b border-gray-200 py-4 px-6">
		<div class="max-w-4xl mx-auto flex items-center gap-4">
			<a href="/" class="text-gray-400 hover:text-gray-600 transition-colors" aria-label="Back to repositories">
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
				</svg>
			</a>
			<div>
				<div class="flex items-center gap-2">
					<span class="text-gray-500">{data.repo.owner}</span>
					<span class="text-gray-400">/</span>
					<span class="font-semibold text-gray-900">{data.repo.name}</span>
				</div>
				<p class="text-sm text-gray-500 mt-1">{data.repo.description}</p>
			</div>
		</div>
	</div>

	<!-- Results Section -->
	<div class="flex-1 flex flex-col items-center py-8 px-4">
		{#if data.repo.hasData}
			{#if loading}
				<p class="text-gray-500">Loading documentation...</p>
			{:else}
				<div class="text-center text-gray-500 mt-8">
					<svg class="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
					</svg>
					<p class="text-lg">Start searching to explore {data.repo.name} documentation</p>
					<p class="text-sm mt-2">Try searching for functions, types, or modules</p>
				</div>
			{/if}
		{:else}
			<!-- Coming Soon State -->
			<div class="flex flex-col items-center justify-center flex-1 text-center">
				<div class="w-24 h-24 rounded-full bg-amber-100 flex items-center justify-center mb-6">
					<svg class="w-12 h-12 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
					</svg>
				</div>
				<h2 class="text-2xl font-semibold text-gray-800 mb-2">Coming Soon</h2>
				<p class="text-gray-500 max-w-md">
					Documentation for <strong>{data.repo.owner}/{data.repo.name}</strong> is not yet available. 
					We're working on adding support for more repositories.
				</p>
				<a 
					href="/" 
					class="mt-6 px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
				>
					Back to Repositories
				</a>
			</div>
		{/if}
	</div>
</div>
