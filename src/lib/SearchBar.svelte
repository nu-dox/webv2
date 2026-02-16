<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  export let value: string = '';
  const dispatch = createEventDispatcher();
  let searchElement: HTMLInputElement;

  function onInput(e: Event) {
    const input = e.target as HTMLInputElement;
    value = input.value;
    dispatch('input', { value });
  }

  //Autofocus on search bar when component mounts
  onMount(() => {
    searchElement.focus();
  });
</script>

<input
  type="text"
  bind:value
  bind:this={searchElement}
  on:input={onInput}
  placeholder="Search..."
  class="px-3 py-1 rounded-lg border-3 hover:border-blue-500 w-full transition duration-300 ease-in-out focus:border-blue-500 focus:outline-none text-black"
/>