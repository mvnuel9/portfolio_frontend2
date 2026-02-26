import { fail } from '@sveltejs/kit';
import { env } from '$env/dynamic/public';
import type { Actions, PageServerLoad } from './$types';

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

export interface BlogPost {
	id: number;
	title: string;
	slug: string;
	excerpt?: string;
	read_time?: number;
	category?: { name: string; slug: string } | null;
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

export const load: PageServerLoad = async () => {
	const [projectsRes, blogRes] = await Promise.all([
		fetchApi<{ results?: Project[] } | Project[]>('/api/projects/'),
		fetchApi<{ results?: BlogPost[] } | BlogPost[]>('/api/blog/posts/')
	]);

	const projects = 'data' in projectsRes ? toArray<Project>(projectsRes.data) : [];
	const blogPosts = 'data' in blogRes ? toArray<BlogPost>(blogRes.data) : [];

	return {
		projects,
		blogPosts,
		projectsError: 'error' in projectsRes ? projectsRes.error : null,
		blogError: 'error' in blogRes ? blogRes.error : null
	};
};

export const actions: Actions = {
	contact: async ({ request }) => {
		const formData = await request.formData();
		const firstName = formData.get('first_name')?.toString() ?? '';
		const lastName = formData.get('last_name')?.toString() ?? '';
		const name = [firstName, lastName].filter(Boolean).join(' ') || 'Anonyme';
		const email = formData.get('email')?.toString() ?? '';
		const subject = formData.get('subject')?.toString() ?? 'Message depuis le portfolio';
		const message = formData.get('message')?.toString() ?? '';

		if (!email || !message) {
			return fail(400, {
				contact: { error: 'Email et message sont requis.', success: false }
			});
		}

		const res = await fetch(`${BACKEND_URL}/api/contact/`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ name, email, subject, message })
		});

		if (!res.ok) {
			let errMsg = 'Erreur lors de l\'envoi.';
			try {
				const err = await res.json();
				errMsg = err.detail ?? err.message ?? JSON.stringify(err);
			} catch {
				errMsg = await res.text() || errMsg;
			}
			return fail(res.status, {
				contact: { error: errMsg, success: false }
			});
		}

		return { contact: { success: true, message: 'Message envoyé avec succès !' } };
	}
};
