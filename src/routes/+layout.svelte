<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<!--TODO: Convert links into a button component-->
<div class="flex flex-col min-h-screen">
	<nav class="flex items-center justify-between gap-4 p-5 bg-gray-800 text-white shadow">
		<a href="/" class="px-3 py-1 rounded-lg border border-gray-100 hover:bg-gray-600 transition duration-300 ease-in-out">+</a>

		<input 
		 type="text"
		 placeholder="Search..." 
		 class="px-3 py-1 rounded-lg border-3 hover:border-blue-500 w-1/2 transition duration-300 ease-in-out focus:border-blue-500 focus:outline-none" />

		<a href="/docs" class="px-3 py-1 rounded-lg border border-gray-100 hover:bg-gray-600 transition duration-300 ease-in-out">Sign Up</a>
	</nav>

	<main class="flex-1 flex flex-col">
		<slot/>
	</main>

	<footer class="p-5 bg-gray-800 text-white text-center">
		<p>Nudox &copy; 2025</p>
	</footer>
</div>
