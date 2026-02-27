<script lang="ts">
	import type { Project } from './+page.server';

	let { data } = $props();

	const statusLabel: Record<string, string> = {
		completed: 'Complété',
		in_progress: 'En production',
		on_hold: 'En pause',
		planned: 'Planifié'
	};

	function getTechs(project: Project): string[] {
		const t = project.technologies;
		if (Array.isArray(t)) return t;
		if (typeof t === 'string') {
			try {
				const parsed = JSON.parse(t);
				return Array.isArray(parsed) ? parsed : [];
			} catch {
				return [];
			}
		}
		return [];
	}
</script>

<svelte:head>
	<title>Projets — Luc-Emmanuel Koffi</title>
</svelte:head>

<section class="portfolio-section">
	<div class="section-inner">
		<div class="section-tag">// Projets</div>
		<h1>Ce que j'ai construit</h1>
		<p class="section-desc">Des projets concrets qui reflètent mes compétences en développement backend et en mise en production.</p>

		<div class="projects-grid">
			{#if data.projectsError}
				<p class="text-muted text-sm">{data.projectsError}</p>
			{:else if data.projects.length === 0}
				<p class="text-muted text-sm">Aucun projet pour le moment.</p>
			{:else}
				{#each data.projects as project (project.id)}
					<div class="project-card">
						<div class="project-header">
							<div class="project-icon">🛠️</div>
							<div class="project-links">
								{#if project.github_url}
									<a href={project.github_url} target="_blank" rel="noopener noreferrer" class="project-link" title="GitHub"><svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg></a>
								{/if}
								{#if project.live_url}
									<a href={project.live_url} target="_blank" rel="noopener noreferrer" class="project-link" title="Live"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M7 2H3a1 1 0 00-1 1v10a1 1 0 001 1h10a1 1 0 001-1V9M10 2h4m0 0v4m0-4L7 9" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
								{/if}
							</div>
						</div>
						<div><div class="project-status"><span class="dot"></span> {statusLabel[project.status] ?? project.status}</div></div>
						<div class="project-title">{project.title}</div>
						<p class="project-desc">{project.short_description || project.title}</p>
						<div class="project-techs">
							{#each getTechs(project) as tech}
								<span class="tech-tag">{tech}</span>
							{/each}
						</div>
					</div>
				{/each}
			{/if}
		</div>
	</div>
</section>
