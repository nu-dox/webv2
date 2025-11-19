<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  export let value: string = '';
  const dispatch = createEventDispatcher();

  function onInput(e: Event) {
    const input = e.target as HTMLInputElement;
    value = input.value;
    dispatch('input', { value });
  }
</script>

<input
  type="text"
  bind:value
  on:input={onInput}
  placeholder="Search..."
  class="px-3 py-1 rounded-lg border-3 hover:border-blue-500 w-1/2 transition duration-300 ease-in-out focus:border-blue-500 focus:outline-none text-black"
  autofocus
  />