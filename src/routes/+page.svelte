<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Project, BlogPost } from './+page.server';

	let { data, form } = $props();
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
	<title>Luc-Emmanuel Koffi — Développeur Web</title>
</svelte:head>

<div class="-mt-20">
	<!-- Hero -->
	<section id="hero" class="portfolio-hero">
		<div class="hero-glow"></div>
		<div class="hero-glow2"></div>
		<div class="hero-inner">
			<div class="hero-content">
				<div class="hero-badge">
					<span class="dot"></span>
					Disponible pour de nouvelles opportunités
				</div>
				<h1 class="hero-title">
					Salut, je suis<br />
					<span class="text-gradient">Luc-Emmanuel Koffi</span>
				</h1>
				<p class="hero-desc">
					Développeur web junior passionné, spécialisé dans la création d'APIs robustes avec <strong>Django REST Framework</strong> et de la mise en production sur des plateformes cloud modernes.
				</p>
				<div class="hero-actions">
					<a href="#projects" class="btn-primary">
						Voir mes projets
						<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
					</a>
					<a href="#contact" class="btn-outline">
						<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="2" y="4" width="12" height="9" rx="1.5" /><path d="M2 5.5l6 4 6-4" stroke-linecap="round" stroke-linejoin="round" /></svg>
						Me contacter
					</a>
				</div>
			</div>

			<div class="hero-card">
				<pre class="code-block"><code><span class="code-comment">// developer.json</span>
<span class="code-bracket">{'{'}</span>
  <span class="code-key">"name"</span>: <span class="code-str">"Luc-Emmanuel Koffi"</span>,
  <span class="code-key">"role"</span>: <span class="code-str">"Backend Developer"</span>,
  <span class="code-key">"location"</span>: <span class="code-str">"Abidjan, Côte d'Ivoire 🇨🇮"</span>,
  <span class="code-key">"email"</span>: <span class="code-str">"luckemmanuel09@gmail.com"</span>,
  <span class="code-key">"stack"</span>: <span class="code-bracket">[</span>
    <span class="code-str">"Python"</span>, <span class="code-str">"Django"</span>,
    <span class="code-str">"DRF"</span>, <span class="code-str">"PostgreSQL"</span>,
    <span class="code-str">"JWT"</span>, <span class="code-str">"REST APIs"</span>
  <span class="code-bracket">]</span>,
  <span class="code-key">"openToWork"</span>: <span class="code-bool">true</span>,
  <span class="code-key">"coffeeLevel"</span>: <span class="code-num">99</span>
