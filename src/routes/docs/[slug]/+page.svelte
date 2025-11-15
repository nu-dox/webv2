<script lang="ts">
  let { data } = $props();
</script>

<h1>{data.doc.title}</h1>
<div>{@html data.doc.content}</div>