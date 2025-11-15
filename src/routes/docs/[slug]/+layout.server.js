import { docs } from '../docsData.js';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').LayoutServerLoad} */
export function load({ params }) {
  const doc = docs.find((d) => d.slug === params.slug);
  
  if (!doc) throw error(404);

  return {
    doc,
    summaries: docs.map((d) => ({ slug: d.slug, title: d.title }))
  };
}
