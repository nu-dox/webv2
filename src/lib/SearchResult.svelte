<script lang="ts">
import { goto } from '$app/navigation';

export const name: string = 'Result';
export const description: string = 'No description available';
export const slug: string = '';

async function handleClick() {
	if (slug) {
		await goto(`/docs/${slug}`);
		window.location.reload();
	}
}
</script>

<button
  on:click={handleClick}
  class="w-full p-4 border rounded-lg shadow hover:shadow-lg transition duration-300 ease-in-out bg-gray-600 hover:bg-gray-500 cursor-pointer text-left border-gray-500 hover:border-blue-400"
>
  <h2 class="text-lg font-semibold mb-2">{name}</h2>
  <p class="text-sm text-white">{description}</p>
</button>

<style>
</style>
