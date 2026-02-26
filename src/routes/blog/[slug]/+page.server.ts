import { error } from '@sveltejs/kit';
import { env } from '$env/dynamic/public';
import type { PageServerLoad } from './$types';

const BACKEND_URL = env.PUBLIC_BACKEND_URL ?? 'http://localhost:8000';

export const load: PageServerLoad = async ({ params }) => {
	const res = await fetch(`${BACKEND_URL}/api/blog/posts/${params.slug}/`);

	if (!res.ok) {
		if (res.status === 404) throw error(404, 'Article non trouvé');
		throw error(res.status, 'Erreur lors du chargement');
	}

	const post = await res.json();
	return { post };
};
