import { env } from '$env/dynamic/public';

const BACKEND_URL = env.PUBLIC_BACKEND_URL ?? 'http://localhost:8000';

export interface Project {
	id: number;
	title: string;
	slug: string;
	short_description?: string;
	technologies?: string[];
	status: string;
	github_url?: string | null;
	live_url?: string | null;
	image?: string | null;
}

async function fetchApi<T>(path: string): Promise<{ data: T } | { error: string }> {
	try {
		const res = await fetch(`${BACKEND_URL}${path}`);
		if (!res.ok) {
			const text = await res.text();
			return { error: `API error ${res.status}: ${text}` };
		}
		const data = await res.json();
		return { data };
	} catch (e) {
		return { error: e instanceof Error ? e.message : 'Erreur réseau' };
	}
}

function toArray<T>(x: unknown): T[] {
	if (Array.isArray(x)) return x as T[];
	if (x && typeof x === 'object' && 'results' in x && Array.isArray((x as { results: unknown }).results)) {
		return (x as { results: T[] }).results;
	}
	return [];
}

export const load = async () => {
	const projectsRes = await fetchApi<{ results?: Project[] } | Project[]>('/api/projects/');
	const projects = 'data' in projectsRes ? toArray<Project>(projectsRes.data) : [];
	return {
		projects,
		projectsError: 'error' in projectsRes ? projectsRes.error : null
	};
};
