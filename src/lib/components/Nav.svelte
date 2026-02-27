<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';

	let accueilOpen = $state(false);
	let mobileMenuOpen = $state(false);
	let navScrolled = $state(false);
	let navRef: HTMLElement | undefined;

	// Desktop: ouvrir/fermer le dropdown au survol
	function handleAccueilMouseEnter() {
		accueilOpen = true;
	}

	function handleAccueilMouseLeave() {
		accueilOpen = false;
	}

	// Mobile: toggle dropdown Accueil
	function toggleAccueilMobile() {
		accueilOpen = !accueilOpen;
	}

	function closeMobileMenu() {
		mobileMenuOpen = false;
		accueilOpen = false;
	}

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
		if (!mobileMenuOpen) accueilOpen = false;
	}

	// Scroll vers une section (comportement Vue: si pas sur /, naviguer puis le hash + scroll-margin-top gère le scroll)
	async function scrollToSection(sectionId: string, e?: Event) {
		e?.preventDefault();
		accueilOpen = false;
		closeMobileMenu();

		const isHome = $page.url.pathname === '/';

		if (!isHome) {
			await goto(`/#${sectionId}`);
			// Après navigation client-side, le hash ne scrolle pas toujours → scroll manuel
			await new Promise((r) => setTimeout(r, 350));
		}

		scrollToSectionElement(sectionId);
	}

	function scrollToSectionElement(sectionId: string) {
		// scroll-margin-top sur les sections gère l'offset navbar
		const element = document.getElementById(sectionId);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	}

	function isActive(path: string): boolean {
		if (path === '/') return $page.url.pathname === '/';
		return $page.url.pathname.startsWith(path);
	}

	onMount(() => {
		const handleScroll = () => {
			navScrolled = (window.scrollY ?? document.documentElement.scrollTop) > 100;
		};
		handleScroll(); // état initial
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	});
</script>


<nav
	bind:this={navRef}
	class="nav-modern fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-4 py-4 transition-all duration-300 lg:px-10 {navScrolled
		? 'nav-scrolled'
		: ''}"
	aria-label="Navigation principale"
