import { docs } from './docsData.js';

export function load() {
  return {
    summaries: docs.map((doc) => ({
      slug: doc.slug,
      title: doc.title,
      content: doc.content
    }))
  }
}