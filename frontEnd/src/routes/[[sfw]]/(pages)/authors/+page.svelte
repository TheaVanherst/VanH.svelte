<script>
    import * as transitionFunctions from 'svelte/transition';
    import { fade, slide } 			from "svelte/transition";

    import { goto } 	from "$app/navigation";
    import { onMount } 	from "svelte";

    import { page } 	from "$app/stores";
    import { directoryStatus } from "$lib/settings/navigationHandling.js";

    import SanityImage 	from "$root/serializer/sanityImage.svelte";
    import AuthorCard 	from "$root/components/pageSpecific/queryPages/author/authorCard.svelte";

    export let data;

    let currentAuthorSelected;

    const
		authorUpdate = (author) => {
        	if (currentAuthorSelected !== author) {
                currentAuthorSelected = author
                window.scrollTo({top: 0, behavior: 'smooth'});
                setTimeout(async () => {
                    const newQuery = `?${$page.url.searchParams.toString()}`;
                    $page.url.searchParams.set('user',author.slug);
                    $directoryStatus.query = newQuery;
                    await goto (newQuery);
                }, 350);
			}
		};

	let transition = transitionFunctions['fade']

    onMount(() => { // jannk transition to stop sliding on initial page load-in
        currentAuthorSelected =
            $page.url.searchParams.get('user') ?
				data.authorData.map(i => {return i.slug === $page.url.searchParams.get('user') ? i : undefined;}).filter(n => n)[0] :
                data.authorData[0];

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
		<p style="margin: 15px auto; display: flex; width: max-content;">
			this page isn't done yet, lol!
		</p>
	</div>
{/if}

<style lang="scss">
	.focusedAuthorController {
		width: 			100%;
		margin: 		0 0 15px 0;
		.focusedAuthorMarginWrapper {
			gap: 		15px;
			margin: 	0 auto;
			display: 	grid;}}

	.keyAbsoluter {		min-width: 	300px;
						width: 		100%;
						position: 	relative;
		.focusedAuthor {		position: 	relative;
			&:not(:only-child){	position: 	absolute;}
								min-width: 	100%;}}

	.authorSelection {
		display: 	flex;
		margin: 	0 auto;
		background: var(--TransWhite);
		padding: 	3px 20px;
		.icon {		padding: 	6px;
					width: 		60px;
					height: 	60px;
					filter: 	grayscale(1);
					opacity: 	0.5;
					transition: .3s ease transform, .2s ease opacity;
			.rounded {			border: 	1px solid transparent;}
			&.active {			filter: 	revert;
								opacity: 	1;
				.rounded {		border: 	1px solid var(--accent10);} }
			&:hover {			filter: 	revert;
				&:not(.active) {opacity: 	1;
								transform: 	scale(1.1);
					.rounded {	border: 	1px solid var(--accent7);}}}}}

</style>