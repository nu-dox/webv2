import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ params, fetch }) => {
  const res = await fetch('/api/docs');
  if (!res.ok) throw error(502, 'Failed to fetch docs from API');

  const docs = await res.json();
  const slug = params.slug;

  const doc = docs.find((d: any) =>
    d.fq_name === slug || d.name === slug || d.slug === slug || d._id === slug
  );

  if (!doc) throw error(404, 'Document not found');

  const summaries = docs.map((d: any) => ({
    slug: d.fq_name || d.name || d.slug || d._id,
    title: d.title || d.name || d.fq_name || d._id
  }));

  return { doc, summaries };
};