>
	<!-- Logo -->
	<a href="/" class="flex items-center gap-3 no-underline" onclick={closeMobileMenu}>
		<div
			class="flex size-11 items-center justify-center rounded-full bg-accent text-text shadow-[0_0_20px_rgba(124,106,255,0.4)] transition-transform duration-300 hover:scale-110"
		>
			<i class="fa-solid fa-bolt text-lg"></i>
		</div>
		<div class="flex flex-col gap-0.5">
			<span class="text-base font-bold uppercase tracking-wider text-text">MVNUEL</span>
			<span class="text-xs text-muted">Portfolio</span>
		</div>
	</a>

	<!-- Desktop -->
	<div class="hidden items-center gap-0 lg:flex">
		<div
			class="flex items-center gap-1 rounded-xl border border-border bg-bg-2/80 p-1.5 backdrop-blur-md"
			role="group"
			aria-label="Navigation Accueil"
			onmouseenter={handleAccueilMouseEnter}
			onmouseleave={handleAccueilMouseLeave}
		>
			<div class="relative">
				<a
					href="/"
					class="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors {isActive('/')
						? 'bg-accent text-white'
						: 'text-text hover:bg-white/5'}"
				>
					<i class="fa-solid fa-home"></i>
					<span>Accueil</span>
					<i
						class="fa-solid fa-chevron-down text-xs transition-transform duration-300 {accueilOpen ? 'rotate-180' : ''}"
					></i>
				</a>
				{#if accueilOpen}
					<div
						class="dropdown-panel absolute left-0 top-[calc(100%+0.5rem)] z-[1000] min-w-[200px] overflow-hidden rounded-xl border border-border bg-bg-3/95 p-2 shadow-xl backdrop-blur-xl"
						role="menu"
						transition:slide={{ duration: 200 }}
					>
						<button
							type="button"
							role="menuitem"
							class="dropdown-item flex w-full items-center gap-2.5 rounded-md px-3 py-2.5 text-left text-sm text-text transition-colors hover:bg-white/5"
							onclick={(e) => scrollToSection('hero', e)}
						>
							<i class="fa-solid fa-arrow-up w-4 text-center text-accent"></i>
							Haut de page
						</button>
						<button
							type="button"
							role="menuitem"
							class="dropdown-item flex w-full items-center gap-2.5 rounded-md px-3 py-2.5 text-left text-sm text-text transition-colors hover:bg-white/5"
							onclick={(e) => scrollToSection('about', e)}
						>
							<i class="fa-solid fa-user w-4 text-center text-accent"></i>
							À propos
						</button>
						<button
							type="button"
							role="menuitem"
							class="dropdown-item flex w-full items-center gap-2.5 rounded-md px-3 py-2.5 text-left text-sm text-text transition-colors hover:bg-white/5"
							onclick={(e) => scrollToSection('competences', e)}
						>
							<i class="fa-solid fa-code w-4 text-center text-accent"></i>
							Compétences
						</button>
						<button
							type="button"
							role="menuitem"
							class="dropdown-item flex w-full items-center gap-2.5 rounded-md px-3 py-2.5 text-left text-sm text-text transition-colors hover:bg-white/5"
							onclick={(e) => scrollToSection('projects', e)}
						>
							<i class="fa-solid fa-briefcase w-4 text-center text-accent"></i>
							Projets
						</button>
						<button
							type="button"
							role="menuitem"
							class="dropdown-item flex w-full items-center gap-2.5 rounded-md px-3 py-2.5 text-left text-sm text-text transition-colors hover:bg-white/5"
							onclick={(e) => scrollToSection('contact', e)}
						>
							<i class="fa-solid fa-envelope w-4 text-center text-accent"></i>
							Contact
						</button>
					</div>
				{/if}
			</div>
			<a
				href="/blog"
				class="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors {isActive('/blog')
					? 'bg-accent text-white'
					: 'text-text hover:bg-white/5'}"
			>
				<i class="fa-solid fa-rss text-accent"></i>
				<span>Blog</span>
			</a>
			<a
				href="/projects"
				class="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors {isActive('/projects')
					? 'bg-accent text-white'
					: 'text-text hover:bg-white/5'}"
			>
				<i class="fa-solid fa-briefcase text-accent"></i>
				<span>Projets</span>
			</a>
			<a
				href="/roadmap"
				class="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors {isActive('/roadmap')
					? 'bg-accent text-white'
					: 'text-text hover:bg-white/5'}"
			>
				<i class="fa-solid fa-map text-accent"></i>
				<span>Roadmap</span>
			</a>
		</div>
	</div>

	<!-- Bouton Contact + Hamburger mobile -->
	<div class="flex items-center gap-3">
		<button
			type="button"
			onclick={(e) => scrollToSection('contact', e)}
			class="hidden rounded-xl bg-accent px-5 py-2.5 text-sm font-medium text-white transition-all hover:opacity-90 hover:-translate-y-px md:inline-flex md:items-center md:gap-2"
		>
			<i class="fa-solid fa-envelope"></i>
			<span>Voir CV</span>
		</button>

		<!-- Hamburger mobile -->
		<button
			type="button"
			class="flex size-12 items-center justify-center rounded-full border-2 border-accent/30 text-accent transition-colors hover:bg-accent hover:text-white lg:hidden"
			onclick={toggleMobileMenu}
			aria-expanded={mobileMenuOpen}
			aria-controls="mobile-menu"
			aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
		>
			<i
				class="fa-solid text-xl transition-transform duration-300 {mobileMenuOpen ? 'fa-xmark rotate-90' : 'fa-bars'}"
			></i>
		</button>
	</div>
</nav>

