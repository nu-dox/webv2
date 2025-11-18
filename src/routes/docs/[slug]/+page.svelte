<script lang="ts">
  import type { Doc } from '$lib/types/doc';
  
  let { data } = $props();
  const doc: Partial<Doc> = data?.doc || {};
  const title = doc.name || doc.fq_name || 'Document';
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
        <div class="prose prose-invert max-w-none">
          {@html doc.documentation}
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