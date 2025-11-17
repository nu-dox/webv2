<script lang="ts">
  export let name: string = 'Result';
  export let description: string = 'No description available';
</script>

<div class="p-4 border rounded-lg shadow hover:shadow-lg transition-shadow bg-gray-600">
  <h2 class="text-lg font-semibold mb-2">{name}</h2>
  <p class="text-sm text-white">{description}</p>
</div>
