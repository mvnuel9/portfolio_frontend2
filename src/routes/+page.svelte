<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Project, BlogPost } from './+page.server';

	let { data, form } = $props();
	let accueilOpen = $state(false);

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

<div class="portfolio-noise">
	<!-- Nav -->
	<nav
		class="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 py-4 bg-bg border-b border-border lg:px-10"
	>
		<a href="#hero" class="flex items-center gap-3 no-underline">
			<div
				class="flex size-11 items-center justify-center rounded-full bg-accent text-text shadow-[0_0_20px_rgba(124,106,255,0.4)]"
			>
				<i class="fa-solid fa-bolt text-lg"></i>
			</div>
			<div class="flex flex-col gap-0.5">
				<span class="text-base font-bold uppercase tracking-wider text-text">MVNUEL</span>
				<span class="text-xs text-muted">Portfolio</span>
			</div>
		</a>

		<div class="hidden items-center lg:flex">
			<div
				class="flex items-center gap-1 rounded-xl border border-border bg-bg-2 p-1.5"
			>
				<div class="relative">
					<button
						type="button"
						class="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white transition-colors"
						aria-expanded={accueilOpen}
						aria-haspopup="true"
						onclick={() => (accueilOpen = !accueilOpen)}
					>
						<i class="fa-solid fa-home"></i>
						<span>Accueil</span>
						<i class="fa-solid fa-chevron-up text-xs"></i>
					</button>
					{#if accueilOpen}
						<div
							class="absolute left-0 top-[calc(100%+0.5rem)] z-[1000] min-w-[200px] rounded-xl border border-border bg-bg-3 p-2 shadow-xl"
							role="menu"
						>
							<a
								href="#hero"
								role="menuitem"
								class="flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm text-text transition-colors hover:bg-white/5"
								onclick={() => (accueilOpen = false)}
							>
								<i class="fa-solid fa-arrow-up w-4 text-center text-accent"></i>
								Haut de page
							</a>
							<a
								href="#about"
								role="menuitem"
								class="flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm text-text transition-colors hover:bg-white/5"
								onclick={() => (accueilOpen = false)}
							>
								<i class="fa-solid fa-user w-4 text-center text-accent"></i>
								À propos
							</a>
							<a
								href="#about"
								role="menuitem"
								class="flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm text-text transition-colors hover:bg-white/5"
								onclick={() => (accueilOpen = false)}
							>
								<i class="fa-solid fa-code w-4 text-center text-accent"></i>
								Compétences
							</a>
							<a
								href="#projects"
								role="menuitem"
								class="flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm text-text transition-colors hover:bg-white/5"
								onclick={() => (accueilOpen = false)}
							>
								<i class="fa-solid fa-briefcase w-4 text-center text-accent"></i>
								Projets
							</a>
							<a
								href="#contact"
								role="menuitem"
								class="flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm text-text transition-colors hover:bg-white/5"
								onclick={() => (accueilOpen = false)}
							>
								<i class="fa-solid fa-envelope w-4 text-center text-accent"></i>
								Contact
							</a>
						</div>
					{/if}
				</div>
				<a
					href="#blog"
					class="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-text transition-colors hover:bg-white/5"
				>
					<i class="fa-solid fa-rss text-accent"></i>
					<span>Blog</span>
				</a>
				<a
					href="#projects"
					class="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-text transition-colors hover:bg-white/5"
				>
					<i class="fa-solid fa-briefcase text-accent"></i>
					<span>Projets</span>
				</a>
				<a
					href="#"
					class="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-text transition-colors hover:bg-white/5"
				>
					<i class="fa-solid fa-map text-accent"></i>
					<span>Roadmap</span>
				</a>
			</div>
		</div>

		<a
			href="#contact"
			class="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-medium text-white transition-all hover:opacity-90 hover:-translate-y-px"
		>
			<i class="fa-solid fa-envelope"></i>
			<span>Contact</span>
		</a>
	</nav>

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

				<div>
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

	<!-- Footer -->
	<footer class="portfolio-footer">
		<div class="footer-copy">© 2025 Luc-Emmanuel Koffi — Construit avec ❤️ depuis Abidjan</div>
		<div class="footer-socials">
			<a href="#" class="social-btn" title="GitHub"><svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg></a>
			<a href="#" class="social-btn" title="LinkedIn"><svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor"><path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 01.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/></svg></a>
			<a href="mailto:luckemmanuel09@gmail.com" class="social-btn" title="Email"><svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="1" y="3" width="14" height="10" rx="1.5" /><path d="M1 4.5l7 5 7-5" stroke-linecap="round" stroke-linejoin="round" /></svg></a>
		</div>
	</footer>
</div>
