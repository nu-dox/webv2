import { writable } from 'svelte/store';
import type { Doc } from '$lib/types/doc';

// Store to hold the current search query (shared between layout and pages)
export const searchQuery = writable('');

// Store to track if we're on a repo page (to show search bar in navbar)
export const showNavbarSearch = writable(false);

// Store to hold the docs for the current repo
export const currentDocs = writable<Doc[]>([]);
