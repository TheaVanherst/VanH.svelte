<script>
    import * as transitionFunctions from 'svelte/transition';
    import { fade, slide } 			from "svelte/transition";

    import { page } 	from "$app/stores";
    import { goto } 	from "$app/navigation";
    import { onMount } 	from "svelte";

    import { directoryStatus } from "$lib/settings/navigationHandling.js";

    import SanityImage 	from "$root/serializer/sanityImage.svelte";
    import AuthorCard 	from "$root/components/pageSpecific/queryPages/author/authorCard.svelte";

    let currentAuthorSelected;

    export let data;

    const
		authorUpdate = (author) => {
            currentAuthorSelected = author
            window.scrollTo({top: 0, behavior: 'smooth'});
            setTimeout(async () => {
                $page.url.searchParams.set('user',author.slug);
                const newQuery = `?${$page.url.searchParams.toString()}`;
                $directoryStatus.query = newQuery;
                await goto (newQuery);
            }, 350);};

	let transition = transitionFunctions['fade']

    onMount(() => { // jannk transition to stop sliding on initial page load-in
        const
			initialSlug = $page.url.searchParams.get('user');
        	currentAuthorSelected = data.authorData.map(i => {return i.slug === initialSlug ? i : data.authorData[0];}).filter(n => n)[0];
        setTimeout(() => {
            transition = transitionFunctions['slide']}, 250);})
</script>

{#if currentAuthorSelected}
	<div class="focusedAuthorController" in:transition={{axis: 'x', delay: 150}} out:slide={{axis: 'x'}}>
		<div class="focusedAuthorMarginWrapper">
			<div class="authorSelection wideBorder">
				{#each data.authorData as author}
					{#if author.searchable}
						<div class="icon"
							 class:active={currentAuthorSelected.slug === author.slug}
							 on:click={() => {authorUpdate(author)}}>
							<div class="rounded">
								{#if author.userPortrait}
									<SanityImage image={author.userPortrait}/>
								{/if}
							</div>
						</div>
					{/if}
				{/each}
			</div>

			<div class="keyAbsoluter">
				{#key currentAuthorSelected}
					<div class="focusedAuthor" transition:fade>
						<AuthorCard author={currentAuthorSelected}/>
					</div>
				{/key}
			</div>
		</div>
	</div>
{/if}

<style lang="scss">
	.authorSlideController, .focusedAuthorController {
		width: 100%;
		margin-bottom: 15px;
		.authorMarginWrapper, .focusedAuthorMarginWrapper {
			gap: 		15px;
			margin: 	0 auto;
			display: 	grid;}}

	.authorSlideController {	float: 		right;
		.authorMarginWrapper {	max-width: 	500px;}}

	.keyAbsoluter {
		min-width: 	300px;
		width: 		100%;
		position: 	relative;
		.focusedAuthor {
			position: 	relative;
			.authorCard {
				margin: 0 auto;}
			&:not(:only-child){
				position: 	absolute;}
			min-width: 	100%;}}

	.authorSelection {
		display: 	flex;
		margin: 	0 auto;
		background: var(--TransWhite);
		padding: 	3px 20px;
		.icon {
			padding: 	6px;
			width: 		60px;
			height: 	60px;
			transition: .3s ease transform, .2s ease opacity;
			opacity: 	0.5;
			.rounded {
				border: 1px solid var(--TransWhite);}
			&.active {
				opacity: 1;}
			&:hover {
				opacity: 0.75;
				&:not(.active) {
					transform: scale(1.1);}}}}

</style>