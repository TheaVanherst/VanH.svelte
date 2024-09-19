<script>
	import { slide, fade } from "svelte/transition";

    import { page } from "$app/stores";
    import { directoryStatus } 	from "$lib/controllers/layoutControllers/navigationHandling.js";

    import RedirectBuilder 	from "$root/components/generic/wrappers/tags & Inline/redirects/internalRedirectBuilder.svelte";
    import InlineTag 		from "$root/components/generic/wrappers/tags & Inline/tags/inlineGenreTag.svelte";

    export let
		tagSet,
		urlRedirect,
		redirectType,
		inverted = false;

    let active = false,
		copied = false,
		timer;

    const copy = (url) => {
        let urlQueryCheck = ($page.url.search !== "" ? $page.url.search + "&" : "?")
        navigator.clipboard.writeText($page.url.origin + $page.url.pathname + urlQueryCheck + redirectType + urlRedirect);
        copied = true;
        setTimeout(() => { copied = false; }, 3000);};
</script>

<div class="controls" class:inverted on:click|stopPropagation>
	<div class="buttonWrapper"
		 class:copied on:click={()=>copy(urlRedirect)}>
		<div class="button"
			 	on:click={()=>copy(urlRedirect)}>
			<img src="/icons/linkIcon.webp"/></div></div>
	{#if tagSet.length > 0}
		<div class="buttonWrapper"
				on:mouseenter={() => clearInterval(timer)}
				on:mouseleave={() => timer = setInterval(function () {active = false;}, 2000)}>
			<div class="button" class:active id="tagButton">
				{#if !active}
					<img src="/icons/tagIcon.webp" on:click={()=>active=true} transition:fade />
				{:else}
					<img src="/icons/refoldIcon.webp" on:click={()=>active=false} transition:fade />
				{/if}
			</div>
		</div>
	{/if}
</div>

{#if tagSet.length > 0 && active}
	<div class="postTags" transition:slide on:click|stopPropagation
		 on:mouseenter={() => clearInterval(timer)}
		 on:mouseleave={() => timer = setInterval(function () {active = false;}, 2000)}>
		{#each tagSet as tag}
			<RedirectBuilder url="{$directoryStatus.strippedUrl}?query={tag.title.toLowerCase().replaceAll(' ','_')}">
				<InlineTag {tag}/>
			</RedirectBuilder>
		{/each}
	</div>
{/if}

<style lang="scss">
	.controls {
		display: 	table;
		gap: 		5px;
		margin: 	-35px -2px -2px auto;

		> *:first-child {
			margin: 0 0 0 auto;}}

	.buttonWrapper {
		display: 	inline-flex;
		gap: 		5px;
		border-radius: 13px;
		background: var(--accent9);
		transition: background .3s ease;

		&:hover {
			background: var(--accent7);
			.button {	background: var(--accent7);
				img {filter: invert(1);}}}

		&.copied {
			background: var(--accent10);
			.button {
				background: var(--accent10);
				img { filter: invert(0);}}}}

	.button {
		display: 		inline-flex;
		white-space: 	nowrap;
		border-radius: 	50%;

		transition: background .3s ease;

		img {
			transition: filter .3s ease;
			filter: invert(1);
			width: 	22px;
			height: 22px;
			margin: auto;
			display: flex;
			padding: 6px;}

		&.active {
			background: var(--accent10);
			img { filter: invert(0)}}}

	#tagButton {
		img:last-of-type:not(:first-child){
			position: absolute;}}

	.postTags {	margin: 	10px 0 0 0;
		div {	display: 	contents;}}

</style>