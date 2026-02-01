// place files you want to import through the `$lib` alias in this folder.
// @ts-expect-error: allow importing Svelte components without declaration file

// @ts-expect-error: allow importing Svelte components without declaration file
import Button from './Button.svelte';
// @ts-expect-error: allow importing Svelte components without declaration file
import SearchBar from './SearchBar.svelte';
import SearchResult from './SearchResult.svelte';
// @ts-expect-error: allow importing modules without declaration file
import { connectDB } from './server/mongo';

export { SearchResult, SearchBar, Button, connectDB };
