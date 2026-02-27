<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>Blog — Luc-Emmanuel Koffi</title>
</svelte:head>

<section class="portfolio-section">
	<div class="section-inner">
		<div class="section-tag">// Blog</div>
		<h1>Articles</h1>
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
