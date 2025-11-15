<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<!--TODO: Rework nav bar-->
<nav>
	<a href="/">home</a>
	<a href="/about">about</a>
	<a href="/docs">docs</a>
</nav>

<slot/>
