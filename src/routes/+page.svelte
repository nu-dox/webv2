<script lang="ts">
	import { repos, type Repo } from '$lib/data/repos';
	import RepoCard from '$lib/RepoCard.svelte';
	import AddRepoCard from '$lib/AddRepoCard.svelte';
	import { showNavbarSearch, searchQuery, currentDocs } from '$lib/stores/search';
	import { onMount } from 'svelte';

	let repoSearchQuery = $state('');
	let repoSearchBar: HTMLInputElement;

	let filteredRepos: Repo[] = $derived.by(() => {
		if (repoSearchQuery.trim() === '') {
			return repos;
		}
		const query = repoSearchQuery.toLowerCase();
		return repos.filter(repo => 
			repo.name.toLowerCase().includes(query) ||
			repo.owner.toLowerCase().includes(query) ||
			repo.description.toLowerCase().includes(query)
		);
	});

	let selectedIndex = $state(0)

	let totalItems = $derived(filteredRepos.length + 1);

	function handleKeydown(e: KeyboardEvent) {
		//If user is typing, let him type blyat, dont take over arrow keys
		if (document.activeElement === repoSearchBar ){
			return;
		}

		const columns = getColumnsCount();

		switch (e.key) {
			case "ArrowRight":
				e.preventDefault();
				selectedIndex = (selectedIndex + 1) % totalItems;
				break;

			case "ArrowLeft":
				e.preventDefault();
				selectedIndex = (selectedIndex - 1 + totalItems) % totalItems;
				break;

			case "ArrowUp":
				e.preventDefault();
				selectedIndex = Math.max(selectedIndex - columns, 0);
				break;

			case "ArrowDown":
				e.preventDefault();
				selectIndex = Math.min(selectedIndex + columns, totalItems - 1);
				break;
		}
	}

	function getColumnsCount() {
		if (window.innerWidth >= 1024) {
			return 3; //lg:grid-cols-3
		}
		if (window.innerWidth >= 768) {
			return 2; //lg:grid-cols-2
		}
		return 1;
	} 
  
	onMount(() => {
		// Hide search bar on landing page
		showNavbarSearch.set(false);
		searchQuery.set('');
		currentDocs.set([]);
		//Auto focus on repo search bar when page loads
		repoSearchBar.focus();
	});
</script>

<div
	tabindex="0"
	on:keyboard={handleKeydown}
	class="flex flex-col items-center py-16 px-4 bg-gray-700 flex-1">
	<h1 class="text-3xl font-semibold text-white mb-8">
		Which repo are you looking for today?
	</h1>

	<div class="w-full max-w-3xl mb-10">
		<div class="relative">
			<svg class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
			</svg>
			<input 
				type="text" 
				bind:value={repoSearchQuery}
				bind:this={repoSearchBar}
				placeholder="Search for repositories (or paste a link)" 
				class="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
			/>
		</div>
	</div>

	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-5xl">
		<AddRepoCard isSelected={selectedIndex === 0}/>
		
		{#each filteredRepos as repo, i (repo.slug)}
			<RepoCard
				{repo}
				isSelected={selectedIndex === i + 1}
			/>
		{/each}
	</div>
</div>

