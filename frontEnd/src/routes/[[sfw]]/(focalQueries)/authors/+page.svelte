<script>
    import { fade, slide } from "svelte/transition";
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";

    import { directoryData } from "$lib/controllers/layoutControllers/redirectHandling.js";

    import SanityImage 		from "$root/serializer/sanityImage.svelte";
    import RedirectBuilder 	from "$root/components/generic/wrappers/redirectBuilder.svelte";
    import ImageTag	 		from "$root/components/generic/containers/imageContainers/imageTag.svelte";

    let currentAuthorSelected;

    export let data;

    const
		authorUpdate = (author) => {
            currentAuthorSelected = author
            window.scrollTo({top: 0, behavior: 'smooth'});
            setTimeout(async () => {
                if (currentAuthorSelected) {
                    $page.url.searchParams.set('author',author.slug);
					await goto (`?${$page.url.searchParams.toString()}`);}
                else {
                    new URLSearchParams($page.url.searchParams.toString()).delete('author');
                    await goto(`${$directoryData.raw}`);}
            }, 350);}

	onMount(() => {
        const initialSlug = $page.url.searchParams.get('author')
        currentAuthorSelected = data.authorData.map(i => {return i.slug === initialSlug ? i : undefined;}).filter(n => n)[0];})
</script>

