<script lang="ts">
	import { onMount } from 'svelte';
	import { showNavbarSearch, currentDocs } from '$lib/stores/search';
	import { get } from 'svelte/store';

	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();

	onMount(async () => {
		// Enable search bar in navbar for doc pages
		showNavbarSearch.set(true);
		
		// Load docs if not already loaded
		if (get(currentDocs).length === 0) {
			const res = await fetch('/api/docs');
			const docs = await res.json();
			currentDocs.set(docs);
		}
	});
</script>

{@render children()}
