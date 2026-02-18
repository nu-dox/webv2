<script lang="ts">
	import type { Repo } from '$lib/data/repos';

	interface Props {
		repo: Repo;
		isSelected?: boolean;
	}

	let { repo, isSelected = false }: Props = $props();
</script>

<a 
	href="/repo/{repo.slug}" 
	class="group block bg-white border rounded-xl p-6 hover:shadow-lg hover:border-gray-300 hover:bg-gray-100 transition-all duration-200"
	class:border-blue-500={isSelected}
	class:border-4={isSelected}
	class:border-gray-400={!isSelected}
	class:border-2={!isSelected}
>
	<div class="flex flex-col h-full">
		<div class="flex items-center gap-2 mb-2">
			<span class="text-gray-500 text-sm">{repo.owner}</span>
			<span class="text-gray-400">/</span>
			<span class="font-semibold text-gray-900">{repo.name}</span>
		</div>
		
		<p class="text-gray-600 text-sm flex-1 line-clamp-2 mb-4">
			{repo.description}
		</p>
		
		<div class="flex items-center justify-between">
			<div class="flex items-center gap-1 text-gray-500 text-sm">
				<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
					<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
				</svg>
				<span>{repo.stars}</span>
			</div>
			
			<div class="flex items-center text-gray-400 group-hover:text-gray-600 transition-colors">
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
				</svg>
			</div>
		</div>

		{#if !repo.hasData}
			<div class="mt-3 text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-md inline-block w-fit">
				Coming Soon
			</div>
		{/if}
	</div>
</a>