{#if !!data.authorData && currentAuthorSelected === undefined}
	<div class="authorSlideController" in:slide={{axis: 'x', delay: 150}} out:slide={{axis: 'x', delay: 100}}>
		<div class="authorMarginWrapper">
			{#each data.authorData as author}
				{#if author.searchable}
					<div class="authorCard active wideBorder" transition:fade on:click={() => {authorUpdate(author)}}>
						<div class="profileBanner">
							<div class="banner">
								<SanityImage image={author.profileBanner}/>
							</div>
							<div class="icon">
								<div class="rounded">
									<SanityImage image={author.userPortrait}/>
								</div>
							</div>
						</div>

						<div class="title">
							<h3 class="userName">{author.fullName}</h3>
							<p class="handle"><span>@</span>{author.handle}, {author.internalRole[0].title}</p>
						</div>

						<div class="descriptionWrapper">
							{#if author?.authorTag?.length > 0}
								<div class="authorTags">
									{#each author.authorTag as tag}
										<p>{tag.emoji} {tag.title}</p>
									{/each}
								</div>
							{/if}
							<p class="description">
								{author.shortDesc}
							</p>
						</div>
					</div>
				{/if}
			{/each}
		</div>
	</div>
{/if}

{#if currentAuthorSelected}
	<div class="focusedAuthorController" in:slide={{axis: 'x', delay: 150}} out:slide={{axis: 'x', delay: 100}}>
		<div class="focusedAuthorMarginWrapper">
			<div class="authorSelection wideBorder">
				{#each data.authorData as author}
					{#if author.searchable}
						<div class="icon"
							 class:active={currentAuthorSelected.slug === author.slug}
							 on:click={() => {authorUpdate(currentAuthorSelected.slug === author.slug ? undefined : author)}}>
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
						<div class="authorCard wideBorder">
							<div class="profileBanner">
								<div class="banner">
									<SanityImage image={currentAuthorSelected.profileBanner}/>
								</div>
								<div class="icon">
									<div class="rounded">
										<SanityImage image={currentAuthorSelected.userPortrait}/>
									</div>
								</div>
							</div>

							<div class="title">
								<h3 class="userName">{currentAuthorSelected.fullName}</h3>
								<p class="handle"><span>@</span>{currentAuthorSelected.handle}{currentAuthorSelected.internalRole[0] ? "," + currentAuthorSelected.internalRole[0].title : ""}</p>
							</div>

							<div class="descriptionWrapper">
								{#if currentAuthorSelected?.authorTag?.length > 0}
									<div class="authorTags">
										{#each currentAuthorSelected.authorTag as tag}
											<p>{tag.emoji} {tag.title}</p>
										{/each}
									</div>
								{/if}
								<p class="description">
									{currentAuthorSelected.shortDesc}
								</p>
							</div>
						</div>

						{#if currentAuthorSelected.latestArtworks.length > 0}
							<div class="artworkFeature">
								<h2>Latest Artworks</h2>
								<div class="artworkGallery artwork imageWrapper">
									{#each currentAuthorSelected.latestArtworks as artwork}
										<RedirectBuilder url="/artwork/?query={artwork.pieceName.toLowerCase().replaceAll(' ','_')}">
											<div class="imageCard imageWrapper wideBorder">
												{#if !!artwork.gallery.images[0]}
													<SanityImage image="{artwork.gallery.images[0]}"/>
												{/if}
												<ImageTag>
													<p>{artwork.participation}</p>
												</ImageTag>
											</div>
										</RedirectBuilder>
									{/each}
								</div>
							</div>
						{/if}
						{#if currentAuthorSelected.latestDesigns.length > 0}
							<div class="artworkFeature">
								<h2>Latest Designs</h2>
								<div class="artworkGallery designWork imageWrapper">
									{#each currentAuthorSelected.latestDesigns as artwork}
										<RedirectBuilder url="/artwork/?query={artwork.pieceName.toLowerCase().replaceAll(' ','_')}">
											<div class="imageCard imageWrapper wideBorder">
												{#if !!artwork.gallery.images[0]}
													<SanityImage image="{artwork.gallery.images[0]}"/>
												{/if}
												<ImageTag>
													<p>{artwork.participation}</p>
												</ImageTag>
											</div>
										</RedirectBuilder>
									{/each}
								</div>
							</div>
						{/if}
					</div>
				{/key}
			</div>
		</div>
	</div>
{/if}

<style lang="scss">
	.authorSlideController, .focusedAuthorController {
		width: 100%;
		.authorMarginWrapper, .focusedAuthorMarginWrapper {
			gap: 		15px;
			margin: 	0 auto;
			display: 	grid;}}

	.authorSlideController {
		float: right;
		.authorMarginWrapper {
			max-width: 	500px;}}

	// generic card

	.authorCard {
		max-width: 		550px;
		overflow: 		hidden;
		background: 	var(--TransWhite);
		transition: 	background .3s ease;
		h1,h2,h3,h4,p {			color: black;}
		&.active:hover {		background: white;
			.title {			background: var(--accent7);
				h1,h2,h3,h4,p {	color: white;}}}}

	.profileBanner {
		position: relative;
		.banner {
			height: 	108px;}
		.icon {
			bottom: 	0;
			position: 	absolute;
			height: 	80px;
			width: 		80px;
			padding: 	14px;
			.rounded {
				border: 1px solid var(--TransWhite);}}}

	//

	.title, .descriptionWrapper {
		display: grid;
		padding: 8px 4px 9px 10px;
		h1,h2,h3,h4,p {
			transition: color .2s ease;}}

	.descriptionWrapper {
		gap: 7px;
		.description {
			margin: 0 0 1px 2px;}}

	.title {
		background: white;
		transition: background .3s ease;
		gap: 		2px;

		> * {
			text-transform: capitalize;
			width: 			max-content;}}

	.authorTags {
		display: 	inline-flex;
		margin: 	2px 0 0 -1px;
		gap: 		6px;
		p {
			border-radius: 	12px;
			padding: 		2px 9px 2px 5px;
			background: 	var(--accent9);
			color: 			white;}}

	//

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

	//

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
					transform: scale(1.1);}
				&.active {
					transform: scale(0.9);}}}}

	.artworkFeature {
		position: 	relative;
		display: 	grid;
		gap: 		15px;
		margin: 	15px 0 0 0;}

	.artworkGallery {
		display: grid;
		grid-template-columns: auto auto auto;
		gap: 15px;
		min-width: 100%;

		.imageCard {
			min-height: 100%;
			min-width: 100%;
			&.artwork {
				height: 500px;}
			&.designWork {
				height: 400px;}
			p {	text-transform: lowercase;
				&:first-letter {
					text-transform: capitalize;}}}
	}
</style>