<script lang="ts">
  import { goto } from '$app/navigation';
  
  export let name: string = 'Result';
  export let description: string = 'No description available';
  export let slug: string = '';

  async function handleClick() {
    if (slug) {
      await goto(`/docs/${slug}`);
      window.location.reload();
    }
  }
</script>

<button
  on:click={handleClick}
  class="w-full p-4 border rounded-lg shadow hover:shadow-lg transition duration-300 ease-in-out bg-white hover:bg-gray-200 cursor-pointer text-left border-gray-500 hover:border-blue-400"
>
  <h2 class="text-lg font-semibold mb-2 text-gray-700">{name}</h2>
  <p class="text-sm text-gray-700">{description}</p>
</button>

<style>
</style>