<!-- Menu mobile -->
{#if mobileMenuOpen}
	<div
		id="mobile-menu"
		class="mobile-menu fixed inset-x-0 top-[4.5rem] z-[99] overflow-y-auto px-4 pb-6 lg:hidden"
		transition:slide={{ duration: 250 }}
	>
		<div class="rounded-2xl border border-border bg-bg-2/95 p-4 backdrop-blur-xl">
			<!-- Accueil expandable -->
			<div class="mb-2">
				<button
					type="button"
					class="mobile-menu-item flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-text transition-colors hover:bg-white/5"
					onclick={toggleAccueilMobile}
				>
					<div class="flex items-center gap-3">
						<i class="fa-solid fa-home w-4 text-center text-accent"></i>
						<span class="font-medium">Accueil</span>
					</div>
					<i
						class="fa-solid fa-chevron-down text-accent transition-transform duration-300 {accueilOpen ? 'rotate-180' : ''}"
					></i>
				</button>
				{#if accueilOpen}
					<div class="ml-6 mt-2 space-y-1 border-l-2 border-accent/20 pl-4" transition:slide={{ duration: 200 }}>
						<button
							type="button"
							class="mobile-menu-item flex w-full items-center gap-2 rounded-lg px-4 py-2.5 text-left text-sm text-text transition-colors hover:text-accent"
							onclick={(e) => scrollToSection('hero', e)}
						>
							<i class="fa-solid fa-arrow-up w-4 text-accent"></i>
							Haut de page
						</button>
						<button
							type="button"
							class="mobile-menu-item flex w-full items-center gap-2 rounded-lg px-4 py-2.5 text-left text-sm text-text transition-colors hover:text-accent"
							onclick={(e) => scrollToSection('about', e)}
						>
							<i class="fa-solid fa-user w-4 text-accent"></i>
							À propos
						</button>
						<button
							type="button"
							class="mobile-menu-item flex w-full items-center gap-2 rounded-lg px-4 py-2.5 text-left text-sm text-text transition-colors hover:text-accent"
							onclick={(e) => scrollToSection('competences', e)}
						>
							<i class="fa-solid fa-code w-4 text-accent"></i>
							Compétences
						</button>
						<button
							type="button"
							class="mobile-menu-item flex w-full items-center gap-2 rounded-lg px-4 py-2.5 text-left text-sm text-text transition-colors hover:text-accent"
							onclick={(e) => scrollToSection('projects', e)}
						>
							<i class="fa-solid fa-briefcase w-4 text-accent"></i>
							Projets
						</button>
						<button
							type="button"
							class="mobile-menu-item flex w-full items-center gap-2 rounded-lg px-4 py-2.5 text-left text-sm text-text transition-colors hover:text-accent"
							onclick={(e) => scrollToSection('contact', e)}
						>
							<i class="fa-solid fa-envelope w-4 text-accent"></i>
							Contact
						</button>
					</div>
				{/if}
			</div>
			<a
				href="/blog"
				class="mobile-menu-item flex items-center gap-3 rounded-xl px-4 py-3 text-text transition-colors hover:bg-white/5 hover:text-accent"
				onclick={closeMobileMenu}
			>
				<i class="fa-solid fa-rss w-4 text-accent"></i>
				<span class="font-medium">Blog</span>
			</a>
			<a
				href="/projects"
				class="mobile-menu-item flex items-center gap-3 rounded-xl px-4 py-3 text-text transition-colors hover:bg-white/5 hover:text-accent"
				onclick={closeMobileMenu}
			>
				<i class="fa-solid fa-briefcase w-4 text-accent"></i>
				<span class="font-medium">Projets</span>
			</a>
			<a
				href="/roadmap"
				class="mobile-menu-item flex items-center gap-3 rounded-xl px-4 py-3 text-text transition-colors hover:bg-white/5 hover:text-accent"
				onclick={closeMobileMenu}
			>
				<i class="fa-solid fa-map w-4 text-accent"></i>
				<span class="font-medium">Roadmap</span>
			</a>
			<div class="mt-4 border-t border-border pt-4">
				<button
					type="button"
					onclick={(e) => {
						closeMobileMenu();
						scrollToSection('contact', e);
					}}
					class="flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 font-medium text-white transition-all hover:opacity-90"
				>
					<i class="fa-solid fa-envelope"></i>
					<span>Contact</span>
				</button>
			</div>
		</div>
	</div>
{/if}
