<script>
	import { slide, fade } 		from "svelte/transition";

    import { page } 			from "$app/stores";
    import { directoryStatus } 	from "$lib/settings/navigationHandling.js";

    import RedirectBuilder 		from "$root/components/generic/wrappers/redirects/internalRedirectBuilder.svelte";
    import InlineTag 			from "$root/components/generic/wrappers/tags/inlineGenreTag.svelte";

    export let
		tagSet = [],
		urlRedirect;
    export let
		tagsOpen = 		false,
        redirectType = "gallery";

    let active = 		false,
		copied = 		false,
		timer;

    const copy = () => {
        const { origin, pathname, search } = $page.url;
        const galleryParam = `${redirectType}=${urlRedirect}`;
        const redirectOutput = search.includes(redirectType)
            ? `${origin}${pathname}${search}`
            : `${origin}${pathname}${search ? `${search}&${galleryParam}` : `?${galleryParam}`}`;

        navigator.clipboard.writeText(redirectOutput)
            .then(() => {
                copied = true;
                setTimeout(() => { copied = false; }, 3000);})
            .catch(err => {
                console.error('Error copying text: ', err);});
    };
</script>

<div class="controls" on:click|stopPropagation>
	<div class="buttonWrapper"
		 class:copied on:click={()=>copy()}>
		<div class="button"
			 on:click={()=>copy()}>
			{#if !copied}
				<img src="/icons/linkIcon.webp" transition:fade />
			{:else}
				<img src="/icons/celebratIcon.webp" transition:fade />
			{/if}
		</div>
	</div>
	{#if tagSet?.length > 0 && !tagsOpen}
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

{#if tagSet.length > 0 && active || tagsOpen}
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
		float: 		right;
		display: 	table;
		gap: 		5px;
		margin: 	3px -2px 6px auto;
		> *:first-child {
			margin: 0 0 0 auto;}}

	.buttonWrapper {
		display: 	inline-flex;
		gap: 		5px;
		border-radius: 25px;
		background: var(--dark1);
		transition: background .3s ease;

		&:hover {		background: var(--accent1);
			.button {	background: var(--accent1);
				img {	filter: 	invert(1);}}}

		&.copied {		background: var(--pure1);
			.button {	background: var(--pure1);
				img { 	filter: 	invert(0);}}}}

	.button {
		display: 		inline-flex;
		white-space: 	nowrap;
		border-radius: 	50%;
		transition: 	background .3s ease;

		img {
			transition: filter .3s ease;
			filter: 	invert(1);
			width: 		20px;
			height: 	20px;
			margin: 	auto;
			display: 	flex;
			padding: 	6px;}
		img:last-of-type:not(:first-child){
			position: 	absolute;}

		&.active {
			background: 	var(--pure1);
			img { filter: 	invert(0)}}}

	.postTags {	margin: 	12px 0 0 0;}
</style>