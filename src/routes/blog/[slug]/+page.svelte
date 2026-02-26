<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>{data.post.title} — Luc-Emmanuel Koffi</title>
</svelte:head>

<div class="prose prose-invert mx-auto max-w-3xl px-6 py-16">
	<a href="/#blog" class="text-accent-2 no-underline hover:underline">← Retour aux articles</a>
	<article class="mt-8">
		<h1>{data.post.title}</h1>
		{#if data.post.category}
			<p class="text-muted">{data.post.category.name} · {data.post.read_time ?? 0} min de lecture</p>
		{/if}
		{#if data.post.rendered_content}
			{@html data.post.rendered_content}
		{:else}
			<p class="whitespace-pre-wrap">{data.post.content}</p>
		{/if}
	</article>
</div>
