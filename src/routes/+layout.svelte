<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import SearchBar from '$lib/SearchBar.svelte';
	import Button from '$lib/Button.svelte';
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="flex flex-col min-h-screen">
	<nav class="flex items-center justify-between gap-4 p-5 bg-gray-800 text-white shadow">
		<Button text="+" width="2.5rem" />

		<SearchBar />

		<Button text="Sign Up" width="5rem" />
	</nav>

	<main class="flex-1 flex flex-col">
		<slot/>
	</main>

	<footer class="p-5 bg-gray-800 text-white text-center">
		<p>Nudox &copy; 2025</p>
	</footer>
</div>
