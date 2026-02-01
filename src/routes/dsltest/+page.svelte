<script lang="ts">
import { users } from '$lib/data';
import { applyFilters } from '$lib/dsl/filter';
import { parseTokens } from '$lib/dsl/parser';
import { tokenize } from '$lib/dsl/tokenizer';

const query = '';
let result = users;

function runSearch() {
	const tokens = tokenize(query);
	const parsed = parseTokens(tokens);
	result = applyFilters(users, parsed);
}
</script>

<div class="container">
  <h1>DSL Search Demo</h1>

  <input
    type="text"
    class="text-black"
    bind:value={query}
    placeholder='Try: lang:python'
    on:input={runSearch}
  />

  <pre class="query">
{query}
  </pre>

  <h2>Results</h2>

  {#if result.length === 0}
    <p>No results</p>
  {:else}
    <h2>lang: 'language name' lib: 'library name' ver: 'version number' func: 'function name'</h2>
    <ul>
      {#each result as res}
        <li>
          <strong>{res.lang}</strong>
          — Library: {res.lib}
          — Version: {res.ver}
          — Function: {res.func}
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style>
  .container {
    max-width: 600px;
    margin: 2rem auto;
    font-family: sans-serif;
  }

  input {
    width: 100%;
    padding: 0.6rem;
    margin-bottom: 1rem;
    font-size: 1rem;
  }

  pre.query {
    background: #f5f5f5;
    padding: 0.5rem;
    font-size: 0.9rem;
    color: black;
  }
</style>
