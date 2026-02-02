import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getRepoBySlug } from '$lib/data/repos';

export const load: PageServerLoad = async ({ params }) => {
	const repo = getRepoBySlug(params.slug);

	if (!repo) {
		throw error(404, 'Repository not found');
	}

	return {
		repo
	};
};
