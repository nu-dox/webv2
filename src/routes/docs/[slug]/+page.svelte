<script lang="ts">
  import type { Doc } from '$lib/types/doc';
  
  let { data } = $props();
  const doc: Partial<Doc> = data?.doc || {};
  const title = doc.name || doc.fq_name || 'Document';

  // Parse documentation to extract and format code blocks
  function parseDocumentation(html: string) {
    if (!html) return '';
    
    // Split by triple backticks, alternate between normal text and code blocks
    const parts = html.split(/```/);
    
    return parts.map((part, index) => {
      if (index % 2 === 0) {
        // Normal text/HTML
        return part;
      } else {
        // Code block - escape HTML and wrap in pre tags
        const escaped = part
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .trim();
        return `<pre class="code-block"><code>${escaped}</code></pre>`;
      }
    }).join('');
  }

  const parsedDocumentation = parseDocumentation(doc.documentation || '');
</script>

<div class="min-h-screen bg-linear-to-br from-gray-900 to-gray-800 text-white p-8">
  <div class="max-w-6xl mx-auto">
    <!-- Header -->
    <div class="mb-12">
      <h1 class="text-5xl font-bold mb-2 text-blue-400">{title}</h1>
      <p class="text-gray-400 text-lg">{doc.fq_name}</p>
    </div>

    <!-- Quick Info Cards -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
      <div class="bg-gray-700 rounded-lg p-4 border border-gray-600">
        <p class="text-gray-400 text-sm uppercase">Type</p>
        <p class="text-xl font-semibold">{doc.symbol_type || 'N/A'}</p>
      </div>
      <div class="bg-gray-700 rounded-lg p-4 border border-gray-600">
        <p class="text-gray-400 text-sm uppercase">Language</p>
        <p class="text-xl font-semibold">{doc.language || 'N/A'}</p>
      </div>
      <div class="bg-gray-700 rounded-lg p-4 border border-gray-600">
        <p class="text-gray-400 text-sm uppercase">Visibility</p>
        <p class="text-xl font-semibold">{doc.visibility || 'N/A'}</p>
      </div>
      <div class="bg-gray-700 rounded-lg p-4 border border-gray-600">
        <p class="text-gray-400 text-sm uppercase">Exported</p>
        <p class="text-xl font-semibold">{doc.export ? '✓' : '✗'}</p>
      </div>
    </div>

    <!-- Documentation Section -->
    {#if doc.documentation}
      <div class="bg-gray-700 rounded-lg p-8 mb-12 border border-gray-600">
        <h2 class="text-2xl font-bold mb-6 text-blue-300">Documentation</h2>
        <div class="prose prose-invert max-w-none doc-content overflow-hidden">
          {@html parsedDocumentation}
        </div>
      </div>
    {/if}

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Left Column -->
      <div>
        <!-- Basic Info -->
        <div class="bg-gray-700 rounded-lg p-6 mb-8 border border-gray-600">
          <h3 class="text-xl font-bold mb-4 text-blue-300">Basic Information</h3>
          <div class="space-y-3">
            <div>
              <p class="text-gray-400 text-sm">Library</p>
              <p class="font-mono text-white">{doc.library_name} v{doc.library_version}</p>
            </div>
            <div>
              <p class="text-gray-400 text-sm">IR Version</p>
              <p class="font-mono text-white">{doc.ir_version || 'N/A'}</p>
            </div>
            <div>
              <p class="text-gray-400 text-sm">Path</p>
              <p class="font-mono text-white text-sm break-all">{doc.path?.join(' > ') || 'N/A'}</p>
            </div>
            <div>
              <p class="text-gray-400 text-sm">ID</p>
              <p class="font-mono text-white text-xs break-all">{doc._id || 'N/A'}</p>
            </div>
            <div>
              <p class="text-gray-400 text-sm">King Tag</p>
              <p class="font-mono text-white">{doc.king_tag || 'N/A'}</p>
            </div>
          </div>
        </div>

        <!-- Input Parameters -->
        {#if doc.has_input_params && doc.inputParameters && doc.inputParameters.length > 0}
          <div class="bg-gray-700 rounded-lg p-6 border border-gray-600">
            <h3 class="text-xl font-bold mb-4 text-blue-300">Input Parameters</h3>
            <div class="space-y-3">
              {#each doc.inputParameters as param, idx}
                <div class="bg-gray-600 rounded p-3">
                  <p class="text-sm text-gray-300 font-mono">{JSON.stringify(param)}</p>
                </div>
              {/each}
            </div>
          </div>
        {/if}
      </div>

      <!-- Right Column -->
      <div>
        <!-- Features -->
        <div class="bg-gray-700 rounded-lg p-6 mb-8 border border-gray-600">
          <h3 class="text-xl font-bold mb-4 text-blue-300">Features</h3>
          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <span class="text-lg">{doc.has_docs ? '✓' : '✗'}</span>
              <span class="text-gray-300">Has Documentation</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-lg">{doc.has_members ? '✓' : '✗'}</span>
              <span class="text-gray-300">Has Members</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-lg">{doc.has_input_params ? '✓' : '✗'}</span>
              <span class="text-gray-300">Has Input Parameters</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-lg">{doc.has_output_params ? '✓' : '✗'}</span>
              <span class="text-gray-300">Has Output Parameters</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-lg">{doc.show ? '✓' : '✗'}</span>
              <span class="text-gray-300">Show in Documentation</span>
            </div>
          </div>
        </div>

        <!-- Output Parameters -->
        {#if doc.has_output_params && doc.outputParameters && doc.outputParameters.length > 0}
          <div class="bg-gray-700 rounded-lg p-6 border border-gray-600">
            <h3 class="text-xl font-bold mb-4 text-blue-300">Output Parameters</h3>
            <div class="space-y-3">
              {#each doc.outputParameters as param, idx}
                <div class="bg-gray-600 rounded p-3">
                  <p class="text-sm text-gray-300 font-mono">{JSON.stringify(param)}</p>
                </div>
              {/each}
            </div>
          </div>
        {/if}
      </div>
    </div>

    <!-- Type Strings and Variants -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
      {#if doc.input_type_strings && doc.input_type_strings.length > 0}
        <div class="bg-gray-700 rounded-lg p-6 border border-gray-600">
          <h3 class="text-xl font-bold mb-4 text-blue-300">Input Type Strings</h3>
          <div class="space-y-2">
            {#each doc.input_type_strings as type}
              <p class="font-mono text-sm bg-gray-600 p-2 rounded text-gray-200">{type}</p>
            {/each}
          </div>
        </div>
      {/if}

      {#if doc.output_type_strings && doc.output_type_strings.length > 0}
        <div class="bg-gray-700 rounded-lg p-6 border border-gray-600">
          <h3 class="text-xl font-bold mb-4 text-blue-300">Output Type Strings</h3>
          <div class="space-y-2">
            {#each doc.output_type_strings as type}
              <p class="font-mono text-sm bg-gray-600 p-2 rounded text-gray-200">{type}</p>
            {/each}
          </div>
        </div>
      {/if}
    </div>

    {#if doc.members && doc.members.length > 0}
      <div class="bg-gray-700 rounded-lg p-6 mt-8 border border-gray-600">
        <h3 class="text-xl font-bold mb-4 text-blue-300">Members</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {#each doc.members as member}
            <p class="font-mono text-sm bg-gray-600 p-2 rounded text-gray-200">{member}</p>
          {/each}
        </div>
      </div>
    {/if}

    {#if doc.variant_names && doc.variant_names.length > 0}
      <div class="bg-gray-700 rounded-lg p-6 mt-8 border border-gray-600">
        <h3 class="text-xl font-bold mb-4 text-blue-300">Variants</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {#each doc.variant_names as variant}
            <p class="font-mono text-sm bg-gray-600 p-2 rounded text-gray-200">{variant}</p>
          {/each}
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  /* Prevent documentation HTML from breaking layout */
  :global(.doc-content) {
    word-wrap: break-word;
    overflow-wrap: break-word;
    word-break: break-word;
  }

  :global(.doc-content *) {
    max-width: 100%;
    box-sizing: border-box;
  }

  :global(.doc-content table) {
    table-layout: auto;
    max-width: 100%;
    overflow-x: auto;
    display: block;
  }

  :global(.doc-content img) {
    max-width: 100%;
    height: auto;
  }

  :global(.doc-content del),
  :global(.doc-content s) {
    text-decoration: line-through;
  }

  :global(.doc-content code:not(.code-block code)) {
    background-color: rgba(0, 0, 0, 0.3);
    padding: 0.2rem 0.4rem;
    border-radius: 0.25rem;
    font-size: 0.9em;
  }

  :global(.code-block) {
    background-color: rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 1rem;
    border-radius: 0.5rem;
    overflow-x: auto;
    max-width: 100%;
    margin: 1rem 0;
    display: block;
    font-family: 'Courier New', monospace;
    font-size: 0.875rem;
    line-height: 1.5;
  }

  :global(.code-block code) {
    background: none;
    padding: 0;
    color: #e0e0e0;
    word-break: break-word;
    white-space: pre-wrap;
  }
</style>