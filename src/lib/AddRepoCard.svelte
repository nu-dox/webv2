<script lang="ts">
	import WavyButton from '$lib/WavyButton.svelte';
</script>

<button 
	class="group block bg-white border border-gray-500 rounded-xl p-6 hover:border-gray-400 hover:bg-gray-100 transition-all duration-200 w-full h-full min-h-[180px]"
>
	<div class="flex flex-col items-center justify-center h-full gap-3">
		<WavyButton 
			waves={8}
			waveDepth={5}
		/>
		<span class="font-medium text-gray-900">Add repo</span>
	</div>
</button>