<span class="code-bracket">{'}'}</span></code></pre>
				<div class="hero-stats">
					<div class="stat">
						<div class="stat-num">3+</div>
						<div class="stat-label">Projets livrés</div>
					</div>
					<div class="stat">
						<div class="stat-num">2</div>
						<div class="stat-label">Clouds déployés</div>
					</div>
					<div class="stat">
						<div class="stat-num">100%</div>
						<div class="stat-label">Passion</div>
					</div>
				</div>
			</div>
		</div>
	</section>
	<!-- About -->
	<section id="about" class="portfolio-section">
		<div class="section-inner">
			<div class="section-tag">// À propos</div>
			<h2>Qui suis-je ?</h2>
			<div class="about-grid">
				<div class="about-text">
					<p>Je suis un développeur web junior basé à <strong>Abidjan, Côte d'Ivoire</strong>, passionné par la construction de backends solides et d'APIs bien conçues.</p>
					<p>Mon expérience tourne principalement autour de <strong>Django et Django REST Framework</strong>, avec une attention particulière portée à la sécurité, aux bonnes pratiques (JWT, CORS, HTTPS) et au déploiement en production.</p>
					<p>J'aime concevoir des systèmes qui tiennent la route : de la modélisation de la base de données à la mise en ligne sur des plateformes cloud comme <strong>Render et Railway</strong>.</p>

					<div class="info-list">
						<div class="info-item">
							<div class="info-icon">📍</div>
							<div>
								<div class="info-label">Localisation</div>
								<div class="info-value">Abidjan, Côte d'Ivoire</div>
							</div>
						</div>
						<div class="info-item">
							<div class="info-icon">✉️</div>
							<div>
								<div class="info-label">Email</div>
								<div class="info-value">luckemmanuel09@gmail.com</div>
							</div>
						</div>
						<div class="info-item">
							<div class="info-icon">🌐</div>
							<div>
								<div class="info-label">Site web</div>
								<div class="info-value">mvnuel.com</div>
							</div>
						</div>
						<div class="info-item">
							<div class="info-icon">🎯</div>
							<div>
								<div class="info-label">Disponibilité</div>
								<div class="info-value">Ouvert aux opportunités</div>
							</div>
						</div>
					</div>
				</div>

			</div>
		</div>
	</section>

	<!-- Compétences -->
	<section id="competences" class="portfolio-section">
		<div class="section-inner">
			<div class="section-tag">// Compétences</div>
			<h2>Technologies & stack préféré</h2>
			<p class="section-desc">Les outils et technologies que je maîtrise, avec une prédilection pour l'écosystème Python et le déploiement cloud.</p>

			<div class="competences-content">
				<div class="competences-stack">
					<h3 class="competences-subtitle">Stack préféré</h3>
					<div class="stack-list">
						<div class="stack-item">
							<span class="stack-label">Backend</span>
							<span class="stack-value">Python · Django · DRF · Gunicorn</span>
						</div>
						<div class="stack-item">
							<span class="stack-label">Base de données</span>
							<span class="stack-value">PostgreSQL · SQLite · Migrations</span>
						</div>
						<div class="stack-item">
							<span class="stack-label">API & Auth</span>
							<span class="stack-value">REST · JWT · CORS · HTTPS</span>
						</div>
						<div class="stack-item">
							<span class="stack-label">DevOps & Cloud</span>
							<span class="stack-value">Render · Railway · Env Config</span>
						</div>
					</div>
				</div>
				<div class="skills-grid">
					<div class="skill-category">
						<div class="skill-cat-title">Backend</div>
						<div class="skill-tags">
							<span class="skill-tag">Python</span>
							<span class="skill-tag">Django</span>
							<span class="skill-tag">DRF</span>
							<span class="skill-tag">Gunicorn</span>
						</div>
					</div>
					<div class="skill-category">
						<div class="skill-cat-title">Base de données</div>
						<div class="skill-tags">
							<span class="skill-tag">PostgreSQL</span>
							<span class="skill-tag">SQLite</span>
							<span class="skill-tag">Migrations</span>
						</div>
					</div>
					<div class="skill-category">
						<div class="skill-cat-title">Auth & Sécurité</div>
						<div class="skill-tags">
							<span class="skill-tag">JWT</span>
							<span class="skill-tag">CORS</span>
							<span class="skill-tag">HTTPS</span>
							<span class="skill-tag">HSTS</span>
							<span class="skill-tag">CSRF</span>
						</div>
					</div>
					<div class="skill-category">
						<div class="skill-cat-title">DevOps & Cloud</div>
						<div class="skill-tags">
							<span class="skill-tag">Render</span>
							<span class="skill-tag">Railway</span>
							<span class="skill-tag">Env Config</span>
							<span class="skill-tag">Logging</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Projects -->
	<section id="projects" class="portfolio-section">
		<div class="section-inner">
			<div class="section-tag">// Projets</div>
			<h2>Ce que j'ai construit</h2>
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

	<!-- Blog -->
	<section id="blog" class="portfolio-section">
		<div class="section-inner">
			<div class="section-tag">// Blog</div>
			<h2>Articles récents</h2>
			<p class="section-desc">Je partage mes apprentissages, retours d'expérience et découvertes techniques.</p>

			<div class="blog-grid">
				{#if data.blogError}
					<p class="text-muted text-sm">{data.blogError}</p>
				{:else if data.blogPosts.length === 0}
					<p class="text-muted text-sm">Aucun article pour le moment.</p>
				{:else}
					{#each data.blogPosts as post (post.id)}
						<a href="/blog/{post.slug}" class="blog-card block no-underline">
							<div class="blog-thumb">📝</div>
							<div class="blog-body">
								<div class="blog-meta">
									{#if post.category}
										<span class="blog-cat">{post.category.name}</span>
									{/if}
									<span>· {post.read_time ?? 5} min de lecture</span>
								</div>
								<div class="blog-title">{post.title}</div>
								<p class="blog-excerpt">{post.excerpt ?? post.title}</p>
								<span class="blog-read-more">Lire l'article →</span>
							</div>
						</a>
					{/each}
				{/if}
			</div>
		</div>
	</section>

	<!-- Contact -->
	<section id="contact" class="portfolio-section">
		<div class="section-inner">
			<div class="section-tag">// Contact</div>
			<h2>Travaillons ensemble</h2>
			<div class="contact-wrapper">
				<div class="contact-info">
					<p>Vous avez un projet à développer, une question ou simplement envie d'échanger ? N'hésitez pas à me contacter, je réponds sous 24h.</p>
					<div class="contact-links">
						<a href="mailto:luckemmanuel09@gmail.com" class="contact-link-item">
							<div class="contact-link-icon">✉️</div>
							<div><div class="contact-link-label">Email</div><div class="contact-link-val">luckemmanuel09@gmail.com</div></div>
						</a>
						<a href="https://mvnuel.com" class="contact-link-item">
							<div class="contact-link-icon">🌐</div>
							<div><div class="contact-link-label">Site web</div><div class="contact-link-val">mvnuel.com</div></div>
						</a>
						<a href="#" class="contact-link-item">
							<div class="contact-link-icon">💼</div>
							<div><div class="contact-link-label">LinkedIn</div><div class="contact-link-val">linkedin.com/in/luc-emmanuel-koffi</div></div>
						</a>
						<a href="#" class="contact-link-item">
							<div class="contact-link-icon">🐙</div>
							<div><div class="contact-link-label">GitHub</div><div class="contact-link-val">github.com/mvnuel</div></div>
						</a>
					</div>
				</div>

				<form class="contact-form" method="POST" action="?/contact" use:enhance>
					{#if form?.contact?.success && 'message' in form.contact}
						<p class="text-green text-sm">{form.contact.message}</p>
					{:else if form?.contact && 'error' in form.contact}
						<p class="text-red-500 text-sm">{form.contact.error}</p>
					{/if}
					<div class="form-row">
						<div class="form-group">
							<label for="fname">Prénom</label>
							<input type="text" id="fname" name="first_name" placeholder="Jean" />
						</div>
						<div class="form-group">
							<label for="lname">Nom</label>
							<input type="text" id="lname" name="last_name" placeholder="Dupont" />
						</div>
					</div>
					<div class="form-group">
						<label for="email">Email</label>
						<input type="email" id="email" name="email" placeholder="jean@exemple.com" required />
					</div>
					<div class="form-group">
						<label for="subject">Sujet</label>
						<input type="text" id="subject" name="subject" placeholder="Proposition de projet" />
					</div>
					<div class="form-group">
						<label for="message">Message</label>
						<textarea id="message" name="message" placeholder="Décrivez votre projet ou votre demande…" required></textarea>
					</div>
					<button type="submit" class="form-submit">Envoyer le message</button>
				</form>
			</div>
		</div>
	</section>
</div>

