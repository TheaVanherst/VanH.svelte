<script>
    import { fade } 	from "svelte/transition";

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
                currentAuthorSelected = author;
                window.scrollTo({top: 0, behavior: 'smooth'});
                setTimeout(() => {
                    $directoryStatus.query = author.slug;
                    $page.url.searchParams.set('user',author.slug);
					goto ("?"+$page.url.searchParams.toString());
                }, 150);}};

    onMount(() => { // jannk transition to stop sliding on initial page load-in
        currentAuthorSelected =
            $page.url.searchParams.get('user') ?
				data.authorData.map(i => {return i.slug === $page.url.searchParams.get('user') ? i : undefined;}).filter(n => n)[0] :
                data.authorData[0];});
</script>

{#if currentAuthorSelected}
	<div class="authorSelection" in:fade={{axis: 'x', delay: 150}} out:fade={{axis: 'x'}}>
		<div class="centreWrapper">
			<div class="selectionCarousel wrapCorrection">
				{#each data.authorData as author}
					{#if author.searchable}
						<div class="iconWrapper"
							 class:active={currentAuthorSelected.slug === author.slug}
							 on:click={() => {authorUpdate(author)}}>
							<div class="rounded icon">
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
	.authorSelection {
		width: 			100%;
		margin: 		0 0 15px 0;
		.centreWrapper {
			gap: 		15px;
			margin: 	0 auto;
			display: 	grid;}}

	.selectionCarousel {
		display: 		flex;
		width: 			70%;
		min-width: 		max-content;
		max-width: 		450px;
		margin: 		0 auto;
		background: 	var(--transPure2);
		border: 		1px solid var(--accent1);
		border-radius: 	100px;}

	.iconWrapper {		padding: 	6px;
						width: 		60px;
						height: 	60px;
						filter: 	grayscale(0.5);
						opacity: 	0.5;
						transition: .3s ease transform, .2s ease opacity;
		.icon {			border: 	1px solid transparent;}
		&:first-child { margin-left: 	auto;}
		&:last-child { 	margin-right: 	auto;}
		&.active {		filter: 	revert;
						opacity: 	1;
			.icon {		border: 	1px solid var(--pure1);} }
		&:hover {		filter: 	revert;
			&:not(.active) {	opacity: 	1;
								transform: 	scale(1.1);
				.icon {			border: 	1px solid var(--accent1);}}}}

	.keyAbsoluter {		min-width: 	300px;
						width: 		100%;
						position: 	relative;
		.focusedAuthor {		position: 	relative;
			&:not(:only-child){	position: 	absolute;}
								min-width: 	100%;}}

</style>