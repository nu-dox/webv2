<script>
  export let text = "";
  export let width = "";
  export let link = null;

  function handleClick(event) {
    if (link != null) {
      window.open(link, "_blank");
    }
  }
</script>

<button on:click={handleClick} class="h-10 w-10 rounded-full flex items-center justify-center bg-white text-gray-800 font-bold shadow-md transition duration-300 ease-in-out hover:bg-gray-200 hover:scale-105" style="width: {width}">
  {text}  
</button>
